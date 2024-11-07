import { Fragment } from "react";
import { Link } from "../../../node_modules/react-router-dom/dist/index";

function Header() {
  return (
    <Fragment>
      <header className="header_area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="logo_area text-center">
                <Link to="index.html" className="yummy-logo">Yummy Blog</Link>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <nav className="navbar navbar-expand-lg">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#yummyfood-nav" aria-controls="yummyfood-nav" aria-expanded="false" aria-label="Toggle navigation"><i className="fa fa-bars" aria-hidden="true"></i> Menu</button>
                <div className="collapse navbar-collapse justify-content-center" id="yummyfood-nav">
                  <ul className="navbar-nav" id="yummy-nav">
                    <li className="nav-item active">
                      <Link className="nav-link" to="index.html">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle" to="#" id="yummyDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages</Link>
                      <div className="dropdown-menu" aria-labelledby="yummyDropdown">
                        <Link className="dropdown-item" to="/food/list">맛집목록</Link>
                        <Link className="dropdown-item" to="/food/find">맛집검색</Link>
                        <Link className="dropdown-item" to="single.html">Single Blog</Link>
                        <Link className="dropdown-item" to="static.html">Static Page</Link>
                        <Link className="dropdown-item" to="contact.html">Contact</Link>
                      </div>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="#">Features</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/board/list">Comunity</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="archive.html">Archive</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="#">About</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="contact.html">Contact</Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </Fragment >
  )
}
export default Header