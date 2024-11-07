import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "../../../node_modules/react-router-dom/dist/index";
import axios from "../../../node_modules/axios/index";

function BoardDetail() {
  const nav = useNavigate()
  const { id } = useParams()
  const [detail, setDetail] = useState({})
  useEffect(() => {
    axios.get('http://localhost/eboard/detailElastic', {
      params: {
        id: id
      }
    }).then(res => {
      setDetail(res.data)
    })
  }, [])
  return (
    <Fragment>
      <div className="breadcumb-area" style={{ backgroundImage: 'url(/img/bg-img/breadcumb.jpg)' }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="bradcumb-title text-center">
                <h2>상세보기</h2>
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
                <th width={'15%'}>번호</th>
                <td width={'35%'}>{detail.id}</td>
                <th width={'10%'}>조회수</th>
                <td width={'35%'}>{detail.hit}</td>
              </tr>
              <tr>
                <th width={'15%'}>이름</th>
                <td width={'35%'}>{detail.name}</td>
                <th width={'10%'}>작성일</th>
                <td width={'35%'}>{detail.regdate}</td>
              </tr>
              <tr>
                <th width={'15%'}>제목</th>
                <td colSpan={3}>{detail.subject}</td>
              </tr>
              <tr>
                <th width={'15%'}>내용</th>
                <td colSpan={3}><pre style={{ background: 'white', whiteSpace: 'pre-wrap', border: 'none', height: '500px' }}>{detail.content}</pre></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row d-flex justify-content-end">
          <button className="btn btn-sm btn-primary">삭제</button>
          <button className="btn btn-sm btn-danger">수정</button>
          <button className="btn btn-sm btn-success" onClick={() => { window.location.href = '../../board/list' }}>목록</button>
        </div>
      </div>
    </Fragment>
  )
}
export default BoardDetail