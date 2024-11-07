import { useQuery, useMutation } from "react-query"
import httpCommons from "../../http-commons"
import { Link, useParams } from "../../../node_modules/react-router-dom/dist/index"
import { useState } from "react"
function BoardDetail(){
  const {id}=useParams()
  const [first, setFirst] = useState(true)
  const { isLoading, isError, error, data, refetch } = useQuery(['boardDetail', id],
    async () => {
      return await httpCommons.get(`/board/detailReact/${id}`)
    }, {
    onSuccess: (data) => {
      if (first) {
        hitIncrement.mutate()
      }
    }
  }
  )
  const hitIncrement = useMutation(
    async () => {
      setFirst(false)
      await httpCommons.get(`/board/hitIncrement/${id}`)
      refetch()
    }
  )
  const deleteBoard=useMutation(
    async()=>{
      await httpCommons.delete(`/board/deleteReact/${id}`)
    },{
      onSuccess:(res)=>{
        window.location.href="/board/boardList"
      }
    }
  )
  let delBoard=()=>{
    deleteBoard.mutate()
  }
  if (isLoading)
    return <h1 className="text-center">데이터 로딩중</h1>
  if (isError)
    return <h1 className="text-center">{error.message}</h1>
  console.log(data)
  return(
    <div id="replyDetail" style={{marginTop: "50px"}}>
        <div className="detail-box">
            <h2 className="post-title">{data.data.subject}</h2>
            <div className="post-meta">
                <span className="author-name">{data.data.nickname}</span>
                <span className="meta-separator">|</span>
                <span className="post-date">{data.data.regdate}</span>
                <span className="meta-separator">|</span>
                <span className="view-count"><i className="fas fa-eye"></i>&nbsp;{data.data.hit}</span>
            </div>
            <div className="content-box">{data.data.content}</div>
            <div className="button-group">
                <Link to={'/board/boardUpdate/'+data.data.id} className="btn btn-primary">수정</Link>
                <button type="button" className="btn btn-danger" onClick={delBoard}>삭제</button>
                <Link to="/board/boardList" className="btn btn-secondary" onClick="javascript:history.back()">목록</Link>
            </div>
        </div>
    </div>
  )
}
export default BoardDetail