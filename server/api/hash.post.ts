import { hashSync } from 'bcrypt-edge/dist/bcrypt-edge'

export default defineEventHandler(async (event) => {
  const { rounds, password } = await readBody(event)
  const sanitizedRounds = Math.max(4, Math.min(13, typeof rounds === 'number' ? Math.floor(rounds) : 10))

  const start = Date.now()
  const hash = hashSync(password, sanitizedRounds)
  const end = Date.now()

  return { hash, time: Math.round(end - start) }
});