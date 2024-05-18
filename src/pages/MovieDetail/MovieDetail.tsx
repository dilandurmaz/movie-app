import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { getMovieById } from "../../redux/slices/movie/movieSlice";
import { useParams } from "react-router-dom";
import CardItem from "../../components/Card/Card";
import { Box, Typography } from "@mui/material";
import Loading from "../../components/Loading/Loading";

const MovieDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { loading, movieDetail } = useSelector(
    (state: RootState) => state.movie
  );

  useEffect(() => {
    dispatch(getMovieById({ id }));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        movieDetail &&
        Object.keys(movieDetail)?.length > 0 && (
          <Box className="box-container">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                margin: 2,
              }}
            >
              <Typography variant="h4" margin={1} textAlign={"center"}>
                {movieDetail.Title}
              </Typography>
              <CardItem
                image={movieDetail.Poster}
                title={movieDetail.Title}
                plot={movieDetail.Plot}
                director={movieDetail.Director}
                actors={movieDetail.Actors}
              />
            </Box>
          </Box>
        )
      )}
    </>
  );
};

export default MovieDetail;
