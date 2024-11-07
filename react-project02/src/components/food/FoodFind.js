import { Fragment, useEffect, useState } from "react"
import axios from "../../../node_modules/axios/index"
import { Link } from "../../../node_modules/react-router-dom/dist/index"

function FoodFind() {

  const [list, setList] = useState([])
  const [curPage, setCurPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [endPage, setEndPage] = useState(0)
  const [startPage, setStartPage] = useState(0)
  const [address, setAddress]=useState('')
  useEffect(() => {
    axios.get('http://localhost/food/findReact', {
      params: {
        address:address,
        page: curPage
      }
    }).then(res => {
      setList(res.data.list)
      setCurPage(res.data.curPage)
      setTotalPage(res.data.totalPage)
      setEndPage(res.data.endPage)
      setStartPage(res.data.startPage)
    })
  }, [address, curPage])
  let pageChange=(page)=>{
    setCurPage(page)
  }
  let findAddress=(address)=>{
    setAddress(address)
  }
  let arr = []
  for (let i = startPage; i <= endPage; i++) {
    if (i === curPage) {
      arr.push(<li className="page-item active">
        <button className="page-link" onClick={()=>pageChange(i)}>{i}</button>
      </li>)
    }
    else {
      arr.push(<li className="page-item">
        <button className="page-link" onClick={()=>pageChange(i)}>{i}</button>
      </li>)
    }
  }
  return (
    <Fragment>
      <div className="container">
          <input type="text" id="address" onKeyUp={(event)=>{
            if(event.key==='Enter')
              findAddress(document.getElementById('address').value)}
          }/>
          <button type="button" className="btn btn-sm btn-primary" onClick={()=>findAddress(document.getElementById('address').value)}>검색</button>
        <div className="row">
          {list.map((vo) => {
            return (
              <div className="col-12 col-md-6 col-lg-3">
                <div className="single-post wow fadeInUp" data-wow-delay="0.1s">
                  <div className="post-thumb">
                  <Link to={'../food/detail/'+vo.fno}><img src={"https:www.menupan.com" + vo.poster} /></Link>
                  </div>
                  <div className="post-content">
                    <div className="post-meta d-flex">
                      <div className="post-author-date-area d-flex">
                        <div className="post-author">
                          <Link to="#">{vo.type}</Link>
                        </div>
                        <div className="post-date">
                          <Link to="#" style={{ color: 'orange' }}>{vo.score}</Link>
                        </div>
                      </div>
                      <div className="post-comment-share-area d-flex">
                        <div className="post-favourite">
                          <Link to="#"><i className="fa fa-heart-o" aria-hidden="true"></i> {vo.hit}</Link>
                        </div>
                        <div className="post-comments">
                          <Link to="#"><i className="fa fa-comment-o" aria-hidden="true"></i> {vo.replycount}</Link>
                        </div>
                        <div className="post-share">
                          <Link to="#"><i className="fa fa-share-alt" aria-hidden="true"></i></Link>
                        </div>
                      </div>
                    </div>
                    <Link>
                      <h4 className="post-headline"><Link to={'../food/detail/'+vo.fno}>{vo.name}</Link></h4>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
          <div className="col-12">
            <div className="pagination-area d-sm-flex mt-15">
              <nav aria-label="#">
                <ul className="pagination">
                  {
                    startPage && startPage > 1 &&
                    <li className="page-item">
                      <button className="page-link" onClick={()=>pageChange(startPage-1)}><i className="fa fa-angle-double-left" aria-hidden="true"></i> 이전</button>
                    </li>
                  }
                  {
                    arr
                  }
                  {
                    endPage && endPage < totalPage &&
                    <li className="page-item">
                      <button className="page-link" onClick={()=>pageChange(endPage+1)}>다음 <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                    </li>
                  }
                </ul>
              </nav >
              <div className="page-status">
                <p>{curPage} page / {totalPage} pages</p>
              </div>
            </div >
          </div >
        </div >
      </div >
    </Fragment >
  )
}
export default FoodFind