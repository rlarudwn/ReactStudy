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
                            <a href="./index.html"><img src="/img/logo.png" alt="" /></a>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <nav className="header__menu">
                            <ul>
                                <li className="active"><Link to="/">Home</Link></li>
                                <li><Link to="/food/list">상품목록</Link></li>
                                <li><a href="#">Pages</a>
                                    <ul className="header__menu__dropdown">
                                        <li><a href="/food/list">Shop Details</a></li>
                                        <li><a href="./shoping-cart.html">Shoping Cart</a></li>
                                        <li><a href="./checkout.html">Check Out</a></li>
                                        <li><a href="./blog-details.html">Blog Details</a></li>
                                    </ul>
                                </li>
                                <li><a href="./blog.html">Blog</a></li>
                                <li><a href="./contact.html">Contact</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-3">
                        <div className="header__cart">
                            <ul>
                                <li><a href="#"><i className="fa fa-heart"></i> <span>1</span></a></li>
                                <li><a href="#"><i className="fa fa-shopping-bag"></i> <span>3</span></a></li>
                            </ul>
                            <div className="header__cart__price">
                                {
                                    sessionId === '' ? (
                                        <>
                                            <Link to="/member/login">Login</Link> / <Link to="/member/join">Join</Link>
                                        </>
                                    ) : (
                                        <button type="button" style={{ border: 'none', background: 'white' }} onClick={() => {
                                            sessionStorage.clear()
                                            setSessionId('')
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