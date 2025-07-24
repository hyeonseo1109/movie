import { create } from "zustand";

export const useMovieStore = create((set) => ({
    movies: [],
    setMovies: (newMovie) => set({movies: newMovie}),
    fetchMovies: async () => {
        try {
            const res = await fetch('/data/movieListData.json')
            const data = await res.json()
            set({ movies: data.results});
        } catch (err) {
            console.error('에러:', err);
        }
    }
}))

export const useDetailMovieStore = create((set) => ({
    detailMovies: null,
    setDetailMovies: (newMovie) => set({detailMovies: newMovie}),
    fetchDetailMovies: async () => {
        try {
            const res = await fetch(`/data/movieDetailData.json`)
            const data = await res.json()
            set({ detailMovies: data});
        } catch (err) {
            console.error('에러:', err);
        }
    }
}))
