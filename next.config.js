/** @type {import('next').NextConfig} */
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'


  const env = {
    API_URL: (() => {
      if (isDev) return 'http://127.0.0.1:4000'
      if (isProd) return 'http://guildzone.tronanalytic.com'
    })()
  }


  return {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['firebasestorage.googleapis.com']
    },
    env
  }
}
