export interface MetaInterface {
  current_first_item: number;
  current_last_item: number;
  current_page: number;
  next_page: number;
  per_page: number;
  prev_page: number | null;
  query: string;
  total_count: number;
  total_pages: number;
}
