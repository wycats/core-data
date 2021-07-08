import { Timeline, Timestamp } from "../../src";
import { describe, Eq } from "../app-test-support";

describe("Timeline", (test) => {
  test("It can be instantiated with a Timestamp", (assert) => {
    assert("the constructor takes a Timestamp")
      .expect(new Timeline(new Timestamp(0)))
      .to(Eq, new Timeline(new Timestamp(0)));
  });
});
