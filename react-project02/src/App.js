import './App.css';
import Header from './components/main/header';
import Footer from './components/main/footer';
import { Fragment } from 'react';
import Home from './components/main/home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FoodList from './components/food/FoodList';
import FoodDetail from './components/food/FoodDetail';
import FoodFind from './components/food/FoodFind';
import BoardList from './components/board/BoardList';
import BoardInsert from './components/board/BoardInsert';
import BoardDetail from './components/board/BoardDetail';
function App() {
  return (
    <div className="App">
      <Fragment>
        <Router>
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/food/list' element={<FoodList/>}></Route>
            <Route path='/food/detail/:fno' element={<FoodDetail/>}></Route>
            <Route path='/food/find' element={<FoodFind/>}></Route>
            <Route path='/board/list' element={<BoardList/>}></Route>
            <Route path='/board/insert' element={<BoardInsert/>}></Route>
            <Route path='/board/detail/:id' element={<BoardDetail/>}></Route>
          </Routes>
          <Footer/>
        </Router>
      </Fragment>
    </div>
  );
}

export default App;
