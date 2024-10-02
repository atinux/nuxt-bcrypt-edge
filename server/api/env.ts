export default eventHandler(async (event) => {
  return {
    test: true,
    projectKey: process.env.NUXT_HUB_PROJECT_KEY
  }
})