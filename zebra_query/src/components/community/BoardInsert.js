import { useRef, useState } from "react"
import { useMutation } from "react-query"
import httpCommons from "../../http-commons"
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index"

function BoardInsert() {
  const nav = useNavigate()
  const [sessionId, setSessionId] = useState(window.sessionStorage.id || '')
  const [sessionNickname, setSessionNickname] = useState(window.sessionStorage.nickname || '')
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const subjectRef = useRef(null)
  const contentRef = useRef(null)
  const insert = useMutation(
    async () => {
      await httpCommons.post(`/board/insertReact`, {
        userid: sessionId,
        nickname: sessionNickname,
        subject: subject,
        content: content
      })
    }, {
    onSuccess: (res) => {
      window.location.href = '/board/boardList'
    }
  }
  )

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
    insert.mutate()
  }
  return (
    <div className="container">
      <div class="row" id="replyInsertApp" style={{ display: 'block' }}>
        <h3 class="table-title text-center" style={{ marginTop: '20px' }}>게시글 작성</h3>
        <div class="form-group" style={{ marginTop: '10px' }}>
          <label for="title">제목</label>
          <input type="text" class="form-control" placeholder="제목을 입력하세요" onChange={(e) => setSubject(e.target.value)} ref={subjectRef} />
        </div>
        <div class="form-group" style={{ marginTop: '10px' }}>
          <label for="content">내용</label>
          <textarea class="form-control" rows="5" style={{ resize: 'none' }} placeholder="내용을 입력하세요" onChange={(e) => setContent(e.target.value)} ref={contentRef}></textarea>
        </div>
        <div style={{ marginTop: '50px' }}></div>
        <div class="button-group">
          <button type="button" class="btn btn-primary" onClick={() => insertBoard()}>등록</button>
          <input type="button" class="btn btn-danger" value="취소" onClick={() => nav(-1)} />
        </div>
      </div >
    </div>
  )
}
export default BoardInsert