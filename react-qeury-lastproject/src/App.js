
import { Fragment } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import Home from "./components/main/Home";
import {CookiesProvider} from "react-cookie";
import FoodList from "./components/food/FoodList";
import FoodFind from "./components/food/FoodFind";
import FoodDetail from "./components/food/FoodDetail";

function App() {
  return (
    <Fragment>
      <CookiesProvider>
        <Router>
          <Header/>
          <Routes>
            <Route path="/" exact element={<Home/>}/>
            <Route path="/food/list" exact element={<FoodList/>}/>
            <Route path="/food/find" exact element={<FoodFind/>}/>
            <Route path="/food/detail/:fno" exact element={<FoodDetail/>}/>
          </Routes>
          <Footer/>
        </Router>
      </CookiesProvider>
    </Fragment>
  )
}

export default App;
