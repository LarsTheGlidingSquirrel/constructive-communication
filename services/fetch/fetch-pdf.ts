import { execSync } from "child_process";

const millisecondsToWait = 500;

export async function fetchPdf(url: string, id: string) {
  await new Promise((resolve) => setTimeout(resolve, millisecondsToWait));

  const command = `curl -f --output "/tmp/${id}.pdf" "${url}"`;
  execSync(command, { stdio: "ignore" });
}
