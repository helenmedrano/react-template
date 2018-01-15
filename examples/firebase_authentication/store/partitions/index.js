import { buildReducers, buildActions } from 'core/builders/partitions'
import services from '../../services'
import auth from './auth'

const partitions = { auth }

export const actions = buildActions(partitions, services)
export const reducers = buildReducers(partitions)
