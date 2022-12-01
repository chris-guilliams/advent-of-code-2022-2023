// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import { Solution } from './index';

expect.extend(matchers);

test('solve test input', () => {
  const solution = new Solution().solve('./src/test-input.txt');
  expect(solution).toBe(24000);
});

test('solve input', () => {
  const solution = new Solution().solve('./src/input.txt');
  console.log(solution);

});
