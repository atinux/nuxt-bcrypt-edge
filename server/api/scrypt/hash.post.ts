export default defineEventHandler(async (event) => {
  const { password } = await readBody(event)
  const hash = await hashPassword(password)
  return { hash }
});