import { Link, useParams } from "../../../node_modules/react-router-dom/dist/index"
import { useQuery, useMutation } from "react-query"
import httpCommons from "../../http-commons"
import { Fragment, useCallback, useState } from "react"
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Review from "./Review"
function MeterialDetail() {
  const [msg, setMsg] = useState('')
  const [rating, setRating] = useState(1)
  const { mno } = useParams()
  const [first, setFirst] = useState(true)
  const rInsert = useMutation(
    async () => {
      await httpCommons.post(`/comment/insertReact`, {
        id: window.sessionStorage.id,
        nickname: window.sessionStorage.nickname,
        mno: mno,
        content: msg,
        rating: rating
      })
    }, {
    onSuccess: () => {
      refetch()
    }
  }
  )
  const { isLoading, isError, error, data, refetch } = useQuery(['meterialDetail', mno],
    async () => {
      return await httpCommons.get(`/recipe/meterialDetail/${mno}`)
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
      alert('내용을 입력하세요')
      return
    }
    rInsert.mutate()
    refetch()
  })
  const hitIncrement = useMutation(
    async () => {
      setFirst(false)
      await httpCommons.get(`/meterial/hitIncrement/${mno}`)
      refetch()
    }
  )
  const deleteReview=useCallback((rno)=>{
    rDelete.mutate(rno)
    refetch()
  })
  const rDelete=useMutation(
    async (rno)=>{
      await httpCommons.delete(`comment/deleteReact/${rno}`)
    },{
      onSuccess:()=>{
        refetch()
      }
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
                      data.data.posters && data.data.posters.map((poster, index) => {
                        return (
                          <SwiperSlide>
                            <img style={{ borderRadius: '10px', width: '100px', height: '75px' }} src={poster} alt="" />
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
                <h3>{data.data.detail.name}</h3>
                <i class="fa-solid fa-eye">&nbsp;{data.data.detail.hit}&nbsp;</i>
                <i class="fa-solid fa-heart">&nbsp;{data.data.detail.likecount}&nbsp;</i>
                <p>{data.data.detail.content}</p>
                <a href="#" className="heart-icon"><span className="icon_heart_alt"></span></a>
                <ul>
                  {data.data.detail.season &&
                    <li><b>제철</b> <span>{data.data.detail.season}</span></li>
                  }
                  {data.data.detail.temp &&
                    <li><b>보관온도</b> <span>{data.data.detail.temp}</span></li>
                  }
                  {data.data.detail.kcal &&
                    <li><b>열량</b> <span>{data.data.detail.kcal}</span></li>
                  }
                  {data.data.detail.match &&
                    <li><b>어울리는 음식</b> <span>{data.data.detail.match}</span></li>
                  }
                </ul>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="product__details__tab" style={{ paddingTop: '0px' }}>
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab"
                      aria-selected="true">MoreInfo</a>
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
                        <ul style={{ width: '80%', marginLeft: '20%' }}>
                          {data.data.detail.prep &&
                            <li className="info_list"><b>손질방법</b> <span>{data.data.detail.prep}</span></li>
                          }
                          {data.data.detail.storage &&
                            <li className="info_list"><b>보관법</b> <span>{data.data.detail.storage}</span></li>
                          }
                          {data.data.detail.cook &&
                            <li className="info_list"><b>조리법</b> <span>{data.data.detail.cook}</span></li>
                          }
                          {data.data.detail.checklist &&
                            <li className="info_list"><b>고르는법</b> <span>{data.data.detail.checklist}</span></li>
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="tabs-2" role="tabpanel">
                    <div className="product__details__tab__desc">
                      <h6>Step</h6>
                      <Review rCount={data.data.reviewCount}
                        id={window.sessionStorage.id||''}
                        nickname={window.sessionStorage.nickname||''}
                        list={data.data.reviewList}
                        rate={rating}
                        rating={ratingChange}
                        msging={msgInsert}
                        reviewInsert={submitReview}
                        reviewDelete={deleteReview} />
                    </div>
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
                <h2>{data.data.detail.name} 레시피 알아보기</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              loop={true}
              spaceBetween={10}
              slidesPerView={data.data.rList.length < 5 ? data.data.rList.length : 5}
              centeredSlides={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
              {
                data.data.rList && data.data.rList.map((item) => {
                  return (
                    <SwiperSlide>
                      <div className="product__item" style={{ width: '220px' }}>
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
export default MeterialDetail