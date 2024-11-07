import { FETCH_MAIN_DATA } from "../actions/types";

const foodState={
  food_main_list:[],
  food_one_data:{},
  food_two_data:[],
  food_three_data:[]
}
export default function(state = foodState, action){
  switch(action.type){
    case FETCH_MAIN_DATA:
      return{
        ...state,
        food_main_list:action.payload
      }
  }
}