import { defineEventHandler, readBody } from 'h3'

interface Response {
  status: 200 | 400 | 401
  ok: boolean
  body: {
    error?: string
  }
}

export default defineEventHandler(async (e): Promise<Response> => {
  const body = await readBody(e)
  const { username, password } = body

  if (!(username && password)) {
    return {
      status: 400,
      ok: false,
      body: { error: 'Brakujący użytkownik lub hasło' }
    }
  }

  if (username === process.env.USERNAME && password === process.env.PASSWORD) {
    return {
      status: 200,
      ok: true,
      body: {}
    }
  }

  return {
    status: 401,
    ok: false,
    body: { error: 'Nieprawidłowy użytkownik lub hasło' }
  }
})
