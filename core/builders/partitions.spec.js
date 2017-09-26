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
      expect(buildActions(partitions)).to.eql({ one: {}, two: {} });
    });

    describe("referencing other action partitions", function() {
      beforeEach(function() {
        this.actionStub = sinon.stub();
        const that = this;

        const crossReferencePartitions = {
          one: {
            actions: ({ actions }) => {
              return { test: () => actions.two().test() };
            }
          },
          two: {
            actions: () => {
              return { test: that.actionStub };
            }
          }
        };

        const actions = buildActions(crossReferencePartitions);
        actions.one.test();
      });

      it("should be able to properly call actions from other partitions", function() {
        expect(this.actionStub).to.have.been.calledOnce;
      });
    });
  });

  describe("buildReducers", function() {
    it("returns an object with partitions that have reducers", function() {
      expect(buildReducers(partitions)()).to.eql({ one: {}, three: {} });
    });
  });
});
