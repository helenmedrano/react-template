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
  let services;

  describe("when services require other services that are instantiated", function() {
    beforeEach(function() {
      services = buildServices(inOrderServices);
    });

    it("should not throw errors when a service references another service", function() {
      expect(services.a.test()).toEqual("a");
      expect(services.b.test()).toEqual("b a");
      expect(services.c.test()).toEqual("c b a");
    });
  });

  describe("when services require other services that are not yet instantiated", function() {
    let services;
    beforeEach(function() {
      services = buildServices(outOfOrderServices);
    });

    it("should not throw errors when a service references another service", function() {
      expect(services.a.test()).toEqual("a");
      expect(services.b.test()).toEqual("b a");
      expect(services.c.test()).toEqual("c b a");
    });
  });

  it("should omit a service's own service", function() {
    const services = buildServices({
      selfReferenceService: SelfReferenceService
    });
    expect(services.selfReferenceService.services).toEqual({});
  });

  describe("instatiating services", function() {
    let services;

    beforeEach(function() {
      services = buildServices(inOrderServices);
    });

    it("should only instatiate services once", function() {
      services.b.increment();
      services.c.increment();
      expect(services.counter.count).toEqual(2);
    });
  });
});
