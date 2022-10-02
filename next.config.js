const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    API_URL: "http://localhost:4000/api/",
    IMAGE_URL: "http://localhost:4000/uploads/",
    URL: "http://localhost:3000"
  }
}

module.exports = nextConfig
