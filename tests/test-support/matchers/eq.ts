import { Matcher } from "../assertion";
import { MatchResult } from "../mismatch";
import { Message } from "../reporter";

export class EqMatcher<T> implements Matcher<T, T> {
  async match(
    actual: T,
    expected: T,
    description: string
  ): Promise<MatchResult> {
    if (actual === expected) {
      return { match: true, message: Message.from(description) };
    } else {
      return {
        match: false,
        message: Message.from([`expected`, actual, `to equal`, expected]),
      };
    }
  }
}

export const Eq = new EqMatcher();
