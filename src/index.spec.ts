// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { Solution } from "./index";

expect.extend(matchers);

test("solve test input", () => {
  const solution = new Solution();
  const answer = solution.solve("./src/test-input.txt");
  expect(answer).toBe(21);
});

test("solve input", () => {
  const solution = new Solution().solve("./src/input.txt");
  expect(solution).toBeDefined();
  console.log("The solution is: ", solution);
});
