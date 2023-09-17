import axios from "axios"  // biblioteca para conectar o front com o back-end

export const server = axios.create({
  baseURL: "http://localhost:3333",
})
