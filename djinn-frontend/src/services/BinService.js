import axios from "axios"

const baseURL = '/bin'

const createBin = async () => {
  return await axios.post(baseURL)
}

const getBin = async (binId) => {
  return await axios.get(`${baseURL}/${binId}`)
}

const getRequests = async (binId) => {
  return await axios.get(`${baseURL}/${binId}`)
}

const binService = {
  createBin,
  getBin,
  getRequests
}

export default binService