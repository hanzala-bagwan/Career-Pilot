import { CareerTrack } from '../types';

export const FULLSTACK_FRONTEND_BACKEND_TRACKS: CareerTrack[] = [
  {
    id: "frontend-engineer",
    title: "Principal Frontend & UI/UX Architect",
    shortCode: "FRONTEND",
    category: "Full-Stack & Web Engineering",
    description: "Master React 19, Next.js 15 Server Components, edge-rendered micro-frontends, Web Vitals, and enterprise design systems at scale.",
    iconName: "Globe",
    isFeatured: true,
    trackType: "frontend",
    primaryLanguages: ["TypeScript", "JavaScript", "HTML5", "CSS3"],
    frameworks: ["React 19", "Next.js 15", "Tailwind CSS", "Zustand", "Vite", "WebGL"],
    metrics: {
      averageSalary: "$210,000",
      marketGrowth: "+31% YoY",
      openRoles: "8,400+",
      matchAccuracy: "96.2%"
    },
    milestones: [
      {
        id: "fe-m1",
        phase: "Phase 01 • Completed",
        status: "completed",
        title: "Modern React 19, DOM Internals & Type-Safe UI",
        description: "React 19 Actions, useOptimistic, compiler memoization, custom hooks, and strict TypeScript generics.",
        duration: "3 Weeks",
        salaryBump: "+$18,000 / yr",
        skills: ["React 19 Actions", "TypeScript Generics", "CSS Grid/Subgrid", "A11y ARIA 1.2"],
        recommendedAction: "Architecture validated via Design System Monorepo benchmark."
      },
      {
        id: "fe-m2",
        phase: "Phase 02 • In Progress",
        status: "in_progress",
        title: "Next.js 15 App Router & Core Web Vitals Optimization",
        description: "RSC streaming, Partial Prerendering (PPR), Next.js Server Actions, sub-second LCP and zero-CLS performance tuning.",
        duration: "4 Weeks (75% Done)",
        salaryBump: "+$28,000 / yr",
        skills: ["RSC Streaming", "Next.js 15 PPR", "LCP Sub-1.2s", "INP Tuning", "Edge Middleware"],
        progressPercent: 75,
        recommendedAction: "Complete the React 19 optimistic update sandbox below to unlock Phase 03."
      },
      {
        id: "fe-m3",
        phase: "Phase 03 • Locked",
        status: "locked",
        title: "Micro-Frontends & High-Performance Canvas/WebGL",
        description: "Module Federation 2.0, state machine orchestrators (XState), offline-first IndexedDB caching, and WebGL 3D views.",
        duration: "4 Weeks",
        salaryBump: "+$42,000 / yr",
        skills: ["Module Federation", "XState v5", "WebGL / Three.js", "Service Workers", "Offline Sync"],
        prerequisite: "Complete Phase 02 & Performance Audit Verification"
      }
    ],
    codeSandbox: {
      language: "typescript",
      filename: "useOptimisticMutation.ts",
      kernelInfo: "Node.js v22 • React 19 RSC Compiler Active",
      initialCode: `import { useState, useTransition } from 'react';

// Type-safe Optimistic UI Mutation Hook
export function useOptimisticList<T extends { id: string }>(initialItems: T[]) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [isPending, startTransition] = useTransition();

  const addOptimisticItem = (newItem: T, serverAction: (item: T) => Promise<T>) => {
    // 1. Instantly update UI optimistically
    const previous = [...items];
    setItems((curr) => [newItem, ...curr]);

    // 2. Execute server action in transition
    startTransition(async () => {
      try {
        const persisted = await serverAction(newItem);
        setItems((curr) => curr.map((it) => (it.id === newItem.id ? persisted : it)));
      } catch (err) {
        // Rollback on server network failure
        setItems(previous);
      }
    });
  };

  return { items, addOptimisticItem, isPending };
}`,
      optimalSolution: `import { useState, useTransition, useCallback } from 'react';

export function useOptimisticList<T extends { id: string }>(initialItems: T[]) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<Error | null>(null);

  const addOptimisticItem = useCallback(
    (newItem: T, serverAction: (item: T) => Promise<T>) => {
      const rollback = items;
      setItems((curr) => [newItem, ...curr]);
      setError(null);

      startTransition(async () => {
        try {
          const verified = await serverAction(newItem);
          setItems((curr) =>
            curr.map((it) => (it.id === newItem.id ? verified : it))
          );
        } catch (err) {
          setItems(rollback);
          setError(err instanceof Error ? err : new Error('Mutation failed'));
        }
      });
    },
    [items]
  );

  return { items, addOptimisticItem, isPending, error };
}`,
      unitTestExpected: "Asserting Optimistic UI: zero lag instant render, rollback invariant passed, 0 memory leaks.",
      hints: [
        { id: 1, title: "Rollback Invariant", description: "Always capture snapshot state before applying the speculative update." },
        { id: 2, title: "Transition Concurrency", description: "Wrap server network promises inside React 19 startTransition to avoid blocking main thread." },
        { id: 3, title: "Identity Re-keying", description: "Replace optimistic client temporary IDs with persistent UUIDs returned by the backend." }
      ],
      ast: [
        { name: "useOptimisticList", type: "HookDeclaration", children: [{ name: "startTransition", type: "ConcurrentScheduler" }, { name: "rollbackState", type: "SnapshotGuard" }] }
      ]
    },
    quizQuestions: [
      {
        id: "fe-q1",
        domain: "React 19 & RSC",
        scenario: "You are designing an e-commerce catalog with 50,000 products needing instantaneous search and zero bundle impact on initial page load.",
        question: "Which rendering architecture best guarantees sub-second LCP and zero client JavaScript overhead for static catalog tiles?",
        options: [
          "Client-Side Rendering (CSR) with standard useEffect fetching",
          "React Server Components (RSC) with streaming Suspense boundaries and Partial Prerendering",
          "Single Page App with client-side Redux store hydrating all 50,000 items",
          "Static site generation re-building all 50k HTML pages on every search keystroke"
        ],
        correctIndex: 1,
        explanation: "RSC executes entirely on the server and streams pure HTML without shipping component code to the client. Combined with PPR and Suspense, the page achieves sub-second LCP."
      },
      {
        id: "fe-q2",
        domain: "Core Web Vitals",
        scenario: "Your checkout funnel reports an Interaction to Next Paint (INP) score of 420ms (Poor), causing user drop-off during discount code redemption.",
        question: "What is the most effective architectural fix to lower INP below the 200ms 'Good' threshold?",
        options: [
          "Convert all CSS classes into inline style tags",
          "Break long task executions using React 19 startTransition or scheduler.yield(), and optimistically update the coupon UI badge",
          "Run an infinite while-loop until the coupon response resolves",
          "Disable all JavaScript animations completely across the entire app"
        ],
        correctIndex: 1,
        explanation: "Yielding control to the main thread via scheduler.yield() or startTransition unblocks browser painting and keeps the main thread responsive, dropping INP under 200ms."
      }
    ],
    radarAxes: [
      { axis: "React 19 & Next.js", score: 95, benchmark: 90 },
      { axis: "Web Vitals & LCP", score: 92, benchmark: 88 },
      { axis: "Design Systems & CSS", score: 94, benchmark: 89 },
      { axis: "State & Architecture", score: 88, benchmark: 92 },
      { axis: "Testing & Security", score: 86, benchmark: 85 }
    ],
    skillsBreakdown: [
      { id: "fe-s1", name: "React 19 Server Components", category: "mastered", level: "L6 Expert", statusLabel: "Production Verified", productionTier: true },
      { id: "fe-s2", name: "Next.js 15 App Router & PPR", category: "mastered", level: "L6 Expert", statusLabel: "Benchmarked", productionTier: true },
      { id: "fe-s3", name: "Core Web Vitals & INP Tuning", category: "progress", level: "L5 Senior", statusLabel: "In Progress (82%)", progressPercent: 82, sprintDuration: "10 Days" },
      { id: "fe-s4", name: "Module Federation Micro-Frontends", category: "progress", level: "L5 Senior", statusLabel: "In Progress (64%)", progressPercent: 64, sprintDuration: "14 Days" },
      { id: "fe-s5", name: "WebGL / Three.js 3D Shaders", category: "missing", level: "Target L6", statusLabel: "High Impact Gap", highImpact: true, sprintDuration: "12 Days" }
    ],
    interviewScenario: {
      questionText: "How do you architect a high-traffic enterprise design system monorepo supporting 20 product squads while maintaining strict zero-CLS and sub-100ms render performance?",
      specialization: "Design Systems & Next.js 15 Performance",
      detectedKeywords: ["Design Tokens", "React Server Components", "Zero Runtime CSS", "Module Federation", "Tree-shaking"],
      transcript: "We isolate design tokens using StyleX or Tailwind compile-time transforms to ensure zero-runtime overhead. Shared UI primitives are packaged as pure React Server Components where possible, preventing client bundle bloat across all 20 squad applications.",
      coachTip: "Highlight bundle size budgets per package and visual regression CI pipelines."
    },
    salaryBands: [
      { level: "L4", title: "Frontend Engineer III", baseSalary: 145000, equity: 45000, totalComp: 190000, yoyGrowth: "+11%" },
      { level: "L5", title: "Senior Frontend Architect", baseSalary: 185000, equity: 95000, totalComp: 280000, yoyGrowth: "+18%" },
      { level: "L6", title: "Principal Frontend Architect", baseSalary: 235000, equity: 185000, totalComp: 420000, yoyGrowth: "+27%" },
      { level: "L7", title: "Distinguished UI Technologist", baseSalary: 285000, equity: 340000, totalComp: 625000, yoyGrowth: "+35%" }
    ]
  },
  {
    id: "backend-engineer",
    title: "Principal Backend & Distributed Systems Architect",
    shortCode: "BACKEND",
    category: "Full-Stack & Web Engineering",
    description: "Architect ultra-low-latency backend microservices, event-driven streaming with Apache Kafka, sharded PostgreSQL 17, and high-concurrency Go/Python services.",
    iconName: "Server",
    isFeatured: true,
    trackType: "backend",
    primaryLanguages: ["Go", "Python", "SQL", "TypeScript"],
    frameworks: ["FastAPI", "Gin", "PostgreSQL 17", "Redis", "Apache Kafka", "gRPC", "Docker"],
    metrics: {
      averageSalary: "$235,000",
      marketGrowth: "+36% YoY",
      openRoles: "9,800+",
      matchAccuracy: "97.4%"
    },
    milestones: [
      {
        id: "be-m1",
        phase: "Phase 01 • Completed",
        status: "completed",
        title: "High-Throughput API Gateways & Relational Database Tuning",
        description: "PostgreSQL 17 B-Tree/BRIN indexing, connection pooling (PgBouncer), gRPC bidirectional streaming, and schema migrations.",
        duration: "3 Weeks",
        salaryBump: "+$20,000 / yr",
        skills: ["PostgreSQL 17", "gRPC Protocols", "PgBouncer", "Zero-Downtime Migrations"],
        recommendedAction: "ACID transactions & multi-master replication benchmark verified."
      },
      {
        id: "be-m2",
        phase: "Phase 02 • In Progress",
        status: "in_progress",
        title: "Distributed Caching, Redlock & Event Streaming",
        description: "Redis cluster partitioning, distributed Redlock mutual exclusion, Apache Kafka log partitions, exactly-once semantics.",
        duration: "4 Weeks (70% Done)",
        salaryBump: "+$32,000 / yr",
        skills: ["Apache Kafka", "Redis Cluster", "Distributed Locks", "Idempotent Consumers"],
        progressPercent: 70,
        recommendedAction: "Complete the Go concurrency worker pool sandbox below."
      },
      {
        id: "be-m3",
        phase: "Phase 03 • Locked",
        status: "locked",
        title: "Saga Distributed Transactions & Sharded Databases",
        description: "Two-Phase Commit (2PC) vs Saga choreography, event sourcing with CQRS, and Raft consensus micro-kernels.",
        duration: "4 Weeks",
        salaryBump: "+$45,000 / yr",
        skills: ["Saga Orchestrator", "CQRS / Event Sourcing", "Raft Consensus", "Chaos Engineering"],
        prerequisite: "Complete Phase 02 & Kafka Exactly-Once Checkpoint"
      }
    ],
    codeSandbox: {
      language: "go",
      filename: "concurrent_worker_pool.go",
      kernelInfo: "Go 1.23 • Goroutine Runtime & Channel Multiplexer Ready",
      initialCode: `package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

type Job struct {
	ID    int
	Data  string
}

type Result struct {
	JobID  int
	Output string
	Err    error
}

// WorkerPool dispatches high-throughput tasks across N concurrent goroutines
func StartWorkerPool(ctx context.Context, numWorkers int, jobs <-chan Job, results chan<- Result) {
	var wg sync.WaitGroup
	for w := 1; w <= numWorkers; w++ {
		wg.Add(1)
		go func(workerID int) {
			defer wg.Done()
			for {
				select {
				case <-ctx.Done():
					return
				case job, ok := <-jobs:
					if !ok {
						return
					}
					// Process job safely
					res := Result{JobID: job.ID, Output: fmt.Sprintf("Processed by worker %d", workerID)}
					results <- res
				}
			}
		}(w)
	}
	wg.Wait()
}`,
      optimalSolution: `package main

import (
	"context"
	"fmt"
	"sync"
)

type Job struct {
	ID   int
	Data string
}

type Result struct {
	JobID  int
	Output string
	Err    error
}

func StartWorkerPool(ctx context.Context, numWorkers int, jobs <-chan Job, results chan<- Result) {
	var wg sync.WaitGroup
	for w := 1; w <= numWorkers; w++ {
		wg.Add(1)
		go func(workerID int) {
			defer wg.Done()
			for {
				select {
				case <-ctx.Done():
					return
				case job, ok := <-jobs:
					if !ok {
						return
					}
					select {
					case results <- Result{JobID: job.ID, Output: fmt.Sprintf("Worker %d: OK", workerID)}:
					case <-ctx.Done():
						return
					}
				}
			}
		}(w)
	}
	go func() {
		wg.Wait()
		close(results)
	}()
}`,
      unitTestExpected: "Goroutine Worker Pool: 50,000 jobs completed across 16 workers in 42ms. Zero deadlock or channel leak detected.",
      hints: [
        { id: 1, title: "Channel Closure Pattern", description: "Always have a dedicated closer goroutine waiting on sync.WaitGroup to close the output channel." },
        { id: 2, title: "Context Cancellation", description: "Check ctx.Done() during both read from jobs and write to results to avoid goroutine leaks." },
        { id: 3, title: "Worker Sizing", description: "For I/O bound tasks, size workers to 2x-4x vCPU count; for CPU-bound tasks, match GOMAXPROCS." }
      ],
      ast: [
        { name: "StartWorkerPool", type: "FunctionDeclaration", children: [{ name: "sync.WaitGroup", type: "ConcurrencyBarrier" }, { name: "select", type: "NonBlockingMux" }] }
      ]
    },
    quizQuestions: [
      {
        id: "be-q1",
        domain: "Distributed Transactions",
        scenario: "An order service must charge a credit card and reserve inventory in two independent microservices without distributed lock deadlocks.",
        question: "Which architectural pattern guarantees eventual consistency without holding long-lived blocking database locks?",
        options: [
          "Two-Phase Commit (2PC) with distributed XA transactions across public internet",
          "Saga Pattern with compensating transactions coordinated via Kafka events",
          "Synchronous HTTP calls inside a single database transaction block",
          "Client-side polling on a shared global MySQL table"
        ],
        correctIndex: 1,
        explanation: "The Saga pattern breaks distributed transactions into local steps with compensating rollbacks, ensuring high availability and zero lock contention."
      },
      {
        id: "be-q2",
        domain: "Database Indexing",
        scenario: "A PostgreSQL query filtering on created_at timestamp over 100M rows is running in 8.4 seconds instead of <50ms.",
        question: "Which index type is most space-efficient and performant for monotonically increasing time-series telemetry in PostgreSQL 17?",
        options: [
          "A full Hash Index on all columns",
          "A Block Range Index (BRIN) on created_at",
          "A standard GIN index with full-text vectors",
          "Disabling indexes completely to speed up sequential scans"
        ],
        correctIndex: 1,
        explanation: "BRIN indexes store minimum and maximum values per physical page range. For sorted time-series data, they take 99% less disk space than B-Trees and execute fast range scans."
      }
    ],
    radarAxes: [
      { axis: "Distributed Systems & Go", score: 94, benchmark: 92 },
      { axis: "Database & SQL Tuning", score: 96, benchmark: 90 },
      { axis: "Event Streaming (Kafka)", score: 91, benchmark: 88 },
      { axis: "High Concurrency & Caching", score: 95, benchmark: 91 },
      { axis: "API Design & gRPC", score: 93, benchmark: 87 }
    ],
    skillsBreakdown: [
      { id: "be-s1", name: "Go High-Concurrency Goroutines", category: "mastered", level: "L6 Expert", statusLabel: "Production Verified", productionTier: true },
      { id: "be-s2", name: "PostgreSQL 17 Query Optimization", category: "mastered", level: "L6 Expert", statusLabel: "Benchmarked", productionTier: true },
      { id: "be-s3", name: "Apache Kafka Event Sourcing", category: "progress", level: "L5 Senior", statusLabel: "In Progress (78%)", progressPercent: 78, sprintDuration: "10 Days" },
      { id: "be-s4", name: "Distributed Redlock & Caching", category: "progress", level: "L5 Senior", statusLabel: "In Progress (68%)", progressPercent: 68, sprintDuration: "12 Days" },
      { id: "be-s5", name: "Raft Consensus Protocols", category: "missing", level: "Target L6", statusLabel: "High Impact Gap", highImpact: true, sprintDuration: "14 Days" }
    ],
    interviewScenario: {
      questionText: "How do you architect a global payment processing backend handling 100,000 transactions per second with strictly zero duplicate charges during network partition failovers?",
      specialization: "Idempotent Distributed Systems & Payment Rails",
      detectedKeywords: ["Idempotency Keys", "Two-Phase Commit", "Saga Pattern", "Redis Distributed Lock", "Kafka Outbox Pattern"],
      transcript: "We enforce atomic idempotency keys at the API gateway layer using Redis with distributed TTLs. Database writes use the Transactional Outbox Pattern to guarantee exactly-once message dispatch into Kafka, eliminating duplicate execution.",
      coachTip: "Explain failure handling when the payment gateway times out vs when it explicitly rejects."
    },
    salaryBands: [
      { level: "L4", title: "Backend Engineer III", baseSalary: 155000, equity: 55000, totalComp: 210000, yoyGrowth: "+13%" },
      { level: "L5", title: "Senior Backend Architect", baseSalary: 200000, equity: 110000, totalComp: 310000, yoyGrowth: "+21%" },
      { level: "L6", title: "Principal Backend Architect", baseSalary: 250000, equity: 220000, totalComp: 470000, yoyGrowth: "+31%" },
      { level: "L7", title: "Distinguished Systems Architect", baseSalary: 310000, equity: 420000, totalComp: 730000, yoyGrowth: "+39%" }
    ]
  }
];

export const LANGUAGE_ROADMAP_TRACKS: CareerTrack[] = [
  {
    id: "python-track",
    title: "Python Systems & Backend Architect",
    shortCode: "PY-ARCH",
    category: "Programming Language Roadmaps",
    description: "Deep dive into CPython internals, async IO event loops, FastAPI microservices, Celery distributed tasks, and PyTorch data processing pipelines.",
    iconName: "BrainCircuit",
    trackType: "language",
    primaryLanguages: ["Python", "SQL"],
    frameworks: ["FastAPI", "Celery", "SQLAlchemy 2.0", "PyTorch", "Polars", "Redis", "Docker"],
    metrics: { averageSalary: "$195,000", marketGrowth: "+32% YoY", openRoles: "11,200+", matchAccuracy: "96.8%" },
    milestones: [
      { id: "py-m1", phase: "Phase 01 • Completed", status: "completed", title: "CPython Memory Model & GIL Architecture", description: "Ref-counting, generational GC, descriptor protocols, and sub-interpreters.", duration: "3 Weeks", salaryBump: "+$15k/yr", skills: ["CPython Internals", "Asyncio Event Loop", "Type Hinting (PEP 695)"] },
      { id: "py-m2", phase: "Phase 02 • In Progress", status: "in_progress", title: "High-Throughput FastAPI & Distributed Queues", description: "Pydantic V2 Rust core, Celery with Redis brokers, and zero-copy Polars dataframe operations.", duration: "4 Weeks", salaryBump: "+$26k/yr", skills: ["FastAPI Async", "Pydantic V2", "Celery Distributed Workers", "Polars"], progressPercent: 72 },
      { id: "py-m3", phase: "Phase 03 • Locked", status: "locked", title: "C-Extensions & PyTorch Custom C++ Ops", description: "Cython bindings, C Foreign Function Interface (cffi), and PyTorch TorchScript custom kernels.", duration: "4 Weeks", salaryBump: "+$38k/yr", skills: ["Cython", "CFFI", "PyTorch C++ Extensions"] }
    ],
    codeSandbox: {
      language: "python",
      filename: "async_pipeline_worker.py",
      kernelInfo: "Python 3.12 • AsyncIO High-Speed Event Loop",
      initialCode: `import asyncio
from typing import List, AsyncGenerator

async def data_stream_producer() -> AsyncGenerator[int, None]:
    for i in range(10):
        await asyncio.sleep(0.01)
        yield i * 2

async def process_batch(batch: List[int]) -> int:
    return sum(batch)

async def main():
    batch = []
    async for item in data_stream_producer():
        batch.append(item)
    total = await process_batch(batch)
    print(f"Total computed: {total}")

if __name__ == "__main__":
    asyncio.run(main())`,
      optimalSolution: `import asyncio
from typing import List, AsyncGenerator

async def data_stream_producer() -> AsyncGenerator[int, None]:
    for i in range(10):
        await asyncio.sleep(0.01)
        yield i * 2

async def process_batch(batch: List[int]) -> int:
    return sum(batch)

async def main():
    batch = []
    async for item in data_stream_producer():
        batch.append(item)
    total = await process_batch(batch)
    print(f"Total computed: {total}")

if __name__ == "__main__":
    asyncio.run(main())`,
      unitTestExpected: "Python Async Pipeline: processed 10 stream events with 0 event loop blocking. Verified.",
      hints: [{ id: 1, title: "Avoid Blocking I/O", description: "Never call blocking time.sleep() inside async coroutines; use asyncio.sleep()." }],
      ast: [{ name: "main", type: "AsyncFunction" }]
    },
    quizQuestions: [
      { id: "py-q1", domain: "Python Concurrency", scenario: "You have a CPU-intensive matrix calculation and an I/O intensive API gateway.", question: "How should you orchestrate both in Python 3.12 without freezing the web server?", options: ["Use threading for the CPU matrix and time.sleep for the API", "Run the CPU calculation in a ProcessPoolExecutor/multiprocessing and the API in an AsyncIO event loop", "Use global variables and run everything in a single async def function", "Disable the GIL by editing the source code manually at runtime"], correctIndex: 1, explanation: "ProcessPoolExecutor bypasses the Global Interpreter Lock (GIL) across CPU cores, while AsyncIO manages concurrent I/O efficiently." }
    ],
    radarAxes: [{ axis: "Asyncio & Concurrency", score: 94, benchmark: 90 }, { axis: "FastAPI & Microservices", score: 96, benchmark: 89 }, { axis: "Data Pipelines & Polars", score: 90, benchmark: 88 }, { axis: "CPython Memory & GIL", score: 88, benchmark: 86 }, { axis: "Testing & Pytest", score: 92, benchmark: 87 }],
    skillsBreakdown: [{ id: "py-s1", name: "AsyncIO & High-Concurrency Python", category: "mastered", level: "L6 Expert", statusLabel: "Verified", productionTier: true }, { id: "py-s2", name: "FastAPI & Pydantic V2 Core", category: "mastered", level: "L6 Expert", statusLabel: "Benchmarked", productionTier: true }],
    interviewScenario: { questionText: "Explain how Python 3.12's sub-interpreters and per-interpreter GIL impact multi-core scalability compared to multiprocessing.", specialization: "CPython Internals & Concurrency", detectedKeywords: ["Per-Interpreter GIL", "PEP 684", "Shared Memory", "Sub-interpreters"], transcript: "Python 3.12 introduced per-interpreter GIL via PEP 684, allowing true multi-core parallel execution in a single OS process without inter-process IPC overhead.", coachTip: "Contrast sub-interpreter memory isolation with traditional multiprocessing." },
    salaryBands: [
      { level: "L4", title: "Python Engineer III", baseSalary: 140000, equity: 40000, totalComp: 180000, yoyGrowth: "+12%" },
      { level: "L5", title: "Senior Python Architect", baseSalary: 180000, equity: 85000, totalComp: 265000, yoyGrowth: "+19%" },
      { level: "L6", title: "Principal Python Systems Architect", baseSalary: 230000, equity: 175000, totalComp: 405000, yoyGrowth: "+29%" },
      { level: "L7", title: "Distinguished Python Architect", baseSalary: 280000, equity: 310000, totalComp: 590000, yoyGrowth: "+36%" }
    ]
  },
  {
    id: "java-track",
    title: "Java & Spring Boot 3 Enterprise Architect",
    shortCode: "JAVA-ARCH",
    category: "Programming Language Roadmaps",
    description: "Enterprise microservices with Spring Boot 3.3, Java 21 Virtual Threads (Project Loom), GraalVM native images, and Apache Kafka clusters.",
    iconName: "Server",
    trackType: "language",
    primaryLanguages: ["Java", "SQL"],
    frameworks: ["Spring Boot 3.3", "Spring Cloud", "Hibernate", "Apache Kafka", "Docker", "GraalVM"],
    metrics: { averageSalary: "$190,000", marketGrowth: "+24% YoY", openRoles: "14,000+", matchAccuracy: "95.5%" },
    milestones: [
      { id: "jv-m1", phase: "Phase 01 • Completed", status: "completed", title: "Java 21 Virtual Threads & Concurrency", description: "Project Loom virtual threads, structured concurrency, and scoped values.", duration: "3 Weeks", salaryBump: "+$16k/yr", skills: ["Java 21 Virtual Threads", "Structured Concurrency", "JVM Memory Tuning"] },
      { id: "jv-m2", phase: "Phase 02 • In Progress", status: "in_progress", title: "Spring Boot 3.3 & GraalVM Native Compilation", description: "AOT compilation, Spring Security 6, and resilient Kafka producers.", duration: "4 Weeks", salaryBump: "+$28k/yr", skills: ["Spring Boot 3.3", "GraalVM Native", "Spring Cloud Gateway"], progressPercent: 68 },
      { id: "jv-m3", phase: "Phase 03 • Locked", status: "locked", title: "High-Volume Event Driven Microservices", description: "CQRS with Axon framework, distributed tracing with OpenTelemetry, and zero-downtime Blue/Green deployments.", duration: "4 Weeks", salaryBump: "+$40k/yr", skills: ["Axon Framework", "OpenTelemetry", "Kubernetes Operators"] }
    ],
    codeSandbox: {
      language: "java",
      filename: "VirtualThreadExecutor.java",
      kernelInfo: "OpenJDK 21 • Project Loom Virtual Threads Active",
      initialCode: `import java.util.concurrent.Executors;
import java.util.stream.IntStream;

public class VirtualThreadExecutor {
    public static void main(String[] args) {
        // Run 10,000 lightweight virtual threads simultaneously
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            IntStream.range(0, 10_000).forEach(i -> {
                executor.submit(() -> {
                    Thread.sleep(10);
                    return i;
                });
            });
        }
        System.out.println("10,000 Virtual threads executed successfully!");
    }
}`,
      optimalSolution: `import java.util.concurrent.Executors;
import java.util.stream.IntStream;

public class VirtualThreadExecutor {
    public static void main(String[] args) {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            IntStream.range(0, 10_000).forEach(i -> {
                executor.submit(() -> {
                    Thread.sleep(10);
                    return i;
                });
            });
        }
        System.out.println("10,000 Virtual threads executed successfully!");
    }
}`,
      unitTestExpected: "Loom Benchmark: 10,000 virtual threads spawned with <12MB heap memory consumption.",
      hints: [{ id: 1, title: "Virtual Thread Invariant", description: "Do not pool virtual threads; create them on-demand per request." }],
      ast: [{ name: "VirtualThreadExecutor", type: "ClassDeclaration" }]
    },
    quizQuestions: [
      { id: "jv-q1", domain: "JVM Concurrency", scenario: "Your Spring Boot service is hitting 100% thread pool exhaustion under 2,000 concurrent blocking I/O calls.", question: "What is the most effective Java 21 feature to resolve thread exhaustion without rewriting to reactive code?", options: ["Increase OS thread pool size to 50,000 threads", "Switch to Java 21 Virtual Threads (newVirtualThreadPerTaskExecutor)", "Force Garbage Collection every 500ms", "Wrap all endpoints in synchronized blocks"], correctIndex: 1, explanation: "Virtual threads unmount from carrier threads during blocking I/O, allowing millions of concurrent tasks with minimal memory footprint." }
    ],
    radarAxes: [{ axis: "Spring Boot 3 & Microservices", score: 95, benchmark: 91 }, { axis: "Virtual Threads & Concurrency", score: 92, benchmark: 89 }, { axis: "JVM Tuning & GraalVM", score: 89, benchmark: 87 }, { axis: "Kafka & Event Streams", score: 93, benchmark: 90 }, { axis: "Clean Architecture", score: 94, benchmark: 88 }],
    skillsBreakdown: [{ id: "jv-s1", name: "Spring Boot 3.3 Microservices", category: "mastered", level: "L6 Expert", statusLabel: "Verified", productionTier: true }, { id: "jv-s2", name: "Java 21 Project Loom", category: "mastered", level: "L6 Expert", statusLabel: "Benchmarked", productionTier: true }],
    interviewScenario: { questionText: "Compare traditional Platform Threads with Java 21 Virtual Threads regarding memory footprint and context switching overhead.", specialization: "JVM Architecture & Concurrency", detectedKeywords: ["Carrier Thread", "Continuation", "Stack Chunk", "Unmount"], transcript: "Platform threads wrap 1:1 OS threads with ~1MB stack size. Virtual threads are managed entirely in user space by the JVM, consuming only a few hundred bytes when idle and unmounting on blocking I/O.", coachTip: "Mention pinning risks with synchronized blocks vs ReentrantLock." },
    salaryBands: [
      { level: "L4", title: "Java Engineer III", baseSalary: 140000, equity: 40000, totalComp: 180000, yoyGrowth: "+10%" },
      { level: "L5", title: "Senior Java Architect", baseSalary: 180000, equity: 80000, totalComp: 260000, yoyGrowth: "+17%" },
      { level: "L6", title: "Principal Enterprise Java Architect", baseSalary: 225000, equity: 160000, totalComp: 385000, yoyGrowth: "+26%" },
      { level: "L7", title: "Distinguished Java Architect", baseSalary: 275000, equity: 290000, totalComp: 565000, yoyGrowth: "+33%" }
    ]
  },
  {
    id: "csharp-dotnet-track",
    title: "C# & .NET 9 Enterprise Systems Architect",
    shortCode: "CS-ARCH",
    category: "Programming Language Roadmaps",
    description: "High-performance enterprise architecture with C# 12, .NET 9, ASP.NET Core minimal APIs, Entity Framework Core 9, and Azure cloud microservices.",
    iconName: "Cpu",
    trackType: "language",
    primaryLanguages: ["C#", "SQL"],
    frameworks: [".NET 9", "ASP.NET Core", "EF Core 9", "MediatR", "Azure Kubernetes", "Redis"],
    metrics: { averageSalary: "$185,000", marketGrowth: "+26% YoY", openRoles: "10,500+", matchAccuracy: "96.0%" },
    milestones: [
      { id: "cs-m1", phase: "Phase 01 • Completed", status: "completed", title: "C# 12 Language & Memory Optimization", description: "Span<T>, Memory<T>, ref structs, unsafe code pointers, and zero-allocation pipelines.", duration: "3 Weeks", salaryBump: "+$15k/yr", skills: ["Span<T>", "C# 12 Records", "Memory Profiling"] },
      { id: "cs-m2", phase: "Phase 02 • In Progress", status: "in_progress", title: "ASP.NET Core Minimal APIs & Clean Architecture", description: "MediatR CQRS, EF Core 9 compiled queries, and high-speed JSON serialization.", duration: "4 Weeks", salaryBump: "+$27k/yr", skills: ["ASP.NET Core Minimal APIs", "EF Core 9", "MediatR CQRS"], progressPercent: 70 },
      { id: "cs-m3", phase: "Phase 03 • Locked", status: "locked", title: "Cloud-Native Azure Microservices & SignalR", description: "Distributed caching with Azure Redis, event hubs, and high-frequency real-time SignalR sockets.", duration: "4 Weeks", salaryBump: "+$38k/yr", skills: ["Azure Kubernetes", "SignalR High-Scale", "Event Hubs"] }
    ],
    codeSandbox: {
      language: "csharp",
      filename: "ZeroAllocParser.cs",
      kernelInfo: ".NET 9.0 • RyuJIT Tier-1 High Performance Engine",
      initialCode: `using System;

public class ZeroAllocParser {
    public static int ParseFirstInt(ReadOnlySpan<char> span) {
        int delimiter = span.IndexOf(',');
        ReadOnlySpan<char> token = delimiter >= 0 ? span.Slice(0, delimiter) : span;
        return int.Parse(token);
    }

    public static void Main() {
        ReadOnlySpan<char> data = "420,999,1024".AsSpan();
        int val = ParseFirstInt(data);
        Console.WriteLine($"Extracted value: {val}");
    }
}`,
      optimalSolution: `using System;

public class ZeroAllocParser {
    public static int ParseFirstInt(ReadOnlySpan<char> span) {
        int delimiter = span.IndexOf(',');
        ReadOnlySpan<char> token = delimiter >= 0 ? span.Slice(0, delimiter) : span;
        return int.Parse(token);
    }

    public static void Main() {
        ReadOnlySpan<char> data = "420,999,1024".AsSpan();
        int val = ParseFirstInt(data);
        Console.WriteLine($"Extracted value: {val}");
    }
}`,
      unitTestExpected: "Span<T> Zero Allocation Test: 0 bytes garbage collector allocation detected. Verified.",
      hints: [{ id: 1, title: "Zero Allocations", description: "Using ReadOnlySpan<char> slices memory without creating new string allocations on the managed heap." }],
      ast: [{ name: "ZeroAllocParser", type: "ClassDeclaration" }]
    },
    quizQuestions: [
      { id: "cs-q1", domain: ".NET Memory Performance", scenario: "A high-frequency trading API processes 100,000 incoming JSON strings per second and suffers severe GC pause spikes.", question: "Which .NET type eliminates heap allocations when slicing contiguous memory chunks?", options: ["System.String.Substring()", "ReadOnlySpan<T> or Span<T>", "ArrayList", "Boxing to System.Object"], correctIndex: 1, explanation: "Span<T> is a ref struct allocated exclusively on the stack, allowing memory slicing with zero heap allocation and zero GC pressure." }
    ],
    radarAxes: [{ axis: ".NET 9 & ASP.NET Core", score: 95, benchmark: 90 }, { axis: "Memory & Span<T>", score: 92, benchmark: 88 }, { axis: "EF Core & SQL", score: 94, benchmark: 89 }, { axis: "Clean Architecture & CQRS", score: 91, benchmark: 87 }, { axis: "Azure Cloud Microservices", score: 89, benchmark: 86 }],
    skillsBreakdown: [{ id: "cs-s1", name: ".NET 9 Minimal APIs", category: "mastered", level: "L6 Expert", statusLabel: "Verified", productionTier: true }, { id: "cs-s2", name: "Span<T> Memory Tuning", category: "mastered", level: "L6 Expert", statusLabel: "Benchmarked", productionTier: true }],
    interviewScenario: { questionText: "How do you design a high-throughput financial transaction API using .NET 9 to ensure zero garbage collection pauses in the critical path?", specialization: ".NET 9 Low-Latency Architecture", detectedKeywords: ["Span<T>", "ValueTask", "ArrayPool", "GC KeepAlive", "Ref Structs"], transcript: "We utilize Span<T> and MemoryPool to reuse buffers without GC allocations, return ValueTask for cached results, and configure Server GC with dedicated CPU affinity.", coachTip: "Contrast Task vs ValueTask for high-frequency methods." },
    salaryBands: [
      { level: "L4", title: "C# Engineer III", baseSalary: 135000, equity: 35000, totalComp: 170000, yoyGrowth: "+11%" },
      { level: "L5", title: "Senior .NET Architect", baseSalary: 175000, equity: 75000, totalComp: 250000, yoyGrowth: "+18%" },
      { level: "L6", title: "Principal .NET Architect", baseSalary: 220000, equity: 155000, totalComp: 375000, yoyGrowth: "+26%" },
      { level: "L7", title: "Distinguished .NET Architect", baseSalary: 270000, equity: 280000, totalComp: 550000, yoyGrowth: "+33%" }
    ]
  }
];

export const ALL_EXPANDED_CAREER_TRACKS: CareerTrack[] = [
  ...FULLSTACK_FRONTEND_BACKEND_TRACKS,
  ...LANGUAGE_ROADMAP_TRACKS
];
