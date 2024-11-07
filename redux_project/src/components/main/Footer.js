import { useEffect } from "react"
import { useDispatch } from "../../../node_modules/react-redux/dist/react-redux"
import { Link } from "../../../node_modules/react-router-dom/dist/index"
import { fetchMainData } from "../../actions/foodAction"

function Footer() {
  
  return (
    <footer className="footer_area">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="copy_right_text text-center">
              <p>2024-11-11 강북 쌍용 교육 센터<i className="fa fa-heart-o" aria-hidden="true"></i> by <Link to="https://github.com/rlarudwn" target="_blank">김경주</Link></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer