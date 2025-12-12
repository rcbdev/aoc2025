import { sum } from "../utils/math";
import type { Input } from "../utils/types";

export default async function run({ inputLines }: Input) {
  const gifts: string[][] = [];
  const problems = [];

  let inGift = false;
  let current: string[] = [];
  for (const line of inputLines) {
    if (line === "") {
      gifts.push(current);
      current = [];
      inGift = false;
      continue;
    }
    if (inGift) {
      current.push(line);
      continue;
    }
    if (line.indexOf(":") === line.length - 1) {
      inGift = true;
      continue;
    }
    problems.push({
      size: line
        .substring(0, line.indexOf(":"))
        .split("x")
        .map((x) => +x),
      gifts: line
        .substring(line.indexOf(":") + 2)
        .split(" ")
        .map((x) => +x),
    });
  }

  const giftVariants = gifts.map((g) => {
    const options = new Set<string>();
    let mainAndFlipped = [
      g.map((l) => l.split("")),
      g.map((l) => l.split("").toReversed()),
    ];

    for (let i = 0; i < 4; i++) {
      for (const grid of mainAndFlipped) {
        options.add(grid.map((l) => l.join("")).join("\n"));
      }
      mainAndFlipped = mainAndFlipped.map((g) =>
        g.map((l, i) => l.map((_, j) => g[g.length - 1 - j][i]))
      );
    }

    return options
      .values()
      .map((x) =>
        x
          .split("\n")
          .flatMap((l, i) =>
            l.split("").map((v, j) => ({ x: i, y: j, filled: v === "#" }))
          )
          .filter((x) => x.filled)
          .map(({ x, y }) => [x, y])
      )
      .toArray();
  });

  const giftSquares = giftVariants.map((g) => g[0].length);

  let working = 0;
  let notWorking = 0;
  let unknown = 0;
  for (const { size, gifts } of problems) {
    const total3x3 = Math.floor(size[0] / 3) * Math.floor(size[1] / 3);
    const totalSquares = size[0] * size[1];

    if (total3x3 >= sum(gifts)) {
      working++;
    } else if (totalSquares < sum(gifts.map((g, i) => giftSquares[i] * g))) {
      notWorking++;
    } else {
      console.log(size, total3x3, sum(gifts));
      unknown++;
    }
  }

  if (unknown === 0) {
    console.log(working);
  } else {
    throw new Error("Good luck");
  }
}
