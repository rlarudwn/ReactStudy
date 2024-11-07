import { Fragment, useRef, useState } from "react"
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index"
import axios from "../../../node_modules/axios/index"

function BoardInsert() {
  const nav = useNavigate()
  const nameRef=useRef(null)
  const subjectRef=useRef(null)
  const contentRef=useRef(null)
  const pwdRef=useRef(null)

  const[name, setName]=useState('')
  const[subject, setSubject]=useState('')
  const[content, setContent]=useState('')
  const[pwd, setPwd]=useState('')
  const[result, setResult]=useState('')
  const boardInsert=()=>{
    if(name.trim()===''){
      nameRef.current.focus()
      return
    }
    if(subject.trim()===''){
      subjectRef.current.focus()
      return
    }
    if(content.trim()===''){
      contentRef.current.focus()
      return
    }
    if(pwd.trim()===''){
      pwdRef.current.focus()
      return
    }
    axios.post('http://localhost/eboard/insertElastic', null, {
      params:{
        name:name,
        subject:subject,
        content:content,
        pwd:pwd
      }
    }).then(res=>{
      window.location.href='../board/list'
    })
  }
  return (
    <Fragment>
      <div className="breadcumb-area" style={{ backgroundImage: 'url(/img/bg-img/breadcumb.jpg)' }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="bradcumb-title text-center">
                <h2>글쓰기</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: '50px' }}>
        <div className="row">
          <table className="table">
            <tbody>
              <tr>
                <th className="text-center" width={'15%'}>이름</th>
                <td className="text-left" width={'85%'}><input type="text" className="input input-sm" style={{ width: '50%' }} ref={nameRef} onChange={(e)=>setName(e.target.value)}/></td>
              </tr>
              <tr>
                <th className="text-center" width={'15%'}>제목</th>
                <td width={'85%'}><input type="text" className="input input-sm" style={{ width: '100%' }} ref={subjectRef} onChange={(e)=>setSubject(e.target.value)}/></td>
              </tr>
              <tr>
                <th className="text-center" width={'15%'}>내용</th>
                <td width={'85%'}><textarea style={{ resize: 'none', width: '100%', height: '500px' }} ref={contentRef} onChange={(e)=>setContent(e.target.value)}></textarea></td>
              </tr>
              <tr>
                <th className="text-center" width={'15%'}>비밀번호</th>
                <td className="text-left" width={'85%'}><input type="password" className="input input-sm" style={{ width: '50%' }} ref={pwdRef} onChange={(e)=>setPwd(e.target.value)}/></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row d-flex justify-content-end">
          <button className="btn btn-sm btn-info" onClick={()=>boardInsert()}>작성</button>
          <button className="btn btn-sm btn-success" onClick={() => nav(-1)}>취소</button>
        </div>
      </div>
    </Fragment>
  )
}
export default BoardInsert