import { environment } from "../environment";

const { API_URL, API_KEY } = environment;

export const getCompanies = async () => {
  try {
    const response = await fetch(
      `${API_URL}/datasets/?database_code=WIKI&api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getDataset = async (datasetCode: string) => {
  try {
    const response = await fetch(
      `${API_URL}/datasets/WIKI/${datasetCode}/data.json?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
