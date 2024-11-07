import { Fragment, useState } from "react"
import { Link } from "../../../node_modules/react-router-dom/dist/index"
import { useQuery } from "react-query"
import httpCommons from "../../http-commons"
function RecipeList() {
  const [option, setOption] = useState('*')
  const [info1, setInfo1] = useState('*')
  const [info2, setInfo2] = useState('*')
  const [info3, setInfo3] = useState('*')
  const [curPage, setCurPage] = useState(1)
  const [fd, setFd] = useState('*')
  const [search, setSearch] = useState('')
  const { isLoading, isError, error, data } = useQuery(['recipeList', curPage, option, info1, info2, info3, fd],
    async () => {
      return await httpCommons.get(`/recipe/recipeList/${curPage}/${option}/${info1}/${info2}/${info3}/${fd}`)
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
  let changeInfo1 = (info) => {
    setCurPage(1)
    if (info1 !== info) {
      setInfo1(info)
    }
    else {
      setInfo1('*')
    }
  }
  let changeInfo2 = (info) => {
    setCurPage(1)
    if (info2 !== info) {
      setInfo2(info)
    }
    else {
      setInfo2('*')
    }
  }
  let changeInfo3 = (info) => {
    setCurPage(1)
    if (info3 !== info) {
      setInfo3(info)
    }
    else {
      setInfo3('*')
    }
  }
  let changeOption = (options) => {
    setCurPage(1)
    if (option !== options) {
      setOption(options)
    }
    else {
      setOption('*')
    }
  }
  let reset = () => {
    setOption('*')
    setInfo1('*')
    setInfo2('*')
    setInfo3('*')
    setFd('*')
  }
  return (
    <Fragment>
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-5">
                <h4 className="text-center" >레시피 찾기</h4>
                <span className="btn text-center" style={{marginLeft:'90%', padding:'0px'}} onClick={() => reset()}><i class="fa fa-refresh" aria-hidden="true"></i></span>
              <div className="sidebar">
                <h5 style={{ fontWeight: 'bold', marginBottom: '10px' }} className="text-center">타입별</h5>
                <div className="row" style={{ marginBottom: '15px' }}>
                  <div className="col-sm-6 text-center">
                    <span style={{ cursor: 'pointer', color: option === '*' ? 'brown' : 'black' }} onClick={() => changeOption('*')}>전체</span>
                  </div>
                  {
                    data.data.types && data.data.types.map((tag) => {
                      return (
                        <div className="col-sm-6 text-center">
                          <span style={{ cursor: 'pointer', color: option === tag.replace(/\//g, ",") ? 'brown' : 'black' }} onClick={() => changeOption(tag.replace(/\//g, ","))}>{tag}</span>
                        </div>
                      )
                    })
                  }
                </div>
                <h5 style={{ fontWeight: 'bold', marginBottom: '10px' }} className="text-center">인원별</h5>
                <div className="row" style={{ marginBottom: '15px' }}>
                  <div className="col-sm-6 text-center">
                    <span style={{ cursor: 'pointer', color: info1 === '*' ? 'brown' : 'black' }} onClick={() => changeInfo1('*')}>전체</span>
                  </div>
                  {
                    data.data.info1List && data.data.info1List.map((tag) => {
                      return (
                        <div className="col-sm-6 text-center">
                          <span style={{ cursor: 'pointer', color: info1 === tag ? 'brown' : 'black' }} onClick={() => changeInfo1(tag)}>{tag}</span>
                        </div>
                      )
                    })
                  }
                </div>
                <h5 style={{ fontWeight: 'bold', marginBottom: '10px' }} className="text-center">시간별</h5>
                <div className="row" style={{ marginBottom: '15px' }}>
                  <div className="col-sm-6 text-center">
                    <span style={{ cursor: 'pointer', color: info2 === '*' ? 'brown' : 'black' }} onClick={() => changeInfo2('*')}>전체</span>
                  </div>
                  {
                    data.data.info2List && data.data.info2List.map((tag) => {
                      return (
                        <div className="col-sm-6 text-center">
                          <span style={{ cursor: 'pointer', color: info2 === tag ? 'brown' : 'black' }} onClick={() => changeInfo2(tag)}>{tag}</span>
                        </div>
                      )
                    })
                  }
                </div>
                <h5 style={{ fontWeight: 'bold', marginBottom: '10px' }} className="text-center">난이도</h5>
                <div className="row" style={{ marginBottom: '15px' }}>
                  <div className="col-sm-6 text-center">
                    <span style={{ cursor: 'pointer', color: info3 === '*' ? 'brown' : 'black' }} onClick={() => changeInfo3('*')}>전체</span>
                  </div>
                  {
                    data.data.info3List && data.data.info3List.map((tag) => {
                      return (
                        <div className="col-sm-6 text-center">
                          <span style={{ cursor: 'pointer', color: info3 === tag ? 'brown' : 'black' }} onClick={() => changeInfo3(tag.replace(/\//g, ","))}>{tag}</span>
                        </div>
                      )
                    })
                  }
                </div>
                <div className="row text-center">

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
                    <input type="text" placeholder="검색" onKeyUp={(e) => {
                      if (e.key === 'Enter') {
                        if (search.trim() === '') {
                          setFd('*')
                        }
                        else {
                          setFd(search)
                        }
                      }
                      else {
                        setSearch(e.target.value)
                      }
                    }} />
                    <button style={{ background: 'none', border: 'none' }}><i class="fa fa-search" aria-hidden="true"></i></button>
                  </div>
                </div>
              </div>
              {
                data.data.list.length > 0 ? (
                  <div className="row">
                    {
                      data.data.list && data.data.list.map((vo) => {
                        return (
                          <div className="col-lg-4 col-md-6 col-sm-6" key={vo.no} style={{ height: '360px' }}>
                            <div className="product__item">
                              <div className="product__item__pic set-bg">
                                <Link to={"/recipe/recipeDetail/" + vo.no}><img src={vo.poster} style={{ width: '260px', height: '260px' }} /></Link>
                                <ul class="product__item__pic__hover">
                                  <li><i class="fa fa-plus"></i></li>
                                </ul>
                              </div>
                              <div className="product__item__text">
                                <span style={{ fontWeight: 'bold' }}><Link to={"/recipe/recipeDetail/" + vo.no}>{vo.title}</Link></span><br />
                                <span style={{ fontWeight: 'bold' }}>{vo.chef}</span>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                ) : (
                  <div className="text-center">
                    <span style={{ textAlign: 'center' }}>목록이 존재하지 않습니다</span>
                  </div>
                )
              }
              {data.data.list.length > 0 && (
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
    </Fragment>
  )
}
export default RecipeList