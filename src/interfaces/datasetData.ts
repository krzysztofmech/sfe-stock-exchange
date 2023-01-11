export interface DatasetDataInterface {
  collapse: boolean | null;
  column_index: number | null;
  column_names: string[];
  data: any[];
  end_date: string;
  frequency: string;
  limit: number;
  order: string;
  start_date: string;
  transform: string | null;
}
