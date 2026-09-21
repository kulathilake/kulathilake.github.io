import { CodeRepo, Publication } from '../types';

export const CODE_REPOSITORIES: CodeRepo[] = [
  {
    name: 'graph-traversal-engine',
    description: 'High-performance cache-conscious graph traversal algorithms in C++ and Python bindings.',
    language: 'C++',
    stars: 342,
    forks: 41,
    lastUpdated: 'March 2024',
    githubUrl: 'https://www.github.com/kulathilake'
  },
  {
    name: 'dist-graph-partitioner',
    description: 'Dynamic vertex-cut distributed partitioning pipeline with minimal replication overhead.',
    language: 'Rust',
    stars: 189,
    forks: 23,
    lastUpdated: 'April 2024',
    githubUrl: 'https://www.github.com/kulathilake'
  },
  {
    name: 'embedded-nas-mcu',
    description: 'Hardware-in-the-loop neural architecture search framework for ARM Cortex-M microcontrollers.',
    language: 'Python',
    stars: 521,
    forks: 67,
    lastUpdated: 'August 2024',
    githubUrl: 'https://www.github.com/kulathilake'
  },
  {
    name: 'cacheline-btree',
    description: 'Header-only modern C++20 B-tree with SIMD key scanning and deterministic memory alignment.',
    language: 'C++',
    stars: 275,
    forks: 31,
    lastUpdated: 'January 2024',
    githubUrl: 'https://www.github.com/kulathilake'
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    year: 2024,
    title: 'Adaptive Vertex Replication in Large Distributed Graph Networks',
    venue: 'IEEE International Conference on High Performance Computing, Data, & Analytics',
    authors: 'Shehan Kulathilake, R. Srinivasan, D. Mercer'
  },
  {
    year: 2023,
    title: 'Energy-Bounded Neural Architecture Search on Memory-Constrained Microcontrollers',
    venue: 'ACM Transactions on Embedded Computing Systems (TECS)',
    authors: 'Shehan Kulathilake, M. V. Tanaka'
  },
  {
    year: 2022,
    title: 'Cache Locality Improvements in Power-Law Graph Breadth-First Searches',
    venue: 'Workshop on Graph Algorithms and Systems Architecture (GASA)',
    authors: 'Shehan Kulathilake, K. Liang'
  }
];
