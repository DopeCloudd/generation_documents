// @ts-expect-error: written-number has no TypeScript types
import writtenNumber from "written-number";

export function numberToWordsFr(n: number): string {
  return writtenNumber(n, { lang: "fr" });
}
