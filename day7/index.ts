import { sum } from "../utils/math";
import type { Input } from "../utils/types";

export default async function run({ inputLines }: Input) {
  let beams = new Map<number, number>();
  let splits = 0;

  beams.set(inputLines[0].indexOf("S"), 1);

  for (let i = 1; i < inputLines.length; i++) {
    const nextBeams = new Map<number, number>();
    const addBeam = (index: number, count: number) => {
      nextBeams.set(index, (nextBeams.get(index) ?? 0) + count);
    };
    for (const [index, count] of beams) {
      if (inputLines[i][index] === "^") {
        addBeam(index - 1, count);
        addBeam(index + 1, count);
        splits++;
      } else {
        addBeam(index, count);
      }
    }
    beams = nextBeams;
  }

  console.log(splits);
  console.log(sum(beams.values()));
}
