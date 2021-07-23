import React from 'react';
import { Paper, Table as MatTable, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { IColumn, IRow } from '../../../types';

interface ITableProps {
  id: string;
  columns: IColumn[];
  rows: IRow[];
  noDataMessage?: string;
  onRowClick?: (row: IRow) => void;
}

const DEFAULT_NO_DATA_MESSAGE = 'No data available';

export default function Table(props: ITableProps) {
  const { columns, rows, noDataMessage, id, onRowClick } = props;

  const renderCell = (row: IRow, column: IColumn) => {
    const { cellRenderer, field } = column;
    const value = typeof cellRenderer === 'function' ? cellRenderer(row) : row[field];
    return <div>{value}</div>;
  };

  const handleRowClick = (rowData: IRow) => {
    if (typeof onRowClick === 'function') {
      onRowClick(rowData);
    }
  };

  const renderHeader = () => (
    <TableRow className="cs-table-row">
      {columns?.map((column: IColumn) => (
        <TableCell
          className="cs-table-cell"
          style={{ width: column.width || 'auth' }}
          key={column.field}
          component="th"
        >
          {column.headerName}
        </TableCell>
      ))}
    </TableRow>
  );

  const renderBody = () => {
    if (!rows?.length) {
      return (
        <TableRow className="no-data-row">
          <TableCell className="cs-table-cell" colSpan={12}>
            {noDataMessage || DEFAULT_NO_DATA_MESSAGE}
          </TableCell>
        </TableRow>
      );
    }

    return rows.map((row: IRow, index: number) => {
      return (
        <React.Fragment key={index.toString() + Math.random()}>
          <TableRow className="cs-table-row" onClick={() => handleRowClick(row)}>
            {columns.map((column: IColumn) => (
              <TableCell
                style={{ width: column.width || 'auth' }}
                className="cs-table-cell"
                key={column.field + Math.random()}
                component="td"
              >
                {renderCell(row, column)}
              </TableCell>
            ))}
          </TableRow>
        </React.Fragment>
      );
    });
  };

  const renderTable = () => {
    return (
      <Paper className="cs-table-root">
        <TableContainer id={id} className="cs-table-container">
          <MatTable stickyHeader className="cs-table" aria-label="sticky table">
            <TableHead className="cs-table-header">{renderHeader()}</TableHead>
            <TableBody className="cs-table-body">{renderBody()}</TableBody>
          </MatTable>
        </TableContainer>
      </Paper>
    );
  };

  return renderTable();
}
