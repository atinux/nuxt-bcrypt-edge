import { scrypt, randomUUID } from 'node:crypto'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { salt, password } = Object.assign({
    salt: randomUUID()
  }, body)

  const hash = await new Promise((resolve, reject) => {
    scrypt(password, salt, 64, (err, hash) => {
      if (err) return reject(err)
      resolve(hash.toString('hex'))
    })
  })

  return { hash }
});