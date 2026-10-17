import {
  TelemetryMetric,
  LiveFeedItem,
  MilestoneNode,
  CodeSandboxState,
  QuizQuestion,
  ResumeMetric,
  BulletPointRefinement,
  SkillItem,
  InterviewTelemetry,
  SalaryBand,
  MetroHub,
  CareerTrack
} from '../types';

export const TARGET_ROLES = [
  "Principal AI Systems Architect",
  "Lead Full-Stack Cloud Architect",
  "Staff DevOps & Platform SRE",
  "Principal Big Data & Stream Architect",
  "Cloud Security & Cryptographic Engineer",
  "Lead Mobile Systems Engineer",
  "Web3 Protocol & Smart Contract Architect",
  "Embedded Systems & Robotics Engineer"
];

export const ALL_PROGRAMMING_LANGUAGES = [
  { id: "python", name: "Python 3.12", extension: ".py", runtime: "CPython & PyTorch Kernel" },
  { id: "typescript", name: "TypeScript 5.6", extension: ".ts", runtime: "Node.js v22 & V8 Engine" },
  { id: "rust", name: "Rust 1.82", extension: ".rs", runtime: "LLVM 19 / Cargo Native" },
  { id: "go", name: "Go 1.23", extension: ".go", runtime: "Go Runtime / Goroutines" },
  { id: "cpp", name: "C++ 23", extension: ".cpp", runtime: "GCC 14 / Clang Native" },
  { id: "solidity", name: "Solidity 0.8.28", extension: ".sol", runtime: "EVM / Foundry VM" },
  { id: "swift", name: "Swift 6.0", extension: ".swift", runtime: "Swift Concurrency / Darwin" },
  { id: "kotlin", name: "Kotlin 2.0", extension: ".kt", runtime: "JVM 21 / Coroutines" },
  { id: "sql", name: "SQL (PostgreSQL 17)", extension: ".sql", runtime: "Postgres Vector Engine" }
];

export const LIVE_TICKER_ITEMS = [
  "🔥 Market demand for Kubernetes Orchestration surged +34% in enterprise cloud tier",
  "⚡ PagedAttention & vLLM fine-tuning is now required in 72% of Tier-1 LLM engineering specs",
  "📈 Average compensation for Principal AI Architects bumped by +$38,000 YoY",
  "🛡️ PyTorch FSDP multi-node distributed training benchmarks updated for H100 clusters",
  "🎯 1,420 candidates calibrated today across Global AI Engineering hubs",
  "🚀 Rust & eBPF kernel instrumentation adopted by 68% of Fortune 500 platform engineering teams",
  "💡 Next.js 15 Server Actions and React 19 concurrent architecture now standard in lead web roles"
];

export const COMMAND_CENTER_METRICS: TelemetryMetric[] = [
  {
    id: "careers",
    label: "Careers Guided",
    value: "50,000+",
    subtext: "Engineers Deployed",
    change: "+18% MoM",
    trend: "up",
    accentColor: "from-emerald-600 to-teal-700"
  },
  {
    id: "accuracy",
    label: "Match Accuracy",
    value: "94.8%",
    subtext: "Vector Semantic Precision",
    change: "+4.2%",
    trend: "up",
    accentColor: "from-emerald-500 to-emerald-700"
  },
  {
    id: "paths",
    label: "Active Skill Paths",
    value: "142+",
    subtext: "Across 8 Career Tracks",
    change: "Updated Daily",
    trend: "neutral",
    accentColor: "from-teal-600 to-emerald-600"
  },
  {
    id: "salary_bump",
    label: "Salary Trajectory Bump",
    value: "+$38k",
    subtext: "Avg Offer Increase",
    change: "+28% ROI",
    trend: "up",
    accentColor: "from-emerald-500 to-teal-800"
  }
];

export const LIVE_FEED_ITEMS: LiveFeedItem[] = [
  {
    id: "feed-1",
    type: "action",
    badge: "RECOMMENDED ACTION",
    timeAgo: "2m ago",
    title: "Add 'Kubernetes Orchestration & Helm' to Resume",
    description: "Market demand for Principal AI Architects requiring K8s cluster automation surged by 34% this quarter in your region.",
    metricLabel: "Match Boost Potential",
    metricValue: "+12%",
    actionText: "Auto-Optimize"
  },
  {
    id: "feed-2",
    type: "salary",
    badge: "SALARY BENCHMARK",
    timeAgo: "1h ago",
    title: "New Comp Band Detected for L6 Principal AI Architects",
    description: "Average equity grants rose significantly for candidates demonstrating verified PyTorch FSDP & vLLM quantization expertise.",
    metricLabel: "P90 Benchmark",
    metricValue: "$345k / yr",
    actionText: "View Breakdown"
  },
  {
    id: "feed-3",
    type: "market",
    badge: "SKILL RADAR SHIFT",
    timeAgo: "3h ago",
    title: "Triton & CUDA Kernel Customization Spike",
    description: "Hardware-accelerated inference jobs are favoring custom GPU kernels over vanilla Hugging Face pipelines.",
    metricLabel: "Hiring Demand",
    metricValue: "98th Percentile",
    actionText: "Start Micro-Sprint"
  }
];

// ============================================================================
// 8 COMPREHENSIVE MODERN CAREER TRACKS (All Languages, Moduled Data & Quizzes)
// ============================================================================
export const CAREER_TRACKS: CareerTrack[] = [
  {
    id: "ai-systems-architect",
    title: "Principal AI Systems Architect",
    shortCode: "AI-ARCH",
    category: "Artificial Intelligence & ML",
    description: "Design massive multi-node distributed training clusters, PyTorch FSDP pipelines, and high-throughput vLLM inference engines.",
    iconName: "BrainCircuit",
    primaryLanguages: ["Python", "C++", "CUDA", "Triton"],
    frameworks: ["PyTorch 2.3", "vLLM", "DeepSpeed", "TensorRT-LLM", "Hugging Face"],
    metrics: {
      averageSalary: "$265,000",
      marketGrowth: "+38% YoY",
      openRoles: "4,200+",
      matchAccuracy: "94.8%"
    },
    milestones: [
      {
        id: "m-1",
        phase: "Phase 01 • Completed",
        status: "completed",
        title: "Distributed Systems & Kernel Fundamentals",
        description: "Raft consensus, RPC micro-kernels, memory-mapped I/O, and concurrent lock-free architectures.",
        duration: "2 Weeks",
        salaryBump: "+$12,000 / yr",
        skills: ["Raft Consensus", "gRPC Micro-kernels", "Lock-free Queues", "Zero-Copy IPC"],
        recommendedAction: "Architecture validated via Distributed Hash Table benchmark test."
      },
      {
        id: "m-2",
        phase: "Phase 02 • In Progress",
        status: "in_progress",
        title: "Deep Learning & Tensor Ops Engineering",
        description: "PyTorch FSDP, CUDA kernel tuning, custom attention mechanisms, and gradient accumulation pipelines.",
        duration: "4 Weeks (65% Done)",
        salaryBump: "+$24,000 / yr",
        skills: ["PyTorch FSDP", "CUDA Kernels", "FlashAttention-2", "Tensor Parallelism"],
        progressPercent: 65,
        recommendedAction: "Complete low-rank adapter (LoRA) sandbox below to unlock Phase 03."
      },
      {
        id: "m-3",
        phase: "Phase 03 • Locked",
        status: "locked",
        title: "LLM Fine-Tuning & High-Throughput vLLM Serving",
        description: "LoRA/QLoRA 4-bit quantization, PagedAttention serving, speculative decoding, and MLOps deployment.",
        duration: "4 Weeks",
        salaryBump: "+$38,000 / yr",
        skills: ["vLLM PagedAttention", "QLoRA 4-bit", "Speculative Decoding", "Triton Compiler"],
        prerequisite: "Complete Phase 02 & LoRA Sandbox Checkpoint"
      }
    ],
    codeSandbox: {
      language: "python",
      filename: "lora_attention_adapter.py",
      kernelInfo: "Python 3.12 • PyTorch 2.3 CUDA v12.2 Kernel Ready",
      initialCode: `import torch
import torch.nn as nn

class LoRALinear(nn.Module):
    """
    Low-Rank Adaptation (LoRA) layer for parameter-efficient fine-tuning.
    Freezes base weights W0 and trains low-rank matrices A and B.
    """
    def __init__(self, in_features: int, out_features: int, rank: int = 4):
        super().__init__()
        # Freeze base linear layer weights
        self.linear = nn.Linear(in_features, out_features, bias=False)
        self.linear.weight.requires_grad = False
        
        # Trainable low-rank bottleneck projections
        self.lora_A = nn.Parameter(torch.randn(rank, in_features) * 0.01)
        self.lora_B = nn.Parameter(torch.zeros(out_features, rank))
        self.scaling = 1.0 / rank

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # W0 * x + (x * A^T * B^T) * scaling
        base_out = self.linear(x)
        lora_out = (x @ self.lora_A.T @ self.lora_B.T) * self.scaling
        return base_out + lora_out

# Instantiate and verify trainable parameters
model = LoRALinear(in_features=768, out_features=768, rank=4)
trainable_params = sum(p.numel() for p in model.parameters() if p.requires_grad)
total_params = sum(p.numel() for p in model.parameters())

print(f"LoRA Adapter Initialized: {trainable_params:,} trainable params out of {total_params:,} total.")
print(f"Parameter efficiency achieved: {((1 - trainable_params / total_params) * 100):.2f}% compute reduction.")
`,
      optimalSolution: `import torch
import torch.nn as nn

class LoRALinear(nn.Module):
    def __init__(self, in_features: int, out_features: int, rank: int = 8, alpha: float = 16.0):
        super().__init__()
        self.linear = nn.Linear(in_features, out_features, bias=False)
        self.linear.weight.requires_grad = False
        
        self.lora_dropout = nn.Dropout(p=0.05)
        self.lora_A = nn.Parameter(torch.empty(rank, in_features))
        nn.init.kaiming_uniform_(self.lora_A, a=5**0.5)
        self.lora_B = nn.Parameter(torch.zeros(out_features, rank))
        self.scaling = alpha / rank

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        base = self.linear(x)
        adapted = (self.lora_dropout(x) @ self.lora_A.T @ self.lora_B.T) * self.scaling
        return base + adapted

model = LoRALinear(in_features=1024, out_features=1024, rank=8)
print("Optimal Production LoRA Layer Compiled with Alpha Scaling (alpha=16.0, rank=8).")
`,
      unitTestExpected: "LoRA forward pass matches target tensor dimensions (1, 1024) with 0 memory leak.",
      hints: [
        {
          id: 1,
          title: "Dimensionality Mapping",
          description: "Recall that lora_A down-projects from in_features to rank (768 -> 4), while lora_B up-projects from rank to out_features (4 -> 768)."
        },
        {
          id: 2,
          title: "Zero Initialization Invariant",
          description: "Initialize lora_B with all zeros! This ensures delta W begins at exact zero, preserving initial model weights before gradient updates."
        },
        {
          id: 3,
          title: "Scaling Factor α/r",
          description: "Multiply the low-rank delta by alpha / rank to maintain consistent learning dynamics when tuning the rank hyperparameter."
        }
      ],
      ast: [
        {
          name: "Module: LoRALinear",
          type: "torch.nn.Module",
          children: [
            { name: "self.linear", type: "nn.Linear(in=768, out=768, bias=False) [Frozen]" },
            { name: "self.lora_A", type: "Parameter(Tensor[4, 768], requires_grad=True)" },
            { name: "self.lora_B", type: "Parameter(Tensor[768, 4], requires_grad=True, init=Zeros)" },
            { name: "forward(x)", type: "Add(Linear(x), ScaledMatMul(x, A.T, B.T))" }
          ]
        }
      ]
    },
    quizQuestions: [
      {
        id: "q-ai-1",
        domain: "Distributed Systems & Concurrency",
        scenario: "You are designing an asynchronous consensus layer for high-throughput AI inference coordinating across 128 nodes.",
        question: "Under network partition with Raft consensus, what is the minimum quorum required to commit log entries in a cluster of 5 nodes?",
        options: [
          "Any 2 nodes (simplest minority)",
          "Strict majority: 3 nodes (floor(N/2) + 1)",
          "Unanimous consent: all 5 nodes",
          "Dynamic quorum depending on CPU utilization"
        ],
        correctIndex: 1,
        explanation: "Raft requires a strict majority quorum of floor(N/2) + 1 (3 nodes in a 5-node cluster) to ensure any two quorums overlap by at least one node containing the latest log term."
      },
      {
        id: "q-ai-2",
        domain: "Deep Learning Systems & Memory",
        scenario: "A 70B parameter model is being trained using PyTorch FSDP across 8 nodes. During backprop, GPU 0 runs out of memory (OOM).",
        question: "Which tensor parallelism or activation checkpointing strategy will reduce peak VRAM consumption most effectively with minimal network overhead?",
        options: [
          "Activation Checkpointing with CPU offloading of optimizer states",
          "Increasing batch size to trigger automatic memory eviction",
          "Disabling gradient synchronization across all nodes",
          "Reverting to single-GPU vanilla Adam without distributed shards"
        ],
        correctIndex: 0,
        explanation: "Activation Checkpointing recomputes activations during backward pass instead of caching them, saving ~70% VRAM. Combined with CPU offloading of ZeRO-3 optimizer states, peak GPU allocation drops dramatically."
      },
      {
        id: "q-ai-3",
        domain: "LLM Serving & Quantization",
        scenario: "Serving enterprise LLM traffic with unpredictable prompt lengths causes severe VRAM fragmentation.",
        question: "How does PagedAttention (implemented in vLLM) eliminate memory waste in the KV cache?",
        options: [
          "By storing tokens in non-contiguous virtual memory blocks similar to OS paging",
          "By permanently discarding historical conversation turns",
          "By converting all weights to 1-bit binary weights at runtime",
          "By quantizing all attention weights to float8 without caching"
        ],
        correctIndex: 0,
        explanation: "PagedAttention divides the KV cache into fixed-size virtual memory blocks that are dynamically allocated as tokens are generated, reducing memory waste from over-allocation and fragmentation down to near 0%."
      }
    ],
    radarAxes: [
      { axis: "Distributed Systems", score: 92, benchmark: 95 },
      { axis: "PyTorch FSDP", score: 88, benchmark: 90 },
      { axis: "CUDA & Triton", score: 65, benchmark: 85 },
      { axis: "vLLM Serving", score: 72, benchmark: 90 },
      { axis: "System Architecture", score: 95, benchmark: 95 }
    ],
    skillsBreakdown: [
      { id: "s-ai-1", name: "Python 3.12 & Async Concurrency", category: "mastered", level: "Lvl 5 • Verified", statusLabel: "Mastered", progressPercent: 100 },
      { id: "s-ai-2", name: "Distributed Consensus (Raft / Paxos)", category: "mastered", level: "Lvl 4 • Benchmarked", statusLabel: "Mastered", progressPercent: 100 },
      { id: "s-ai-3", name: "CUDA Kernel Tuning & Triton", category: "progress", level: "Lvl 2 • Sprint In-Progress", statusLabel: "In Progress", progressPercent: 65, sprintDuration: "4 Days remaining" },
      { id: "s-ai-4", name: "Distributed LLM Inference (vLLM / TensorRT)", category: "missing", level: "Critical Gap for Target Role", statusLabel: "Missing", highImpact: true, sprintDuration: "14 Days Micro-Sprint" },
      { id: "s-ai-5", name: "PyTorch FSDP & DeepSpeed ZeRO-3", category: "missing", level: "Required for Tier-1 Systems", statusLabel: "Missing", productionTier: true, sprintDuration: "10 Days Micro-Sprint" }
    ],
    interviewScenario: {
      questionText: "Explain how you would mitigate catastrophic forgetting in a fine-tuned domain-specific LLM serving enterprise clients at scale.",
      specialization: "LLM Systems & Distributed Inference",
      detectedKeywords: ["✓ LoRA", "✓ EWC (Elastic Weight)", "✓ Replay Buffers", "✓ KV-Cache", "✓ PagedAttention"],
      transcript: "We implement parameter-efficient fine-tuning via LoRA with low-rank adapters, alongside experience replay with synthetic anchor tokens and elastic weight consolidation (EWC) to preserve core representations without catastrophic parameter drift across enterprise deployments...",
      coachTip: "Excellent structural articulation of PEFT adapters! Recommend elaborating on KV-cache memory footprints under continuous batching before concluding."
    },
    salaryBands: [
      { level: "L4", title: "Software Engineer III (AI)", baseSalary: 165000, equity: 65000, totalComp: 230000, yoyGrowth: "+14%" },
      { level: "L5", title: "Senior AI Systems Engineer", baseSalary: 215000, equity: 130000, totalComp: 345000, yoyGrowth: "+22%" },
      { level: "L6", title: "Principal AI Systems Architect", baseSalary: 265000, equity: 245000, totalComp: 510000, yoyGrowth: "+34%" },
      { level: "L7", title: "Distinguished Systems Architect", baseSalary: 320000, equity: 480000, totalComp: 800000, yoyGrowth: "+41%" }
    ]
  },

  {
    id: "fullstack-cloud-architect",
    title: "Lead Full-Stack Cloud Architect",
    shortCode: "WEB-CLOUD",
    category: "Full-Stack & Cloud Architecture",
    description: "Architect ultra-fast modern web applications, distributed edge microservices, GraphQL federations, and high-concurrency Node.js / Go backend systems.",
    iconName: "Globe",
    primaryLanguages: ["TypeScript", "JavaScript", "Go", "SQL", "Python"],
    frameworks: ["Next.js 15", "React 19", "Node.js 22", "PostgreSQL", "Redis", "GraphQL Federation", "Docker"],
    metrics: {
      averageSalary: "$235,000",
      marketGrowth: "+26% YoY",
      openRoles: "8,900+",
      matchAccuracy: "96.2%"
    },
    milestones: [
      {
        id: "m-fs-1",
        phase: "Phase 01 • Completed",
        status: "completed",
        title: "Modern React 19 & TypeScript Type-Level Systems",
        description: "Server Actions, RSC streaming boundaries, conditional type gymnastics, and Web Worker multithreading.",
        duration: "2 Weeks",
        salaryBump: "+$14,000 / yr",
        skills: ["React Server Components", "TypeScript Template Literals", "Hydration Optimization", "SharedArrayBuffer"],
        recommendedAction: "Validated via 100/100 Lighthouse Web Vitals benchmarking."
      },
      {
        id: "m-fs-2",
        phase: "Phase 02 • In Progress",
        status: "in_progress",
        title: "Distributed Microservices & Event Streams",
        description: "Event-driven architecture with Kafka/Redis streams, PostgreSQL connection pooling, and optimistic lock concurrency.",
        duration: "3 Weeks (55% Done)",
        salaryBump: "+$22,000 / yr",
        skills: ["PostgreSQL Partitioning", "Redis Pub/Sub", "Distributed Tracing", "Idempotency Keys"],
        progressPercent: 55,
        recommendedAction: "Deploy high-throughput rate limiter code sandbox."
      },
      {
        id: "m-fs-3",
        phase: "Phase 03 • Locked",
        status: "locked",
        title: "Global Edge Architecture & Zero Trust Cloud",
        description: "Cloudflare Workers edge caching, multi-region database failover, and high-throughput GraphQL federation.",
        duration: "4 Weeks",
        salaryBump: "+$32,000 / yr",
        skills: ["GraphQL Subgraphs", "Global Anycast Routing", "eBPF Edge Proxies", "Zero Trust IAM"],
        prerequisite: "Complete Phase 02 Microservices Validation"
      }
    ],
    codeSandbox: {
      language: "typescript",
      filename: "distributed_rate_limiter.ts",
      kernelInfo: "Node.js v22.11 • V8 JIT Engine Ready (8ms latency)",
      initialCode: `// High-concurrency Distributed Sliding Window Rate Limiter
interface TokenBucketConfig {
  capacity: number;
  refillRatePerSec: number;
}

export class DistributedTokenBucket {
  private tokens: number;
  private lastRefillTimestamp: number;

  constructor(private config: TokenBucketConfig) {
    this.tokens = config.capacity;
    this.lastRefillTimestamp = Date.now();
  }

  public allowRequest(cost: number = 1): { allowed: boolean; remaining: number } {
    this.refill();
    if (this.tokens >= cost) {
      this.tokens -= cost;
      return { allowed: true, remaining: Math.floor(this.tokens) };
    }
    return { allowed: false, remaining: Math.floor(this.tokens) };
  }

  private refill(): void {
    const now = Date.now();
    const elapsedSeconds = (now - this.lastRefillTimestamp) / 1000;
    const tokensToAdd = elapsedSeconds * this.config.refillRatePerSec;
    this.tokens = Math.min(this.config.capacity, this.tokens + tokensToAdd);
    this.lastRefillTimestamp = now;
  }
}

const limiter = new DistributedTokenBucket({ capacity: 100, refillRatePerSec: 25 });
console.log("Initial Burst Status:", limiter.allowRequest(20));
console.log("Subsequent Request Status:", limiter.allowRequest(5));
console.log("[Test Passed] Zero-lock sliding window rate limiter initialized!");
`,
      optimalSolution: `// Production Atomic Sliding Window with Redis LUA Simulation
export class AtomicSlidingWindowLimiter {
  constructor(private windowSec: number, private maxRequests: number) {}

  public async evaluate(userId: string): Promise<{ allowed: boolean; retryAfterMs: number }> {
    const now = Date.now();
    const windowStart = now - (this.windowSec * 1000);
    // In production: ZREMRANGEBYSCORE key -inf windowStart -> ZADD key now now -> ZCARD key
    return { allowed: true, retryAfterMs: 0 };
  }
}
console.log("Atomic LUA Sliding Window Compiled with O(log N) complexity.");
`,
      unitTestExpected: "100 concurrent requests smoothly throttled without event-loop lag.",
      hints: [
        { id: 1, title: "Token Refill Invariant", description: "Calculate elapsed floating seconds to ensure fractional tokens accumulate smoothly under microsecond bursts." },
        { id: 2, title: "Clock Drift Protection", description: "Guard against negative time deltas when NTP adjustments synchronize system clocks." },
        { id: 3, title: "Atomic State Management", description: "In distributed cluster tiers, wrap operations in Redis LUA scripts to guarantee atomicity without race conditions." }
      ],
      ast: [
        {
          name: "Class: DistributedTokenBucket",
          type: "TypeScript Class",
          children: [
            { name: "allowRequest(cost: number)", type: "Method: boolean" },
            { name: "refill()", type: "Private Method: void" },
            { name: "tokens: number", type: "Private Field: float" }
          ]
        }
      ]
    },
    quizQuestions: [
      {
        id: "q-fs-1",
        domain: "Runtime Concurrency & Event Loop",
        scenario: "A Node.js microservice handling 5,000 req/sec experiences severe p99 latency spikes during JSON parsing of large 8MB payloads.",
        question: "Why does heavy synchronous JSON parsing freeze the Node.js HTTP server, and how should it be resolved?",
        options: [
          "It starves the libuv threadpool; increase UV_THREADPOOL_SIZE to 64",
          "It blocks the single JavaScript main thread; offload to a Worker Thread or stream with JSONStream",
          "Node.js runs out of file descriptors; increase ulimit -n to 65535",
          "V8 garbage collection disables the network socket"
        ],
        correctIndex: 1,
        explanation: "JSON.parse is a synchronous C++ binding executing directly on the single V8 main thread. Long parsing blocks event loop ticks. Offloading to worker threads or streaming chunks keeps the event loop free."
      },
      {
        id: "q-fs-2",
        domain: "Database Reliability & Isolation",
        scenario: "Two concurrent checkout transactions attempt to decrement stock for the final available product item in PostgreSQL.",
        question: "Which isolation or locking pattern guarantees no overselling without causing deadlocks under high volume?",
        options: [
          "READ UNCOMMITTED isolation level with dirty reads",
          "SELECT ... FOR UPDATE row-level pessimistic lock, or atomic UPDATE ... WHERE stock >= 1",
          "Dropping all foreign key constraints",
          "Running transactions in a sequential background cron job"
        ],
        correctIndex: 1,
        explanation: "An atomic `UPDATE inventory SET stock = stock - 1 WHERE id = $1 AND stock >= 1 RETURNING stock;` utilizes PostgreSQL row-level locks natively and returns whether a row was updated without requiring long-lived locks."
      }
    ],
    radarAxes: [
      { axis: "Frontend Architecture", score: 96, benchmark: 95 },
      { axis: "Microservices & Go", score: 85, benchmark: 90 },
      { axis: "Database Internals", score: 88, benchmark: 88 },
      { axis: "Cloud & Edge CDN", score: 82, benchmark: 90 },
      { axis: "Security & Auth", score: 90, benchmark: 92 }
    ],
    skillsBreakdown: [
      { id: "s-fs-1", name: "React 19, Server Components & Next.js 15", category: "mastered", level: "Lvl 5 • Verified", statusLabel: "Mastered", progressPercent: 100 },
      { id: "s-fs-2", name: "TypeScript Advanced Generics & AST", category: "mastered", level: "Lvl 5 • Verified", statusLabel: "Mastered", progressPercent: 100 },
      { id: "s-fs-3", name: "PostgreSQL Query Planning & Indexing", category: "progress", level: "Lvl 3 • In-Progress", statusLabel: "In Progress", progressPercent: 70, sprintDuration: "5 Days remaining" },
      { id: "s-fs-4", name: "GraphQL Federation & Apollo Gateway", category: "missing", level: "High Impact for Scale", statusLabel: "Missing", highImpact: true, sprintDuration: "12 Days Micro-Sprint" },
      { id: "s-fs-5", name: "Distributed Redis Caching & LUA", category: "missing", level: "Production Tier Required", statusLabel: "Missing", productionTier: true, sprintDuration: "10 Days Micro-Sprint" }
    ],
    interviewScenario: {
      questionText: "How do you architect a real-time collaborative document editing platform handling 100,000 concurrent active writers with conflict resolution?",
      specialization: "Distributed State & Real-time Web",
      detectedKeywords: ["✓ CRDTs (Yjs / Automerge)", "✓ Operational Transformation", "✓ WebSockets", "✓ Redis Streams", "✓ Vector Clocks"],
      transcript: "We implement Conflict-Free Replicated Data Types (CRDTs) like state-based or operation-based Yjs models over binary WebSockets with WebSocket multiplexing, using Redis Pub/Sub backplanes for horizontal socket tier scaling...",
      coachTip: "Superb breakdown of state-based vs operation-based CRDTs! Make sure to mention tombstone garbage collection and client memory overhead."
    },
    salaryBands: [
      { level: "L4", title: "Senior Full-Stack Engineer", baseSalary: 155000, equity: 50000, totalComp: 205000, yoyGrowth: "+12%" },
      { level: "L5", title: "Staff Cloud Architect", baseSalary: 195000, equity: 110000, totalComp: 305000, yoyGrowth: "+19%" },
      { level: "L6", title: "Principal Web Systems Architect", baseSalary: 245000, equity: 215000, totalComp: 460000, yoyGrowth: "+29%" },
      { level: "L7", title: "Distinguished Architect", baseSalary: 295000, equity: 420000, totalComp: 715000, yoyGrowth: "+36%" }
    ]
  },

  {
    id: "devops-platform-sre",
    title: "Staff DevOps & Platform SRE",
    shortCode: "SRE-PLAT",
    category: "DevOps & Cloud Infrastructure",
    description: "Engineer resilient multi-cloud Kubernetes clusters, Infrastructure as Code with Terraform, GitOps with ArgoCD, and kernel-level observability with eBPF.",
    iconName: "Server",
    primaryLanguages: ["Go", "Rust", "Python", "Bash", "YAML"],
    frameworks: ["Kubernetes", "Terraform", "Docker", "Helm", "Cilium eBPF", "Prometheus", "ArgoCD", "AWS/GCP"],
    metrics: {
      averageSalary: "$240,000",
      marketGrowth: "+31% YoY",
      openRoles: "6,400+",
      matchAccuracy: "95.1%"
    },
    milestones: [
      {
        id: "m-sre-1",
        phase: "Phase 01 • Completed",
        status: "completed",
        title: "Kubernetes Internals & Multi-Cluster Networking",
        description: "Control plane etcd mechanics, CNI plugins (Cilium), ingress controllers, and mutual TLS service mesh.",
        duration: "2 Weeks",
        salaryBump: "+$16,000 / yr",
        skills: ["etcd Raft Tuning", "Cilium CNI", "Envoy mTLS", "NetworkPolicies"],
        recommendedAction: "Certified Kubernetes Administrator (CKA) benchmarks met."
      },
      {
        id: "m-sre-2",
        phase: "Phase 02 • In Progress",
        status: "in_progress",
        title: "Custom Go Operators & Controller Runtimes",
        description: "Building CRDs with Kubebuilder, reconcilers, admission webhooks, and automated cluster self-healing.",
        duration: "3 Weeks (60% Done)",
        salaryBump: "+$25,000 / yr",
        skills: ["Go Reconcilers", "Custom Resource Definitions", "Mutating Webhooks", "Leader Election"],
        progressPercent: 60,
        recommendedAction: "Complete the Go Kubernetes Operator code sandbox."
      },
      {
        id: "m-sre-3",
        phase: "Phase 03 • Locked",
        status: "locked",
        title: "eBPF Kernel Tracing & Chaos Engineering",
        description: "Kernel probe instrumentation with Cilium Tetragon, LitmusChaos experiments, and zero-downtime cluster disaster recovery.",
        duration: "4 Weeks",
        salaryBump: "+$35,000 / yr",
        skills: ["eBPF XDP Hooks", "Chaos Mesh", "Cross-Region Disaster Recovery", "SLO/Error Budgets"],
        prerequisite: "Complete Phase 02 Operator Deployment"
      }
    ],
    codeSandbox: {
      language: "go",
      filename: "custom_k8s_operator.go",
      kernelInfo: "Go 1.23.2 • Goroutine Runtime Ready (6ms latency)",
      initialCode: `package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

// Simulated Custom Resource Definition Reconciler
type DeploymentReconciler struct {
	mu           sync.Mutex
	desiredPods  int
	runningPods  int
}

func (r *DeploymentReconciler) Reconcile(ctx context.Context, key string) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	delta := r.desiredPods - r.runningPods
	if delta == 0 {
		fmt.Printf("[Cluster Sync] Key '%s' is in desired state (%d pods).\\n", key, r.runningPods)
		return nil
	}

	if delta > 0 {
		fmt.Printf("[Scale Up] Spawning %d new pods to reach target %d...\\n", delta, r.desiredPods)
		r.runningPods += delta
	} else {
		fmt.Printf("[Scale Down] Terminating %d excess pods to match target %d...\\n", -delta, r.desiredPods)
		r.runningPods += delta
	}
	return nil
}

func main() {
	reconciler := &DeploymentReconciler{desiredPods: 5, runningPods: 2}
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	_ = reconciler.Reconcile(ctx, "production/ai-inference-engine")
	fmt.Println("[Test Passed] Kubernetes Reconciliation loop converged successfully! 🚀")
}
`,
      optimalSolution: `// Production Go Reconciler with Exponential Backoff
func (r *DeploymentReconciler) ReconcileWithRetry(ctx context.Context) {
	// Implements rate-limited workqueue and leader election
	fmt.Println("Operator initialized with controller-runtime leader election and metrics exporter.")
}
`,
      unitTestExpected: "Reconciliation loop converges pod count with 0 deadlocks.",
      hints: [
        { id: 1, title: "Idempotency Requirement", description: "Reconcile() must be strictly idempotent: running it multiple times with the same input should produce identical cluster state." },
        { id: 2, title: "Locking & Goroutines", description: "Use sync.Mutex or channels to protect mutable state across asynchronous event watcher goroutines." },
        { id: 3, title: "Context Cancellation", description: "Always check ctx.Err() before initiating blocking network or disk operations during cluster draining." }
      ],
      ast: [
        {
          name: "Package: main",
          type: "Go Package",
          children: [
            { name: "DeploymentReconciler", type: "struct" },
            { name: "Reconcile(ctx, key)", type: "func (*DeploymentReconciler)" },
            { name: "main()", type: "func ()" }
          ]
        }
      ]
    },
    quizQuestions: [
      {
        id: "q-sre-1",
        domain: "Cluster Quorum & etcd Reliability",
        scenario: "In a 3-node Kubernetes master control plane, node-3 experiences a complete network partition.",
        question: "Can the remaining 2 nodes continue accepting new writes and scheduling workloads?",
        options: [
          "Yes, because 2 is a majority of 3 nodes (2/3 > 50%)",
          "No, etcd requires unanimous consensus of all configured members",
          "Only read operations are permitted; all write API calls are permanently rejected",
          "The cluster automatically halts until a human operator intervenes"
        ],
        correctIndex: 0,
        explanation: "etcd uses Raft consensus. A quorum is calculated as (N/2) + 1. For a 3-node cluster, 3/2 + 1 = 2 nodes. Since 2 nodes remain in communication, quorum is maintained and the cluster operates normally."
      }
    ],
    radarAxes: [
      { axis: "Kubernetes Internals", score: 94, benchmark: 95 },
      { axis: "Terraform & IaC", score: 90, benchmark: 90 },
      { axis: "Go & Operators", score: 82, benchmark: 88 },
      { axis: "eBPF & Linux Kernel", score: 68, benchmark: 85 },
      { axis: "Observability & Chaos", score: 89, benchmark: 90 }
    ],
    skillsBreakdown: [
      { id: "s-sre-1", name: "Kubernetes Cluster Administration (CKA/CKS)", category: "mastered", level: "Lvl 5 • Verified", statusLabel: "Mastered", progressPercent: 100 },
      { id: "s-sre-2", name: "Terraform Multi-Cloud Modules", category: "mastered", level: "Lvl 5 • Verified", statusLabel: "Mastered", progressPercent: 100 },
      { id: "s-sre-3", name: "Go Controller-Runtime & Operators", category: "progress", level: "Lvl 3 • In-Progress", statusLabel: "In Progress", progressPercent: 60, sprintDuration: "6 Days remaining" },
      { id: "s-sre-4", name: "Cilium eBPF Network Policies & XDP", category: "missing", level: "High Impact for Scale", statusLabel: "Missing", highImpact: true, sprintDuration: "14 Days Micro-Sprint" },
      { id: "s-sre-5", name: "Cross-Region Disaster Recovery Automation", category: "missing", level: "Tier-1 Requirement", statusLabel: "Missing", productionTier: true, sprintDuration: "10 Days Micro-Sprint" }
    ],
    interviewScenario: {
      questionText: "A cascading failure brings down the internal DNS (CoreDNS) across your primary production cluster during peak traffic. How do you isolate, mitigate, and architect permanent immunity?",
      specialization: "Cluster Reliability & Incident Command",
      detectedKeywords: ["✓ NodeLocal DNSCache", "✓ ndots:5 optimization", "✓ CoreDNS horizontal autoscaler", "✓ CNI DNS loop", "✓ Circuit Breaking"],
      transcript: "We immediately scale NodeLocal DNSCache DaemonSets to intercept UDP/TCP 53 on loopback IPs, mitigate ndots:5 query amplification in resolv.conf, and establish CoreDNS autoscalers pinned to cluster node count...",
      coachTip: "Decisive triage approach! Be sure to emphasize upstream cloud provider DNS query rate limit throttles (e.g., Route53 1024 packets/sec/ENI)."
    },
    salaryBands: [
      { level: "L4", title: "Site Reliability Engineer III", baseSalary: 160000, equity: 55000, totalComp: 215000, yoyGrowth: "+15%" },
      { level: "L5", title: "Senior Platform Engineer", baseSalary: 205000, equity: 115000, totalComp: 320000, yoyGrowth: "+24%" },
      { level: "L6", title: "Staff / Principal SRE", baseSalary: 255000, equity: 230000, totalComp: 485000, yoyGrowth: "+31%" },
      { level: "L7", title: "Distinguished Infrastructure Architect", baseSalary: 310000, equity: 450000, totalComp: 760000, yoyGrowth: "+39%" }
    ]
  },

  {
    id: "big-data-stream-architect",
    title: "Principal Big Data & Stream Architect",
    shortCode: "DATA-ENG",
    category: "Data Engineering & Analytics",
    description: "Design petabyte-scale real-time streaming architectures using Apache Kafka, Apache Spark, Rust, DuckDB, Flink, and Snowflake lakehouses.",
    iconName: "Database",
    primaryLanguages: ["Python", "SQL", "Rust", "Java", "Scala"],
    frameworks: ["Apache Kafka", "Apache Spark 3.5", "Apache Flink", "DuckDB", "Snowflake", "dbt", "ClickHouse"],
    metrics: {
      averageSalary: "$245,000",
      marketGrowth: "+29% YoY",
      openRoles: "5,800+",
      matchAccuracy: "94.4%"
    },
    milestones: [
      {
        id: "m-de-1",
        phase: "Phase 01 • Completed",
        status: "completed",
        title: "Vectorized Query Engines & Parquet Formats",
        description: "Columnar compression algorithms (Snappy, ZSTD), dictionary encoding, and zero-copy Apache Arrow buffers.",
        duration: "2 Weeks",
        salaryBump: "+$13,000 / yr",
        skills: ["Apache Arrow", "Parquet Internals", "DuckDB SQL", "SIMD Vectorization"],
        recommendedAction: "Vectorized parquet parser benchmarks submitted."
      },
      {
        id: "m-de-2",
        phase: "Phase 02 • In Progress",
        status: "in_progress",
        title: "Distributed Streaming with Kafka & Flink",
        description: "Exactly-once semantics, watermark event-time windowing, stateful checkpointing, and RocksDB state backends.",
        duration: "3 Weeks (70% Done)",
        salaryBump: "+$23,000 / yr",
        skills: ["Kafka Partitions", "Flink Event Time", "RocksDB State", "Chandy-Lamport Checkpoints"],
        progressPercent: 70,
        recommendedAction: "Complete the stream ingestion buffer sandbox."
      },
      {
        id: "m-de-3",
        phase: "Phase 03 • Locked",
        status: "locked",
        title: "Lakehouse Architecture & Delta Engine",
        description: "ACID transactions on object storage, Iceberg metadata catalogs, and real-time CDC with Debezium.",
        duration: "4 Weeks",
        salaryBump: "+$34,000 / yr",
        skills: ["Apache Iceberg", "Delta Lake", "Debezium CDC", "Trino Distributed SQL"],
        prerequisite: "Complete Phase 02 Streaming Validation"
      }
    ],
    codeSandbox: {
      language: "rust",
      filename: "vectorized_stream_aggregator.rs",
      kernelInfo: "Rust 1.82 • Cargo & LLVM SIMD Vectorization Ready (4ms latency)",
      initialCode: `// High-Throughput Zero-Copy Vectorized Stream Aggregator
pub struct StreamAggregator {
    count: u64,
    sum: f64,
    min: f64,
    max: f64,
}

impl StreamAggregator {
    pub fn new() -> Self {
        Self {
            count: 0,
            sum: 0.0,
            min: f64::MAX,
            max: f64::MIN,
        }
    }

    #[inline(always)]
    pub fn ingest_batch(&mut self, batch: &[f64]) {
        for &val in batch {
            self.count += 1;
            self.sum += val;
            if val < self.min { self.min = val; }
            if val > self.max { self.max = val; }
        }
    }

    pub fn average(&self) -> f64 {
        if self.count == 0 { 0.0 } else { self.sum / (self.count as f64) }
    }
}

fn main() {
    let mut agg = StreamAggregator::new();
    let sample_batch = vec![42.5, 18.2, 99.1, 105.4, 33.7, 78.9];
    agg.ingest_batch(&sample_batch);

    println!("Total Ingested Events: {}", agg.count);
    println!("Vectorized Stream Average: {:.2}", agg.average());
    println!("[Test Passed] Rust SIMD batch ingestion processed at 45M events/sec! ⚡");
}
`,
      optimalSolution: `// Production Rayon Multi-threaded Parallel Ingestion
use rayon::prelude::*;
fn parallel_ingest(data: &[f64]) -> f64 {
    data.par_iter().sum()
}
`,
      unitTestExpected: "Batch processes 1,000,000 records under 22 milliseconds.",
      hints: [
        { id: 1, title: "SIMD Auto-Vectorization", description: "Use #[inline(always)] and contiguous slices &[f64] to allow LLVM to generate AVX2/AVX-512 vector instructions." },
        { id: 2, title: "Zero Allocation", description: "Never allocate heap memory inside the hot ingestion loop; reuse buffers." },
        { id: 3, title: "Branch Prediction", description: "Sort or partition inputs before running min/max calculations to eliminate branch mispredictions." }
      ],
      ast: [
        {
          name: "Struct: StreamAggregator",
          type: "Rust Struct",
          children: [
            { name: "ingest_batch(&mut self, batch: &[f64])", type: "method" },
            { name: "average(&self) -> f64", type: "method" }
          ]
        }
      ]
    },
    quizQuestions: [
      {
        id: "q-de-1",
        domain: "Stream Semantics & Consistency",
        scenario: "An e-commerce order ingestion pipeline built on Apache Kafka must guarantee that financial ledger records are never duplicated even during worker crashes.",
        question: "Which combination of Kafka and consumer configuration achieves true end-to-end exactly-once semantics (EOS)?",
        options: [
          "acks=0 with auto.commit.enable=true",
          "Idempotent Producer (enable.idempotence=true) + Kafka Transactions with read_committed isolation",
          "Increasing partition count to 100",
          "Sending all messages with NULL keys"
        ],
        correctIndex: 1,
        explanation: "Kafka Exactly-Once Semantics (EOS) requires an idempotent producer (deduplicating retried sequence numbers) along with two-phase commit transactions read by consumers in read_committed mode."
      }
    ],
    radarAxes: [
      { axis: "Streaming & Kafka", score: 92, benchmark: 95 },
      { axis: "SQL & Query Engines", score: 95, benchmark: 95 },
      { axis: "Rust & SIMD", score: 75, benchmark: 85 },
      { axis: "Lakehouse & Iceberg", score: 84, benchmark: 90 },
      { axis: "Data Modeling", score: 90, benchmark: 90 }
    ],
    skillsBreakdown: [
      { id: "s-de-1", name: "Apache Spark 3.5 & PySpark Optimization", category: "mastered", level: "Lvl 5 • Verified", statusLabel: "Mastered", progressPercent: 100 },
      { id: "s-de-2", name: "PostgreSQL, DuckDB & Vectorized SQL", category: "mastered", level: "Lvl 5 • Verified", statusLabel: "Mastered", progressPercent: 100 },
      { id: "s-de-3", name: "Apache Kafka Partitions & Concurrency", category: "progress", level: "Lvl 3 • In-Progress", statusLabel: "In Progress", progressPercent: 70, sprintDuration: "5 Days remaining" },
      { id: "s-de-4", name: "Apache Flink Stateful Stream Processing", category: "missing", level: "High Impact for Realtime", statusLabel: "Missing", highImpact: true, sprintDuration: "14 Days Micro-Sprint" },
      { id: "s-de-5", name: "Apache Iceberg Lakehouse Metadata Catalogs", category: "missing", level: "Production Standard", statusLabel: "Missing", productionTier: true, sprintDuration: "10 Days Micro-Sprint" }
    ],
    interviewScenario: {
      questionText: "How do you design a real-time analytics engine calculating 99th percentile payment latencies across 500,000 stores with out-of-order event arrivals?",
      specialization: "Stream Processing & Watermarks",
      detectedKeywords: ["✓ Flink Event Time", "✓ BoundedOutOfOrderness Watermarks", "✓ t-digest / HdrHistogram", "✓ Sliding Windows", "✓ RocksDB State"],
      transcript: "We ingest telemetry into partitioned Kafka topics, consume via Apache Flink with event-time watermarking using BoundedOutOfOrderness(10s), and approximate p99 quantiles using t-digest algorithms to avoid high memory overhead...",
      coachTip: "Exceptional mention of t-digest quantile sketches! Highlight how late arrivals exceeding the 10-second watermark delay are routed to side outputs."
    },
    salaryBands: [
      { level: "L4", title: "Data Engineer III", baseSalary: 160000, equity: 50000, totalComp: 210000, yoyGrowth: "+13%" },
      { level: "L5", title: "Senior Data Architect", baseSalary: 200000, equity: 110000, totalComp: 310000, yoyGrowth: "+21%" },
      { level: "L6", title: "Principal Stream Architect", baseSalary: 250000, equity: 220000, totalComp: 470000, yoyGrowth: "+29%" },
      { level: "L7", title: "Distinguished Data Fellow", baseSalary: 300000, equity: 430000, totalComp: 730000, yoyGrowth: "+38%" }
    ]
  },

  {
    id: "cloud-security-engineer",
    title: "Cloud Security & Cryptographic Engineer",
    shortCode: "SEC-ARCH",
    category: "Cybersecurity & Cryptography",
    description: "Engineer Zero Trust cloud architectures, constant-time cryptographic primitives, automated threat detection with eBPF, and container runtime security.",
    iconName: "ShieldCheck",
    primaryLanguages: ["Rust", "Python", "C", "Go", "Assembly"],
    frameworks: ["Linux eBPF", "OpenSSL 3.0", "HashiCorp Vault", "Falco", "WireGuard", "OAuth2/OIDC", "Tetragon"],
    metrics: {
      averageSalary: "$250,000",
      marketGrowth: "+35% YoY",
      openRoles: "4,900+",
      matchAccuracy: "95.5%"
    },
    milestones: [
      {
        id: "m-sec-1",
        phase: "Phase 01 • Completed",
        status: "completed",
        title: "Cryptographic Primitives & Side-Channel Mitigation",
        description: "Constant-time comparison algorithms, AES-GCM AEAD, Edwards-curve signatures (Ed25519), and timing leak defense.",
        duration: "2 Weeks",
        salaryBump: "+$15,000 / yr",
        skills: ["Constant-Time Ops", "Ed25519 Signatures", "ChaCha20-Poly1305", "Side-channel Defense"],
        recommendedAction: "Zero timing-attack leakage validated."
      },
      {
        id: "m-sec-2",
        phase: "Phase 02 • In Progress",
        status: "in_progress",
        title: "Zero Trust IAM & HashiCorp Vault Automation",
        description: "Short-lived dynamic credentials, SPIFFE/SPIRE workload identities, and mTLS proxy enforcement.",
        duration: "3 Weeks (65% Done)",
        salaryBump: "+$24,000 / yr",
        skills: ["SPIFFE/SPIRE", "Vault Dynamic Secrets", "OIDC Federation", "mTLS Service Mesh"],
        progressPercent: 65,
        recommendedAction: "Complete the Rust constant-time comparator sandbox."
      },
      {
        id: "m-sec-3",
        phase: "Phase 03 • Locked",
        status: "locked",
        title: "eBPF Runtime Defense & Memory Safety",
        description: "Real-time syscall anomaly interception using Cilium Tetragon, kernel exploit defense, and hardware security modules (HSM).",
        duration: "4 Weeks",
        salaryBump: "+$36,000 / yr",
        skills: ["Tetragon eBPF Hooks", "PKCS#11 HSM", "Kernel Exploit Mitigation", "Confidential Computing (SEV-SNP)"],
        prerequisite: "Complete Phase 02 SPIFFE/SPIRE Verification"
      }
    ],
    codeSandbox: {
      language: "rust",
      filename: "constant_time_crypto.rs",
      kernelInfo: "Rust 1.82 • Constant-Time Crypto Engine Ready (3ms latency)",
      initialCode: `// Constant-Time Byte Comparator (Timing Attack Immunity)
pub fn constant_time_compare(a: &[u8], b: &[u8]) -> bool {
    if a.len() != b.len() {
        return false;
    }

    let mut diff: u8 = 0;
    // XOR all bytes and accumulate differences without early return
    for (x, y) in a.iter().zip(b.iter()) {
        diff |= x ^ y;
    }

    diff == 0
}

fn main() {
    let signature_expected = b"0x4a9f82c1b489d71e549a18c39f281e09";
    let signature_provided = b"0x4a9f82c1b489d71e549a18c39f281e09";
    let forgery_attempt   = b"0x4a9f82c1b489d71e549a18c39f281e00";

    assert!(constant_time_compare(signature_expected, signature_provided));
    assert!(!constant_time_compare(signature_expected, forgery_attempt));

    println!("Cryptographic Signature Verification: VALID");
    println!("Forgery Timing Attack Rejected: VERIFIED");
    println!("[Test Passed] Constant-time invariant preserved across all cache lines! 🛡️");
}
`,
      optimalSolution: `// Production Subtlen-backed Constant-Time Equality
use subtle::ConstantTimeEq;
fn secure_eq(a: &[u8], b: &[u8]) -> bool {
    a.ct_eq(b).into()
}
`,
      unitTestExpected: "Zero instruction branch delta observed between matching and non-matching signatures.",
      hints: [
        { id: 1, title: "No Early Returns", description: "Never use 'if a[i] != b[i] { return false; }'. An early break exposes the byte index where comparison failed via nanosecond timing differences." },
        { id: 2, title: "Bitwise Accumulation", description: "Accumulate XOR outputs with bitwise OR: 'diff |= a[i] ^ b[i]'." },
        { id: 3, title: "Compiler Optimization Barrier", description: "Use core::hint::black_box to prevent LLVM from optimizing constant-time loops into short-circuiting assembly." }
      ],
      ast: [
        {
          name: "Fn: constant_time_compare",
          type: "Function (&[u8], &[u8]) -> bool",
          children: [
            { name: "diff: u8", type: "Accumulator" },
            { name: "for loop", type: "Exhaustive Iteration" }
          ]
        }
      ]
    },
    quizQuestions: [
      {
        id: "q-sec-1",
        domain: "Cryptographic Vulnerabilities",
        scenario: "An authentication endpoint verifies HMAC tokens using standard string equality `token == expectedToken` in Python.",
        question: "What class of vulnerability does this introduce and how can an attacker exploit it over the network?",
        options: [
          "SQL Injection by injecting quotes into the token",
          "Timing Attack: An attacker measures response latency down to microseconds to guess characters byte-by-byte",
          "Cross-Site Scripting (XSS)",
          "Buffer overflow in the CPython runtime"
        ],
        correctIndex: 1,
        explanation: "Standard string equality returns early on the first mismatched character. An attacker measuring latency over thousands of requests can determine how many leading bytes were correct, deciphering the secret token byte-by-byte."
      }
    ],
    radarAxes: [
      { axis: "Applied Cryptography", score: 94, benchmark: 95 },
      { axis: "Zero Trust & IAM", score: 92, benchmark: 92 },
      { axis: "Linux Kernel & eBPF", score: 78, benchmark: 88 },
      { axis: "AppSec & Threat Models", score: 95, benchmark: 95 },
      { axis: "Cloud Security Posture", score: 88, benchmark: 90 }
    ],
    skillsBreakdown: [
      { id: "s-sec-1", name: "Modern Cryptography (AES-GCM, Ed25519, TLS 1.3)", category: "mastered", level: "Lvl 5 • Verified", statusLabel: "Mastered", progressPercent: 100 },
      { id: "s-sec-2", name: "OAuth2, OIDC & SPIFFE Workload Identities", category: "mastered", level: "Lvl 5 • Verified", statusLabel: "Mastered", progressPercent: 100 },
      { id: "s-sec-3", name: "HashiCorp Vault Production Clusters", category: "progress", level: "Lvl 3 • In-Progress", statusLabel: "In Progress", progressPercent: 65, sprintDuration: "5 Days remaining" },
      { id: "s-sec-4", name: "eBPF Kernel Syscall Interception (Tetragon)", category: "missing", level: "Critical Gap", statusLabel: "Missing", highImpact: true, sprintDuration: "14 Days Micro-Sprint" },
      { id: "s-sec-5", name: "Hardware Security Modules & Enclaves (AWS Nitro)", category: "missing", level: "Enterprise Requirement", statusLabel: "Missing", productionTier: true, sprintDuration: "10 Days Micro-Sprint" }
    ],
    interviewScenario: {
      questionText: "An attacker has compromised an application container pod in your Kubernetes cluster. How does your defense-in-depth architecture prevent lateral privilege escalation to AWS IAM and sensitive database instances?",
      specialization: "Cloud Security & Containment",
      detectedKeywords: ["✓ IRSA / Pod Identities", "✓ Cilium NetworkPolicy", "✓ Read-Only Root Filesystem", "✓ gVisor / Kata Containers", "✓ eBPF Anomaly Detection"],
      transcript: "We restrict the container using read-only root filesystems and drop all Linux capabilities except NET_BIND_SERVICE, use AWS Pod Identity with strict session policies, enforce Cilium egress L7 HTTP rules, and isolate via gVisor sandbox runtimes...",
      coachTip: "Comprehensive defense-in-depth! Mention IMDSv2 hop limits (hop-limit=1) to prevent access to the EC2 metadata service."
    },
    salaryBands: [
      { level: "L4", title: "Cloud Security Engineer III", baseSalary: 165000, equity: 60000, totalComp: 225000, yoyGrowth: "+16%" },
      { level: "L5", title: "Senior Cryptographic Systems Engineer", baseSalary: 210000, equity: 125000, totalComp: 335000, yoyGrowth: "+26%" },
      { level: "L6", title: "Principal Security Architect", baseSalary: 260000, equity: 240000, totalComp: 500000, yoyGrowth: "+35%" },
      { level: "L7", title: "Distinguished Fellow / Chief Security Architect", baseSalary: 315000, equity: 470000, totalComp: 785000, yoyGrowth: "+42%" }
    ]
  },

  {
    id: "mobile-systems-engineer",
    title: "Lead Mobile Systems Engineer",
    shortCode: "MOBILE-ENG",
    category: "Mobile Architecture & Cross-Platform",
    description: "Engineer buttery-smooth 120 FPS iOS & Android applications using Swift 6, Kotlin 2.0, SwiftUI, Jetpack Compose, Kotlin Multiplatform, and Metal graphics.",
    iconName: "Smartphone",
    primaryLanguages: ["Swift", "Kotlin", "Dart", "TypeScript", "C++"],
    frameworks: ["SwiftUI", "Jetpack Compose", "React Native", "Flutter", "Kotlin Multiplatform (KMP)", "Metal", "CoreData/Room"],
    metrics: {
      averageSalary: "$225,000",
      marketGrowth: "+24% YoY",
      openRoles: "5,100+",
      matchAccuracy: "94.9%"
    },
    milestones: [
      {
        id: "m-mob-1",
        phase: "Phase 01 • Completed",
        status: "completed",
        title: "Swift 6 Concurrency & Kotlin Coroutines",
        description: "Actor isolation, Sendable checks, Structured Concurrency, Flow operators, and thread pool starvation prevention.",
        duration: "2 Weeks",
        salaryBump: "+$12,000 / yr",
        skills: ["Swift Actors", "Kotlin Flow", "Structured Concurrency", "ARC Retain Cycle Prevention"],
        recommendedAction: "Zero data-race guarantees validated under Swift 6 strict mode."
      },
      {
        id: "m-mob-2",
        phase: "Phase 02 • In Progress",
        status: "in_progress",
        title: "Declarative UI Performance & 120Hz ProMotion",
        description: "SwiftUI layout passes, Compose recomposition skipping, lazy list virtualization, and zero-drop frame budgets (8.3ms).",
        duration: "3 Weeks (60% Done)",
        salaryBump: "+$21,000 / yr",
        skills: ["Compose Recomposition", "SwiftUI View Identity", "Instruments Time Profiler", "Memory Leaks Profiling"],
        progressPercent: 60,
        recommendedAction: "Complete Swift Actor Cache Sandbox."
      },
      {
        id: "m-mob-3",
        phase: "Phase 03 • Locked",
        status: "locked",
        title: "Offline-First Synchronization & C++ Shared Kernels",
        description: "Kotlin Multiplatform (KMP) shared business logic, SQLite WAL offline sync, and on-device ML with CoreML & MediaPipe.",
        duration: "4 Weeks",
        salaryBump: "+$32,000 / yr",
        skills: ["Kotlin Multiplatform", "CoreML Quantization", "SQLite WAL Sync", "Metal Compute Shaders"],
        prerequisite: "Complete Phase 02 UI Performance Validation"
      }
    ],
    codeSandbox: {
      language: "swift",
      filename: "actor_isolated_image_cache.swift",
      kernelInfo: "Swift 6.0 • Strict Data-Race Safety Mode (5ms latency)",
      initialCode: `// Swift 6 Actor-Isolated Thread-Safe In-Memory Cache
import Foundation

public actor SecureImageMemoryCache {
    private var storage: [String: Data] = [:]
    private let maxEntries: Int

    public init(maxEntries: Int = 100) {
        self.maxEntries = maxEntries
    }

    public func insert(_ data: Data, forKey key: String) {
        if storage.count >= maxEntries {
            // Evict arbitrary entry
            if let firstKey = storage.keys.first {
                storage.removeValue(forKey: firstKey)
            }
        }
        storage[key] = data
    }

    public func retrieve(forKey key: String) -> Data? {
        return storage[key]
    }

    public func entryCount() -> Int {
        return storage.count
    }
}

// Verification simulation
Task {
    let cache = SecureImageMemoryCache(maxEntries: 50)
    let sampleData = "Sample Image Payload".data(using: .utf8)!
    await cache.insert(sampleData, forKey: "hero_profile_avatar")
    
    let count = await cache.entryCount()
    print("Cache Initialized. Active Entries: \(count)")
    print("[Test Passed] Swift 6 actor eliminates data races across concurrent tasks! 📱")
}
`,
      optimalSolution: `// Production LRU Cache with NSCache Integration
public actor LRUImageCache {
    // Implements linked-list eviction with memory pressure notification hooks
}
`,
      unitTestExpected: "Concurrent writes across 100 parallel Tasks execute without memory corruption.",
      hints: [
        { id: 1, title: "Actor Isolation", description: "All mutable properties in an actor are isolated by default; access requires 'await' from outside tasks." },
        { id: 2, title: "Sendable Types", description: "Ensure types passed into actor methods conform to Sendable (such as Data or immutable Structs)." },
        { id: 3, title: "Memory Pressure", description: "Listen to UIApplication.didReceiveMemoryWarningNotification to purge volatile entries." }
      ],
      ast: [
        {
          name: "Actor: SecureImageMemoryCache",
          type: "Swift Actor",
          children: [
            { name: "insert(_ data: Data, forKey: String)", type: "Isolated Method" },
            { name: "retrieve(forKey: String) -> Data?", type: "Isolated Method" }
          ]
        }
      ]
    },
    quizQuestions: [
      {
        id: "q-mob-1",
        domain: "Memory Management & Concurrency",
        scenario: "An iOS developer captures a class instance inside an asynchronous escaping network callback: `networkService.fetch { self.updateUI() }`.",
        question: "What issue will occur if the user navigates away before the network request returns, and how is it resolved?",
        options: [
          "Thread deadlock freezing the operating system",
          "A strong retain cycle causing a memory leak; resolve with `[weak self]` in capture list",
          "The network socket closes automatically",
          "V8 garbage collection reclaims the view controller"
        ],
        correctIndex: 1,
        explanation: "Escaping closures retain strong references to `self`. If the view controller is dismissed, the closure keeps it alive in memory until the request completes (or indefinitely on retain cycles). `[weak self]` breaks the strong cycle."
      }
    ],
    radarAxes: [
      { axis: "Swift & iOS Native", score: 95, benchmark: 95 },
      { axis: "Kotlin & Android", score: 86, benchmark: 90 },
      { axis: "UI Rendering (120Hz)", score: 92, benchmark: 95 },
      { axis: "Cross-Platform (KMP)", score: 76, benchmark: 88 },
      { axis: "App Performance & Memory", score: 90, benchmark: 92 }
    ],
    skillsBreakdown: [
      { id: "s-mob-1", name: "Swift 6 Concurrency & SwiftUI", category: "mastered", level: "Lvl 5 • Verified", statusLabel: "Mastered", progressPercent: 100 },
      { id: "s-mob-2", name: "Kotlin 2.0 Coroutines & Jetpack Compose", category: "mastered", level: "Lvl 5 • Verified", statusLabel: "Mastered", progressPercent: 100 },
      { id: "s-mob-3", name: "Instruments Memory Leak & Hitch Profiling", category: "progress", level: "Lvl 3 • In-Progress", statusLabel: "In Progress", progressPercent: 60, sprintDuration: "6 Days remaining" },
      { id: "s-mob-4", name: "Kotlin Multiplatform (KMP) Mobile", category: "missing", level: "High Impact for Scale", statusLabel: "Missing", highImpact: true, sprintDuration: "12 Days Micro-Sprint" },
      { id: "s-mob-5", name: "Metal Graphics & On-Device CoreML", category: "missing", level: "Next-Gen Mobile", statusLabel: "Missing", productionTier: true, sprintDuration: "10 Days Micro-Sprint" }
    ],
    interviewScenario: {
      questionText: "How do you eliminate scrolling frame drops (hitches) in an infinite image and video feed with variable cell heights in SwiftUI or Jetpack Compose?",
      specialization: "Mobile Performance & Rendering Pipelines",
      detectedKeywords: ["✓ Prefetching", "✓ Stable View Identity", "✓ Downsampling Images", "✓ Recomposition Skipping", "✓ Async Decoders"],
      transcript: "We downsample incoming JPEG/HEIC assets to exact display dimensions off the main thread before decoding, avoid structural identity changes in LazyVStack, memoize modifier lambdas to enable skipping, and prefetch offscreen slices...",
      coachTip: "Superb coverage of image downsampling to prevent huge RAM allocations! Mention Instruments Animation Hitches trace template."
    },
    salaryBands: [
      { level: "L4", title: "Mobile Software Engineer III", baseSalary: 155000, equity: 48000, totalComp: 203000, yoyGrowth: "+11%" },
      { level: "L5", title: "Senior Mobile Systems Engineer", baseSalary: 195000, equity: 105000, totalComp: 300000, yoyGrowth: "+20%" },
      { level: "L6", title: "Principal Mobile Architect", baseSalary: 245000, equity: 210000, totalComp: 455000, yoyGrowth: "+28%" },
      { level: "L7", title: "Distinguished Mobile Fellow", baseSalary: 295000, equity: 410000, totalComp: 705000, yoyGrowth: "+36%" }
    ]
  },

  {
    id: "web3-protocol-architect",
    title: "Web3 Protocol & Smart Contract Architect",
    shortCode: "WEB3-ARCH",
    category: "Blockchain & Decentralized Systems",
    description: "Design battle-tested smart contract protocols in Solidity & Rust, EVM opcode gas optimization, automated market maker (AMM) math, and zero-knowledge rollup proofs.",
    iconName: "Coins",
    primaryLanguages: ["Solidity", "Rust", "Go", "TypeScript"],
    frameworks: ["Foundry", "Hardhat", "EVM Internals", "OpenZeppelin", "Anchor (Solana)", "Circom (ZK)", "Ethers.js"],
    metrics: {
      averageSalary: "$260,000",
      marketGrowth: "+33% YoY",
      openRoles: "3,800+",
      matchAccuracy: "93.8%"
    },
    milestones: [
      {
        id: "m-w3-1",
        phase: "Phase 01 • Completed",
        status: "completed",
        title: "Solidity 0.8 & EVM Memory Layout",
        description: "Storage slot packing, memory vs calldata semantics, transient storage (EIP-1153), and Yul assembly.",
        duration: "2 Weeks",
        salaryBump: "+$16,000 / yr",
        skills: ["EIP-1153 Transient Storage", "Yul Assembly", "Storage Slot Packing", "Reentrancy Guards"],
        recommendedAction: "Gas optimization benchmarks under Foundry passed."
      },
      {
        id: "m-w3-2",
        phase: "Phase 02 • In Progress",
        status: "in_progress",
        title: "DeFi Mechanics & Automated Market Makers",
        description: "Uniswap v4 hooks, concentrated liquidity math, flash loans, and MEV front-running mitigation.",
        duration: "3 Weeks (65% Done)",
        salaryBump: "+$26,000 / yr",
        skills: ["Uniswap v4 Hooks", "Flash Loans", "TWAP Oracles", "MEV-Boost"],
        progressPercent: 65,
        recommendedAction: "Complete reentrancy-guarded smart contract sandbox."
      },
      {
        id: "m-w3-3",
        phase: "Phase 03 • Locked",
        status: "locked",
        title: "Zero-Knowledge Rollups & Account Abstraction",
        description: "ERC-4337 smart accounts, zk-SNARK verifier contracts, and cross-chain messaging bridges.",
        duration: "4 Weeks",
        salaryBump: "+$38,000 / yr",
        skills: ["ERC-4337 Paymasters", "zk-SNARKs Groth16", "Layer 2 Rollup Sequencers", "Cross-Chain Bridges"],
        prerequisite: "Complete Phase 02 Protocol Audit"
      }
    ],
    codeSandbox: {
      language: "solidity",
      filename: "flash_loan_vault.sol",
      kernelInfo: "Solidity 0.8.28 • EVM Foundry Simulation (2ms latency)",
      initialCode: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IFlashBorrower {
    function onFlashLoan(address initiator, uint256 amount, uint256 fee, bytes calldata data) external returns (bytes32);
}

contract ReentrancyGuardedVault {
    // EIP-1153 Transient Storage Reentrancy Guard Flag
    bytes32 private constant CALLBACK_SUCCESS = keccak256("ERC3156FlashBorrower.onFlashLoan");
    uint256 private _status; // 1 = Not Entered, 2 = Entered

    mapping(address => uint256) public balances;

    error ReentrancyGuardReentrantCall();
    error FlashLoanFeeNotPaid();

    modifier nonReentrant() {
        if (_status == 2) revert ReentrancyGuardReentrantCall();
        _status = 2;
        _;
        _status = 1;
    }

    constructor() {
        _status = 1;
    }

    function flashLoan(IFlashBorrower receiver, uint256 amount, bytes calldata data) external nonReentrant returns (bool) {
        uint256 fee = (amount * 5) / 10000; // 0.05% protocol fee
        uint256 balanceBefore = address(this).balance;

        // Perform external callback safely under nonReentrant mutex
        bytes32 result = receiver.onFlashLoan(msg.sender, amount, fee, data);
        require(result == CALLBACK_SUCCESS, "Invalid callback token");

        require(address(this).balance >= balanceBefore + fee, "FlashLoanFeeNotPaid");
        return true;
    }
}
`,
      optimalSolution: `// Production Transient Storage (TSTORE / TLOAD) Reentrancy Guard
contract TransientReentrancyGuard {
    // Assembly tstore(0, 1) and tload(0) saves 2,100 gas per transaction
}
`,
      unitTestExpected: "Reentrant callback automatically reverted with ReentrancyGuardReentrantCall.",
      hints: [
        { id: 1, title: "Checks-Effects-Interactions", description: "Always update contract internal state before making external untrusted contract calls." },
        { id: 2, title: "EIP-1153 Transient Storage", description: "Use TSTORE and TLOAD for transient reentrancy flags to avoid costly warm SSTORE slot gas fees." },
        { id: 3, title: "Read-Only Reentrancy", description: "Remember that view functions reading pool balances during flash loans can still be exploited if unprotected." }
      ],
      ast: [
        {
          name: "Contract: ReentrancyGuardedVault",
          type: "Solidity Contract",
          children: [
            { name: "nonReentrant()", type: "Modifier" },
            { name: "flashLoan(receiver, amount, data)", type: "External Function" }
          ]
        }
      ]
    },
    quizQuestions: [
      {
        id: "q-w3-1",
        domain: "Smart Contract Security & Reentrancy",
        scenario: "A lending protocol updates user collateral balances *after* transferring ETH back to `msg.sender.call{value: amount}(\"\")`.",
        question: "How can an attacker exploit this vulnerability to drain all contract funds?",
        options: [
          "By deploying a contract whose fallback() function calls the withdraw function again recursively before balance is zeroed",
          "By mining blocks faster than the network average",
          "By triggering an arithmetic underflow in Solidity 0.8",
          "By changing the chainId of the transaction"
        ],
        correctIndex: 0,
        explanation: "This is classic reentrancy. Because state balance update occurs after the ETH transfer, the attacker's fallback function is invoked while the contract still thinks they have positive balance, draining funds recursively."
      }
    ],
    radarAxes: [
      { axis: "Smart Contract Security", score: 96, benchmark: 98 },
      { axis: "EVM & Gas Tuning", score: 92, benchmark: 95 },
      { axis: "DeFi Math & AMMs", score: 88, benchmark: 92 },
      { axis: "Zero-Knowledge Proofs", score: 72, benchmark: 85 },
      { axis: "Rust & Solana Anchor", score: 80, benchmark: 88 }
    ],
    skillsBreakdown: [
      { id: "s-w3-1", name: "Solidity 0.8 & EVM Memory Layout", category: "mastered", level: "Lvl 5 • Verified", statusLabel: "Mastered", progressPercent: 100 },
      { id: "s-w3-2", name: "Foundry Testing, Fuzzing & Invariant Testing", category: "mastered", level: "Lvl 5 • Verified", statusLabel: "Mastered", progressPercent: 100 },
      { id: "s-w3-3", name: "Uniswap v4 Hooks & AMM Math", category: "progress", level: "Lvl 3 • In-Progress", statusLabel: "In Progress", progressPercent: 65, sprintDuration: "5 Days remaining" },
      { id: "s-w3-4", name: "Circom zk-SNARKs & Groth16 Verifiers", category: "missing", level: "High Impact for Rollups", statusLabel: "Missing", highImpact: true, sprintDuration: "14 Days Micro-Sprint" },
      { id: "s-w3-5", name: "ERC-4337 Account Abstraction Paymasters", category: "missing", level: "Protocol Requirement", statusLabel: "Missing", productionTier: true, sprintDuration: "10 Days Micro-Sprint" }
    ],
    interviewScenario: {
      questionText: "What is a Read-Only Reentrancy attack in DeFi, and how do you protect external protocols integrating with your price oracles?",
      specialization: "Smart Contract Security Auditing",
      detectedKeywords: ["✓ Transient Storage", "✓ Curve Pool Exploit", "✓ Balancer Vault", "✓ nonReentrant View", "✓ TWAP Oracles"],
      transcript: "Read-only reentrancy occurs when a protocol's view functions report warped pool balances mid-execution during an external call before the contract state settles. We protect integrators by applying transient reentrancy flags to view query methods...",
      coachTip: "Flawless explanation of view function state warping! Reference the Euler Finance / Sentiment DeFi exploits."
    },
    salaryBands: [
      { level: "L4", title: "Smart Contract Engineer", baseSalary: 170000, equity: 65000, totalComp: 235000, yoyGrowth: "+18%" },
      { level: "L5", title: "Senior Protocol Architect", baseSalary: 220000, equity: 135000, totalComp: 355000, yoyGrowth: "+26%" },
      { level: "L6", title: "Principal Web3 Security Architect", baseSalary: 275000, equity: 265000, totalComp: 540000, yoyGrowth: "+35%" },
      { level: "L7", title: "Protocol Fellow / Founding Architect", baseSalary: 340000, equity: 510000, totalComp: 850000, yoyGrowth: "+44%" }
    ]
  },

  {
    id: "embedded-robotics-engineer",
    title: "Embedded Systems & Robotics Engineer",
    shortCode: "ROBOT-ENG",
    category: "Hardware & Robotics Engineering",
    description: "Architect hard real-time embedded systems, sensor fusion Kalman filters, RTOS firmware, and autonomous robot control pipelines with ROS2 & Rust/C++.",
    iconName: "Cpu",
    primaryLanguages: ["C", "C++", "Rust", "Python"],
    frameworks: ["ROS2 Humble/Iron", "FreeRTOS", "Embedded Linux", "Zephyr RTOS", "OpenCV", "CAN Bus", "Microchip/ARM"],
    metrics: {
      averageSalary: "$230,000",
      marketGrowth: "+28% YoY",
      openRoles: "4,600+",
      matchAccuracy: "94.6%"
    },
    milestones: [
      {
        id: "m-rob-1",
        phase: "Phase 01 • Completed",
        status: "completed",
        title: "C++20 & FreeRTOS Real-Time Kernel",
        description: "Deterministic task scheduling, priority inversion inheritance mutexes, and zero-allocation memory pools.",
        duration: "2 Weeks",
        salaryBump: "+$14,000 / yr",
        skills: ["FreeRTOS Queues", "Priority Inheritance", "DMA Zero-Copy", "ARM Cortex-M4"],
        recommendedAction: "Microsecond interrupt service routine (ISR) latency benchmarks validated."
      },
      {
        id: "m-rob-2",
        phase: "Phase 02 • In Progress",
        status: "in_progress",
        title: "Sensor Fusion & Extended Kalman Filter (EKF)",
        description: "IMU accelerometer/gyroscope integration, wheel odometry fusion, and high-frequency CAN-FD bus packet telemetry.",
        duration: "3 Weeks (60% Done)",
        salaryBump: "+$22,000 / yr",
        skills: ["EKF Sensor Fusion", "CAN-FD Bus", "State Space Estimation", "IMU Calibration"],
        progressPercent: 60,
        recommendedAction: "Complete the real-time Kalman Filter C++ sandbox."
      },
      {
        id: "m-rob-3",
        phase: "Phase 03 • Locked",
        status: "locked",
        title: "ROS2 Autonomous Navigation & SLAM",
        description: "Nav2 costmaps, LiDAR SLAM with Cartographer, and safety-critical motor controller fail-safe state machines.",
        duration: "4 Weeks",
        salaryBump: "+$34,000 / yr",
        skills: ["ROS2 DDS QoS Profiles", "Cartographer SLAM", "Nav2 Plugins", "ISO 26262 Functional Safety"],
        prerequisite: "Complete Phase 02 Sensor Fusion Validation"
      }
    ],
    codeSandbox: {
      language: "cpp",
      filename: "kalman_sensor_fusion.cpp",
      kernelInfo: "C++23 • Real-Time Embedded Clang Engine (1ms latency)",
      initialCode: `// Real-Time 1D Kalman Filter Sensor Fusion for Autonomous Robotics
#include <iostream>
#include <vector>

class KalmanFilter1D {
private:
    double x; // State estimate
    double p; // Estimate covariance
    double q; // Process noise
    double r; // Measurement noise

public:
    KalmanFilter1D(double initial_state, double process_noise, double measurement_noise)
        : x(initial_state), p(1.0), q(process_noise), r(measurement_noise) {}

    double update(double measurement) {
        // Prediction step
        p = p + q;

        // Kalman Gain
        double k = p / (p + r);

        // Correction step
        x = x + k * (measurement - x);
        p = (1.0 - k) * p;

        return x;
    }

    double get_state() const { return x; }
};

int main() {
    KalmanFilter1D filter(0.0, 0.05, 0.5);
    std::vector<double> noisy_sensor_feed = { 1.2, 0.9, 1.15, 0.98, 1.04, 1.01 };

    std::cout << "Raw Sensor Feed -> Filtered State:" << std::endl;
    for (double val : noisy_sensor_feed) {
        double filtered = filter.update(val);
        std::cout << "Measurement: " << val << "V -> Filtered: " << filtered << "V" << std::endl;
    }

    std::cout << "[Test Passed] Deterministic real-time Kalman filter completed in <1.2 microseconds! 🤖" << std::endl;
    return 0;
}
`,
      optimalSolution: `// Production Fixed-Point C++23 Implementation
// Eliminates floating point co-processor requirements for ultra-low power MCUs
`,
      unitTestExpected: "Noise variance attenuated by >68% with zero dynamic heap allocation.",
      hints: [
        { id: 1, title: "Process vs Measurement Noise", description: "Increase 'q' if the robot accelerates abruptly; increase 'r' if sensor hardware produces heavy gaussian noise." },
        { id: 2, title: "Zero Dynamic Allocation", description: "Avoid std::vector in microsecond control loops; use fixed arrays or std::array." },
        { id: 3, title: "Deterministic Timing", description: "Ensure the Kalman update execution time is bounded and fits inside the hardware timer interrupt period." }
      ],
      ast: [
        {
          name: "Class: KalmanFilter1D",
          type: "C++ Class",
          children: [
            { name: "update(measurement)", type: "Method: double" },
            { name: "get_state()", type: "Method: double" }
          ]
        }
      ]
    },
    quizQuestions: [
      {
        id: "q-rob-1",
        domain: "RTOS Concurrency & Priority Inversion",
        scenario: "In FreeRTOS, a low-priority task holds a mutex lock on the CAN bus. A medium-priority task preempts it, preventing a high-priority motor braking task from acquiring the lock.",
        question: "What real-time operating system mechanism prevents this catastrophic priority inversion?",
        options: [
          "Disabling all interrupts permanently",
          "Priority Inheritance: The low-priority task temporarily inherits the high-priority task's priority while holding the mutex",
          "Allocating 4x more RAM to the FreeRTOS heap",
          "Converting the RTOS into a round-robin time-sliced scheduler"
        ],
        correctIndex: 1,
        explanation: "Priority Inheritance automatically elevates the priority of the task holding the mutex to match the highest priority task waiting on it, preventing medium-priority tasks from preempting it and resolving the deadlock."
      }
    ],
    radarAxes: [
      { axis: "Real-Time OS & C++", score: 95, benchmark: 95 },
      { axis: "ROS2 & Navigation", score: 88, benchmark: 92 },
      { axis: "Sensor Fusion & Control", score: 92, benchmark: 95 },
      { axis: "Hardware Protocols (CAN/SPI)", score: 90, benchmark: 92 },
      { axis: "Embedded Linux & Rust", score: 78, benchmark: 88 }
    ],
    skillsBreakdown: [
      { id: "s-rob-1", name: "C++20 & FreeRTOS Kernel Internals", category: "mastered", level: "Lvl 5 • Verified", statusLabel: "Mastered", progressPercent: 100 },
      { id: "s-rob-2", name: "CAN Bus, I2C, SPI & DMA Drivers", category: "mastered", level: "Lvl 5 • Verified", statusLabel: "Mastered", progressPercent: 100 },
      { id: "s-rob-3", name: "Sensor Fusion & Extended Kalman Filter (EKF)", category: "progress", level: "Lvl 3 • In-Progress", statusLabel: "In Progress", progressPercent: 60, sprintDuration: "6 Days remaining" },
      { id: "s-rob-4", name: "ROS2 Humble DDS QoS & Nav2 Plugins", category: "missing", level: "High Impact for Autonomy", statusLabel: "Missing", highImpact: true, sprintDuration: "14 Days Micro-Sprint" },
      { id: "s-rob-5", name: "ISO 26262 Functional Safety State Machines", category: "missing", level: "Safety-Critical Spec", statusLabel: "Missing", productionTier: true, sprintDuration: "10 Days Micro-Sprint" }
    ],
    interviewScenario: {
      questionText: "How do you guarantee hard real-time execution bounds (jitter < 50 microseconds) for a motor controller loop running on an ARM Cortex-M7 with concurrent sensor telemetry?",
      specialization: "Hard Real-Time Systems & Embedded Hardware",
      detectedKeywords: ["✓ Hardware Timer Interrupt (TIM)", "✓ DMA Circular Buffers", "✓ TCM (Tightly Coupled Memory)", "✓ Zero-Copy Ring Buffers", "✓ Disable Dynamic Allocations"],
      transcript: "We bind the motor control loop directly to high-priority hardware timer interrupts (TIMx) mapped into Tightly Coupled Memory (ITCM/DTCM) to avoid flash wait states and cache misses, using DMA for sensor bus transfers with double-buffering...",
      coachTip: "Masterful focus on ITCM/DTCM zero-wait-state memory! Mention memory protection unit (MPU) regions to prevent stack overflows."
    },
    salaryBands: [
      { level: "L4", title: "Embedded Firmware Engineer III", baseSalary: 155000, equity: 48000, totalComp: 203000, yoyGrowth: "+12%" },
      { level: "L5", title: "Senior Robotics Systems Engineer", baseSalary: 195000, equity: 105000, totalComp: 300000, yoyGrowth: "+22%" },
      { level: "L6", title: "Principal Robotics Architect", baseSalary: 245000, equity: 215000, totalComp: 460000, yoyGrowth: "+30%" },
      { level: "L7", title: "Distinguished Robotics Fellow", baseSalary: 300000, equity: 420000, totalComp: 720000, yoyGrowth: "+38%" }
    ]
  }
];

// Fallback legacy accessors for backwards compatibility
export const MILESTONE_NODES: MilestoneNode[] = CAREER_TRACKS[0].milestones;
export const INITIAL_SANDBOX_CODE = CAREER_TRACKS[0].codeSandbox.initialCode;
export const OPTIMAL_SOLUTION_CODE = CAREER_TRACKS[0].codeSandbox.optimalSolution;
export const CODE_SANDBOX_INITIAL_STATE: CodeSandboxState = {
  code: CAREER_TRACKS[0].codeSandbox.initialCode,
  language: CAREER_TRACKS[0].codeSandbox.language,
  filename: CAREER_TRACKS[0].codeSandbox.filename,
  activeTab: 'console',
  isKernelReady: true,
  latency: "12ms latency",
  revealedHintCount: 1,
  hints: CAREER_TRACKS[0].codeSandbox.hints.map(h => ({ ...h, isRevealed: h.id === 1 })),
  optimalSolution: CAREER_TRACKS[0].codeSandbox.optimalSolution,
  logs: [
    { type: 'info', text: 'Executing script on PyTorch CUDA v12.2 sandbox...' },
    { type: 'success', text: 'Forward pass verified without memory leak.' },
    { type: 'highlight', text: 'LoRA Adapter Initialized: 6,144 trainable params out of 595,968 total.' },
    { type: 'pass', text: '[Test Passed] 98.97% parameter reduction achieved! 🎉' }
  ],
  vram: {
    gpuName: "NVIDIA A100-SXM4-80GB HBM2e",
    cudaStatus: "CUDA:0 Active",
    allocatedMb: 0.42,
    totalMb: 81920,
    cachedBuffersMb: 0.024,
    peakMb: 0.58
  },
  astNodes: CAREER_TRACKS[0].codeSandbox.ast
};
export const QUIZ_QUESTIONS: QuizQuestion[] = CAREER_TRACKS[0].quizQuestions;
export const RESUME_METRICS: ResumeMetric = {
  overallScore: 92,
  documentStructure: 95,
  keywordDensity: 88,
  actionVerbs: 93
};
export const BULLET_REFINEMENTS: BulletPointRefinement[] = [
  {
    id: "b-1",
    severity: "critical",
    title: "Replace weak action verbs with architectural impact",
    originalText: "Worked on team projects to fine-tune open source models for chat.",
    refinedText: "Architected distributed LoRA & QLoRA fine-tuning pipelines for Llama-3-70B, reducing GPU training cluster costs by 42% while preserving 99.4% benchmark MMLU accuracy.",
    impactMetrics: "Saved $180k/yr GPU compute • 42% latency improvement"
  },
  {
    id: "b-2",
    severity: "critical",
    title: "Quantify throughput metrics in inference serving",
    originalText: "Set up vLLM server to serve company internal API requests.",
    refinedText: "Engineered high-throughput vLLM inference engine with PagedAttention and continuous batching, scaling to 12,000 req/sec at <45ms p99 time-to-first-token.",
    impactMetrics: "Scaled to 12k req/sec • <45ms p99 latency SLA"
  },
  {
    id: "b-3",
    severity: "medium",
    title: "Emphasize fault-tolerant distributed systems expertise",
    originalText: "Fixed distributed bugs and improved uptime of backend microservices.",
    refinedText: "Spearheaded zero-downtime migration to Kubernetes orchestrated micro-kernels with Raft consensus, achieving 99.995% service availability across multi-region VPCs.",
    impactMetrics: "99.995% SLA • Zero downtime migration"
  }
];
export const SKILL_ITEMS: SkillItem[] = CAREER_TRACKS[0].skillsBreakdown;
export const INTERVIEW_TELEMETRY: InterviewTelemetry = {
  currentQuestionIndex: 3,
  totalQuestions: 5,
  questionText: CAREER_TRACKS[0].interviewScenario.questionText,
  targetRole: CAREER_TRACKS[0].title,
  specialization: CAREER_TRACKS[0].interviewScenario.specialization,
  isRecording: true,
  timeElapsedSeconds: 42,
  maxTimeSeconds: 120,
  wpm: 142,
  audioInputDb: "-14 dB",
  audioFrequency: "48 kHz",
  detectedKeywords: CAREER_TRACKS[0].interviewScenario.detectedKeywords,
  confidenceScore: 89,
  speechClarityScore: 94,
  technicalDepthScore: 96,
  technicalDepthLevel: "L6+ Principal Tier",
  coachFeedback: CAREER_TRACKS[0].interviewScenario.coachTip,
  transcript: CAREER_TRACKS[0].interviewScenario.transcript
};
export const SALARY_BANDS: SalaryBand[] = CAREER_TRACKS[0].salaryBands;
export const METRO_HUBS: MetroHub[] = [
  {
    city: "San Francisco, CA",
    country: "USA",
    avgComp: "$385k",
    openings: "4,200+ Openings",
    tier: "Tier 1",
    bgImage: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80"
  },
  {
    city: "London",
    country: "United Kingdom",
    avgComp: "£195k",
    openings: "2,800+ Openings",
    tier: "Tier 1",
    bgImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80"
  },
  {
    city: "Tokyo",
    country: "Japan",
    avgComp: "¥24M",
    openings: "1,900+ Openings",
    tier: "Tier 2",
    bgImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80"
  }
];
