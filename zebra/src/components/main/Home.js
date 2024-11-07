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
    if (key[j].startsWith("food_") && j < 7) {
      let cookie = value[i].split("^")
      images.push(cookie[0])
      names.push(cookie[1])
      keys.push(key[i])
      j++
    }
  }

  const [rList, setRList] = useState([])
  const [cList, setCList] = useState([])
  const [mList, setMList] = useState([])
  const [sList, setSList] = useState([])
  const [count, setCount] = useState(1)
  const [selected, setSelected] = useState(1)
  useEffect(() => {
    axios.get('http://localhost/food/homeReact').then(res => {
      setRList(res.data.rList)
      setCList(res.data.cList)
      setMList(res.data.mList)
      setSList(res.data.sList)
      setCount(1)
    })
  }, [count])
  useEffect(() => {
    if (rList.length) {
      mixerRef.current = mixitup('.mixcont', {
        selectors: {
          target: '.mix_item'
        },
        animation: {
          duration: 300
        }
      })
    }
  }, [rList])
  return (
    <Fragment>
      <section className="featured spad">
        <div className="container mixcont">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>추천 제품</h2>
              </div>
              <div className="featured__controls">
                <ul>
                  <li className={selected === 1 ? "active" : ''} data-filter="*" onClick={() => {
                    mixerRef.current.filter('*')
                    setSelected(1)
                  }}>All</li>
                  <li className={selected === 2 ? "active" : ''} data-filter=".food_01101" onClick={() => {
                    mixerRef.current.filter('.food_01101')
                    setSelected(2)
                  }}>Popcorn</li>
                  <li className={selected === 3 ? "active" : ''} data-filter=".food_01102" onClick={() => {
                    mixerRef.current.filter('.food_01102')
                    setSelected(3)
                  }}>Macaron</li>
                  <li className={selected === 4 ? "active" : ''} data-filter=".food_01103" onClick={() => {
                    mixerRef.current.filter('.food_01103')
                    setSelected(4)
                  }}>Cookie</li>
                  <li className={selected === 5 ? "active" : ''} data-filter=".food_01104" onClick={() => {
                    mixerRef.current.filter('.food_01104')
                    setSelected(5)
                  }}>Snack</li>
                  <li className={selected === 6 ? "active" : ''} data-filter=".food_01105" onClick={() => {
                    mixerRef.current.filter('.food_01105')
                    setSelected(6)
                  }}>Wafer</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row featured__filter">
            {
              rList.map((item) => {
                return (
                  <div className={"col-lg-3 col-md-4 col-sm-6 fresh-meat mix_item food_" + item.type2code}>
                    <div className="featured__item">
                      <div className="featured__item__pic set-bg" data-setbg="/img/featured/feature-1.jpg">
                        <Link to={'../food/detail/' + item.fno}><img src={item.poster} style={{ width: '250px', height: '250px' }} /></Link>
                      </div>
                      <div className="featured__item__text">
                        <h5><Link to={'../food/detail/' + item.fno}>{item.name}</Link></h5>
                        <h6>{item.maker}</h6>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
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
        <h4>내가 본 제품</h4>
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
    </Fragment>
  )
}
export default Home