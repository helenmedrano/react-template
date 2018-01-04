import buildStore from 'core/builders/store'

import { reducers } from './partitions'

export default function store() {
  const _store = buildStore({ reducer: reducers })
  return _store
}
