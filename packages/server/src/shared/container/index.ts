import { container } from 'tsyringe'

import ICallsRepository from '@modules/calls/repositories/ICallsRepository'
import CallsRepository from '@modules/calls/repositories/implementations/CallsRepository'

container.registerSingleton<ICallsRepository>(
  'CallsRepository',
  CallsRepository
)
