import './App.css'
import { Routes, Route } from 'react-router-dom';
import { MovieCard } from './components/MovieCard'
import { DetailMovieCard } from './components/DetailMovieCard';
import Layout from './components/Layout';
import Mypage from './components/Mypage';
import Auth from './components/auth';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>} >
        <Route index element={<MovieCard />} />
          {/*index: 부모경로(/)와 같은 경로인 자식라우트를 표현*/}
        <Route path="detail/:id" element={<DetailMovieCard />} />
        <Route path="signup" element={<Auth />} />
        <Route path="login" element={<Auth />} />
        <Route path="mypage" element={<Mypage />} />
      </Route>
    </Routes>
  )
}

export default App;
