
import { useEffect } from "react";
import { useDetailMovieStore } from "../store/movieStore"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function DetailMovieCard () {
    const {id} = useParams();
    const detailMovies = useDetailMovieStore( state => state.detailMovies );
    const fetchDetailMovies = useDetailMovieStore( state => state.fetchDetailMovies);
    const navigate = useNavigate();

    useEffect( () => {
        fetchDetailMovies(id);
    }, [fetchDetailMovies, id]);
    //나중에 id로 숫자 넘기는 거 바꾸기
    //지금은 어떤 영화를 눌러도 다 쿵푸팬더가 떠야 되니까 쿵푸팬더 아이디를 넘김

    // 이거 지우면 쿵푸팬더 정보는 쿵푸팬더한테만 뜨게 할 수 있음. 
    // if (!detailMovies || String(detailMovies.id) !== id) {
    if (!detailMovies) {
        console.log(id);
        return <div>영화 정보가 없습니다.</div>;   
    }




    return (
    <div className="flex flex-wrap gap-4 p-4 mx-5 my-5 justify-center">
            <div key={detailMovies.id} className="bg-black shadow-[0_0_15px_#000000c1] text-white flex flex-col  detail w-[70em] detailCard">
                <div 
                    onClick={() => navigate(-1)}
                    className="font-bold text-[gray] text-[1.3em]"
                >🅧</div>
                <div className="flex flex-row gap-6 m-4 justify-center">
                    {detailMovies.genres.map((gr) => <div 
                        key={gr.id}
                        className="text-[#fff] text-[0.95em] p-0.5 border-b border-[#bfbfbf]">#{gr?.name}</div>)}
                </div>
                <div>
                    <div className="relative w-[50em] mx-auto">
                        {detailMovies.backdrop_path ? (<img
                            className="w-full h-auto"
                            alt="배경이미지"
                            src={`https://image.tmdb.org/t/p/w500/${detailMovies.backdrop_path}`} />) : <div className="w-full h-auto bg-white"></div>}
                        <div 
                            className="
                            bg-[linear-gradient(180deg,rgb(0,0,0,0)1%,rgb(0,0,0,0.2)10%,rgb(0,0,0,0.55)30%,rgb(0,0,0,0.75)50%,rgb(0,0,0,0.98)80%)]
                            absolute top-[13.1em] left-0 w-full h-[15em]
                            "
                            alt="흰박스"
                        ></div>
                        {/* <div >
                            <span className="absolute bottom-[3.8em] right-[1em] text-[2.5em] font-bold">{detailMovies.title}</span>
                            <span className="absolute bottom-[10em] right-[15em] text-[1em] text-[#aaa]">★{detailMovies.vote_average}</span>
                            <span className="absolute bottom-[10em] left-[13em] text-[1em] text-[#aaa]">상영시간: {detailMovies.runtime}분</span>
                        </div> */}
                        <span className="absolute top-[0.5em] right-[0.7em] text-[1.4em] text-[#fff] max-w-[25em] break-keep text-right">{detailMovies?.tagline}</span>
                        
                        {/* <div className="flex flex-row justify-between relative bottom-[3em]">
                            <img
                                alt="작은사진"
                                className="aspect-[2/3] w-[9em] h-auto top-[14em] left-[2em] shadow-[0_0_15px_black]"
                                src={`https://image.tmdb.org/t/p/w500/${detailMovies.poster_path}`} />
                            <div  className="flex flex-col justify-end items-end w-[calc(100%-10em)]">
                                <span className="text-[1em] text-[#aaa]">상영시간: {detailMovies.runtime}분</span>
                                <span className="text-[1em] text-[#aaa]">★{detailMovies.vote_average}</span>
                                <span className="text-[2.5em] font-bold">{detailMovies.title}</span>
                            </div>
                        </div> */}

                        <div className="absolute top-[14em] left-0 px-6 w-full z-20 flex flex-row justify-between items-end">
                            <img
                                alt="작은사진"
                                className="aspect-[2/3] w-[9em] h-auto shadow-[0_0_15px_black]"
                                src={`https://image.tmdb.org/t/p/w500/${detailMovies.poster_path}`} />
                            <div  className="flex flex-col gap-1 items-end">
                                <span className="text-[1em] text-[#aaa]">상영시간: {detailMovies.runtime}분</span>
                                <span className="text-[1em] text-[#aaa]">★{detailMovies.vote_average}</span>
                                <span className="text-[2.5em] font-bold">{detailMovies.title}</span>
                            </div>
                        </div>

                        <div className="m-3 leading-7 break-keep">
                            {detailMovies.overview}
                        </div>
                    </div>

                </div>
            </div>
    </div>
    )
}