import { Request, Response } from 'express'
import logger from '../utils/logger'
import { createUser } from '../services/user.service'
import { CreateUserInput } from '../schemas/user.schema'
import { omit } from 'lodash'

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response,
) {
  try {
    const user = await createUser(req.body)
    return res.send(omit(user.toJSON(), 'password')) // omit password field out of body
  } catch (e: any) {
    logger.error(e)
    return res.status(409).send(e.message)
  }
}
