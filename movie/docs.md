<페이지네이션> (movieStore.js, MovieCard.jsx)
`https://api.themoviedb.org/3/discover/movie?sort_by=${sortMap[sortMode]}&certification.lte=19&certification_country=KR&page=${page}&language=ko-KR`
usePage라는 스토어를 만들어서 전역상태 page를 관리함.
<버튼, >버튼을 각각 누르면 page 상태 변화,
useEffect로 page가 변할 시 fetchMovies에 인자로 페이지를 넣어 다시 호출함. 


<로그인/회원가입> (auth.jsx & contex.jsx)
앱 전체에 필요한 기반 정보를 다루기 위해 contextAPI를 이용하여 전역상태 isSignInMode를 지정함.
-> 로그인/회원가입 툴을 하나의 컴포넌트에서 관리함.
: 이름 / 이메일 / 비밀번호 / 비밀번호 확인
( isSignInMode가 false일 경우에만 이름&비밀번호 확인 칸까지 총 4칸을 렌더링함.
(ex: jsx return부분, 유효성 조건))


<검색 기능> (movieStore.js, Layout.jsx, MovieCard.jsx)
화면을 이루는 기능에 필요한 상태를 다루기 위해 zustand를 이용하여 useMovieStore를 만들고 패치 action을 설정함.
TMDB의 여러 기능 중 search 엔드포인트를 활용함.
: handleChange에서 검색창의 입력값을 useState로 받아 input상태에 저장하고, setSearchParams로 파라미터에 입력값을 넣어줌.
-> MovieCard.jsx에서 query값을 useDebounce에 넣어줌.
-> 검색값이 없다면 일반 영화내용 패치, 
   겁색값이 있다면 fetchSearchedResults에 디바운스처리된 query를 전달함.
-> movieStore.js의 fetchSearchedResults action에서 받아 검색결과를 렌더링함. 


<찜 기능> (Context.jsx, movieStore.js, Like.jsx)
supabase에서 'like'라는 table을 별도로 만들어 찜한 영화의 id를 추가하고 불러옴. 
: userId와 movieId 데이터를 추가하고 likedMovieIds 상태에 저장함.
-> 첫 렌더링 때 getSession 호출 시 / 상태 변경 시 적용됨.
: Like.jsx에서 likedMovieIds를 가져와서 렌더링함. 


<정렬> (movieStore.js, MovieCard.jsx)
정렬 모드를 관리하는 스토어를 만들어서 sortMode 상태를 지정함.
-> 별점순/최신순/인기순 버튼 클릭시 상태를 변경함. 
-> fetchMovies의 url 파라미터에 넣어 패치 받아옴.


<다크모드> (context.jsx)
useState로 isDark 상태 지정
: {`${isDark ? "background" : "bg-white" }`}


<장르> (DetailMovieCard.jsx, Genre.jsx)
<Route path="detail/:id/:genreId" ... />
DetailMovieCard.jsx에서 API로 받아온 데이터의 장르를 Link 연결해서 렌더링
-> Genre.jsx에서 useParams를 이용해 
http://localhost:5173/detail/1100988/27
detail/ 뒤의 아이디를 받아와 fetchRecommendedMovie에 인자로 주며 호출함. 
-> 파라미터에 변수를 넣어 패치해옴.
-> 데이터 배열의 길이 중 숫자 여러 개를 랜덤으로 꼽아 렌더링함.