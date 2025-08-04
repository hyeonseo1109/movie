            1
            별점 높은 순 / 최신순 / 인기순

            스토어에서 isVote, setIsVote 전역변수 설정.
            버튼 누르면 isVote true됨
            isVote일 때 map하기 전 sort하고 map

            vote_average가 높은 게 먼저 나오게
            arr.sort( (a,b) => b.vote_average - a.vote_average)
            음수 반환 → a가 b보다 앞에 온다
            양수 반환 → a가 b보다 뒤에 온다

            평점이 a가 10이고 b가 5면?
            음수가 반환되므로 a가 b보다 먼저 옴



            2
            검색창



            3 //------------
            찜하기




4) //------------
비슷한 장르 영화 추천?



            미디어쿼리 확인
            상세정보창 줄어들었을 떄 타이틀 / 평점 / 런타임 위치 이상함


            귀칼 런타임 0분임  detailmovie.runtiem 0일 경우 아예 안 뜨게 ㄱㄱ

            페이지 번호 만들어서 패치 주소에 변수 넣어서 연결 ㄱㄱ



            상세정보 데이터 빨리빨리 안바뀜 로딩중일거면 로딩중으로 뜨게 ㄱㄱ

            ~~~새로고침 할 때마다 영화 다 리렌더 되니까 최적화 ㄱㄱ~~~

            ---페이지 패치할 떄 1, 2, 3..일 때 그 페이지에서만 검색되니까 잘 생각해봐---
            별점순/최신순/인기순 페이지마다 그거 별로 각각 될 것 같은데 자료 자체를 sort하고 해야되나
            => url 자체 파라미터로 바꿈 
            popular: 'popularity.desc',
            vote: 'vote_average.desc',
            recent: 'release_date.desc',


            관람등급
            ~~~&certification.lte=19&certification_country=KR&~~~
            이거 하고 나면 패치 받을 때부터 성인영화 빼고 나오니까 한 페이지당 20개씩 하면 개수 어떤 페이지라도 다 똑같을듯

            영화 api 받아올 때 검색 관련?




스켈레톤

            다크모드

            nav바 - 로그인&회원가입&마이페이지

            => Supabase를 이용한 회원가입


검색어 입력 후 엔터 누르거나 input 포커스 아웃 시에도 작동하도록
<input
  value={input}
  onChange={handleChange}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      setSearchParams(input ? { query: input } : {});
    }
  }}
/>


              상세페이지 누를 떄 최상단으로 스크롤 이동


