import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";
import { MovieInitialState } from "./movieType";


const initialState: MovieInitialState = {
    loading: false,
    error: false,
    movies: undefined,
    movieDetail: null
};

export const getMovieList = createAsyncThunk(
    "movieList",
    async ({ page }: { page: number }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`?s=inception&page=${page}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const getMovieById = createAsyncThunk(
    "movieListById",
    async ({ id }: { id: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`?i=${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



export const movieSlice = createSlice({
    name: "movieSlice",
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMovieList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getMovieList.fulfilled, (state, action) => {
                state.movies = action.payload;
                state.loading = false;
            })
            .addCase(getMovieList.rejected, (state, action) => {
                state.loading = false;
            })
            //
            .addCase(getMovieById.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getMovieById.fulfilled, (state, action) => {
                state.movieDetail = action.payload;
                state.loading = false;
            })
            .addCase(getMovieById.rejected, (state, action) => {
                state.loading = false;
            })
    },
});

export default movieSlice.reducer;
