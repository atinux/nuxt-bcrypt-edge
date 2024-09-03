import { scrypt, timingSafeEqual } from 'node:crypto'

export default defineEventHandler(async (event) => {
  const { salt, hash, password } = await readBody(event)

  const verifiedHash = await new Promise((resolve, reject) => {
    scrypt(password, salt, 64, (err, hash) => {
      if (err) return reject(err)
      resolve(hash.toString('hex'))
    })
  })
  const isValid = timingSafeEqual(Buffer.from(hash), Buffer.from(verifiedHash as string))

  return { isValid }
});