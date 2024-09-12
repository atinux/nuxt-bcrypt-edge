import { compareSync } from 'bcrypt-edge'

export default defineEventHandler(async (event) => {
  const { hash, password } = await readBody(event)

  const isValid = compareSync(password, hash)

  return { isValid }
});