import { Request, Response } from 'express'


export default class CallsController {
  public async show(request: Request, response: Response): Promise<Response> {
    return response.json({message: 'controller'})
  }
}
