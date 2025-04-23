import { checkForAndHandleNewProtocols } from "./check-for-and-handle-new-protocols";

async function main() {
  if (!process.env.SLEEP_SECONDS) throw new Error("SLEEP_SECONDS was not set!");
  const sleepSeconds = parseInt(process.env.SLEEP_SECONDS);
  if (isNaN(sleepSeconds))
    throw new Error("SLEEP_SECONDS is not an integer number!");

  // Continuously check for new parliament session protocols
  while (true) {
    try {
      await checkForAndHandleNewProtocols();
    } catch (err) {
      console.log(err);
      // Continue and retry after sleeping
    }

    // Sleep
    await new Promise((resolve) => setTimeout(resolve, 1000 * sleepSeconds));
  }
}

main();
