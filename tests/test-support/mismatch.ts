import { Message } from "./reporter";

export interface Match {
  match: true;
  message: Message;
}

export interface Mismatch {
  match: false;
  message: Message;
}

export type MatchResult = Match | Mismatch;
