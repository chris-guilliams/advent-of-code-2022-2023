// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { Solution } from "./index";

expect.extend(matchers);

test("solve test input", () => {
  const solution = new Solution().solve("./src/test-input.txt");
  expect(solution).toBe(70);
});

test("getPriorityScore", () => {
  const solution = new Solution();
  let score = solution.getPriorityScore("a");
  expect(score).toBe(1);
  score = solution.getPriorityScore("A");
  expect(score).toBe(27);
  score = solution.getPriorityScore("z");
  expect(score).toBe(26);
  score = solution.getPriorityScore("Z");
  expect(score).toBe(52);
  score = solution.getPriorityScore("p");
  expect(score).toBe(16);
  score = solution.getPriorityScore("L");
  expect(score).toBe(38);
  score = solution.getPriorityScore("P");
  expect(score).toBe(42);
  score = solution.getPriorityScore("v");
  expect(score).toBe(22);
  score = solution.getPriorityScore("t");
  expect(score).toBe(20);
  score = solution.getPriorityScore("s");
  expect(score).toBe(19);
});

test("solve input", () => {
  const solution = new Solution().solve("./src/input.txt");
  expect(solution).toBeDefined();
  console.log("The solution is: ", solution);
});
