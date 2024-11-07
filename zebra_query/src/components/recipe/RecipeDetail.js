import { Link, useParams } from "../../../node_modules/react-router-dom/dist/index"
import { useQuery, useMutation } from "react-query"
import httpCommons from "../../http-commons"
import { Fragment, useCallback, useRef, useState } from "react"
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Review from "./Review";
function RecipeDetail() {
  const [msg, setMsg] = useState('')
  const [rating, setRating] = useState(1)
  const { no } = useParams()
  const [sessionId, setSessionId] = useState(sessionStorage.id || '')
  const [sessionNickname, setSessionNickname] = useState(sessionStorage.nickname || '')
  const [first, setFirst] = useState(true)
  const { isLoading, isError, error, data, refetch } = useQuery(['recipeDetail', no],
    async () => {
      return await httpCommons.get(`/recipe/recipeDetail/${no}/${sessionId === '' ? '*' : sessionId}`)
    }, {
    onSuccess: (data) => {
      if (first) {
        hitIncrement.mutate()
      }
    }
  }
  )
  const ratingChange = useCallback((rate) => {
    setRating(rate)
  }, [])
  const msgInsert = useCallback((msg) => {
    setMsg(msg)
  }, [])
  const submitReview = useCallback(() => {
    if (msg.trim() === '') {
      alert('리뷰 내용을 입력하세요')
      return
    }
    rInsert.mutate()
    refetch()
  })
  const deleteReview=useCallback((rno)=>{
    rDelete.mutate(rno)
    refetch()
  })
  const rDelete=useMutation(
    async (rno)=>{
      await httpCommons.delete(`review/deleteReact/${rno}`)
    },{
      onSuccess:()=>{
        refetch()
      }
    }
  )
  const rInsert = useMutation(
    async () => {
      await httpCommons.post(`/review/insertReact`, {
        id: sessionId,
        nickname: sessionNickname,
        no: no,
        content: msg,
        rating: rating
      })
    }, {
    onSuccess: () => {
      refetch()
    }
  }
  )
  const hitIncrement = useMutation(
    async () => {
      setFirst(false)
      await httpCommons.get(`/recipe/hitIncrement/${no}`)
      refetch()
    }
  )
  if (isLoading)
    return <h1 className="text-center">데이터 로딩중</h1>
  if (isError)
    return <h1 className="text-center">{error.message}</h1>
  console.log(data)

  return (
    <Fragment>
      <section className="product-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="product__details__pic">
                <div className="product__details__pic__item">
                  <img className="product__details__pic__item--large"
                    src={data.data.detail.poster} alt="" />
                </div>
                <div className="product__details__pic__slider">
                  <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={5}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                  >
                    {
                      data.data.posters && data.data.posters.map((item, index) => {
                        return (
                          <SwiperSlide>
                            <Link to={'/recipe/meterialDetail/' + item.mno}><img style={{ borderRadius: '10px', width: '100px', height: '75px' }} src={item.poster} alt="" /></Link>
                          </SwiperSlide>
                        )
                      })
                    }
                  </Swiper>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="product__details__text">
                <h3>{data.data.detail.title}</h3>
                <i class="fa-solid fa-eye">&nbsp;&nbsp;{data.data.detail.hit}&nbsp;&nbsp;</i>
                <i class="fa-solid fa-heart">&nbsp;&nbsp;{data.data.detail.likecount}&nbsp;&nbsp;</i>
                <div className="product__details__rating">
                  <i className="fa fa-star" style={{ color: data.data.detail.score < 1 ? 'black' : 'gold' }}></i>
                  <i className="fa fa-star" style={{ color: data.data.detail.score < 2 ? 'black' : 'gold' }}></i>
                  <i className="fa fa-star" style={{ color: data.data.detail.score < 3 ? 'black' : 'gold' }}></i>
                  <i className="fa fa-star" style={{ color: data.data.detail.score < 4 ? 'black' : 'gold' }}></i>
                  <i className="fa fa-star" style={{ color: data.data.detail.score < 5 ? 'black' : 'gold' }}></i>
                  <span>({data.data.detail.score.toFixed(1)})</span>
                  <span>({data.data.count} reviews)</span>
                </div>
                <p>{data.data.detail.content}</p>
                <a href="#" className="heart-icon"><span className="icon_heart_alt"></span></a>
                <ul>
                  {data.data.detail.info1 &&
                    <li><b>분량</b> <span>{data.data.detail.info1}</span></li>
                  }
                  {data.data.detail.info2 &&
                    <li><b>시간</b> <span>{data.data.detail.info2}</span></li>
                  }
                  {data.data.detail.info3 &&
                    <li><b>레벨</b> <span>{data.data.detail.info3}</span></li>
                  }
                  {data.data.items.length > 0 ? (
                    <li>
                      <div className="row">
                        <div style={{ paddingLeft: '15px', width: '185px' }}>
                          <b style={{ width: '100%' }}>재료</b>
                        </div>
                        <div className="col-sm-8" style={{ paddingLeft: '4px' }}>
                          {data.data.items.map((item, index) => {
                            return (
                              <Fragment>
                                <span style={{ width: '50%', display: 'inline-block' }}>{item}</span>
                                {index % 2 === 0 ? (<></>) : (<br />)}
                              </Fragment>
                            )
                          })
                          }
                        </div>
                      </div>
                    </li>
                  ) : (<></>)
                  }
                </ul>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="product__details__tab" style={{ paddingTop: '15px' }}>
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab"
                      aria-selected="true">Step</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab"
                      aria-selected="false">Review</a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <div className="product__details__tab__desc">
                      <div className="row">
                        {
                          data.data.iList && data.data.iList.map((image, index) => {
                            return (
                              <Fragment>
                                <div className="col-sm-2"></div>
                                <div className="col-sm-2" style={{ marginBottom: '10px' }}>
                                  <img src={image} />
                                </div>
                                <div className="col-sm-6">
                                  <span>{index + 1}. {data.data.sList[index]}</span>
                                </div>
                                <div className="col-sm-2"></div>
                              </Fragment>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="tabs-2" role="tabpanel">
                    <Review rCount={data.data.reviewCount}
                    id={sessionId}
                    nickname={sessionNickname}
                    list={data.data.reviewList}
                    rate={rating}
                    rating={ratingChange}
                    msging={msgInsert}
                    reviewInsert={submitReview}
                    reviewDelete={deleteReview}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="related-product">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title related__product__title">
                <h2>다른 {data.data.detail.type}요리 알아보기</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              loop={true}
              spaceBetween={10}
              slidesPerView={5}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
              {
                data.data.rList && data.data.rList.map((item) => {
                  return (
                    <SwiperSlide>
                      <div className="product__item">
                        <div className="product__item__pic set-bg" style={{ height: '200px' }}>
                          <Link to={'../../recipe/recipeDetail/' + item.no}><img src={item.poster} style={{ width: '220px', height: '200px' }} /></Link>
                        </div>
                        <div className="product__item__text">
                          <span><Link to={'../../recipe/recipeDetail/' + item.no}>{item.title}</Link></span>
                        </div>
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
export default RecipeDetail