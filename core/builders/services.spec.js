import buildServices from "core/builders/services";

class A {
  test() {
    // eslint-disable-next-line class-methods-use-this
    return "a";
  }
}

class B {
  constructor({ a, counter }) {
    this.a = a();
    this.counter = counter();
  }

  test() {
    return `b ${this.a.test()}`;
  }

  increment() {
    this.counter.increment();
  }
}

class C {
  constructor({ b, counter }) {
    this.b = b();
    this.counter = counter();
  }

  test() {
    return `c ${this.b.test()}`;
  }

  increment() {
    this.counter.increment();
  }
}

class SelfReferenceService {
  constructor(services) {
    this.services = services;
  }
}

class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count = this.count + 1;
  }
}

const inOrderServices = {
  a: A,
  b: B,
  c: C,
  counter: Counter
};

const outOfOrderServices = {
  c: C,
  b: B,
  a: A,
  counter: Counter
};

describe("buildServices", function() {
  describe("when services require other services that are instantiated", function() {
    beforeEach(function() {
      this.services = buildServices(inOrderServices);
    });

    it("should not throw errors when a service references another service", function() {
      expect(this.services.a.test()).to.eql("a");
      expect(this.services.b.test()).to.eql("b a");
      expect(this.services.c.test()).to.eql("c b a");
    });
  });

  describe("when services require other services that are not yet instantiated", function() {
    beforeEach(function() {
      this.services = buildServices(outOfOrderServices);
    });

    it("should not throw errors when a service references another service", function() {
      expect(this.services.a.test()).to.eql("a");
      expect(this.services.b.test()).to.eql("b a");
      expect(this.services.c.test()).to.eql("c b a");
    });
  });

  it("should omit a service's own service", function() {
    const services = buildServices({
      selfReferenceService: SelfReferenceService
    });
    expect(services.selfReferenceService.services).to.be.empty;
  });

  describe("instatiating services", function() {
    beforeEach(function() {
      this.services = buildServices(inOrderServices);
    });

    it("should only instatiate services once", function() {
      this.services.b.increment();
      this.services.c.increment();
      expect(this.services.counter.count).to.eql(2);
    });
  });
});
