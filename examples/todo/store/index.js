import buildStore from 'core/builders/store'
import { reducers } from './partitions'
import initState from './init_state'

export default function store() {
  const _store = buildStore({ reducer: reducers })
  initState(_store.dispatch)
  return _store
}
