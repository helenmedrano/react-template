import buildServices from 'core/builders/services'
import config from 'todo/config'

import todoService from './todo_service'

const services = { todoService }

const dependencies = { config }

export default buildServices(services, dependencies)
