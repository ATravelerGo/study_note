// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
]


// ============= Your Code Here =============
type MyExclude<T, U> = T extends U ? never : T

/**
 * 
 * T extends U ? never : T：如果 T 是 U 的子类型，就返回 never（表示被剔除了）
 *  'a' | 'b' | 'c' extends 'a' → 分别判断：
    'a' extends 'a' → ✅ → never  
    'b' extends 'a' → ❌ → 'b'  
    'c' extends 'a' → ❌ → 'c'  
    最终：'b' | 'c'
 * 
 * 
 * 
 */