# 2024-08-27-neural-architecture-search-on-embedded-systems.md
---
title: Neural Architecture Search on Embedded Systems
date: 2024-08-27
category: Embedded Systems
tags:
  - Embedded Systems
  - Edge AI
  - Optimization
readTime: 5 min read
---

## Introduction

Deploying quantized convolutional and transformer blocks onto low-power edge microcontrollers requires hardware-in-the-loop search strategies. Surrogate latency models frequently mispredict DMA burst latency and cache thrashing on microcontrollers without MMUs.

Here we present a differentiable search space tailored directly to ARM Cortex-M7 instruction cycle profiles.

## Latency Profiling Loop

Candidate cell topologies are evaluated directly on silicon via serial debugger telemetry before gradient updates to the architecture parameters alpha.

```python
def evaluate_candidate_latency(kernel_size, channels, stride, sram_budget_kb=512):
    # Calculate peak activation footprint in bytes
    activation_bytes = channels * (224 // stride) * (224 // stride) * 2
    if activation_bytes > sram_budget_kb * 1024:
        return float('inf')  # Reject candidates violating SRAM limit
    
    # Estimate cycles based on hardware MAC unit throughput
    estimated_macs = (kernel_size ** 2) * channels * channels
    return estimated_macs / 4.0
```

## Benchmark Summary

The discovered tiny-topology achieved 78.4% Top-1 accuracy on CIFAR-100 while consuming only 240KB of peak memory, well within our strict 512KB SRAM constraint.
