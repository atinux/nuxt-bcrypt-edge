import { compareSync } from 'bcrypt-edge/dist/bcrypt-edge'

export default defineEventHandler(async (event) => {
  const { hash, password } = await readBody(event)

  const start = Date.now()
  const isValid = compareSync(password, hash)
  const end = Date.now()

  return { isValid, time: Math.round(end - start) }
});