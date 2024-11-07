import axios from "../node_modules/axios/index";

export default axios.create({
  baseURL:'http://localhost', 
  headers:{
    'Content-Type':'apllication/json'
  }
})