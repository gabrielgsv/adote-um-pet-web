import axios from "axios"

const api = axios.create({
  baseURL: "https://adote-um-pet-api.herokuapp.com/"
})

export default api