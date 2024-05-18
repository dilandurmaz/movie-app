import { useEffect, useState } from "react";
import {
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_RowData,
  MRT_SortingState,
  MRT_TablePagination,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { Search } from "../../redux/slices/movie/movieType";
import "./Table.scss"

interface Table {
  headers: MRT_ColumnDef<MRT_RowData>[];
  data: MRT_RowData[];
  mainData: Search[];
  setData: Function;
  rowCount?: number;
  pageSize?: number;
  dispatchFunction: Function;
}

const Table = ({
  headers,
  data,
  rowCount,
  pageSize,
  dispatchFunction,
  setData,
  mainData,
}: Table) => {
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });

  const table = useMaterialReactTable({
    data,
    enableRowSelection: true,
    initialState: { showColumnFilters: true },
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    muiPaginationProps: {
      rowsPerPageOptions: [10],
      showFirstButton: false,
      showLastButton: false,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      sorting,
    },
    columns: headers,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    renderBottomToolbar: ({ table }: any) => {
      return <MRT_TablePagination table={table} />;
    },
    renderTopToolbarCustomActions: () => {
      return (
        <Box style={{ display: "flex", justifyContent: "flex-end" }}></Box>
      );
    },
  });
  function filterData(data, filters) {
    return data.filter((item) => {
      return filters?.every((filter) => {
        if (item[filter.id]) {
          const itemValue =
            filter.id === "Title"
              ? item[filter.id].toLowerCase()
              : item[filter.id].toLowerCase();
          const filterValue = filter.value.toLowerCase();
          return itemValue.includes(filterValue);
        }
        return false;
      });
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!data || !data.length) {
        setIsLoading(true);
      }
      if (columnFilters.length > 0) {
        const filteredData = filterData(mainData, columnFilters);
        setData(filteredData);
      } else {
        try {
          await dispatch(dispatchFunction({ page: pagination.pageIndex + 1 }));
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [pagination.pageIndex, pagination.pageSize, columnFilters]);

  return (
    <Box className ="table-container">
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default Table;
