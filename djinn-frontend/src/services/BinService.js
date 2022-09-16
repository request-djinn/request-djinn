import axios from "axios"

const baseURL = '/bin' //'/bin'

const createBin = async () => {
  return await axios.post(baseURL)
}

const getBin = async (binkey) => {
  return await axios.get(`${baseURL}/${binkey}`)
  // return dummyBin
}

const getRequests = async (binkey) => {
  const res = await axios.get(`${baseURL}/${binkey}/requests`)
  return res.data.requests  
// return dummyReqs
}

const dummyBin = {
  subdomain: "ima.subdomain.com",
  createdAt: "im a timestamp",
  last: "Im another timestamp!",
  count: 21
}

const dummyReqs = [
  {
    requestId: '7fcb8d78f4badffb136dd0a3b99ed486250fe9f4',
    binKey: '7109d4462970d8b413b0ff1bdc9d362c85b1177b',
    headers: [
      '{"host":"5699-136-56-132-23.ngrok.io","user-agent":"curl/7.79.1","content-length":"9","accept":"*/*","content-type":"application/x-www-form-urlencoded","x-forwarded-for":"99.233.7.119","x-forwarded-proto":"https","accept-encoding":"gzip"}'
    ],
    body: '{"fizz":"buzz"}',
  },
]

const binService = {
  createBin,
  getBin,
  getRequests
}

export default binService
