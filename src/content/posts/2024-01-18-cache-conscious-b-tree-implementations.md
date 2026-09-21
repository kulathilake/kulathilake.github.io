---
title: Cache-Conscious B-Tree Implementations in Modern C++
date: 2024-01-18
category: Systems & Data Structures
tags:
  - C++
  - Data Structures
  - Performance
readTime: 7 min read
---

## Memory Hierarchy Considerations

When modern processor clock speeds far outpace main memory bus latency, branch predictability and L1 cache line occupancy dictate indexing performance.

Aligning internal B-tree nodes exactly to 64-byte hardware cache lines allows loading keys in a single memory transaction.

## SIMD Vectorized Node Search

By grouping keys into AVX-2 256-bit registers, we can evaluate multiple key comparisons simultaneously:

```cpp
#include <immintrin.h>

int find_key_index(const int32_t* keys, int count, int32_t target) {
    __m256i target_vec = _mm256_set1_epi32(target);
    __m256i keys_vec = _mm256_load_si256(reinterpret_cast<const __m256i*>(keys));
    __m256i cmp = _mm256_cmpgt_epi32(keys_vec, target_vec);
    int mask = _mm256_movemask_epi8(cmp);
    return mask == 0 ? count : __builtin_ctz(mask) / 4;
}
```

This virtually eliminates branch miss penalties in the inner search loop across dense in-memory key lookups.
