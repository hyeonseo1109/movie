import { create } from "zustand";

export const useMovieStore = create((set) => ({
    movies: [],
    setMovies: (newMovie) => set({movies: newMovie}),
    fetchMovies: async () => {
        try {
            const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR',{
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                },
            });
            const data = await res.json()
            const filtered = data.results.filter((mv) => !mv.adult&&mv.title!=="性教育ママ");
            console.log(filtered);
            set({ movies: filtered});
        } catch (err) {
            console.error('에러:', err);
        }
    }
}))

export const useDetailMovieStore = create((set) => ({
    detailMovies: null,
    setDetailMovies: (newMovie) => set({detailMovies: newMovie}),
    fetchDetailMovies: async (movieId) => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&append_to_response=credits`,{
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                },
            });
            const data = await res.json()
            console.log(data);
            set({ detailMovies: data});
        } catch (err) {
            console.error('에러:', err);
        }
    }
}))


export const useMode = create((set) => ({
    sortMode: 'recent', 
    setSortMode: (mode) => set({ sortMode: mode }),
}));

export const useSearch = create((set) => ({
    search: '',
    setSearch: (ser) => set({search: ser}),
}));