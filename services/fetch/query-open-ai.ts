import OpenAI from "openai";
import * as t from "io-ts";
import { CardDataType } from "@/app/types/CardData";

if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY was not set!");
const openAiKey = process.env.OPENAI_API_KEY;

export async function queryOpenAi(protocol: string) {
  const openai = new OpenAI({
    apiKey: openAiKey,
  });

  console.log("OpenAI query");
  const openAiResult = await openai.chat.completions.create(
    createFetchBody(protocol),
    { stream: false },
  );
  // const openAiResult = {
  //   choices: [
  //     {
  //       message: {
  //         refusal: false,
  //         content:
  //           '{"cards":[{"positiveOrNegativeFeedback":"positive","heading":"banana","explanation":"banana"}],"date":"01.01.1999"}',
  //       },
  //     },
  //   ],
  // };

  if (openAiResult.choices[0].message.refusal) {
    throw new Error("OpenAi refused query");
  }
  if (!openAiResult.choices[0].message.content) {
    throw new Error("OpenAi did not send content");
  }

  const responseStructuredOutput = JSON.parse(
    openAiResult.choices[0].message.content,
  );

  const ExpectedType = t.type({
    cards: t.array(CardDataType),
    date: t.string,
  });

  if (!ExpectedType.is(responseStructuredOutput))
    throw new Error("Response from OpenAI had unexpected structure.");

  return responseStructuredOutput;
}

function createFetchBody(
  protocol: string,
): OpenAI.Chat.ChatCompletionCreateParamsNonStreaming {
  const systemPrompt =
    "Du bist ein Experte im Bereich konstruktiver Kommunikation & konstruktivem Streit in der Politik. In einem Leitfaden hast du folgendes geschrieben: <leitfaden>An erster Stelle steht die Sachkunde. Diese wird vertieft, wenn man sich aus mehreren Quellen über den Streitgegenstand informiert. Das verhindert zudem Monoperspektivität. Die Erfahrung zeigt, dass Menschen umso radikalere Ansichten vertreten, je weniger sie über die streitige Sache genau Bescheid wissen. Sachkunde schließt Selbstzweifel nicht aus. Man sollte sich dessen bewusst sein, dass die Gegenseite Recht haben könnte. Sie könnte möglicherweise über Argumente verfügen, die das Nachdenken lohnen. Der Selbstzweifel verhindert auch, aus einem Gefühl der Überlegenheit heraus die eigene Perspektive zu verabsolutieren. In mehrfacher Hinsicht ist Selbstdisziplin wichtig. Sie sorgt dafür, dem Gegenüber zuzuhören, auf das von ihm Gesagte zu achten und ihm nicht ins Wort zu fallen. Sie bewirkt, dass ein Streit nicht in einen Kampf ausartet, also in einen Schlagabtausch, in dem es nur um die Niederringung oder die Beschämung der Gegenseite geht. Die Gegenseite sollte respektiert werden. Das verbietet persönliche Angriffe. Streit muss immer um die Sache gehen. Der Streit verliert an Qualität, wenn sich die Beteiligten vor allem von der Ablehnung der Person des Gegenübers leiten lassen. Emotionen dürfen entwickelt werden. Gleichwohl gehört zu einem zivilen Umgehen, die Äußerung von Gefühlen so weit einzuhegen, dass sie die Rechte anderer nicht beschädigen. Zuspitzungen wie auch polemische Bemerkungen können den Streit beleben. Sie müssen jedoch dosiert angewendet werden. Es muss insgesamt eine kommunikative Kultur herrschen, in der die Meinungsartikulation und der argumentative Austausch mit der Gegenseite als sinnvoll erfahren wird. [...] Verantwortungsvolle Meinungsbildung resultiert aus der Beachtung dreier Prinzipien. Erstens: Meinungen sollten so gebildet werden, dass sie auch wieder revidiert werden können. Zweitens: Meinungen sollten weitgehend selbstständig gebildet und nicht bloß von anderen übernommen werden. Drittens: Meinungen sollten auf der Grundlage der Kenntnis möglichst aller anderen Positionen gebildet werden.</leitfaden> Du bekommst einen Ausschnitt aus dem Sitzungsprotokoll des deutschen Bundestags. Reaktionen der Zuhörer während der Rede sind in runden Klammern notiert.\nDeine Aufgabe ist: Hebe Probleme und Highlights in der Kommunikation der Politiker hervor. Erkläre, warum diese für eine konstruktive Kommunikation wichtig sind und gib Empfehlungen. Zitiere die entsprechenden Stellen im Protokoll. Bei der Analyse geht es dir nicht um die Inhalte und Themen, sondern allein darum, wie konstruktiv die Kommunikation ist.";

  return {
    // model: "gpt-4o-mini",
    model: "o3-mini",
    messages: [
      {
        role: "developer",
        content: systemPrompt,
      },
      {
        role: "user",
        content: protocol,
      },
    ],
    n: 1, // Generate one choice
    response_format: {
      type: "json_schema",
      json_schema: {
        strict: true,
        name: "analysis",
        schema: {
          type: "object",
          properties: {
            cards: {
              type: "array",
              description: "Ein array mit 3-6 Elementen",
              items: {
                type: "object",
                properties: {
                  positiveOrNegativeFeedback: {
                    type: "string",
                    description:
                      "'positive' bei einem lobenswertes Bespiel konstruktiver Kommunikation. 'negative' wenn die Kommunikation nicht konstruktiv war.",
                    enum: ["positive", "negative"],
                  },
                  heading: {
                    type: "string",
                    description:
                      "Eine Überschrift. Zum Beispiel 'Mangelnde Selbstreflexion' oder 'Unzureichende Berücksichtigung der Gegenargumente'",
                  },
                  explanation: {
                    type: "string",
                    description:
                      "Eine Erklärung in 3-4 Sätzen zu einem wichtigen Aspekt bei konstruktiver Kommunikation in der Politik. Enthält ggf. Zitate aus dem Protokoll. Gibt außerdem Empfehlungen. Wichtig: Nennt keine Abgeordneten oder Parteien beim Namen.",
                  },
                },
                required: [
                  "positiveOrNegativeFeedback",
                  "heading",
                  "explanation",
                ],
                additionalProperties: false,
              },
            },
            date: {
              type: "string",
              description:
                "Das Datum der Sitzung in folgender Schreibweise. Beispiel: 21.03.2025",
            },
          },
          required: ["cards", "date"],
          additionalProperties: false,
        },
      },
    },
  };
}
