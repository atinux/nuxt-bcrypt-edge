import { hashSync } from 'bcrypt-edge/dist/bcrypt-edge'

export default defineEventHandler(async (event) => {
  const { password } = await readBody(event)

  const hash = hashSync(password, 10)

  return { hash }
});