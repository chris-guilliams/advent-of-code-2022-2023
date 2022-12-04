// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { Solution } from "./index";

expect.extend(matchers);

test("solve test input", () => {
  const solution = new Solution().solve("./src/test-input.txt");
  expect(solution).toBe(2);
});

test("contains", () => {
  const solution = new Solution();
  let result = solution.contains([56, 80], [9, 56]);
  expect(result).toBeFalse();
});

test("solve input", () => {
  const solution = new Solution().solve("./src/input.txt");
  expect(solution).toBeDefined();
  console.log("The solution is: ", solution);
});
