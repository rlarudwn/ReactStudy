import axios from "../../node_modules/axios/index";
import { FETCH_MAIN_DATA, FETCH_MAIN_LIST, FETCH_MAIN_VO } from "./types";

export const fetchMainData=()=>dispatch=>{
  axios.get('http://localhost/main').then(res=>{
    const action={
      type:FETCH_MAIN_DATA,
      payload:res.data
    }
    dispatch(action)
  })
}

export const fetchFoodList=(page)=>dispatch=>{
  axios.get(`http://localhost/food/list/${page}`).then(res=>{
    const action={
      type:FETCH_MAIN_LIST,
      payload:res.data
    }
    dispatch(action)
  })
}

export const fetchFoodDetail=(fno)=>dispatch=>{
  axios.get(`http://localhost/food/detail/${fno}`).then(res=>{
    const action={
      type:FETCH_MAIN_LIST,
      payload:res.data
    }
    dispatch(action)
  })
}