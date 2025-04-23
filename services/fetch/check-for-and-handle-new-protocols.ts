import { getRedisClient } from "@/app/api/redis-client";
import { fetchPdf } from "./fetch-pdf";
import { pdfToText } from "./pdf-to-text";
import { queryOpenAi } from "./query-open-ai";
import { saveToRedis } from "./save-to-redis";

if (!process.env.MIN_PARLIAMENT_SESSION_ID)
  throw new Error("MIN_PARLIAMENT_SESSION_ID was not set!");
const minParliamentSessionId = process.env.MIN_PARLIAMENT_SESSION_ID;

if (!process.env.MAX_PARLIAMENT_SESSION_ID)
  throw new Error("MAX_PARLIAMENT_SESSION_ID was not set!");
const maxParliamentSessionId = process.env.MAX_PARLIAMENT_SESSION_ID;

export async function checkForAndHandleNewProtocols() {
  console.log("Checking for new protocols");

  const redisClient = await getRedisClient();

  const existingRedisKeys = await redisClient.keys("bundestagssitzung:*");

  for (let wahlperiode = 1; wahlperiode < 40; wahlperiode++) {
    const wahlperiodeString = makeTwoDigit(wahlperiode);
    for (let sitzungsnummer = 1; sitzungsnummer < 1000; sitzungsnummer++) {
      const sitzungsnummerString = makeThreeDigit(sitzungsnummer);

      const id = `${wahlperiodeString}${sitzungsnummerString}`;
      const key = `bundestagssitzung:${id}`;

      if (id < minParliamentSessionId) {
        // Continue because minimum id was not reached yet
        continue;
      }
      if (id > maxParliamentSessionId) {
        // End loop because all ids from now will be bigger than max id
        return;
      }

      if (existingRedisKeys.includes(key)) {
        continue;
      }

      const url = `https://dserver.bundestag.de/btp/${wahlperiodeString}/${id}.pdf`;

      try {
        await fetchPdf(url, id);
      } catch {
        // Continue with next 'Wahlperiode' because probably reached last parliament session for this 'Wahlperiode'
        break;
      }

      const protocolText = pdfToText(id);

      const openAiOutput = await queryOpenAi(protocolText);

      await saveToRedis({
        key,
        url,
        date: openAiOutput.date,
        cards: openAiOutput.cards,
      });
    }
  }
}

function makeTwoDigit(num: number) {
  const numString = String(num);
  if (numString.length === 1) {
    return `0${numString}`;
  }
  if (numString.length === 2) {
    return numString;
  }

  throw new Error("Unexpected length of number string");
}

function makeThreeDigit(num: number) {
  const numString = String(num);
  if (numString.length === 1) {
    return `00${numString}`;
  }
  if (numString.length === 2) {
    return `0${numString}`;
  }
  if (numString.length === 3) {
    return numString;
  }

  throw new Error("Unexpected length of number string");
}
