import { Fragment, useState } from "react"
import { Link } from "../../../node_modules/react-router-dom/dist/index"
import { useQuery } from "react-query"
import httpCommons from "../../http-commons"
function BoardList() {
  const [curPage, setCurPage] = useState(1)
  const { isLoading, isError, error, data } = useQuery(['boardList', curPage],
    async () => {
      return await httpCommons.get(`/board/listReact/${curPage}`)
    }
  )
  if (isLoading)
    return <h1 className="text-center">데이터 로딩중</h1>
  if (isError)
    return <h1 className="text-center">{error.message}</h1>
  console.log(data)
  return (
    <Fragment>
      <div className="container" style={{ marginTop: '50px' }} id="replyList">
        <h3 className="text-center">자유게시판</h3>
        <div className="row" style={{ marginTop: '10px' }}>
          {
            window.sessionStorage.getItem('id') === null ? (<></>) : (
              <div>
                <Link to="/board/boardInsert" className="btn btn-sm" style={{ backgroundColor: '#FCD500' }}>글쓰기</Link>
              </div>)
          }
          <table className="table table-hover" style={{ marginTop: '10px' }}>
            <tr>
              <th width={'10%'} className="text-center">번호</th>
              <th width={'35%'} className="text-center">제목</th>
              <th width={'15%'} className="text-center">작성자</th>
              <th width={'15%'} className="text-center">작성일</th>
              <th width={'10%'} className="text-center"> 조회수</th>
            </tr >
            {
              data.data.list && data.data.list.map((vo, index) => {
                return (
                  <tr>
                    <td width={'10%'} className="text-center">{data.data.count - index}</td>
                    <td width={'35%'}>
                      <Link to={'/board/boardDetail/'+vo.id}>{vo.subject}
                      </Link>
                    </td >
                    <td width={'15%'} className="text-center" > {vo.nickname}
                    </td >
                    <td width={'15%'} className="text-center" > {vo.regdate}</td >
                    <td width={'10%'} className="text-center" > {vo.hit}</td >
                  </tr>
                )
              })
            }

          </table>
          <div className="text-center" style={{ marginTop: '50px', marginLeft: 'auto', marginRight: 'auto' }}>
            <input type="button" className="btn btn-sm btn-primary" value="이전" />
            {data.data.curPage} page / {data.data.curPage} page
            <input type="button" className="btn btn-sm btn-primary" value="다음" />
          </div>
        </div>
      </div>
    </Fragment >
  )
}
export default BoardList