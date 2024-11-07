import { FETCH_MAIN_DATA, FETCH_MAIN_DETAIL, FETCH_MAIN_LIST } from "../actions/types";

const foodState = {
  food_main_list: {}
}
export default function (state = foodState, action) {
  switch (action.type) {
    case FETCH_MAIN_DATA:
      return {
        ...state,
        food_main_list: action.payload
      }
    case FETCH_MAIN_LIST:
      return{
        ...state,
        food_main_list:action.payload
      }
    case FETCH_MAIN_DETAIL:
      return{
        ...state,
        food_main_list:action.payload
      }
    default:
      return state
  }
}