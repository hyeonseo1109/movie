
import { useEffect } from "react";
import { useDetailMovieStore } from "../store/movieStore"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "../supabase/context";

export function DetailMovieCard () {
    const {id} = useParams();
    const detailMovies = useDetailMovieStore( state => state.detailMovies );
    const fetchDetailMovies = useDetailMovieStore( state => state.fetchDetailMovies);
    const navigate = useNavigate();
    const {isDark} = useSupabase();

    useEffect( () => {
        fetchDetailMovies(id);
    }, [fetchDetailMovies, id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!detailMovies || String(detailMovies.id) !== id ) {
        console.log(id);
        return <div className={`${ isDark ? "bg-black text-white " : "bg-white text-black"} shadow-[0_0_15px_#000000c1]flex flex-col  min-w-screen min-h-screen`}
        >로딩 중...</div>;   
    }




    return (
        <div className={`${isDark ? "background" : "bg-white" }  min-h-screen`}>
            
            <div className="flex flex-wrap gap-4 p-4  py-5 justify-center realDetail w-full">
                    <div key={detailMovies.id} className={`${isDark ? "bg-black" : "bg-[#ccc]"} shadow-[0_0_15px_#000000c1] text-white flex flex-col detailCard w-full rounded-2xl`}>
                        <div 
                            onClick={() => navigate(-1)}
                            className={`${isDark ? "text-[gray]" : "text-white"} font-bold text-[1.3em] p-3`}
                        >🅧</div>
                        <div className="flex flex-row gap-6 m-4 justify-center">
                            {detailMovies.genres.map((gr) => <div 
                                key={gr.id}
                                className={`${isDark ? "text-[#fff]" : "text-black"} text-[0.95em] p-0.5 border-b border-[#bfbfbf]`}
                                    >#{gr?.name}</div>)}
                        </div>
                        <div className="w-full">
                            {/* <div className="relative w-[50em] mx-auto"> */}
                            <div className="relative w-full max-w-[50em] mx-auto">
                                {detailMovies.backdrop_path ? (<img
                                    className="w-full h-auto max-w-full"
                                    alt="배경이미지"
                                    src={`https://image.tmdb.org/t/p/w500/${detailMovies.backdrop_path}`} />) : <div className="w-full h-auto bg-white"></div>}
                                <div 
                                    className="
                                    bg-[linear-gradient(180deg,rgb(0,0,0,0.05)1%,rgb(0,0,0,0.2)5%,rgb(0,0,0,0.3)10%,rgb(0,0,0,0.45)15%,rgb(0,0,0,0.75)50%,rgb(0,0,0,0.98)80%)]
                                    absolute top-[13.3em] left-0 w-full h-[15em] z-0
                                    "
                                    alt="흰박스"
                                ></div>
                                <span className="absolute top-[0.5em] right-[0.7em] text-[1.4em] text-[#fff] max-w-[25em] break-keep text-right">{detailMovies?.tagline}</span>
                                

                                <div className="flex items-end px-6 mt-4 gap-4 z-20 justify-between relative marginChange">
                                    <img
                                        alt="작은사진"
                                        className="aspect-[2/3] w-[9em] h-auto shadow-[0_0_15px_black]"
                                        src={`https://image.tmdb.org/t/p/w500/${detailMovies.poster_path}`} />
                                    <div  className="flex flex-col gap-1 items-end">
                                        <span className="text-[1em] text-white">상영시간: {detailMovies.runtime}분</span>
                                        <span className="text-[1em] text-white">★{detailMovies.vote_average}</span>
                                        <span className="text-[2.5em] font-bold">{detailMovies.title}</span>
                                    </div>
                                </div>

                                <div className="p-3 leading-7 break-keep relative z-21 bg-black w-full">
                                    {detailMovies.overview}
                                </div>
                            </div>

                        </div>
                    </div>
            </div>
        
        </div>
    )
}