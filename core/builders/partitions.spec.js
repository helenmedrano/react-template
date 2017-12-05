import { buildActions, buildReducers } from "core/builders/partitions";

const emptyActions = () => {
  return {};
};

const partitions = {
  one: {
    actions: emptyActions,
    reducer: () => (state = {}) => state
  },
  two: {
    actions: emptyActions
  },
  three: {
    reducer: () => (state = {}) => state
  }
};

describe("partitions", function() {
  describe("buildActions", function() {
    it("returns an object with partitions that have actions", function() {
      expect(buildActions(partitions)).toEqual({ one: {}, two: {} });
    });

    describe("referencing other action partitions", function() {
      let actionStub;
      beforeEach(function() {
        actionStub = jest.fn();

        const crossReferencePartitions = {
          one: {
            actions: ({ actions }) => {
              return { test: () => actions.two().test() };
            }
          },
          two: {
            actions: () => {
              return { test: actionStub };
            }
          }
        };

        const actions = buildActions(crossReferencePartitions);
        actions.one.test();
      });

      it("should be able to properly call actions from other partitions", function() {
        expect(actionStub).toBeCalled();
      });
    });
  });

  describe("buildReducers", function() {
    it("returns an object with partitions that have reducers", function() {
      expect(buildReducers(partitions)()).toEqual({ one: {}, three: {} });
    });
  });
});
