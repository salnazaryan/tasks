type CustomQuery = {
  [key: string]: string;
};

export interface IQueryParams {
  skip: number;
  limit: number;
  customParams?: CustomQuery;
}
