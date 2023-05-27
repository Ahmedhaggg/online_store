const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone",
  staticPageGenerationTimeout: 30000,
  apiTimeout: 25000,
  env: {
      SERVER_URL: "https://elcto-server.onrender.com/api/",
      API_URL: "https://elcto-server.onrender.com/api/",
      IMAGE_URL: `https://elcto-server.onrender.com/api/images`,
      URI: "http://localhost:3000",
      SSE_SERVER_URL: "https://elcto-server.onrender.com/api/",
      STRIPE_KEY: "pk_test_51HkkefDHNiYh4mtD5GwpaFvauahMirEbeTrkxR8AeNHRPr7T1hcOE7VhJk0zeEyGv3nN8gGKQaBPFhJeTl9w5DHJ00ayh57RyD" 
  },
  webpack: (config, context) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300
    }
    return config
  }
}

// env: {
//   SERVER_URL: "http://localhost/api/",
//   API_URL: "http://localhost/api/",
//   IMAGE_URL: `http://localhost/api/images`,
//   URI: "http://localhost:3000",
//   STRIPE_KEY: "pk_test_51HkkefDHNiYh4mtD5GwpaFvauahMirEbeTrkxR8AeNHRPr7T1hcOE7VhJk0zeEyGv3nN8gGKQaBPFhJeTl9w5DHJ00ayh57RyD"
// } 
// https://online-store-g29amoh8y-ahmedhaggg.vercel.app
// https://633c2b151e9f9b0009510a30--lambent-blini-fa9824.netlify.app/

module.exports = nextConfig
