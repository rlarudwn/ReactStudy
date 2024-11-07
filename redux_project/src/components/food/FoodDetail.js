/* global kakao */
import { Fragment, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "../../../node_modules/react-router-dom/dist/index"
import { useSelector, useDispatch } from "../../../node_modules/react-redux/dist/react-redux"
import { fetchFoodDetail } from "../../actions/foodAction"

function FoodDetail() {
  const nav = useNavigate
  const { fno } = useParams()
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchFoodDetail(fno))
  }, [])
  const detail=useSelector((state)=>state.foods.food_main_list)
  return (
    <Fragment>
      <div className="breadcumb-area" style={{ backgroundImage: 'url(/img/bg-img/breadcumb.jpg)' }}>
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="bradcumb-title text-center">
                <h2>맛집 상세보기</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="breadcumb-nav">
        <div className="container">
          <div className="row">
            <div className="col-12">

            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="row no-gutters">
              <div className="col-12 col-sm-12">
                <div className="related-post-area section_padding_50">
                  <div className="related-post-slider owl-carousel">
                    <div className="single-post">
                      <div className="post-thumb">
                        <img src={"http://www.menupan.com" + detail.poster} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <table className="table">
                  <tr>
                    <td width="30%" className="text-center" rowSpan="6">
                      <img src={"http://www.menupan.com" + detail.poster} style={{ width: "100%" }} />
                    </td>
                    <td colSpan="2">
                      <h3>{detail.name}&nbsp;<span style={{ color: "orange;" }}>{detail.score}</span></h3>
                    </td>
                  </tr>
                  <tr>
                    <td width={'15%'} className="text-center">주소</td>
                    <td width={"55%"}>{detail.address}</td>
                  </tr>
                  <tr>
                    <td width={'15%'} className="text-center">전화</td>
                    <td width={"55%"}>{detail.phone}</td>
                  </tr>
                  <tr>
                    <td width={'15%'} className="text-center">음식종류</td>
                    <td width={"55%"}>{detail.type}</td>
                  </tr>
                  <tr>
                    <td width={'15%'} className="text-center">주차</td>
                    <td width={"55%"}>{detail.parking}</td>
                  </tr>
                  <tr>
                    <td width={'15%'} className="text-center">영업시간</td>
                    <td width={"55%"}>{detail.time}</td>
                  </tr>

                </table>
                <table className="table">
                  <tr>
                    <td>{detail.theme}</td>
                  </tr>
                  <tr>
                    <td>{detail.content}</td>
                  </tr>
                  <tr>
                    <td className="text-right">
                      <a href="#" className="btn btn-xs btn-danger">좋아요</a>
                      <a href="#" className="btn btn-xs btn-success">찜하기</a>
                      <a href="../reserve/reserve_main.do" className="btn btn-xs btn-info">예약</a>
                      <a href="../../food/list" className="btn btn-xs btn-warning">목록</a>
                    </td>
                  </tr>
                </table>
              </div>
              <Link to={'/food/list'} className="btn btn-sm btn-danger">목록</Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment >
  )
}
export default FoodDetail