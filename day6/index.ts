import { product, sum } from "../utils/math";
import type { Input } from "../utils/types";

export default async function run({ inputLines }: Input) {
  const opMap = {
    "+": sum,
    "*": product,
  };

  const numbers = inputLines.slice(0, inputLines.length - 1).map((l) =>
    l
      .trim()
      .split(/\s+/)
      .map((x) => +x)
  );
  const operations = inputLines.at(-1)!.trim().split(/\s+/) as ("+" | "*")[];

  const results = numbers[0].map((_, i) =>
    opMap[operations[i]](numbers.map((n) => n[i]))
  );

  console.log(sum(results));

  const columnWidths = (inputLines.at(-1)! + " ")
    .split(/[*+]/)
    .slice(1)
    .map((x) => x.length);

  let index = 0;
  const results2 = numbers[0].map((_, i) => {
    const nums = [];
    const length = columnWidths[i];
    for (let i = index; i < index + length; i++) {
      nums.push(
        +inputLines
          .slice(0, inputLines.length - 1)
          .map((l) => l[i])
          .filter((x) => x !== " ")
          .join("")
      );
    }
    index += length + 1;
    return opMap[operations[i]](nums);
  });

  console.log(sum(results2));
}
