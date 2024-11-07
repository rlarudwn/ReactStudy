import { Fragment } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import Home from "./components/main/Home";
import { CookiesProvider } from "react-cookie";
import RecipeList from "./components/recipe/RecipeList";
import MeteriralList from "./components/recipe/MeterialList";
import RecipeMake from "./components/recipe/RecipeMake";
import RecipeDetail from "./components/recipe/RecipeDetail";
import MeterialDetail from "./components/recipe/MeterialDetail";
import { useLocation } from "../node_modules/react-router-dom/dist/index";
import Login from "./components/member/Login";
import Join from "./components/member/Join";
import BoardList from "./components/community/BoardList";
import BoardInsert from "./components/community/BoardInsert";
import BoardDetail from "./components/community/BoardDetail";
import BoardUpdate from "./components/community/BoardUpdate";

function App() {
  return (
    <Fragment>
      <CookiesProvider>
        <Router>
          <MainContent />
        </Router>
      </CookiesProvider>
    </Fragment>
  )
}

function MainContent() {
  const location = useLocation();
  const noHF = ['/member/login', '/member/join'];

  return (
    <div className="App">
      <Fragment>
        {noHF.includes(location.pathname) ? null : <Header />}
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/recipe/recipeList" exact element={<RecipeList />} />
          <Route path="/recipe/meterialList" exact element={<MeteriralList />} />
          <Route path="/recipe/make/:cartStr" exact element={<RecipeMake />} />
          <Route path="/recipe/recipeDetail/:no" exact element={<RecipeDetail />} />
          <Route path="/recipe/meterialDetail/:mno" exact element={<MeterialDetail />} />
          <Route path='/member/login' element={<Login />} />
          <Route path='/member/join' element={<Join />} />
          <Route path='/board/boardList' element={<BoardList/>} />
          <Route path='/board/boardInsert' element={<BoardInsert/>} />
          <Route path='/board/boardDetail/:id' element={<BoardDetail/>} />
          <Route path='/board/boardUpdate/:id' element={<BoardUpdate/>} />
        </Routes>
        {noHF.includes(location.pathname) ? null : <Footer />}
      </Fragment>
    </div>
  );
}
export default App;
