import { defineEventHandler, readBody } from 'h3'
import jwt from 'jsonwebtoken'

import { ResponseError, ResponseToken } from '~~/@types/responses'

// eslint-disable-next-line import/no-named-as-default-member
const { sign } = jwt

export default defineEventHandler(async (e): Promise<ResponseError | ResponseToken> => {
  if (!process.env.JWT_SECRET) {
    return {
      status: 500,
      ok: false,
      body: { error: 'Brak sekretu JWT' }
    }
  }

  if (e.node.req.method !== 'POST') {
    return {
      status: 405,
      ok: false,
      body: { error: 'Metoda nie jest obsługiwana' }
    }
  }

  const body = await readBody(e)

  const { username, password } = body

  if (!(username && password)) {
    return {
      status: 400,
      ok: false,
      body: { error: 'Brakujący użytkownik lub hasło' }
    }
  }

  if (!(username === process.env.USERNAME && password === process.env.PASSWORD)) {
    return {
      status: 401,
      ok: false,
      body: { error: 'Nieprawidłowy użytkownik lub hasło' }
    }
  }

  try {
    const token = sign({ username }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    return {
      status: 200,
      ok: true,
      body: {
        token
      }
    }
  } catch (error) {
    console.error(error)

    return {
      status: 500,
      ok: false,
      body: { error: 'Wewnętrzny błąd serwera' }
    }
  }
})
