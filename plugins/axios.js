import https from 'https'
export default function ({ $axios }) {
  $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })
  $axios.onRequest((config) => {
    if (process.server) {
      config.url = config.url.replace('/api/', process.env.API_URL)
    }
  })
}
