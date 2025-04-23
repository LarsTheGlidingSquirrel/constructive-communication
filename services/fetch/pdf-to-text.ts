import { execSync } from "child_process";

export function pdfToText(id: string) {
  const text = execSync(`pdftotext -enc UTF-8 "/tmp/${id}.pdf" -`);
  return text.toString();
}
