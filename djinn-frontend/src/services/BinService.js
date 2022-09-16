import axios from "axios"

const baseURL = '/bin' //'/bin'

const createBin = async () => {
  return await axios.post(baseURL)
}

const getBin = async (binkey) => {
  return await axios.get(`${baseURL}/${binkey}`)
}

const getRequests = async (binkey) => {
  const res = await axios.get(`${baseURL}/${binkey}/requests`)
  return res.data.requests  
}

const binService = {
  createBin,
  getBin,
  getRequests
}

export default binService
