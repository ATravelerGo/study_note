import { expect, test, assert, describe } from 'vitest';
import { sum } from './utils';

test('加法函数测试', () => {
	expect(sum(1, 2)).toBe(3);
});

test.skip('加法函数测试', () => {
	expect(sum(1, 2)).toBe(3);
});
//test.skip 跳过运行某些测试

const isDev = process.env.NODE_ENV === 'development';
test.skipIf(isDev)('prod only test', () => {
	// 此测试仅在生产环境中运行。
});

const isDev1 = process.env.NODE_ENV === 'development';
test.runIf(isDev1)('dev only test', () => {
	//runIf 与skipIf 恰恰相反
	// 此测试仅在开发环境中运行。
});

test.only('只有这个要测试', () => {
	// 只有此测试（以及其他标记为 `only` 的测试）会被运行。
	assert.equal(Math.sqrt(4), 2);
});
// 标记为 `concurrent` 的两个测试将并行运行。
describe('suite', () => {
	test('serial test', async () => {
		/* ... */
	});
	test.concurrent('concurrent test 1', async () => {
		/* ... */
	});
	test.concurrent('concurrent test 2', async () => {
		/* ... */
	});
});
