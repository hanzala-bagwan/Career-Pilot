import json
import os
from typing import Dict, Any, Optional
from dotenv import load_dotenv

load_dotenv()

CURATED_ASSESSMENTS = {
    "mod_1": {
        "module_id": "mod_1",
        "module_name": "Python Programming & Core Syntax",
        "role": "AI Engineer",
        "topics": ["Variables & Types", "Control Flow", "Functions & Scope", "OOP & Classes", "Error Handling"],
        "description": "Test your grasp of foundational Python, data structures, functional paradigms, and object-oriented principles.",
        "mcqs": [
            {
                "id": "q1",
                "topic": "Variables & Types",
                "question": "Which of the following data structures in Python is immutable and hashable, making it suitable for dictionary keys?",
                "options": {
                    "A": "List [1, 2, 3]",
                    "B": "Tuple (1, 2, 3)",
                    "C": "Set {1, 2, 3}",
                    "D": "Dictionary {'a': 1}"
                },
                "correct_option": "B",
                "explanation": "Tuples are immutable sequences in Python; provided their elements are also immutable, they can be hashed and used as dictionary keys."
            },
            {
                "id": "q2",
                "topic": "Functions & Scope",
                "question": "What is the output of `(lambda x, y: x * 2 + y)(3, 4)` in Python?",
                "options": {
                    "A": "14",
                    "B": "10",
                    "C": "11",
                    "D": "SyntaxError"
                },
                "correct_option": "B",
                "explanation": "The lambda evaluates (3 * 2) + 4 = 6 + 4 = 10."
            },
            {
                "id": "q3",
                "topic": "OOP & Classes",
                "question": "In Python object-oriented programming, which special method is called immediately after an instance is created to initialize its attributes?",
                "options": {
                    "A": "__new__",
                    "B": "__call__",
                    "C": "__init__",
                    "D": "__repr__"
                },
                "correct_option": "C",
                "explanation": "__init__ is the initializer method executed to set up object state when a class is instantiated."
            },
            {
                "id": "q4",
                "topic": "Error Handling",
                "question": "Which block in a Python `try...except...finally` construct is ALWAYS executed, regardless of whether an exception occurred or was handled?",
                "options": {
                    "A": "except",
                    "B": "else",
                    "C": "finally",
                    "D": "catch"
                },
                "correct_option": "C",
                "explanation": "The finally block always runs, making it ideal for cleanup tasks such as closing file descriptors or network sockets."
            }
        ],
        "conceptual_question": {
            "title": "Deep Copy vs Shallow Copy",
            "prompt": "Explain the difference between a shallow copy (`copy.copy`) and a deep copy (`copy.deepcopy`) when dealing with compound nested data structures in Python.",
            "sample_answer": "A shallow copy constructs a new compound object and inserts references into it to the objects found in the original. A deep copy recursively constructs copies of objects found within the original, avoiding unintended mutations."
        },
        "coding_challenge": {
            "id": "code_1",
            "title": "Filter & Square Even Numbers",
            "topic": "Practical Implementation",
            "description": "Write a function `filter_even_squares(numbers)` that takes a list of integers and returns a new list containing the squares of only the even integers in their original order.",
            "function_name": "filter_even_squares",
            "starter_code": "def filter_even_squares(numbers):\n    # Write your solution here\n    pass\n",
            "test_cases": [
                {
                    "input": [[1, 2, 3, 4, 5, 6]],
                    "expected": [4, 16, 36]
                },
                {
                    "input": [[7, 9, 11]],
                    "expected": []
                },
                {
                    "input": [[0, -2, -4]],
                    "expected": [0, 4, 16]
                }
            ]
        }
    },
    "mod_2": {
        "module_id": "mod_2",
        "module_name": "Data Structures & Algorithms",
        "role": "AI Engineer",
        "topics": ["Arrays & Strings", "Hash Maps", "Binary Search", "Recursion", "Time Complexity"],
        "description": "Assess your understanding of time complexity, search algorithms, string transformations, and hash maps.",
        "mcqs": [
            {
                "id": "q1",
                "topic": "Time Complexity",
                "question": "What is the worst-case and average-case time complexity of looking up a key in a standard Python dictionary (hash table)?",
                "options": {
                    "A": "Average O(1), Worst O(n)",
                    "B": "Average O(log n), Worst O(n)",
                    "C": "Average O(n), Worst O(n^2)",
                    "D": "Average O(1), Worst O(1)"
                },
                "correct_option": "A",
                "explanation": "Hash table lookups take average O(1) time, but can degrade to O(n) in the worst case due to catastrophic hash collisions."
            },
            {
                "id": "q2",
                "topic": "Binary Search",
                "question": "What fundamental precondition must be satisfied before Binary Search can be performed on an array?",
                "options": {
                    "A": "All elements must be distinct positive integers",
                    "B": "The array must be sorted in ascending or descending order",
                    "C": "The array length must be a power of two",
                    "D": "The elements must be stored in a linked list"
                },
                "correct_option": "B",
                "explanation": "Binary Search operates by repeatedly halving search intervals, which requires the elements to be sorted."
            },
            {
                "id": "q3",
                "topic": "Recursion",
                "question": "What happens if a recursive function in Python fails to reach or define a base case condition?",
                "options": {
                    "A": "It returns None automatically",
                    "B": "It causes a RecursionError (Maximum recursion depth exceeded)",
                    "C": "It terminates with a ZeroDivisionError",
                    "D": "Python compiles it into an iterative loop"
                },
                "correct_option": "B",
                "explanation": "Without a valid base case, recursive frames accumulate on the call stack until hitting `sys.getrecursionlimit()`, triggering a RecursionError."
            }
        ],
        "conceptual_question": {
            "title": "Stack vs Queue Invariance",
            "prompt": "Compare the ordering principle of a Stack (LIFO) versus a Queue (FIFO) and provide a concrete software engineering use case for each.",
            "sample_answer": "Stack is Last-In-First-Out (used for function call stacks and undo/redo operations). Queue is First-In-First-Out (used for task scheduling, print queues, and BFS graph traversals)."
        },
        "coding_challenge": {
            "id": "code_2",
            "title": "Valid Alphanumeric Palindrome",
            "topic": "Arrays & Strings",
            "description": "Write a function `is_palindrome_sentence(s)` that determines if a string `s` is a palindrome after converting all uppercase letters to lowercase and removing all non-alphanumeric characters. Return True if it is a palindrome, False otherwise.",
            "function_name": "is_palindrome_sentence",
            "starter_code": "def is_palindrome_sentence(s):\n    # Write your solution here\n    pass\n",
            "test_cases": [
                {
                    "input": ["A man, a plan, a canal: Panama"],
                    "expected": True
                },
                {
                    "input": ["race a car"],
                    "expected": False
                },
                {
                    "input": [" "],
                    "expected": True
                }
            ]
        }
    },
    "mod_3": {
        "module_id": "mod_3",
        "module_name": "SQL & Relational Databases",
        "role": "AI Engineer",
        "topics": ["Basic Queries", "Joins & Subqueries", "Aggregations", "Indexing & Transactions"],
        "description": "Test your mastery of relational algebra, relational schemas, aggregation logic, and SQL data modeling.",
        "mcqs": [
            {
                "id": "q1",
                "topic": "Joins & Subqueries",
                "question": "Which JOIN type in SQL returns all matching rows from both tables, plus all unmatched rows from both the left and right tables?",
                "options": {
                    "A": "LEFT OUTER JOIN",
                    "B": "INNER JOIN",
                    "C": "FULL OUTER JOIN",
                    "D": "CROSS JOIN"
                },
                "correct_option": "C",
                "explanation": "A FULL OUTER JOIN retains all records from both tables, filling in NULLs for non-matching sides."
            },
            {
                "id": "q2",
                "topic": "Aggregations",
                "question": "What is the key difference between the `WHERE` clause and the `HAVING` clause in SQL?",
                "options": {
                    "A": "WHERE filters rows before aggregation; HAVING filters aggregated groups",
                    "B": "HAVING only works with primary keys; WHERE works with foreign keys",
                    "C": "WHERE can only be used with SELECT; HAVING can only be used with UPDATE",
                    "D": "There is no difference; they are interchangeable aliases"
                },
                "correct_option": "A",
                "explanation": "WHERE filters rows prior to the GROUP BY stage, while HAVING filters the groups produced after aggregation."
            },
            {
                "id": "q3",
                "topic": "Indexing & Transactions",
                "question": "In the context of database transactions (ACID), what does the 'I' stand for?",
                "options": {
                    "A": "Indexing",
                    "B": "Isolation",
                    "C": "Integrity",
                    "D": "Iteration"
                },
                "correct_option": "B",
                "explanation": "ACID stands for Atomicity, Consistency, Isolation, and Durability."
            }
        ],
        "conceptual_question": {
            "title": "B-Tree Indexing Impact",
            "prompt": "Why do indexes significantly speed up `SELECT` queries while adding minor overhead to `INSERT`, `UPDATE`, and `DELETE` operations?",
            "sample_answer": "Indexes maintain an ordered data structure (like B-Tree) that allows O(log n) lookups. When writing, deleting, or updating rows, the database must also update and balance the index trees."
        },
        "coding_challenge": {
            "id": "code_3",
            "title": "Aggregate Order Sums by Category",
            "topic": "Aggregations",
            "description": "Write a function `aggregate_sales(orders)` that takes a list of order dictionaries (each having 'category' and 'amount') and returns a dictionary with total sum per category.",
            "function_name": "aggregate_sales",
            "starter_code": "def aggregate_sales(orders):\n    # Write your solution here\n    pass\n",
            "test_cases": [
                {
                    "input": [[
                        {"category": "Books", "amount": 20},
                        {"category": "Books", "amount": 35},
                        {"category": "Tech", "amount": 150}
                    ]],
                    "expected": {"Books": 55, "Tech": 150}
                },
                {
                    "input": [[]],
                    "expected": {}
                },
                {
                    "input": [[
                        {"category": "Cloud", "amount": 50},
                        {"category": "Cloud", "amount": 75}
                    ]],
                    "expected": {"Cloud": 125}
                }
            ]
        }
    },
    "mod_4": {
        "module_id": "mod_4",
        "module_name": "Machine Learning Fundamentals",
        "role": "AI Engineer",
        "topics": ["Scikit-Learn", "Regression & Classification", "Evaluation Metrics", "Feature Engineering"],
        "description": "Evaluate your understanding of supervised learning algorithms, validation strategies, and performance metrics.",
        "mcqs": [
            {
                "id": "q1",
                "topic": "Evaluation Metrics",
                "question": "In a severe class-imbalance scenario (e.g., fraud detection with 99.8% non-fraudulent cases), why is Accuracy a misleading metric?",
                "options": {
                    "A": "A naive model predicting 'no fraud' always achieves 99.8% accuracy while finding zero fraud cases",
                    "B": "Accuracy can never exceed 50% on imbalanced data",
                    "C": "Accuracy requires continuous labels, not classification labels",
                    "D": "Accuracy cannot be calculated with scikit-learn"
                },
                "correct_option": "A",
                "explanation": "High accuracy in imbalanced datasets gives a false sense of performance. Precision, Recall, PR-AUC, and F1-score are needed."
            },
            {
                "id": "q2",
                "topic": "Regression & Classification",
                "question": "What is the primary purpose of L2 Regularization (Ridge) in linear regression modeling?",
                "options": {
                    "A": "It drives non-essential feature weights strictly to zero for feature selection",
                    "B": "It penalizes large coefficient magnitudes to reduce overfitting and variance",
                    "C": "It speeds up training by disabling gradient descent",
                    "D": "It eliminates the need for data normalization"
                },
                "correct_option": "B",
                "explanation": "L2 regularization shrinks coefficients toward zero without setting them exactly to zero, stabilizing multicollinearity and reducing variance."
            }
        ],
        "conceptual_question": {
            "title": "Bias-Variance Tradeoff",
            "prompt": "Explain what high bias versus high variance means, and identify how to diagnose each via train and validation error curves.",
            "sample_answer": "High bias = underfitting (both training and validation errors are high). High variance = overfitting (training error is low, but validation error is significantly higher, indicating poor generalization)."
        },
        "coding_challenge": {
            "id": "code_4",
            "title": "Calculate Accuracy & Precision",
            "topic": "Evaluation Metrics",
            "description": "Write a function `calculate_metrics(y_true, y_pred)` that takes two equal-length lists of binary labels (0 or 1) and returns a dictionary `{'accuracy': acc, 'precision': prec}` with both values rounded to 2 decimal places. (Precision = TP / (TP + FP); if TP + FP == 0, precision is 0.0).",
            "function_name": "calculate_metrics",
            "starter_code": "def calculate_metrics(y_true, y_pred):\n    # Write your solution here\n    pass\n",
            "test_cases": [
                {
                    "input": [[1, 0, 1, 1, 0, 1], [1, 0, 1, 0, 0, 1]],
                    "expected": {"accuracy": 0.83, "precision": 1.0}
                },
                {
                    "input": [[0, 0, 0], [0, 0, 0]],
                    "expected": {"accuracy": 1.0, "precision": 0.0}
                }
            ]
        }
    },
    "mod_5": {
        "module_id": "mod_5",
        "module_name": "Deep Learning & Neural Networks",
        "role": "AI Engineer",
        "topics": ["PyTorch Basics", "Backpropagation", "CNNs", "Loss Functions & Optimizers"],
        "description": "Assess neural network computation graphs, activation non-linearities, and optimization dynamics.",
        "mcqs": [
            {
                "id": "q1",
                "topic": "Loss Functions & Optimizers",
                "question": "Why is the ReLU (Rectified Linear Unit) activation function widely preferred over Sigmoid in deep multi-layer neural networks?",
                "options": {
                    "A": "ReLU eliminates the vanishing gradient problem for positive activations and is computationally inexpensive",
                    "B": "ReLU guarantees outputs strictly bounded between 0 and 1",
                    "C": "ReLU is differentiable at exactly x = 0",
                    "D": "ReLU automatically prevents dying neurons under all circumstances"
                },
                "correct_option": "A",
                "explanation": "Sigmoid saturates at both tails with near-zero gradients. ReLU has a constant derivative of 1 for positive inputs, mitigating vanishing gradients."
            }
        ],
        "conceptual_question": {
            "title": "Backpropagation Mechanics",
            "prompt": "How does the chain rule from calculus enable backpropagation in deep neural networks?",
            "sample_answer": "Backpropagation applies the chain rule repeatedly from output loss back through hidden layers to compute the partial derivative of loss with respect to each weight, allowing gradient descent parameter updates."
        },
        "coding_challenge": {
            "id": "code_5",
            "title": "Implement Vectorized ReLU Function",
            "topic": "PyTorch Basics",
            "description": "Write a function `relu_activation(values)` that takes a list of numeric floats and returns a new list where each negative value is replaced by 0.0, keeping positive numbers unchanged.",
            "function_name": "relu_activation",
            "starter_code": "def relu_activation(values):\n    # Write your solution here\n    pass\n",
            "test_cases": [
                {
                    "input": [[-2.5, 0.0, 3.2, -1.0, 5.0]],
                    "expected": [0.0, 0.0, 3.2, 0.0, 5.0]
                },
                {
                    "input": [[1.0, 2.0, 3.0]],
                    "expected": [1.0, 2.0, 3.0]
                }
            ]
        }
    },
    "mod_6": {
        "module_id": "mod_6",
        "module_name": "Generative AI & LLM Engineering",
        "role": "AI Engineer",
        "topics": ["Prompt Engineering", "Embeddings & Vector DBs", "RAG Systems", "Gemini API Integration"],
        "description": "Test skills in Retrieval-Augmented Generation, vector embeddings, token economics, and LLM prompting.",
        "mcqs": [
            {
                "id": "q1",
                "topic": "RAG Systems",
                "question": "What is the primary role of a Vector Database in a Retrieval-Augmented Generation (RAG) architecture?",
                "options": {
                    "A": "To fine-tune the LLM weights on proprietary documents overnight",
                    "B": "To index embedding vectors and perform fast semantic cosine/kNN similarity search to retrieve relevant context chunks",
                    "C": "To translate markdown prompt templates into binary machine code",
                    "D": "To replace the LLM with a rule-based expert system"
                },
                "correct_option": "B",
                "explanation": "Vector DBs store high-dimensional embeddings and execute approximate nearest neighbor search to inject relevant context into the LLM prompt."
            }
        ],
        "conceptual_question": {
            "title": "Grounding and Hallucination Reduction",
            "prompt": "Describe two prompt engineering or architectural methods used to prevent hallucinations in production LLM systems.",
            "sample_answer": "1. RAG with strict system instructions: 'Only answer using provided context; say I don't know if uncertain'. 2. Few-shot chain-of-thought prompting and post-generation citation validation."
        },
        "coding_challenge": {
            "id": "code_6",
            "title": "Text Chunker for Document Embedding",
            "topic": "Embeddings & Vector DBs",
            "description": "Write a function `chunk_text(words, chunk_size, overlap)` that takes a list of words (strings), a chunk size (int), and an overlap count (int), and returns a list of sub-lists representing sliding chunks.",
            "function_name": "chunk_text",
            "starter_code": "def chunk_text(words, chunk_size, overlap):\n    # Write your solution here\n    pass\n",
            "test_cases": [
                {
                    "input": [["a", "b", "c", "d", "e", "f"], 3, 1],
                    "expected": [["a", "b", "c"], ["c", "d", "e"], ["e", "f"]]
                },
                {
                    "input": [["hello", "world"], 4, 1],
                    "expected": [["hello", "world"]]
                }
            ]
        }
    }
}


def get_assessment_for_module(module_id: str, module_name: Optional[str] = None) -> Dict[str, Any]:
    """
    Returns curated assessment if available, otherwise generates custom dynamic assessment.
    """
    if module_id in CURATED_ASSESSMENTS:
        return CURATED_ASSESSMENTS[module_id]

    # Return default generic assessment structure if module is unknown
    return {
        "module_id": module_id,
        "module_name": module_name or "Custom Learning Module",
        "role": "General",
        "topics": ["Fundamentals", "Problem Solving", "Syntax", "Best Practices"],
        "description": f"Comprehensive diagnostic assessment for {module_name or 'current module'}.",
        "mcqs": [
            {
                "id": "q1",
                "topic": "Fundamentals",
                "question": f"Which principle is most essential when writing maintainable code in {module_name or 'software engineering'}?",
                "options": {
                    "A": "Modularity and separation of concerns",
                    "B": "Writing all logic in a single long file",
                    "C": "Avoiding comments and docstrings",
                    "D": "Ignoring edge cases"
                },
                "correct_option": "A",
                "explanation": "Modularity allows code to be tested, scaled, and maintained efficiently."
            },
            {
                "id": "q2",
                "topic": "Problem Solving",
                "question": "What is the optimal first step before implementing a solution for a complex engineering challenge?",
                "options": {
                    "A": "Jump straight into writing production code",
                    "B": "Understand the requirements, inputs, outputs, and constraints",
                    "C": "Delete existing tests",
                    "D": "Deploy immediately to cloud"
                },
                "correct_option": "B",
                "explanation": "Clarifying constraints and edge cases prevents architectural flaws."
            }
        ],
        "conceptual_question": {
            "title": "Design Principles",
            "prompt": "Explain how test-driven validation ensures code reliability in production software.",
            "sample_answer": "Writing automated unit and integration tests guarantees that functions behave as expected under diverse inputs and prevents regressions."
        },
        "coding_challenge": {
            "id": f"code_{module_id}",
            "title": "Data Sanitizer & Filter",
            "topic": "Problem Solving",
            "description": "Write a function `clean_data(items)` that takes a list of strings and returns a list of only non-empty, stripped lowercase strings.",
            "function_name": "clean_data",
            "starter_code": "def clean_data(items):\n    # Write your solution here\n    pass\n",
            "test_cases": [
                {
                    "input": [["  Hello  ", "", "  WORLD  ", " "]],
                    "expected": ["hello", "world"]
                },
                {
                    "input": [["Python", "AI"]],
                    "expected": ["python", "ai"]
                }
            ]
        }
    }
