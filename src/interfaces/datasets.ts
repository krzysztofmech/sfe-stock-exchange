import { MetaInterface } from "./meta";
import { CompanyInterface } from "./company";

export interface DatasetsInterface {
  datasets: CompanyInterface[];
  meta: MetaInterface;
}
