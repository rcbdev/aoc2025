import { mod, sum } from "../utils/math";
import type { Input } from "../utils/types";

export default async function run({ inputLines }: Input) {
  let curr = 50;

  const parse = (x: string) => (x.startsWith("L") ? -1 : 1) * +x.substring(1);
  const mod100 = mod(100);

  const part1 = inputLines.map((item) => (curr = mod100(curr + parse(item))));

  console.log(part1.filter((l) => l === 0).length);

  curr = 50;

  const part2 = inputLines.map((item) => {
    const move = curr + parse(item);
    const wasZero = curr === 0;
    curr = mod100(move);

    if (move === 0) {
      return 1;
    }
    if (move > 0) {
      return Math.floor(move / 100);
    }
    return (wasZero ? 0 : 1) + Math.floor(Math.abs(move) / 100);
  });

  console.log(sum(part2));
}
