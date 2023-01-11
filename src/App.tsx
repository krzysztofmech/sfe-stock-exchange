import { FormEvent, useEffect, useState } from "react";
import { getCompanies, getDataset } from "./api/datasetsApi";
import { Select } from "./components/Select";
import { CompanyInterface } from "./interfaces/company";
import { DatasetsInterface } from "./interfaces/datasets";
import { Chart } from "./Chart";
import { SingleDatasetInterface } from "./interfaces/singleDataset";
import { Alert } from "./components/Alert";
import "./styles/global.css";

function App() {
  const [datasets, setDatasets] = useState<CompanyInterface[] | []>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [companyData, setCompanyData] = useState<
    SingleDatasetInterface | undefined
  >();
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    loadDatasets();
  }, []);

  const loadDatasets = async () => {
    const result = await getCompanies();
    result && result.datasets
      ? setDatasets(sortDatasets(result))
      : setDatasets([]);
    result && result.datasets
      ? handleError("", false)
      : handleError("Error during fetching data", true);
  };
  const sortDatasets = ({
    datasets,
  }: DatasetsInterface): CompanyInterface[] => {
    const sortedDatasets = datasets.sort((a, b) => {
      const datasetCodeA = a.dataset_code;
      const datasetCodeB = b.dataset_code;
      return datasetCodeA < datasetCodeB
        ? -1
        : datasetCodeA > datasetCodeB
        ? 1
        : 0;
    });
    return sortedDatasets;
  };

  const handleChange = async (e: FormEvent<HTMLSelectElement>) => {
    const datasetCode: string = e.currentTarget.value;
    setSelectedCompany(datasetCode);
    loadCompany(datasetCode);
  };

  const loadCompany = async (datasetCode: string) => {
    const result: SingleDatasetInterface = await getDataset(datasetCode);
    result
      ? setCompanyData(result)
      : handleError("Error during fetching data", true);
    result
      ? handleError("", false)
      : handleError("Error during fetching data", true);
  };

  const handleError = (message: string, show: boolean) => {
    setShowError(show);
    setErrorMessage(message);
  };

  return (
    <>
      <Alert danger show={showError} text={errorMessage} />
      <div className="app">
        <Select data={datasets} name="company" handleChange={handleChange} />
        <Chart data={companyData} label={selectedCompany} />
      </div>
    </>
  );
}

export default App;
