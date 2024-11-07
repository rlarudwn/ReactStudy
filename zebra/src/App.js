import './App.css';
import Header from './components/main/Header';
import Footer from './components/main/Footer';
import { Fragment } from 'react';
import Home from './components/main/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FoodList from './components/food/FoodList';
import { useLocation } from '../node_modules/react-router-dom/dist/index';
import Login from './components/member/Login';
import Join from './components/member/Join';
import FoodDetail from './components/food/FoodDetail';
function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();
  const noHF = ['/member/login', '/member/join'];
  
  return (
    <div className="App">
      <Fragment>
        {noHF.includes(location.pathname) ? null : <Header />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/food/list' element={<FoodList />} />
          <Route path='/member/login' element={<Login />} />
          <Route path='/member/join' element={<Join />} />
          <Route path='/food/detail/:fno' element={<FoodDetail />} />
        </Routes>
        {noHF.includes(location.pathname) ? null : <Footer />}
      </Fragment>
    </div>
  );
}
export default App;
