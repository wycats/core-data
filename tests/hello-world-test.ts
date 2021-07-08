import { Eq, describe } from "./app-test-support";

describe("arithmetic", (test) => {
  test("addition", (assert) => {
    assert(`addition should work`)
      .expect(1 + 1)
      .to(Eq, 2);
  });
});
