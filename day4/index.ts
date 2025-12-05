import type { Input } from "../utils/types";

export default async function run({ inputLines }: Input) {
  const starting = inputLines.map((l) => l.split(""));

  const run = (map: string[][]) => {
    let count = 0;
    const next = map.map((x) => x.map((y) => y));

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === "@") {
          let c = -1;
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
              if (map[i + x]?.[j + y] === "@") {
                c++;
              }
            }
          }
          if (c < 4) {
            count++;
            next[i][j] = "x";
          }
        }
      }
    }

    return { count, next };
  };

  let lastRun = run(starting);
  console.log(lastRun.count);

  let total = 0;
  while (lastRun.count > 0) {
    total += lastRun.count;
    lastRun = run(lastRun.next);
  }

  console.log(total);
}
