export interface IRow {
  [key: string]: any;
}

export interface IColumn {
  field: string;
  headerName: string;
  width?: string;
  cellRenderer?: (row: IRow) => any;
}
