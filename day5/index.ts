import { sum } from "../utils/math";
import type { Input } from "../utils/types";

export default async function run({ inputLines }: Input) {
  const freshRanges: number[][] = [];
  const freshIngredients: number[] = [];
  let ingredients = false;

  inputLines.forEach((line) => {
    if (line === "") {
      ingredients = true;
      return;
    }
    if (ingredients) {
      const ingredient = +line;
      const fresh = freshRanges.some(
        ([min, max]) => ingredient >= min && ingredient <= max
      );
      if (fresh) {
        freshIngredients.push(ingredient);
      }
    } else {
      freshRanges.push(line.split("-").map((x) => +x));
    }
  });
  console.log(freshIngredients.length);

  const freshRangesDeduped: number[][] = [];
  const sortedRanges = freshRanges.sort((a, b) => a[0] - b[0]);

  sortedRanges.forEach((range) => {
    let [min, max] = range;
    const last = freshRangesDeduped.at(-1);
    if (last && last[1] >= min) {
      min = last[1] + 1;
    }
    if (min <= max) {
      freshRangesDeduped.push([min, max]);
    }
  });

  console.log(sum(freshRangesDeduped.map(([min, max]) => max - min + 1)));
}
