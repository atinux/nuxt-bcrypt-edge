export default defineEventHandler(async (event) => {
  const { hash, password } = await readBody(event)

  const isValid = await verifyPassword(hash, password)

  return { isValid }
});