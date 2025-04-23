import * as t from "io-ts";

export const CardDataType = t.type({
  positiveOrNegativeFeedback: t.union([
    t.literal("positive"),
    t.literal("negative"),
  ]),
  heading: t.string,
  explanation: t.string,
});

export type CardData = t.TypeOf<typeof CardDataType>;
