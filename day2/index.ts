import { sum } from "../utils/math";
import type { Input } from "../utils/types";

export default async function run({ inputLines }: Input) {
  const ranges = inputLines[0]
    .split(",")
    .map((x) => x.split("-").map((y) => +y));

  const repeats = (str: string, len: number) => {
    if (str.length % len !== 0) {
      return false;
    }
    let match = true;
    for (let j = 0; j < str.length; j++) {
      if (str[j] !== str[j % len]) {
        match = false;
        break;
      }
    }
    return match;
  };

  const invalid = ranges.flatMap((r) => {
    const ret = [];
    for (let i = r[0]; i <= r[1]; i++) {
      const num = i.toString();
      if (repeats(num, Math.round(num.length / 2))) {
        ret.push(i);
      }
    }
    return ret;
  });

  console.log(sum(invalid));

  const invalid2 = ranges.flatMap((r) => {
    const ret = [];
    for (let i = r[0]; i <= r[1]; i++) {
      const num = i.toString();
      for (let l = 1; l <= num.length / 2; l++) {
        if (repeats(num, l)) {
          ret.push(i);
          break;
        }
      }
    }
    return ret;
  });

  console.log(sum(invalid2));
}
