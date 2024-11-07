import { Fragment, useEffect, useRef, useState } from "react";
import axios from "../../../node_modules/axios/index";
import mixitup from "mixitup";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from "../../../node_modules/react-router-dom/dist/index";
import { getAll } from "../util/cookie";
import { useQuery } from "react-query"
import httpCommons from "../../http-commons"

function Home() {
  const mixerRef = useRef(null)
  const cookies = getAll()
  const key = Object.keys(cookies)
  const value = Object.values(cookies)
  const images = []
  const keys = []
  const names = []
  let j = 0
  for (let i = key.length - 1; i >= 0; i--) {
    if (key[j].startsWith("recipe_") && j < 7) {
      let cookie = value[i].split("^")
      images.push(cookie[0])
      names.push(cookie[1])
      keys.push(key[i])
      j++
    }
  }
  const [selected, setSelected] = useState(1)
  const typeMap = { '밑반찬': '1', '메인반찬': '2', '국/탕': '3', '찌개': '4', '디저트': '5' }
  const { isLoading, isError, error, data } = useQuery(['recipeHome'],
    async () => {
      return await httpCommons.get(`/recipe/home`)
    }
  )
  if (isLoading)
    return <h1 className="text-center">데이터 로딩중</h1>
  if (isError)
    return <h1 className="text-center">{error.message}</h1>
  console.log(data)
  if (data?.data?.rList && !mixerRef.current) {
    setTimeout(() => {
      mixerRef.current = mixitup('.mixcont', {
        selectors: {
          target: '.mix_item'
        },
        animation: {
          duration: 300
        }
      });
    }, 0);
  }
  return (
    <Fragment>

      <section className="featured spad">
        <div className="container mixcont">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>오늘의 레시피</h2>
              </div>
              <div className="featured__controls">
                <ul>
                  <li className={selected === 1 ? "active" : ''} data-filter="*" onClick={() => {
                    mixerRef.current.filter('*')
                    setSelected(1)
                  }}>All</li>
                  {
                    data.data.typeName && data.data.typeName.map((type, index) => {
                      return (
                        <li className={selected === index + 2 ? "active" : ''} data-filter={"." + data.data.types[type]} onClick={() => {
                          mixerRef.current.filter('.' + data.data.types[type])
                          setSelected(index + 2)
                        }}>{type}</li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className="row featured__filter">
            {
              data.data.rList && data.data.rList.map((item) => {
                return (
                  <div className={"col-lg-2 fresh-meat mix_item " + data.data.types[item.type]}>
                    <div className="featured__item">
                      <div className="featured__item__pic set-bg" style={{ height: '165px' }}>
                        <Link to={'../recipe/recipeDetail/' + item.no}><img src={item.poster} style={{ width: '165px', height: '165px', borderRadius: '15px' }} /></Link>
                      </div>
                      <div className="featured__item__text">
                        <span><Link to={'../recipe/recipeDetail/' + item.no}>{item.title}</Link></span>
                        <br />
                        <span>{item.chef}</span>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="section-title">
                <h2>오늘의 소식</h2>
              </div>
          <div className="row">
            <div className="col-sm-6" style={{ height: '300px' }}>
              <iframe width="100%" height="300" src="https://www.youtube.com/embed/EYT03Lp9y60?si=u-RW9N2tymPFWpBl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>            </div>
            <div className="col-sm-6">
              <ul style={{listStyle:'none'}}>
                {data.data.nList && data.data.nList.map((news) => {
                  return (
                    <li><Link to={news.link} style={{fontSize:"17px"}} target="_blank"dangerouslySetInnerHTML={{ __html: news.title }}></Link></li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/*
      <section className="latest-product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="latest-product__text">
                <h4>인기 쿠키</h4>
                <div className="latest-product__slider ">
                  <div className="latest-prdouct__slider__item">
                    {
                      cList.map((cookie) => {
                        return (
                          <Link to={'../food/detail/' + cookie.fno} className="latest-product__item">
                            <div className="latest-product__item__pic">
                              <img className="rounded" src={cookie.poster} alt="" />
                            </div>
                            <div className="latest-product__item__text">
                              <h6>{cookie.maker}</h6>
                              <span>{cookie.name}</span>
                            </div>
                          </Link>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="latest-product__text">
                <h4>인기 마카롱</h4>
                <div className="latest-product__slider ">
                  <div className="latest-prdouct__slider__item">
                    {
                      mList.map((macaron) => {
                        return (
                          <Link to={'../food/detail/' + macaron.fno} className="latest-product__item">
                            <div className="latest-product__item__pic">
                              <img className="rounded" src={macaron.poster} alt="" />
                            </div>
                            <div className="latest-product__item__text">
                              <h6>{macaron.maker}</h6>
                              <span>{macaron.name}</span>
                            </div>
                          </Link>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="latest-product__text">
                <h4>인기 스낵</h4>
                <div className="latest-product__slider ">
                  <div className="latest-prdouct__slider__item">
                    {
                      sList.map((snack) => {
                        return (
                          <Link to={'../food/detail/' + snack.fno} className="latest-product__item">
                            <div className="latest-product__item__pic">
                              <img className="rounded" src={snack.poster} alt="" />
                            </div>
                            <div className="latest-product__item__text">
                              <h6>{snack.maker}</h6>
                              <span>{snack.name}</span>
                            </div>
                          </Link>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="categories latest-product__text">
        <h4>내가 본 레시피</h4>
        <div className="container">
          <div className="row">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              loop={true}
              spaceBetween={50}
              slidesPerView={4}
              navigation
              autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
              {
                images && images.map((poster, index) => {
                  return (
                    <SwiperSlide>
                      <div className="categories__item set-bg">
                        <Link to={"/food/detail/" + keys[index].replace("food_", "")}><img src={poster} style={{ height: '200px', width: '200px', maxWidth: 'none', margin: 'auto' }} /></Link>
                        <h5 className="text-center"><Link to={"/food/detail/" + keys[index].replace("food_", "")}>{names[index]}</Link></h5>
                      </div>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
          </div>
        </div>
      </section>
      */}
    </Fragment>
  )
}
export default Home