import type { Input } from "../utils/types";

export default async function run({ inputLines }: Input) {
  const connections = Object.fromEntries(
    inputLines.map((l) =>
      l.split(": ").map((a, i) => (i === 0 ? a : a.split(" ")))
    )
  );

  const pathsFromTo = (from: string, to: string) => {
    let state: Map<string, number> = new Map();
    state.set(from, 1);
    let total = 0;

    while (state.size > 0) {
      const next = new Map<string, number>();

      for (const [node, count] of state) {
        for (const newNode of connections[node]) {
          if (newNode === to) {
            total += count;
          } else if (newNode !== "out") {
            next.set(newNode, (next.get(newNode) ?? 0) + count);
          }
        }
      }

      state = next;
    }
    return total;
  };

  console.log(pathsFromTo("you", "out"));

  const option1 =
    pathsFromTo("svr", "fft") *
    pathsFromTo("fft", "dac") *
    pathsFromTo("dac", "out");
  const option2 =
    pathsFromTo("svr", "dac") *
    pathsFromTo("dac", "fft") *
    pathsFromTo("fft", "out");

  console.log(option1 + option2);
}
