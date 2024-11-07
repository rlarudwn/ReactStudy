import logo from './logo.svg';
import './App.css';
import { Provider } from '../node_modules/react-redux/dist/react-redux';
import store from './store/store';
import Header from './components/main/Header';
import Footer from './components/main/Footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/main/Home';
import FoodList from './components/food/FoodList';
import FoodDetail from './components/food/FoodDetail';
function App() {
  return (
    <Provider store={store}> 
    <Router>
      <Header/>
      <Routes>
        <Route path="/" exact element={<Home/>}></Route>
        <Route path="/food/list" exact element={<FoodList/>}></Route>
        <Route path="/food/detail/:fno" exact element={<FoodDetail/>}></Route>
      </Routes>
      <Footer/>
    </Router>
    </Provider>
  );
}

export default App;
