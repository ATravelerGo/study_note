// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
const tupleNumber = [1, 2, 3, 4] as const
const sym1 = Symbol(1)
const sym2 = Symbol(2)
const tupleSymbol = [sym1, sym2] as const
const tupleMix = [1, '2', 3, '4', sym1] as const

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleSymbol>, { [sym1]: typeof sym1; [sym2]: typeof sym2 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4'; [sym1]: typeof sym1 }>>,
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>


/**
 * const temp = ["1", 2, 3, 5];
   type demo1 = (typeof temp);   (string | number)[]

 * const temp = ["1", 2, 3, 5] as const;
   type demo1 = (typeof temp);   ["1", 2, 3, 5]
 * 
 * 
 * const temp = ["1", 2, 3, 5] as const;
   type demo1 = (typeof temp)[number];   "1" | 2 | 3 | 5
 * 
 */


// ============= Your Code Here =============
type TupleToObject<T extends readonly any[]> = {
    [key in  T[number]]: key
}
