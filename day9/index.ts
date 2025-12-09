import type { Input } from "../utils/types";

const inside = (edges: number[][][], bbox: number[][]) => {
  for (const edge of edges) {
    if (
      bbox[0][0] < edge[1][0] &&
      bbox[1][0] > edge[0][0] &&
      bbox[0][1] < edge[1][1] &&
      bbox[1][1] > edge[0][1]
    ) {
      return false;
    }
  }
  return true;
};

const orderCoords = (coords: number[][]) =>
  coords.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

export default async function run({ inputLines }: Input) {
  const coords = inputLines.map((l) => l.split(",").map((x) => +x));
  const edges = coords
    .map((c, i, arr) => (i + 1 === arr.length ? [c, arr[0]] : [c, arr[i + 1]]))
    .filter((x) => x !== null)
    .map(orderCoords);

  let maxSize = 0;
  let maxSizeRestricted = 0;

  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const size =
        (Math.abs(coords[i][0] - coords[j][0]) + 1) *
        (Math.abs(coords[i][1] - coords[j][1]) + 1);
      if (size > maxSize) {
        maxSize = size;
      }
      if (size > maxSizeRestricted) {
        const bbox = [
          [
            Math.min(coords[i][0], coords[j][0]),
            Math.min(coords[i][1], coords[j][1]),
          ],
          [
            Math.max(coords[i][0], coords[j][0]),
            Math.max(coords[i][1], coords[j][1]),
          ],
        ];
        if (inside(edges, bbox)) {
          maxSizeRestricted = size;
        }
      }
    }
  }

  console.log(maxSize);
  console.log(maxSizeRestricted);
}
