import { Fragment, useEffect, useState } from "react"
import { Link } from "../../../node_modules/react-router-dom/dist/index"
import { useQuery } from "react-query"
import httpCommons from "../../http-commons"
function MeteriralList() {
  const [curPage, setCurPage] = useState(1)
  const [cart, setCart] = useState([])
  const [fd, setFd]=useState('*')
  const [search, setSearch]=useState('')
  const [cartStr, setCartStr]=useState('')
  const { isLoading, isError, error, data, refetch:meterialFind } = useQuery(['meterialList', curPage, fd],
    async () => {
      return await httpCommons.get(`/recipe/meterialList/${curPage}/${fd}`)
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
  let addCart = (vo) => {
    setCart((prevCart) => {
      const exists = prevCart.some(item => item.mno === vo.mno)
      if (exists) {
        return prevCart
      }
      const updatedCart = [...prevCart, vo]
      setCartStr(updatedCart.map(item => item.mno).join(','))
      console.log(cartStr)
      return updatedCart
    })
  }
  let removeCart = (index) => {
    const updateCart=(prevCart) => prevCart.filter((_, i) => i !== index)
    setCart(prevCart => {
      const newCart = updateCart(prevCart)
      setCartStr(newCart.map(item => item.mno).join(','))
      return newCart
    })
  }
  let metFind=()=>{
    meterialFind()
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
                  cart && cart.map((item, index) => {
                    return (
                      <div className="col-sm-6 product__item">
                        <div className="product__item__pic set-bg cart_item" style={{ height: '116px' }}>
                          <img src={item.poster} style={{ borderRadius: '20%' , width:'116px', height:'116px'}} />
                          <ul class="product__item__pic__hover">
                            <li onClick={() => removeCart(index)} ><i class="fa-solid fa-x"></i></li>
                          </ul>
                        </div>
                      </div>
                    )
                  })
                }
                {
                  cart.length > 0 ? (
                    <Fragment>
                      <div className="text-center" style={{ margin: 'auto', width: '100%' }}>
                        <button className="btn" onClick={() => setCart([])}>비우기</button>
                        <Link to={'/recipe/make/'+cartStr} className="btn">레시피 찾기</Link>
                      </div>
                    </Fragment>
                  ) : ''
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
                    <h6><span>{data.data.count}</span> Products found</h6>
                  </div>
                </div>
                <div className="col-lg-4">
                  <input type="text" placeholder="검색" onKeyUp={(e)=>{
                    if(e.key==='Enter'){
                      if(search.trim()===''){
                        setFd('*')
                      }
                      else{
                        setFd(search)
                      }
                    }
                    else{
                      setSearch(e.target.value)
                    }
                  }}/>
                  <button style={{background:'none', border:'none'}}><i class="fa fa-search" aria-hidden="true"></i></button>
                </div>
              </div>
            </div>
            <div className="row">
              {
                data.data.list && data.data.list.map((vo) => {
                  return (
                    <div className="col-lg-4 col-md-6 col-sm-6" key={vo.mno}>
                      <div className="product__item">
                        <div className="product__item__pic set-bg" style={{height:"220px"}}>
                          <Link to={"/recipe/meterialDetail/" + vo.mno}><img src={vo.poster} style={{ width: '260px', height: '200px' }} /></Link>
                          <ul class="product__item__pic__hover">
                            <li onClick={() => addCart(vo)}><i class="fa fa-plus"></i></li>
                          </ul>
                        </div>
                        <div className="product__item__text">
                          <h5><Link to={"/recipe/meterialDetail/" + vo.mno}>{vo.name}</Link></h5>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
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
          </div>
        </div>
      </div>
    </section>
  )
}
export default MeteriralList