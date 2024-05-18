import { Express, Request, Response } from 'express'
import { createUserHandler } from './controllers/user.controller'
import validateResource from './middlewares/validateResource'
import { createUserSchema } from './schemas/user.schema'
import { createSessionSchema } from './schemas/session.schema'
import { createUserSessionHandler } from './controllers/session.controller'

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200)
  })

  //create user
  app.post('/api/users', validateResource(createUserSchema), createUserHandler)

  // create a session
  app.post(
    '/api/sessions',
    validateResource(createSessionSchema),
    createUserSessionHandler,
  )
}

export default routes
