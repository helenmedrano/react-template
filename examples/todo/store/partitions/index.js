import { buildReducers, buildActions } from 'core/builders/partitions'
import services from 'todo/services'
import todos from './todo'

const partitions = {
  todos,
}

const dependencies = {
  ...services,
}

export const actions = buildActions(partitions, dependencies)
export const reducers = buildReducers(partitions)
