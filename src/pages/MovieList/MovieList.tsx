import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useMemo, useState } from "react";
import { getMovieList } from "../../redux/slices/movie/movieSlice";
import { MRT_ColumnDef } from "material-react-table";
import Table from "../../components/Table/Table";
import { useNavigate } from "react-router-dom";

const MovieList = () => {
  const { movies } = useSelector((state: RootState) => state.movie);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (movies?.Search?.length > 0) {
      setData(movies?.Search);
    }
  }, [movies]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      { accessorKey: "imdbID", header: "IMDb ID" },
      {
        accessorKey: "Title",
        header: "Title",
        Cell: ({ row }) => {
          const navigate = useNavigate();
          return (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/movie/${row.original.imdbID}`)}
            >
              {row.original.Title}
            </span>
          );
        },
      },
      {
        accessorKey: "Year",
        header: "Year",
        Cell: ({ row }) => {
          return row.original.Year;
        },
      },
    ],
    []
  );

  return (
    <>
      <Box className="box-container">
        <Typography sx={{ margin: 2 }} variant="h4">
          Movie List
        </Typography>
        <Table
          headers={columns}
          rowCount={Number(movies?.totalResults)}
          data={data}
          mainData={movies?.Search}
          setData={setData}
          pageSize={10}
          dispatchFunction={getMovieList}
        />
      </Box>
    </>
  );
};

export default MovieList;
