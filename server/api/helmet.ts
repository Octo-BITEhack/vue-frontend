import axios from 'axios'
import { defineEventHandler, readBody } from 'h3'
import jwt from 'jsonwebtoken'

import { ResponseError, ResponseBase } from '~~/@types/responses'

// eslint-disable-next-line import/no-named-as-default-member
const { verify } = jwt

export default defineEventHandler(async (e): Promise<ResponseError | ResponseBase> => {
  if (!process.env.JWT_SECRET) {
    return {
      status: 500,
      ok: false,
      body: { error: 'Brak sekretu JWT' }
    }
  }

  if (!process.env.SERVER_URL) {
    return {
      status: 500,
      ok: false,
      body: { error: 'Brak adresu API' }
    }
  }

  if (e.node.req.method !== 'POST') {
    return {
      status: 405,
      ok: false,
      body: { error: 'Metoda nie jest obsługiwana' }
    }
  }

  const { headers } = e.node.req

  if (!headers.authorization) {
    return {
      status: 400,
      ok: false,
      body: { error: 'Brak tokenu uwierzytelniającego' }
    }
  }

  const token = headers.authorization.split(' ')[1]
  const { mode } = await readBody<{ mode: boolean }>(e)

  try {
    const decoded = verify(token, process.env.JWT_SECRET)

    if (!(decoded && typeof decoded === 'object')) {
      return {
        status: 401,
        ok: false,
        body: { error: 'Nieprawidłowy użytkownik lub hasło' }
      }
    }

    if (decoded.username !== process.env.USERNAME) {
      return {
        status: 401,
        ok: false,
        body: { error: 'Nieprawidłowy użytkownik lub hasło' }
      }
    }

    const response = await axios.post(`${process.env.SERVER_URL}/helmet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: {
        mode
      }
    })

    if (response.status !== 200) {
      return {
        status: 500,
        ok: false,
        body: { error: 'Błąd w komunikacji z API' }
      }
    }

    return {
      status: 200,
      ok: true,
      body: {}
    }
  } catch (error) {
    return {
      status: 500,
      ok: false,
      body: { error: 'Wewnętrzny błąd serwera' }
    }
  }
})
