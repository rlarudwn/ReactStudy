import { useEffect, useRef, useState } from "react"
import { Link } from "../../../node_modules/react-router-dom/dist/index"
import axios from "../../../node_modules/axios/index"

function Join() {
  const idRef = useRef(null)
  const nameRef = useRef(null)
  const nicknameRef = useRef(null)
  const pwdRef = useRef(null)
  const pwdConfirmRef = useRef(null)

  const [pwdState, setPwdState] = useState('')

  const [idCheck, setIdCheck] = useState(false)
  const [pwdCheck, setPwdCheck] = useState(false)
  const [nicknameCheck, setNicknameCheck] = useState(false)

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [pwd, setPwd] = useState('')
  const [pwdConfirm, setPwdConfirm] = useState('')
  useEffect(()=>{
    if (pwd && pwdConfirm) {
      setPwdState(pwd === pwdConfirm ? '비밀번호가 일치합니다' : '비밀번호가 일치하지 않습니다')
      setPwdCheck(pwd === pwdConfirm ? true:false)
    }
  }, [pwd, pwdConfirm])
  let checkPwd = (e) => {
    setPwd(e.target.value)
  }
  let checkPwdConfirm = (e) => {
    setPwdConfirm(e.target.value)
  }
  let checkId = () => {
    if (id.trim() === '') {
      alert('아이디를 입력하세요')
      return
    }
    axios.get('http://localhost/member/idCheck', {
      params: {
        id: id
      }
    }).then(res => {
      if (res.data === 0) {
        setIdCheck(true)
      }
      else {
        alert('이미 존재하는 아이디 입니다.')
      }
    })
  }
  let checkNickname = () => {
    if (nickname.trim() === '') {
      alert('닉네임을 입력하세요')
      return
    }
    axios.get('http://localhost/member/nicknameCheck', {
      params: {
        nickname: nickname
      }
    }).then(res => {
      if (res.data === 0) {
        setNicknameCheck(true)
      }
      else {
        alert('이미 존재하는 닉네임 입니다')
      }
    })
  }
  let memberInsert=()=>{
    if(!idCheck){
      alert('아이디 중복체크를 해주세요')
      return
    }
    if(!nicknameCheck){
      alert('닉네임 중복체크를 해주세요')
      return
    }
    if(name.trim()===''){
      alert('이름을 입력해 해주세요')
      return
    }
    if(!pwdCheck){
      alert('비밀번호 확인을 정확히 입력해주세요')
      return
    }
    axios.post('http://localhost/member/join', null, {
      params:{
        id:id,
        name:name,
        pwd:pwd,
        nickname:nickname
      }
    }).then(res=>{
      window.location.href='/'
    })
  }
  return (
    <div className="login">
      <div className="login__content">
        <div className={"login__forms"}>
          <div className="login__create" id="login-up" v-show="showLogin&&!showFind" style={{ height: "fit-content" }}>
            <h1 className="login__title">Create Account</h1>
            <div className="login__box">
              <i className='bx bx-face login__icon'></i>
              <input type="text" placeholder="UserName" disabled={idCheck ? 'disabled' : ''} className="login__input" ref={nameRef} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="login__box">
              <i className='bx bx-user login__icon'></i>
              <input type="text" placeholder="ID" className="login__input" ref={idRef} onChange={(e) => setId(e.target.value)} />
              <button type="button" style={{ display: idCheck ? 'none' : '' }} onClick={() => checkId()}>중복확인</button>
            </div>
            <div className="login__box">
              <i className='bx bx-ghost login__icon'></i>
              <input type="text" placeholder="NickName" disabled={nicknameCheck ? 'disabled' : ''} className="login__input" ref={nicknameRef} onChange={(e) => setNickname(e.target.value)} />
              <button type="button" style={{ display: nicknameCheck ? 'none' : '' }} onClick={() => checkNickname()}>중복확인</button>
            </div>

            <div className="login__box">
              <i className='bx bx-lock login__icon'></i>
              <input type="password" placeholder="Password" className="login__input" ref={pwdRef} onKeyUp={(e) => {checkPwd(e)}} />
              <p style={{ margin: '0 auto', color: 'red' }}>
                <font size="1px"></font>
              </p>
            </div>

            <div className="login__box">
              <i className='bx bx-lock login__icon'></i>
              <input type="password" placeholder="Confirm Password" className="login__input" ref={pwdConfirmRef}
                onChange={(e) => {checkPwdConfirm(e)}}
              />
              <p style={{ margin: '0 auto', color: 'red' }} >
                <font size="1px" id="pwdState">{pwdState}</font>
              </p>
            </div>
            <button type="button" className="login__button" onClick={()=>memberInsert()}>Sign Up</button>
            <div>
              <span className="login__account login__account--account">Already have an Account?</span> <span className="login__signup login__signup--signup"
                id="sign-in"><Link to='../member/login'>login</Link></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Join