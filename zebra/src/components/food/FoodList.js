import { useEffect, useState } from "react"
import axios from "../../../node_modules/axios/index"
import { Link } from "../../../node_modules/react-router-dom/dist/index"

function FoodList() {
  const [list, setList] = useState([])
  const [curPage, setCurPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [startPage, setStartPage] = useState(1)
  const [endPage, setEndPage] = useState(1)
  const [types, setTypes] = useState([])
  const [count, setCount] = useState(0)
  const [option, setOption] = useState('')
  useEffect(() => {
    axios.get('http://localhost/food/listReact', {
      params: {
        page: curPage,
        option: option
      }
    }).then(res => {
      console.log(res.data)
      setList(res.data.list)
      setCurPage(res.data.curPage)
      setTotalPage(res.data.totalPage)
      setStartPage(res.data.startPage)
      setEndPage(res.data.endPage)
      setCount(res.data.count)
      setTypes(res.data.types)
    })
  }, [curPage, count, option])
  let changeOption=(option)=>{
    setOption(option)
    setCurPage(1)
  }
  let deleteGoods = (fno) => {
    axios.get('http://localhost/food/foodDelete', {
      params: {
        fno: fno
      }
    }).then(res => {
      setCount(count - 1)
    })
  }
  let pageChange = (page) => {
    setCurPage(page)
  }
  let pagination = []
  for (let i = startPage; i <= endPage; i++) {
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
            <div className="sidebar">
              <div className="sidebar__item">
                <h4>Department</h4>
                <ul>
                  {
                    types.map((tag) => {
                      return (
                        <li style={{cursor:'pointer'}} onClick={()=>changeOption(tag.type2code)}>{tag.type2name}</li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-7">
            <div className="filter__item">
              <div className="row">
                <div className="col-lg-4 col-md-5">
                  <div className="filter__sort">
                    <span>Sort By</span>
                    <select>
                      <option value="0">Default</option>
                      <option value="0">Default</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4">
                  <div className="filter__found">
                    <h6><span>{count}</span> Products found</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {
                list.map((vo) => {
                  return (
                    <div className="col-lg-4 col-md-6 col-sm-6" key={vo.fno}>
                      <div className="product__item">
                        <div className="product__item__pic set-bg">
                          <Link to={"/food/detail/" + vo.fno}><img src={vo.poster}style={{width:'260px', height:'260px'}}/></Link>
                        </div>
                        <div className="product__item__text">
                          <h5><Link to={"/food/detail/" + vo.fno}>{vo.name}</Link></h5>
                          <h6>{vo.maker}</h6>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className="product__pagination">
              {
                startPage && startPage > 1 &&
                <Link onClick={() => pageChange(startPage - 1)}><i className="fa fa-long-arrow-left"></i></Link>
              }
              {
                pagination
              }
              {
                endPage && endPage < totalPage &&
                <Link onClick={() => pageChange(endPage + 1)}><i className="fa fa-long-arrow-right"></i></Link>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default FoodList