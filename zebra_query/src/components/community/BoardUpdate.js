import { useRef, useState } from "react"
import { useQuery, useMutation } from "react-query"
import httpCommons from "../../http-commons"
import { useNavigate, useParams } from "../../../node_modules/react-router-dom/dist/index"

function BoardUpdate() {
  const nav = useNavigate()
  const { id } = useParams()
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const subjectRef = useRef(null)
  const contentRef = useRef(null)
  const { isLoading, isError, error, data, refetch: meterialFind } = useQuery(['boardUpdate', id],
    async () => {
      return await httpCommons.get(`/board/updateReact/${id}`)
    },{
      onSuccess:(res)=>{
        setSubject(res.data.subject)
        setContent(res.data.content)
      }
    }
  )
  const update = useMutation(
    async () => {
      await httpCommons.put(`/board/updateOkReact`, {
        id: id,
        subject: subject,
        content: content
      })
    }, {
    onSuccess: (res) => {
      window.location.href = '/board/boardDetail/' + id
    }
  }
  )
  if (isLoading)
    return <h1 className="text-center">데이터 로딩중</h1>
  if (isError)
    return <h1 className="text-center">{error.message}</h1>
  console.log(data)
  let insertBoard = () => {
    if (subject.trim() === '') {
      alert('제목을 입력하세요')
      subjectRef.current.focus()
      return
    }
    if (content.trim() === '') {
      alert('내용을 입력하세요')
      contentRef.current.focus()
      return
    }
    update.mutate()
  }
  return (
    <div className="container">
      <div class="row" id="replyInsertApp" style={{ display: 'block' }}>
        <h3 class="table-title text-center" style={{ marginTop: '20px' }}>게시글 수정</h3>
        <div class="form-group" style={{ marginTop: '10px' }}>
          <label for="title">제목</label>
          <input type="text" class="form-control" placeholder="제목을 입력하세요" onChange={(e) => setSubject(e.target.value)} value={subject} ref={subjectRef} />
        </div>
        <div class="form-group" style={{ marginTop: '10px' }}>
          <label for="content">내용</label>
          <textarea class="form-control" rows="5" style={{ resize: 'none' }} placeholder="내용을 입력하세요" onChange={(e) => setContent(e.target.value)} ref={contentRef}>{data.data.content}</textarea>
        </div>
        <div style={{ marginTop: '50px' }}></div>
        <div class="button-group">
          <button type="button" class="btn btn-primary" onClick={() => insertBoard()}>수정</button>
          <input type="button" class="btn btn-danger" value="취소" onClick={() => nav(-1)} />
        </div>
      </div >
    </div>
  )
}
export default BoardUpdate