import { Fragment, useState } from "react"
import { useQuery } from "react-query"
import httpCommons from "../../http-commons"
import { Link } from "../../../node_modules/react-router-dom/dist/index"
function FoodFind() {
  const [curPage, setCurPage] = useState(1)
  const [address, setAddress] = useState('망원')
  const { isLoading, isError, error, data, refetch:foodFindData } = useQuery(['foodFind', curPage],
    async () => {
      return await httpCommons.get(`/food/find/${curPage}/${address}`)
    }
  )
  if (isLoading)
    return <h1 className="text-center">데이터 로딩중</h1>
  if (isError)
    return <h1 className="text-center">{error}</h1>
  console.log(data)
  let arr = []
  for (let i = data.data.startPage; i <= data.data.endPage; i++)
    arr.push(
      <li className={curPage === i ? 'active page-item' : 'page-item'}>
        <button className="page-link" onClick={() => pageChange(i)}>{i}</button>
      </li>
    )
  let pageChange = (page) => {
    setCurPage(page)
  }
  let findAddress=()=>{
    foodFindData()
  }
  return (
    <Fragment>
      <div className="breadcumb-area" style={{ backgroundImage: 'url(/img/bg-img/breadcumb.jpg)' }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="bradcumb-title text-center">
                <h2>맛집 검색</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav aria-label="breadcrumb">
              <div style={{height:'20px'}}></div>
              <input type="text" onChange={(e)=>setAddress(e.target.value)}/>
              <button className="btn" onClick={()=>findAddress()}>검색</button>
            </nav>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {data.data.list && data.data.list.map((vo) => {
            return (
              <div className="col-12 col-md-6 col-lg-3">
                <div className="single-post wow fadeInUp" data-wow-delay="0.1s">
                  <div className="post-thumb">
                    <Link to={'../food/detail/' + vo.fno}><img src={"https:www.menupan.com" + vo.poster} /></Link>
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
                      <h4 className="post-headline"><Link to={'../food/detail/' + vo.fno}>{vo.name}</Link></h4>
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
                    data.data.startPage && data.data.startPage > 1 &&
                    <li className="page-item">
                      <button className="page-link" onClick={() => pageChange(data.data.startPage - 1)}><i className="fa fa-angle-double-left" aria-hidden="true"></i> 이전</button>
                    </li>
                  }
                  {
                    data.data && arr
                  }
                  {
                    data.data.endPage && data.data.endPage < data.data.totalPage &&
                    <li className="page-item">
                      <button className="page-link" onClick={() => pageChange(data.data.endPage + 1)}>다음 <i className="fa fa-angle-double-right" aria-hidden="true"></i></button>
                    </li>
                  }
                </ul>
              </nav >
              <div className="page-status">
                <p>{data.data.curPage} page / {data.data.totalPage} pages</p>
              </div>
            </div >
          </div >
        </div >
      </div >
    </Fragment>
  )
}
export default FoodFind