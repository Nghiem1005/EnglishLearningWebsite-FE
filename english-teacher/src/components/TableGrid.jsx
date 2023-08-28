import React from "react";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid"; 

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

const TableGrid = ({
  data,
  columns,
  pageSize,
  setPageSize,
  onRowClick = null,
  getRowId = null,
}) => {
  return (
    <StripedDataGrid
      rows={data}
      columns={columns}
      page={pageSize.page}
      onPageChange={(newPage) => setPageSize({ ...pageSize, page: newPage })}
      pageSize={pageSize.size}
      onPageSizeChange={(newPageSize) =>
        setPageSize({ ...pageSize, size: newPageSize })
      }
      rowsPerPageOptions={[5, 10, 20]}
      pagination
      disableSelectionOnClick
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      rowHeight={55}
      autoHeight
      onRowClick={onRowClick ? onRowClick : null}
      getRowId={getRowId ? getRowId : null}
    />
  );
};

export default TableGrid;
