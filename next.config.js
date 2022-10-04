const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    API_URL: "https://small-ecommerce-api.herokuapp.com/api/",
    IMAGE_URL: "https://small-ecommerce-api.herokuapp.com/uploads/",
    URI: "https://small-ecommerce-api.herokuapp.com"
  }
}

module.exports = nextConfig
