import { Fragment, useEffect, useRef, useState } from "react"
import { Link, useParams } from "../../../node_modules/react-router-dom/dist/index"
import axios from "../../../node_modules/axios/index"
import { getCookie, setCookie } from "../util/cookie";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function FoodDetail() {
  const msgRef = useRef(null)
  const { fno } = useParams()
  const [isLike, setIsLike] = useState(false)
  const [detail, setDetail] = useState({ price: 0 });
  const [rList, setRList] = useState([])
  const [sessionId, setSessionId] = useState(sessionStorage.id || '')
  const [sessionNickname, setSessionNickname] = useState(sessionStorage.nickname || '')
  const [first, setFirst] = useState(false)
  const [rating, setRating] = useState(0)
  const [msg, setMsg] = useState('')
  useEffect(() => {
    const dataFetch = async () => {
      if (first === false) {
        const increment =
          await axios.get('http://localhost/food/hitIncrement', {
            params: {
              fno: fno
            }
          }).then(res => {
            setFirst(true)
          })
      }
      const data =
        await axios.get('http://localhost/food/detailReact', {
          params: {
            fno: fno,
            id: sessionId
          }
        }).then(res => {
          console.log(res.data)
          setDetail(res.data.detail)
          setIsLike(res.data.count === 1 ? true : false)
          setRList(res.data.rList)
        })
    }
    dataFetch()
  }, [isLike, fno, sessionId])
  setCookie("food_" + fno, detail.poster + "^" + detail.name)
  let likeOn = () => {
    if (sessionId === '') {
      alert('로그인이 필요합니다')
      return
    }
    axios.get('http://localhost/like/insert', {
      params: {
        fno: fno,
        id: sessionId
      }
    }).then(res => {
      setIsLike(true)
    })
  }
  let likeOff = () => {
    axios.get('http://localhost/like/delete', {
      params: {
        fno: fno,
        id: sessionId
      }
    }).then(res => {
      setIsLike(false)
    })
  }
  let selRating = (rate) => {
    setRating(rate)
  }
  let arr = []
  for (let i = 1; i <= 5; i++) {
    arr.push(<i onClick={() => setRating(i)} className={"fa-solid fa-star"} style={{ color: i <= rating ? 'goldenrod' : '' }}></i>)
  }
  let reviewInsert = () => {
    axios.post('http://localhost/review/insert', null, {
      params: {
        fno: fno,
        nickname: sessionNickname,
        id: sessionId,
        content: msg,
        score: rating / 1.0
      }
    })
  }
  return (
    <Fragment>
      <section class="product-details spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-6">
              <div class="product__details__pic">
                <div class="product__details__pic__item">
                  <img class="product__details__pic__item--large" src={detail.poster} style={{ width: '100%', height: '550px' }} alt="" />
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6">
              <div class="product__details__text">
                <h3>{detail.name}</h3>
                <div class="product__details__price">{detail.price.toLocaleString() + '원'}</div>
                <div class="product__details">
                  <i class="fa-solid fa-eye">&nbsp;{detail.hit}&nbsp;</i>
                  <i class="fa-solid fa-heart">&nbsp;{detail.likecount}</i>
                </div>
                <ul style={{ textAlign: 'left' }}>
                  <li><b>분류</b> <span>{detail.type2name}</span></li>
                  <li><b>칼로리</b> <span>{detail.kcal} kcal</span></li>
                  <li><b>무게</b> <span>{detail.weight}</span></li>
                </ul>
                <div style={{ marginTop: '150px' }}>
                  <div class="product__details__quantity">
                    <div class="quantity">
                      <div class="pro-qty">
                        <input type="text" value="1" />
                      </div>
                    </div>
                  </div>
                  <a href="#" class="primary-btn">ADD TO CARD</a>

                  {
                    isLike ? (<button class="heart-icon" onClick={() => likeOff()}><i class="fa-solid fa-heart"></i></button>) : (<button class="heart-icon" onClick={() => likeOn()}><i class="fa-regular fa-heart"></i></button>)
                  }
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="product__details__tab">
                <ul class="nav nav-tabs" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab"
                      aria-selected="true">More Info</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab"
                      aria-selected="false">Review</a>
                  </li>
                </ul>
                <div class="tab-content">
                  <div class="tab-pane active" id="tabs-1" role="tabpanel">
                    <div class="product__details__tab__desc">
                      <h6>More Info</h6>
                      <table className="table">
                        <tbody>
                          <tr>
                            <th className="text-center" colSpan={2}>제조사</th>
                            <th className="text-center" colSpan={2}>유통사</th>
                            <th className="text-center" colSpan={2}>판매사</th>
                          </tr>
                          <tr>
                            <td className="text-center" colSpan={2}>{detail.maker}</td>
                            <td className="text-center" colSpan={2}>{detail.importer}</td>
                            <td className="text-center" colSpan={2}>{detail.distributor}</td>
                          </tr>
                          <tr>
                            <th className="text-center" width="16.66%">칼로리</th>
                            <th className="text-center" width="16.66%">단백질</th>
                            <th className="text-center" width="16.66%">지방</th>
                            <th className="text-center" width="16.66%">탄수화물</th>
                            <th className="text-center" width="16.66%">당</th>
                            <th className="text-center" width="16.66%">식이섬유</th>
                          </tr>
                          <tr>
                            <td className="text-center" width="16.66%">{detail.kcal}</td>
                            <td className="text-center" width="16.66%">{detail.protein}</td>
                            <td className="text-center" width="16.66%">{detail.fat}</td>
                            <td className="text-center" width="16.66%">{detail.carbon}</td>
                            <td className="text-center" width="16.66%">{detail.sugar}</td>
                            <td className="text-center" width="16.66%">{detail.dietaryfiber}</td>
                          </tr>
                          <tr>
                            <th className="text-center">칼슘</th>
                            <th className="text-center">철분</th>
                            <th className="text-center">인산</th>
                            <th className="text-center">철분</th>
                            <th className="text-center">나트륨</th>
                            <th className="text-center">콜레스테롤</th>
                          </tr>
                          <tr>
                            <td className="text-center" width="16.66%">{detail.ca}</td>
                            <td className="text-center" width="16.66%">{detail.fe}</td>
                            <td className="text-center" width="16.66%">{detail.p}</td>
                            <td className="text-center" width="16.66%">{detail.k}</td>
                            <td className="text-center" width="16.66%">{detail.na}</td>
                            <td className="text-center" width="16.66%">{detail.cholesterol}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="tab-pane" id="tabs-2" role="tabpanel">
                    <div class="product__details__tab__desc">
                      <h6>Review</h6>
                      <div className="row">
                        <table className="table">
                          <tr>
                            <td>
                              {
                                sessionId !== '' ? (<div>
                                  <div class="product__details__rating" style={{ textAlign: 'left' }}>
                                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{sessionNickname}&nbsp;</span>
                                    {arr}
                                    <table style={{ width: '100%', height: '100px' }}>
                                      <tbody>
                                        <tr>
                                          <td width={'90%'}>
                                            <textarea style={{ width: '100%', resize: 'none', height: '100px' }} ref={msgRef} onChange={(e) => setMsg(e.target.value)}></textarea>
                                          </td>
                                          <td width={'10%'}>
                                            <button type="button" className="btn primary-btn" style={{ width: '100%', height: '100px' }}>작성</button>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>) : (<div>
                                  로그인 후 작성 가능합니다
                                </div>)
                              }
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="related-product">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-title related__product__title">
                <h2>Related Product</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              loop={true}
              spaceBetween={50}
              slidesPerView={5}
              navigation
              autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
              {
                rList && rList.map((item, index) => {
                  return (
                    <SwiperSlide>
                      <div className="categories__item set-bg">
                        <button type="button" style={{ border: 'none', background: 'transparents' }} onClick={() => {
                          window.location.href = "../../food/detail/" + item.fno
                        }}>
                          <img src={item.poster} style={{ height: '70%', width: '80%', margin: 'auto' }} />
                          <h5 className="text-center">{item.name}</h5>
                        </button>
                      </div>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
          </div>
        </div>
      </section>
    </Fragment>
  )
}
export default FoodDetail