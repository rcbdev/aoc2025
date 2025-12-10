import { sum } from "../utils/math";
import type { Input } from "../utils/types";
import { solve } from "yalps";

const parseLine = (line: string) => {
  const target = parseInt(
    line
      .substring(1, line.lastIndexOf("]"))
      .replaceAll(".", "0")
      .replaceAll("#", "1")
      .split("")
      .reverse()
      .join(""),
    2
  );

  const buttons = line
    .substring(line.lastIndexOf("]") + 2, line.indexOf("{") - 1)
    .split(" ")
    .map((x) => {
      const on = x
        .replace("(", "")
        .replace(")", "")
        .split(",")
        .map((y) => +y);
      let number = 0;
      for (const part of on) {
        number += Math.pow(2, part);
      }
      return number;
    });

  const buttonsIndex = line
    .substring(line.lastIndexOf("]") + 2, line.indexOf("{") - 1)
    .split(" ")
    .map((x) =>
      x
        .replace("(", "")
        .replace(")", "")
        .split(",")
        .map((y) => +y)
    );

  const joltages = line
    .substring(line.indexOf("{") + 1, line.indexOf("}"))
    .split(",")
    .map((x) => +x);

  return { target, buttons, buttonsIndex, joltages };
};

export default async function run({ inputLines }: Input) {
  const results: number[] = [];

  for (const line of inputLines) {
    const problem = parseLine(line);
    let presses = 0;
    let states = new Set<number>([0]);
    outer: while (true) {
      const next = new Set<number>();
      presses++;
      for (const state of states) {
        for (const button of problem.buttons) {
          const newState = state ^ button;
          if (newState === problem.target) {
            break outer;
          }
          next.add(newState);
        }
      }
      states = next;
    }
    results.push(presses);
  }

  console.log(sum(results));

  const results2 = [];

  for (const line of inputLines) {
    const problem = parseLine(line);

    const solved = solve({
      direction: "minimize",
      objective: "p",
      constraints: Object.fromEntries(
        problem.joltages.map((x, i) => [`j${i}`, { equal: x }])
      ),
      variables: Object.fromEntries(
        problem.buttonsIndex.map((b, i) => [
          `b${i}`,
          {
            p: 1,
            ...Object.fromEntries(b.map((x) => [`j${x}`, 1])),
          },
        ])
      ),
      integers: problem.buttonsIndex.map((b, i) => `b${i}`),
    });
    results2.push(solved.result);
  }
  console.log(sum(results2));
}
