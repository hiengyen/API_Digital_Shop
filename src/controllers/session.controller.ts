import { Request, Response } from 'express'
import { validatePassword } from '../services/user.service'
import { createSession } from '../services/session.service'
import { createTokenPair } from '../utils/jwt.utils'
import crypto from 'crypto'
import logger from '../utils/logger'

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate password of user
  const user = await validatePassword(req.body)

  if (!user) {
    return res.status(401).send('Invalid email or password')
  }

  // create a session
  const session = await createSession(user._id, req.get('user-agent') || '')

  //random private key , public key
  const privateKey = crypto.randomBytes(64).toString('hex')
  const publicKey = crypto.randomBytes(64).toString('hex')

  // create a token pair (an access token/a refressh token)
  const tokens = createTokenPair(
    { ...user, session: session._id },
    publicKey,
    privateKey,
  ) // return accesstoken , refreshtoken
  // console.log(tokens)

  return res.send(tokens)
}
