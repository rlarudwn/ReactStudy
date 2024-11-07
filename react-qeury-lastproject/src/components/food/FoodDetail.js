/* global kakao */
import { Fragment, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "../../../node_modules/react-router-dom/dist/index"
import { useQuery } from "react-query"
import httpCommons from "../../http-commons"
import { Map, MapMarker } from "react-kakao-maps-sdk"
const MapLocation = (props) => {
  const [state, setState] = useState({
    // 위도 / 경도
    center: { lat: null, lng: null },
    isShow: true // 지도를 이동할때 부드럽게 출력
  })
  useEffect(() => {
    // 일반 주소를 위도.경도를 출력
    const geocoder = new kakao.maps.services.Geocoder();
    // 주소 입력 => 좌표 변환
    let callback = function (result, status) {
      if (status == kakao.maps.services.Status.OK) {
        // 변환이 가능한 주소가 들어 온 경우
        const newSearch = result[0];
        setState({
          center: { lat: newSearch.y, lng: newSearch.x }
        })
      }
    }
    geocoder.addressSearch(`${props.address}`, callback)
    // 주소를 위도/경도를 찾아주는 역할
  }, []);
  return (
    <div>
      <Map center={state.center}
        isPanto={state.isShow}
        style={{
          width: "600px",
          height: "500px",
          borderRadius: '20px'
        }}
      >
        <MapMarker position={state.center}
          style={{ border: 'transparent' }}
        >
          <div
            style={{
              color: 'gray',
              fontSize: '19px',
              fontWeight: '700',
              border: '4px solid gray',
              borderRadius: '10px',
              padding: '2px'
            }}
          >
            {props.name}
          </div>
        </MapMarker>
      </Map>
    </div>
  )
}

function FoodDetail() {
  const nav = useNavigate
  const { fno } = useParams()
  const { isLoading, isError, error, data } = useQuery(['foodDetail', fno],
    async () => {
      return await httpCommons.get(`/food/detail/${fno}`)
    }
  )
  if (isLoading)
    return <h1 className="text-center">데이터 로딩중</h1>
  if (isError)
    return <h1 className="text-center">{error}</h1>
  console.log(data)
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
                        <img src={"http://www.menupan.com" + data.data.poster} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <table className="table">
                  <tr>
                    <td width="30%" className="text-center" rowSpan="6">
                      <img src={"http://www.menupan.com" + data.data.poster} style={{ width: "100%" }} />
                    </td>
                    <td colSpan="2">
                      <h3>{data.data.name}&nbsp;<span style={{ color: "orange;" }}>{data.data.score}</span></h3>
                    </td>
                  </tr>
                  <tr>
                    <td width={'15%'} className="text-center">주소</td>
                    <td width={"55%"}>{data.data.address}</td>
                  </tr>
                  <tr>
                    <td width={'15%'} className="text-center">전화</td>
                    <td width={"55%"}>{data.data.phone}</td>
                  </tr>
                  <tr>
                    <td width={'15%'} className="text-center">음식종류</td>
                    <td width={"55%"}>{data.data.type}</td>
                  </tr>
                  <tr>
                    <td width={'15%'} className="text-center">주차</td>
                    <td width={"55%"}>{data.data.parking}</td>
                  </tr>
                  <tr>
                    <td width={'15%'} className="text-center">영업시간</td>
                    <td width={"55%"}>{data.data.time}</td>
                  </tr>

                </table>
                <table className="table">
                  <tr>
                    <td>{data.data.theme}</td>
                  </tr>
                  <tr>
                    <td>{data.data.content}</td>
                  </tr>
                  <tr>
                    <td className="text-right">
                      <a href="#" className="btn btn-xs btn-danger">좋아요</a>
                      <a href="#" className="btn btn-xs btn-success">찜하기</a>
                      <a href="../reserve/reserve_main.do" className="btn btn-xs btn-info">예약</a>
                      <a href="../food/list.do" className="btn btn-xs btn-warning">목록</a>
                    </td>
                  </tr>
                </table>
              </div>
              <Link to={'../food/list'} className="btn btn-sm btn-danger" onClick={() => nav(-1)}>목록</Link>
            </div>
          </div>
        </div>
        <div>
          <MapLocation address={data.data.address} name={data.data.name} />
        </div>
      </div>
    </Fragment >
  )
}
export default FoodDetail