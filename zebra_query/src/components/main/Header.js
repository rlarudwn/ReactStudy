import { useEffect, useState } from "react"
import { Link } from "../../../node_modules/react-router-dom/dist/index"

function Header() {
  const [sessionId, setSessionId] = useState(window.sessionStorage.id || "")

  useEffect(() => {
    setSessionId(window.sessionStorage.id || '')
  }, [sessionId])
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="header__logo">
              <Link to="./index.html"><img src="/img/logo.png" alt="" /></Link>
            </div>
          </div>
          <div className="col-lg-6">
            <nav className="header__menu">
              <ul>
                <li className="active"><Link to="/">Home</Link></li>
                <li><Link to="../recipe/recipeList">Recipes</Link></li>
                <li><Link to="../recipe/meterialList">meterials</Link></li>
                <li><Link to="../board/boardList">Comunity</Link></li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-3">
            <div className="header__cart">
              <ul>
                <li><Link to="#"><i className="fa fa-heart"></i> <span>1</span></Link></li>
                <li><Link to="#"><i className="fa fa-shopping-bag"></i> <span>3</span></Link></li>
              </ul>
              <div className="header__cart__price">
                {
                  sessionId === '' ? (
                    <>
                      <Link to="/member/login">SignIn</Link> / <Link to="/member/join">SignUp</Link>
                    </>
                  ) : (
                    <button type="button" style={{ border: 'none', background: 'white' }} onClick={() => {
                      sessionStorage.clear()
                      setSessionId('')
                      window.location.reload()
                    }}>logout</button>
                  )
                }

              </div>
            </div>
          </div>
        </div>
        <div className="humberger__open">
          <i className="fa fa-bars"></i>
        </div>
      </div>
    </header>
  )
}
export default Header