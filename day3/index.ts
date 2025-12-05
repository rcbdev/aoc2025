import { sum } from "../utils/math";
import type { Input } from "../utils/types";

export default async function run({ inputLines }: Input) {
  const getVoltage = (length: number) => (input: string) =>
    +input
      .split("")
      .map((x) => +x)
      .reduce((rv, curr, i) => {
        for (let j = 0; j < length; j++) {
          if (i < input.length - (length - 1 - j) && rv[j] < curr) {
            rv[j] = curr;
            for (let k = j + 1; k < length; k++) {
              rv[k] = 0;
            }
            return rv;
          }
        }
        return rv;
      }, new Array(length).fill(0))
      .join("");

  const solve = (length: number) => sum(inputLines.map(getVoltage(length)));

  console.log(solve(2));
  console.log(solve(12));
}
