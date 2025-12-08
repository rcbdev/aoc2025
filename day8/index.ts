import { product } from "../utils/math";
import type { Input } from "../utils/types";

interface Link {
  from: number;
  to: number;
  distance: number;
}

export default async function run({ inputLines }: Input) {
  const junctions = inputLines.map((l) => l.split(",").map((x) => +x));

  const distance = (a: number[], b: number[]) =>
    Math.sqrt(
      Math.pow(a[0] - b[0], 2) +
        Math.pow(a[1] - b[1], 2) +
        Math.pow(a[2] - b[2], 2)
    );

  const distances: Link[] = [];

  for (let i = 0; i < junctions.length; i++) {
    for (let j = i + 1; j < junctions.length; j++) {
      distances.push({
        from: i,
        to: j,
        distance: distance(junctions[i], junctions[j]),
      });
    }
  }

  const sortedLinks = distances.sort((a, b) => a.distance - b.distance);
  const circuits: number[][] = [];

  let last: Link = {
    from: 0,
    to: 0,
    distance: 0,
  };

  const makeLink = (i: number) => {
    const link = sortedLinks[i];
    const cs = circuits.filter(
      (x) => x.includes(link.from) || x.includes(link.to)
    );
    last = link;

    if (cs.length === 0) {
      circuits.push([link.from, link.to]);
    } else {
      if (cs.length > 1) {
        const merge = cs[1].filter((x) => x !== link.from && x !== link.to);
        circuits.splice(circuits.indexOf(cs[1]), 1);
        cs[0].push(...merge);
      }
      if (!cs[0].includes(link.from)) {
        cs[0].push(link.from);
      }
      if (!cs[0].includes(link.to)) {
        cs[0].push(link.to);
      }
    }

    if (cs.length === 1) {
      if (cs[0].length === junctions.length) {
        return true;
      }
    }
    return false;
  };

  const rounds = 1000;

  for (let i = 0; i < rounds; i++) {
    makeLink(i);
  }

  const lengths = circuits.map((c) => c.length).sort((a, b) => b - a);

  console.log(product(lengths.slice(0, 3)));

  let i = rounds;
  while (true) {
    if (makeLink(i)) {
      break;
    }
    i++;
  }

  console.log(junctions[last.from][0] * junctions[last.to][0]);
}
