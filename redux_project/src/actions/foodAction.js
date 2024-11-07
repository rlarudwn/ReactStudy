import axios from "../../node_modules/axios/index";
import { FETCH_MAIN_DATA, FETCH_MAIN_VO } from "./types";

export const fetchMainData=()=>dispatch=>{
  axios.get('http://localhost/main').then(res=>{
    const action={
      type:FETCH_MAIN_DATA,
      payload:res.data
    }
    dispatch(action)
  })
}