/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

module.exports = {
  reactStrictMode: true,
  env:{
    clientId: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
    secret: process.env.JWT_SECRET
  },
  images: {
    domains: ['static-cdn.jtvnw.net'],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/login',
  //       permanent: false
  //     },
  //   ]
  // },
}
