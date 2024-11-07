import { Link, useParams } from "../../../node_modules/react-router-dom/dist/index"
import { useQuery } from "react-query"
import httpCommons from "../../http-commons"
import { useState } from "react"

function RecipeMake() {
  const { cartStr } = useParams()
  const [curPage, setCurPage] = useState(1)
  const { isLoading, isError, error, data, refetch: meterialFind } = useQuery(['makeList', curPage],
    async () => {
      return await httpCommons.get(`/recipe/makeRecipe/${curPage}/${cartStr}`)
    }
  )
  if (isLoading)
    return <h1 className="text-center">데이터 로딩중</h1>
  if (isError)
    return <h1 className="text-center">{error.message}</h1>
  console.log(data)
  let pageChange = (page) => {
    setCurPage(page)
  }
  let pagination = []
  for (let i = data.data.startPage; i <= data.data.endPage; i++) {
    if (i === curPage) {
      pagination.push(<Link onClick={() => pageChange(i)} className="active">{i}</Link>)
    }
    else {
      pagination.push(<Link onClick={() => pageChange(i)}>{i}</Link>)
    }
  }
  return (
    <section className="product spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-5">
            <h4 className="text-center" style={{ marginBottom: '20px' }}>레시피 찾기</h4>
            <div className="sidebar">
              <div className="row">
                {
                  data.data.mList && data.data.mList.map((item, index) => {
                    return (
                      <div className="col-sm-6 product__item">
                        <div className="product__item__pic set-bg cart_item" style={{ height: '116px' }}>
                          <img src={item.poster} style={{ borderRadius: '20%', width: '116px', height: '116px' }} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-7">
            <div className="filter__item">
              <div className="row">
                <div className="col-lg-4">
                  <div className="filter__sort">
                    <span>Sort By</span>
                    <select>
                      <option value="0">Default</option>
                      <option value="0">Default</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="filter__found">
                    <h6><span>{data.data.count}</span> Recipe found</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {
                data.data.rList.length > 0 ? (
                  data.data.rList && data.data.rList.map((vo) => {
                    return (
                      <div className="col-lg-4 col-md-6 col-sm-6 item_size" key={vo.no}>
                        <div className="product__item">
                          <div className="product__item__pic set-bg" style={{height:'200px'}}>
                            <Link to={"/recipe/recipeDetail/" + vo.no}><img src={vo.poster} style={{ width: '260px', height: '200px' }} /></Link>
                            <ul class="product__item__pic__hover">
                            </ul>
                          </div>
                          <div className="product__item__text">
                            <h5><Link to={"/recipe/recipeDetail/" + vo.no}>{vo.title}</Link></h5>
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) :
                  (<></>)
              }
            </div>
            {data.data.rList.length > 0 && (
              <div className="product__pagination">
                {
                  data.data.startPage && data.data.startPage > 1 &&
                  <Link onClick={() => pageChange(data.data.startPage - 1)}><i className="fa fa-long-arrow-left"></i></Link>
                }
                {
                  pagination
                }
                {
                  data.data.endPage && data.data.endPage < data.data.totalPage &&
                  <Link onClick={() => pageChange(data.data.endPage + 1)}><i className="fa fa-long-arrow-right"></i></Link>
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
export default RecipeMake