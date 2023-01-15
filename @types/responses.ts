import { Stats } from './stats'

interface ResponseBase {
  status: 200 | 400 | 401 | 405 | 500
  ok: boolean
  body: {
    [key: string]: unknown
  }
}

interface ResponseError extends ResponseBase {
  ok: false
  body: {
    error: string
  }
}

interface ResponseToken extends ResponseBase {
  ok: true
  body: {
    token: string
  }
}

interface ResponseStats extends ResponseBase {
  ok: true
  body: Stats
}

export { ResponseBase, ResponseError, ResponseToken, ResponseStats }
