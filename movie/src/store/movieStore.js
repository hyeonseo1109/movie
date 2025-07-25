import { create } from "zustand";
import { adultKeywords } from "../../keywordFilter";
    // const page = usePage( state => state.page );


//영화 정보
export const useMovieStore = create((set) => ({
    movies: [],
    setMovies: (newMovie) => set({movies: newMovie}),
    fetchMovies: async (page = 1) => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/popular?page=${page}&language=ko-KR`,{
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                },
            });
            const data = await res.json()
            const filtered = data.results.filter((mv) => {
                const combinedText = `${mv.title} ${mv.original_title} ${mv.overview || ""}`.toLowerCase().replace(/\s/g, ""); // 괄호 안에 저건 global플래그로 문자열 전체에서 '\s', 즉 공백을 찾아서 ""로 만든다는 거.)
                return (    
                    !mv.adult && !adultKeywords.some((kw) => combinedText.includes(kw)) //some: 안에 조건을 만족하는 요소가 하나라도 있는지
                );
            });
            console.log('성인제외:',filtered);
            set({ movies: filtered});
        } catch (err) {
            console.error('에러:', err);
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
            console.log('상세데이터:', data);
            set({ detailMovies: data});
        } catch (err) {
            console.error('에러:', err);
        }
    }
}))


// 별점순 / 최신순 / 인기순
export const useMode = create((set) => ({
    sortMode: 'recent', 
    setSortMode: (mode) => set({ sortMode: mode }),
}));


// 검색
export const useSearch = create((set) => ({
    search: '',
    setSearch: (ser) => set({search: ser}),
}));


// 페이지 몇 번째인지
export const usePage = create((set) => ({
    page: 1, 
    setPage: (num) => set({ page: num }),
}));