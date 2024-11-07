import { Fragment } from "react"
import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "../../../node_modules/react-router-dom/dist/index";
import { Cookies} from 'react-cookie';
function Home() {
  const [mainData, setMainData] = useState([]);
  const [oneData, setOneData] = useState({});
  const [twoData, setTwoData] = useState([]);
  const [threeData, setThreeData] = useState([]);
  const [recipeData, setRecipeData] = useState([])
  const [chef, setChef] = useState({})
  console.log(Cookies)
  useEffect(() => {
    axios.get('http://localhost/food/mainReact').then(res => {
      console.log(res.data)
      setOneData(res.data.fList[0])
      let arr = []
      arr.push(res.data.fList[1])
      arr.push(res.data.fList[2])
      arr.push(res.data.fList[3])
      arr.push(res.data.fList[4])
      setTwoData(arr)
      arr = []
      arr.push(res.data.fList[5])
      arr.push(res.data.fList[6])
      arr.push(res.data.fList[7])
      arr.push(res.data.fList[8])
      setThreeData(arr)
      setRecipeData(res.data.rList)
      setChef(res.data.chef)
    }).catch(error => {
      console.log(Response.error)
    })
  }, [mainData])
  let html1 = twoData.map((food) => {
    return (
      <div className="col-12 col-md-6">
        <div className="single-post wow fadeInUp" data-wow-delay=".4s">
          <div className="post-thumb">
            <img src={"http://www.menupan.com" + food.poster} width={350} height={200} />
          </div>
          <div className="post-content">
            <div className="post-meta d-flex">
              <div className="post-author-date-area d-flex">
                <div className="post-author">
                  <Link to="#">{food.type}</Link>
                </div>
                <div className="post-date">
                  <Link to="#"><span style={{ color: 'orange' }}>{food.score}</span></Link>
                </div>
              </div>
              <div className="post-comment-share-area d-flex">
                <div className="post-favourite">
                  <Link to="#"><i className="fa fa-heart-o" aria-hidden="true"></i>{food.jjimcount}</Link>
                </div>
                <div className="post-comments">
                  <Link to="#"><i className="fa fa-comment-o" aria-hidden="true"></i>{food.hit}</Link>
                </div>
                <div className="post-share">
                  <Link to="#"><i className="fa fa-share-alt" aria-hidden="true"></i></Link>
                </div>
              </div>
            </div>
            <Link to="#">
              <h4 className="post-headline">{food.name}</h4>
            </Link>
          </div>
        </div>
      </div>
    )
  })
  return (
    <Fragment>
      <section className="categories_area clearfix" id="about">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="single_catagory wow fadeInUp" data-wow-delay=".3s">
                <img src="/img/catagory-img/1.jpg" alt="" />
                <div className="catagory-title">
                  <Link to="#">
                    <h5>Food</h5>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="single_catagory wow fadeInUp" data-wow-delay=".6s">
                <img src="/img/catagory-img/2.jpg" alt="" />
                <div className="catagory-title">
                  <Link to="#">
                    <h5>Recipe</h5>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="single_catagory wow fadeInUp" data-wow-delay=".9s">
                <img src="/img/catagory-img/3.jpg" alt="" />
                <div className="catagory-title">
                  <Link to="#">
                    <h5>Store</h5>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="blog_area section_padding_0_80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="row">

                <div className="col-12">
                  <div className="single-post wow fadeInUp" data-wow-delay=".2s">
                    <div className="post-thumb">
                      <img src={"http://www.menupan.com" + oneData.poster} alt="" width={700} height={300} />
                    </div>
                    <div className="post-content">
                      <div className="post-meta d-flex">
                        <div className="post-author-date-area d-flex">
                          <div className="post-author">
                            <Link to="#">{oneData.type}</Link>
                          </div>
                          <div className="post-date">
                            <Link to="#"><span style={{ color: "orange" }}>{oneData.score}</span></Link>
                          </div>
                        </div>
                        <div className="post-comment-share-area d-flex">
                          <div className="post-favourite">
                            <Link to="#"><i className="fa fa-heart-o" aria-hidden="true"></i>{oneData.jjimcount}</Link>
                          </div>
                          <div className="post-comments">
                            <Link to="#"><i className="fa fa-comment-o" aria-hidden="true"></i>{oneData.hit}</Link>
                          </div>
                          <div className="post-share">
                            <Link to="#"><i className="fa fa-share-alt" aria-hidden="true"></i></Link>
                          </div>
                        </div>
                      </div>
                      <Link to="#">
                        <h2 className="post-headline">{oneData.name}</h2>
                      </Link>
                      <p>{oneData.content}</p>
                      <Link to="#" className="read-more">Continue Reading..</Link>
                    </div>
                  </div>
                </div>

                {html1}
                {threeData.map((food) => {
                  return (
                    <div className="col-12">
                      <div className="list-blog single-post d-sm-flex wow fadeInUpBig" data-wow-delay=".2s">
                        <div className="post-thumb">
                          <img src={"http://www.menupan.com" + food.poster} height={250} width={350} />
                        </div>
                        <div className="post-content">
                          <div className="post-meta d-flex">
                            <div className="post-author-date-area d-flex">
                              <div className="post-author">
                                <Link to="#">{food.type}</Link>
                              </div>
                              <div className="post-date">
                                <Link to="#"><span style={{ color: 'orange' }}>{food.score}</span></Link>
                              </div>
                            </div>
                            <div className="post-comment-share-area d-flex">
                              <div className="post-favourite">
                                <Link to="#"><i className="fa fa-heart-o" aria-hidden="true"></i>{food.jjimcount}</Link>
                              </div>
                              <div className="post-comments">
                                <Link to="#"><i className="fa fa-comment-o" aria-hidden="true"></i>{food.hit}</Link>
                              </div>
                              <div className="post-share">
                                <Link to="#"><i className="fa fa-share-alt" aria-hidden="true"></i></Link>
                              </div>
                            </div>
                          </div>
                          <Link to="#">
                            <h4 className="post-headline">{food.name}</h4>
                          </Link>
                          <p>{food.theme}</p>
                          <Link to="#" className="read-more">Continue Reading..</Link>
                        </div>
                      </div>
                    </div>
                  )
                })}

              </div>
            </div>

            <div className="col-12 col-sm-8 col-md-6 col-lg-4">
              <div className="blog-sidebar mt-5 mt-lg-0">
                <div className="single-widget-area about-me-widget text-center">
                  <div className="widget-title">
                    <h6>오늘의 셰프</h6>
                  </div>
                  <div className="about-me-widget-thumb">
                    <img src={chef.poster} alt="" />
                  </div>
                  <h4 className="font-shadow-into-light">{chef.chef}</h4>
                </div>
                <div className="single-widget-area popular-post-widget">
                  <div className="widget-title text-center">
                    <h6>Populer Post</h6>
                  </div>
                  {recipeData.map((recipe) => {
                    return (
                      <div className="single-populer-post d-flex">
                        <img src={recipe.poster} />
                        <div className="post-content">
                          <Link to="#">
                            <h6>{recipe.title}</h6>
                          </Link>
                          <p>{recipe.chef}</p>
                        </div>
                      </div>
                    )
                  })}

                </div>

                <div className="single-widget-area add-widget text-center">
                  <div className="add-widget-area">
                    <img src="/img/sidebar-img/6.jpg" alt="" />
                    <div className="add-text">
                      <div className="yummy-table">
                        <div className="yummy-table-cell">
                          <div><iframe width={380} height={250} src={"https://www.youtube.com/embed/mjsOap5SZN4?si=k2gYiqIc2IKv6XAS"} title={"YouTube video player"} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="single-widget-area newsletter-widget">
                  <div className="widget-title text-center">
                    <h6>최근방문맛집</h6>
                  </div>
                  <p>Subscribe our newsletter gor get notification about new updates, information discount, etc.</p>
                  <div className="newsletter-form">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}
export default Home