import { useRef, useState } from "react"
import { Link } from "../../../node_modules/react-router-dom/dist/index"
import axios from "../../../node_modules/axios/index"

function Login() {
  const idRef=useRef(null)
  const pwdRef=useRef(null)


  const [id, setId]=useState('')
  const [pwd, setPwd]=useState('')

  let login=()=>{
    if(id.trim()===''){
      alert('아이디를 입력하세요')
      return
    }
    if(pwd.trim()===''){
      alert('비밀번호를 입력하세요')
      return
    }
    axios.get('http://localhost/member/login', {
      params:{
        id:id,
        pwd:pwd
      }
    }).then(res=>{
      if(res.data.state==='OK'){
        alert('로그인 성공')
        let info=res.data.info
        sessionStorage.setItem('id', info.id)
        sessionStorage.setItem('name', info.name)
        sessionStorage.setItem('nickname', info.nickname)
        window.location.href="/"
      }
      else if(res.data.state==='NOID'){
        alert('아이디가 존재하지 않습니다')
        setId('')
        setPwd('')
        return
      }
      else{
        alert('비밀번호가 틀렸습니다')
        setPwd('')
        return
      }
    })
  }
  return (
    <div className="login">
      <div className="login__content">
        <div className="login__forms">
          <div>
            <div className="login__register">
              <h1 className="login__title">Sign In</h1>
              <div className="login__box">
                <i className='bx bx-user login__icon'></i>
                <input type="text" placeholder="Username" className="login__input" ref={idRef} onChange={(e) => setId(e.target.value)} value={id}/>
              </div>
              <div className="login__box">
                <i className='bx bx-lock login__icon'></i>
                <input type="password" placeholder="Password" className="login__input" ref={pwdRef} onChange={(e) => setPwd(e.target.value)} value={pwd}/>
              </div>
              <button type="button" className="login__button" onClick={()=>login()}>Sign In</button>
              <div>
                <span className="login__account login__account--account">Don't Have an Account?</span> <span
                  className="login__signin login__signin--signup" id="sign-up"><Link to='../member/join'>Sign Up</Link></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login