import { Fragment, useEffect, useState } from "react"
import { Link } from "../../../node_modules/react-router-dom/dist/index"
import axios from "../../../node_modules/axios/index"

function BoardList() {
  const [list, setList] = useState([])
  const [curPage, setCurPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [count, setCount] = useState(0)
  useEffect(() => {
    axios.get('http://localhost/eboard/listElastic', {
      params:{
        page:curPage
      }
    }).then(res=>{
      setList(res.data.list)
      setCurPage(res.data.curPage)
      setTotalPage(res.data.totalPage)
      setCount(res.data.count)
    })
  }, [curPage])
  let pageChange=(page)=>{
    setCurPage(page)
  }
  return (
    <Fragment>
      <div className="breadcumb-area" style={{ backgroundImage: 'url(/img/bg-img/breadcumb.jpg)' }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="bradcumb-title text-center">
                <h2>자유게시판</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row text-right" style={{ marginTop: '30px' }}>
          <Link to={'/board/insert'} className="btn btn-sm btn-primary">글쓰기</Link>
        </div>
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '7%' }} className="text-center">번호</th>
                <th style={{ width: '50%' }} className="text-center">제목</th>
                <th style={{ width: '15%' }} className="text-center">이름</th>
                <th style={{ width: '21%' }} className="text-center">작성일</th>
                <th style={{ width: '7%' }} className="text-center">조회수</th>
              </tr>
            </thead>
            <tbody>
              {
                list && list.map((vo, index) => {
                  return (
                    <tr>
                      <td style={{ width: '7%' }} className="text-center">{count-(curPage-1)*10-index}</td>
                      <td style={{ width: '50%' }}><Link to={'../board/detail/'+vo.id}>{vo.subject}</Link></td>
                      <td style={{ width: '15%' }} className="text-center">{vo.name}</td>
                      <td style={{ width: '21%' }} className="text-center">{vo.regdate}</td>
                      <td style={{ width: '7%' }} className="text-center">{vo.hit}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <div className="row d-flex justify-content-center" style={{width:'1200px'}}>
          <button className="btn btn-sm btn-primary" onClick={()=>{pageChange(curPage>1?curPage-1:curPage)}}>이전</button>
          {curPage}page/{totalPage}page
          <button className="btn btn-sm btn-primary" onClick={()=>{pageChange(curPage<totalPage?curPage+1:curPage)}}>다음</button>
        </div>
      </div>
    </Fragment>
  )
}
export default BoardList