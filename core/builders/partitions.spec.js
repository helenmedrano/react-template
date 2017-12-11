import { buildActions, buildReducers } from 'core/builders/partitions'

const emptyActions = () => {
  return {}
}

const partitions = {
  one: {
    actions: emptyActions,
    reducer: () => (state = {}) => state,
  },
  two: {
    actions: emptyActions,
  },
  three: {
    reducer: () => (state = {}) => state,
  },
}

describe('partitions', () => {
  describe('buildActions', () => {
    it('returns an object with partitions that have actions', () => {
      expect(buildActions(partitions)).toEqual({ one: {}, two: {} })
    })

    describe('referencing other action partitions', () => {
      let actionStub
      beforeEach(() => {
        actionStub = jest.fn()

        const crossReferencePartitions = {
          one: {
            actions: ({ actions }) => {
              return { test: () => actions.two().test() }
            },
          },
          two: {
            actions: () => {
              return { test: actionStub }
            },
          },
        }

        const actions = buildActions(crossReferencePartitions)
        actions.one.test()
      })

      it('should be able to properly call actions from other partitions', () => {
        expect(actionStub).toBeCalled()
      })
    })
  })

  describe('buildReducers', () => {
    it('returns an object with partitions that have reducers', () => {
      expect(buildReducers(partitions)()).toEqual({ one: {}, three: {} })
    })
  })
})
