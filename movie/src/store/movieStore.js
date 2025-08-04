import { create } from "zustand";



//영화 정보
export const useMovieStore = create((set) => ({
    movies: [],
    fetchMovies: async (page = 1, sortMode = 'popularity') => {
        const sortMap = {
            popular: 'popularity.desc',
            vote: 'vote_average.desc',
            recent: 'release_date.desc',
        };
    try {
        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=${sortMap[sortMode]}&certification.lte=19&certification_country=KR&page=${page}&language=ko-KR`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
        });
        const data = await res.json();

        set({ movies: data.results});
    } catch (err) {
        console.error('에러:', err);
    }
},

    searchedResults: [],
    setSearchedResults: (movies) => set({ searchedResults: movies }),

    fetchSearchedResults: async (query, page) => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=${page}&language=ko-KR`, {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                },
            });
            const data = await res.json();
            set({ searchedResults: data.results || [] });
        } catch (err) {
            console.error("검색 오류:", err);
            set({ searchedResults: [] });
        }
    }
}))


// 영화 상세 정보 
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
            set({ detailMovies: data});
        } catch (err) {
            console.error('에러:', err);
        }
    }
}))

// 찜 영화 목록
export const useLikedMovieStore = create((set) => ({
    likedMovies: [],
    setLikedMovies: (newMovie) => set({ likedMovies: newMovie }),
    fetchLikedMovies: async (movieIds) => {
        try {
            const promises = movieIds.map(id =>
                fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko-KR&append_to_response=credits`, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                    },
                }).then(res => res.json())
            );
            const movies = await Promise.all(promises);
            set({ likedMovies: movies });
        } catch (err) {
            console.error('에러:', err);
            set({ likedMovies: [] });
        }
    }
}))



// 별점순 / 최신순 / 인기순
export const useMode = create((set) => ({
    sortMode: 'popular', 
    setSortMode: (mode) => set({ sortMode: mode }),
}));

// 페이지 몇 번째인지
export const usePage = create((set) => ({
    page: 1, 
    setPage: (num) => set({ page: num }),
}));


//장르 
export const useRecommendedMovie = create((set) => ({
    recommendedMovie: [],
    fetchRecommendedMovie: async (genreId) => {

    try {
        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=ko-KR&page=1&sort_by=popularity.desc`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
        });
        const data = await res.json();
        const maxIndex = data.results.length;

        const first = Math.trunc(Math.random()* maxIndex);

        let second = Math.trunc(Math.random() * maxIndex);
        //첫 번째랑 겹치면 다시 뽑기
        while (second === first) {
            second = Math.trunc(Math.random() * maxIndex);
        }

        let third = Math.trunc(Math.random() * maxIndex);
        //첫 번째랑 겹치면 다시 뽑기
        while (third === first || third===second) {
            third = Math.trunc(Math.random() * maxIndex);
        }
        const random = [data.results[first], data.results[second], data.results[third]];
        set({ recommendedMovie: random });
    } catch (err) {
        console.error('비슷한 장르 영화 불러오기 실패:', err);
    }}
}));