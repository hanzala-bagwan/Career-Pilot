"""
CareerPilot AI — Submodule & Final Exam Bank
Provides structured submodules, per-submodule assessments, and 15-20 question module Final Exams with variant support.
"""

from typing import Dict, Any, List, Optional
from utils.w3schools_map import get_curated_w3schools_resources

# ─────────────────────────────────────────────────────────────────────────────
# SUBMODULE DEFINITIONS PER MODULE
# ─────────────────────────────────────────────────────────────────────────────

MODULE_SUBMODULES: Dict[str, List[Dict[str, Any]]] = {
    "mod_1": [
        {
            "id": "sub_1_1",
            "module_id": "mod_1",
            "title": "Variables, Primitive Types & Operators",
            "difficulty": "Beginner",
            "order": 1,
            "has_coding_challenge": True,
            "coding_challenge_count": 1,
            "topics": ["Variables & Types", "Numbers & Strings", "Operators"],
            "what_you_will_learn": [
                "Dynamic typing, variable assignment, and Python memory references",
                "Working with primitive types: int, float, str, and bool",
                "Arithmetic, logical, and comparison operators with precedence rules"
            ],
            "test_scope": "4 Conceptual MCQs + 1 Python Challenge (Function: calculate_bill) • 15 Mins",
            "mcqs": [
                {
                    "id": "sub_1_1_q1",
                    "topic": "Variables & Types",
                    "question": "Which of the following creates an immutable sequence in Python?",
                    "options": {
                        "A": "items = [1, 2, 3]",
                        "B": "items = (1, 2, 3)",
                        "C": "items = {1, 2, 3}",
                        "D": "items = {'a': 1}"
                    },
                    "correct_option": "B",
                    "explanation": "Tuples are defined using parentheses or commas and cannot be modified once instantiated."
                },
                {
                    "id": "sub_1_1_q2",
                    "topic": "Numbers & Strings",
                    "question": "What is the result of the expression `type(5 / 2)` in Python 3?",
                    "options": {
                        "A": "<class 'int'>",
                        "B": "<class 'float'>",
                        "C": "<class 'double'>",
                        "D": "<class 'number'>"
                    },
                    "correct_option": "B",
                    "explanation": "In Python 3, the standard division operator `/` always produces a float result (2.5)."
                },
                {
                    "id": "sub_1_1_q3",
                    "topic": "Operators",
                    "question": "What is the output of `bool('False')` in Python?",
                    "options": {
                        "A": "False",
                        "B": "True",
                        "C": "None",
                        "D": "ValueError"
                    },
                    "correct_option": "B",
                    "explanation": "Any non-empty string in Python evaluates to truthy when converted to bool."
                },
                {
                    "id": "sub_1_1_q4",
                    "topic": "Variables & Types",
                    "question": "Which function converts a string representation of an integer '42' into a numeric integer?",
                    "options": {
                        "A": "str('42')",
                        "B": "int('42')",
                        "C": "parse('42')",
                        "D": "float('42')"
                    },
                    "correct_option": "B",
                    "explanation": "The built-in `int()` constructor converts convertible string literals into integers."
                }
            ],
            "conceptual_question": {
                "title": "Primitive Mutability",
                "prompt": "Explain why attempting to modify a character in an existing Python string (e.g. s[0] = 'a') raises a TypeError.",
                "sample_answer": "Strings in Python are immutable objects. Memory buffers allocated for strings cannot be modified in-place; modifications require allocating a new string object."
            },
            "coding_challenge": {
                "id": "code_sub_1_1",
                "title": "Calculate Net Invoice Total",
                "topic": "Operators & Types",
                "description": "Write a function `calculate_bill(amount, tax_rate, discount)` that computes the final bill: applies discount percentage first, then adds tax percentage. Return the final rounded float to 2 decimal places.",
                "function_name": "calculate_bill",
                "starter_code": "def calculate_bill(amount, tax_rate, discount):\n    # Return final total rounded to 2 decimal places\n    pass\n",
                "test_cases": [
                    {
                        "input": [100.0, 10.0, 20.0],
                        "expected": 88.0
                    },
                    {
                        "input": [50.0, 5.0, 0.0],
                        "expected": 52.5
                    },
                    {
                        "input": [200.0, 8.0, 15.0],
                        "expected": 183.6
                    }
                ]
            }
        },
        {
            "id": "sub_1_2",
            "module_id": "mod_1",
            "title": "Control Flow, Conditionals & Loops",
            "difficulty": "Beginner",
            "order": 2,
            "has_coding_challenge": True,
            "coding_challenge_count": 1,
            "topics": ["If Else Conditions", "While Loops", "For Loops & Ranges"],
            "what_you_will_learn": [
                "Conditional branching with if, elif, and else statements",
                "Iterating through sequential collections with for loops and range()",
                "Managing loop execution with break, continue, and while statements"
            ],
            "test_scope": "4 Conceptual MCQs + 1 Python Challenge (Function: sum_multiples) • 15 Mins",
            "mcqs": [
                {
                    "id": "sub_1_2_q1",
                    "topic": "If Else Conditions",
                    "question": "Which Python keyword allows checking secondary conditions if the initial `if` statement is false?",
                    "options": {
                        "A": "else if",
                        "B": "elif",
                        "C": "elseif",
                        "D": "case"
                    },
                    "correct_option": "B",
                    "explanation": "Python uses the compact keyword `elif` for chained conditional checks."
                },
                {
                    "id": "sub_1_2_q2",
                    "topic": "For Loops & Ranges",
                    "question": "What sequence is generated by `list(range(2, 10, 3))`?",
                    "options": {
                        "A": "[2, 5, 8]",
                        "B": "[2, 5, 8, 11]",
                        "C": "[3, 6, 9]",
                        "D": "[2, 3, 4, 5, 6, 7, 8, 9]"
                    },
                    "correct_option": "A",
                    "explanation": "range(start=2, stop=10, step=3) generates 2, 2+3=5, 5+3=8. The next step 11 is >= stop."
                },
                {
                    "id": "sub_1_2_q3",
                    "topic": "While Loops",
                    "question": "What happens if a `while` loop condition never evaluates to False and has no `break` statement?",
                    "options": {
                        "A": "Python automatically terminates it after 1000 iterations",
                        "B": "An infinite loop occurs consuming CPU until interrupted",
                        "C": "A RecursionError is raised",
                        "D": "A SyntaxError is raised at compilation"
                    },
                    "correct_option": "B",
                    "explanation": "While loops execute indefinitely until their boolean expression evaluates to false or an interrupt/break occurs."
                },
                {
                    "id": "sub_1_2_q4",
                    "topic": "For Loops & Ranges",
                    "question": "Which loop control keyword skips the current iteration and advances immediately to the next iteration?",
                    "options": {
                        "A": "break",
                        "B": "continue",
                        "C": "pass",
                        "D": "return"
                    },
                    "correct_option": "B",
                    "explanation": "`continue` halts current iteration logic and proceeds to the next iteration of the loop."
                }
            ],
            "conceptual_question": {
                "title": "Loop Termination & Edge Cases",
                "prompt": "How does Python's `for...else` construct operate, and when does the `else` block execute?",
                "sample_answer": "The `else` block attached to a `for` loop executes ONLY if the loop completed naturally without encountering a `break` statement."
            },
            "coding_challenge": {
                "id": "code_sub_1_2",
                "title": "Sum of Multiples in Range",
                "topic": "For Loops & Ranges",
                "description": "Write a function `sum_multiples(limit, divisor)` that calculates the sum of all integers between 1 and `limit` (inclusive) that are evenly divisible by `divisor`.",
                "function_name": "sum_multiples",
                "starter_code": "def sum_multiples(limit, divisor):\n    # Return the sum of multiples\n    pass\n",
                "test_cases": [
                    {
                        "input": [10, 3],
                        "expected": 18
                    },
                    {
                        "input": [20, 5],
                        "expected": 50
                    },
                    {
                        "input": [15, 7],
                        "expected": 21
                    }
                ]
            }
        },
        {
            "id": "sub_1_3",
            "module_id": "mod_1",
            "title": "Functions, Scopes & Functional Paradigms",
            "difficulty": "Intermediate",
            "order": 3,
            "has_coding_challenge": True,
            "coding_challenge_count": 1,
            "topics": ["Functions & Scope", "Lambda", "Return Values"],
            "what_you_will_learn": [
                "Defining modular functions with default, positional, and keyword parameters",
                "Understanding the LEGB (Local, Enclosing, Global, Built-in) scope hierarchy",
                "Using lambda expressions, list comprehensions, and higher-order functional tools"
            ],
            "test_scope": "4 Conceptual MCQs + 1 Python Challenge (Function: filter_even_squares) • 15 Mins",
            "mcqs": [
                {
                    "id": "sub_1_3_q1",
                    "topic": "Functions & Scope",
                    "question": "What is the return value of a Python function that executes without an explicit `return` statement?",
                    "options": {
                        "A": "0",
                        "B": "False",
                        "C": "None",
                        "D": "undefined"
                    },
                    "correct_option": "C",
                    "explanation": "Functions without an explicit return statement implicitly return `None` upon reaching the end."
                },
                {
                    "id": "sub_1_3_q2",
                    "topic": "Lambda",
                    "question": "What is the output of `list(map(lambda x: x * 2, [1, 2, 3]))`?",
                    "options": {
                        "A": "[1, 2, 3, 1, 2, 3]",
                        "B": "[2, 4, 6]",
                        "C": "[1, 4, 9]",
                        "D": "[2, 2, 2]"
                    },
                    "correct_option": "B",
                    "explanation": "`map` applies the doubling lambda to each element, producing [2, 4, 6]."
                },
                {
                    "id": "sub_1_3_q3",
                    "topic": "Functions & Scope",
                    "question": "Why is using a mutable object (like a list `[]`) as a default function argument considered an anti-pattern in Python?",
                    "options": {
                        "A": "It causes a SyntaxError",
                        "B": "The default argument is evaluated once when the function is defined, persisting state across calls",
                        "C": "Lists cannot be passed into functions",
                        "D": "It slows down function lookups by 50%"
                    },
                    "correct_option": "B",
                    "explanation": "Default arguments are evaluated once at definition time, sharing the same mutable list across repeated calls."
                },
                {
                    "id": "sub_1_3_q4",
                    "topic": "Functions & Scope",
                    "question": "Which keyword is used inside a function to rebind or assign to a variable in the outer enclosing global namespace?",
                    "options": {
                        "A": "nonlocal",
                        "B": "outer",
                        "C": "global",
                        "D": "super"
                    },
                    "correct_option": "C",
                    "explanation": "`global` declares that an identifier refers to the module-level global namespace."
                }
            ],
            "conceptual_question": {
                "title": "Closures & Variable Capture",
                "prompt": "Describe how a closure in Python captures variables from its enclosing scope.",
                "sample_answer": "A closure retains a binding to variables from its enclosing lexical environment via the `__closure__` cell references, even after the outer function finishes execution."
            },
            "coding_challenge": {
                "id": "code_sub_1_3",
                "title": "Filter & Square Even Numbers",
                "topic": "Functions & Scope",
                "description": "Write a function `filter_even_squares(numbers)` that takes a list of integers and returns a new list containing the squares of only the even integers in their original order.",
                "function_name": "filter_even_squares",
                "starter_code": "def filter_even_squares(numbers):\n    # Return list of squared evens\n    pass\n",
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
        {
            "id": "sub_1_4",
            "module_id": "mod_1",
            "title": "Object-Oriented Programming & Error Handling",
            "difficulty": "Intermediate",
            "order": 4,
            "has_coding_challenge": True,
            "coding_challenge_count": 1,
            "topics": ["OOP & Classes", "Inheritance", "Try Except Blocks"],
            "what_you_will_learn": [
                "Class design, instantiation, `self` reference, and dunder initialization (`__init__`)",
                "Inheritance hierarchies, method overriding, and `super()` resolution",
                "Defensive programming with structured try, except, else, and finally blocks"
            ],
            "test_scope": "4 Conceptual MCQs + 1 Python Challenge (Function: safe_average_calculator) • 15 Mins",
            "mcqs": [
                {
                    "id": "sub_1_4_q1",
                    "topic": "OOP & Classes",
                    "question": "What is the primary purpose of `self` as the first parameter of an instance method in a Python class?",
                    "options": {
                        "A": "It refers to the parent superclass",
                        "B": "It refers to the specific instance of the object invoking the method",
                        "C": "It is a reserved static memory pointer",
                        "D": "It acts as a global keyword"
                    },
                    "correct_option": "B",
                    "explanation": "`self` represents the instance of the class upon which attributes and methods are bound."
                },
                {
                    "id": "sub_1_4_q2",
                    "topic": "Inheritance",
                    "question": "Which function correctly delegates a method call to the parent class implementation?",
                    "options": {
                        "A": "parent().method()",
                        "B": "super().method()",
                        "C": "base.method(self)",
                        "D": "inherit(self).method()"
                    },
                    "correct_option": "B",
                    "explanation": "`super()` returns a proxy object delegating method calls to classes in the Method Resolution Order (MRO)."
                },
                {
                    "id": "sub_1_4_q3",
                    "topic": "Try Except Blocks",
                    "question": "In a `try...except...else...finally` block, when does the `else` block execute?",
                    "options": {
                        "A": "Whenever an exception occurs",
                        "B": "Only when the `try` block succeeds without raising any exceptions",
                        "C": "Always, right before `finally`",
                        "D": "Only if `finally` raises an error"
                    },
                    "correct_option": "B",
                    "explanation": "The `else` block runs only if no exception was raised in the `try` block."
                },
                {
                    "id": "sub_1_4_q4",
                    "topic": "OOP & Classes",
                    "question": "Which dunder method defines the human-readable string representation of a Python object, typically called by `str()` or `print()`?",
                    "options": {
                        "A": "__repr__",
                        "B": "__str__",
                        "C": "__name__",
                        "D": "__init__"
                    },
                    "correct_option": "B",
                    "explanation": "`__str__` is intended to provide an informal, human-readable representation of the object."
                }
            ],
            "conceptual_question": {
                "title": "Exception Chaining & Clean Architecture",
                "prompt": "Why should developers catch specific exception types (e.g. ValueError, KeyError) instead of using bare `except:` clauses?",
                "sample_answer": "Catching specific exceptions prevents masking unrelated critical bugs (such as KeyboardInterrupt or SystemExit) and allows precise error recovery mechanisms."
            },
            "coding_challenge": {
                "id": "code_sub_1_4",
                "title": "Safe Grade Average Calculator",
                "topic": "Error Handling & OOP",
                "description": "Write a function `safe_average_calculator(grades)` that takes a list of values. Filter out invalid items (non-numbers, negatives, or > 100). If no valid grades remain, return 0.0. Otherwise return the average rounded to 2 decimal places.",
                "function_name": "safe_average_calculator",
                "starter_code": "def safe_average_calculator(grades):\n    # Return rounded average of valid grades or 0.0\n    pass\n",
                "test_cases": [
                    {
                        "input": [[80, 90, 100]],
                        "expected": 90.0
                    },
                    {
                        "input": [[100, "invalid", -5, 120, 50]],
                        "expected": 75.0
                    },
                    {
                        "input": [["a", "b", -1]],
                        "expected": 0.0
                    }
                ]
            }
        }
    ],
    "mod_2": [
        {
            "id": "sub_2_1",
            "module_id": "mod_2",
            "title": "Arrays, Slicing & String Algorithms",
            "difficulty": "Intermediate",
            "order": 1,
            "has_coding_challenge": True,
            "coding_challenge_count": 1,
            "topics": ["Arrays & Strings", "Data Structures"],
            "what_you_will_learn": [
                "Contiguous memory layout and array slicing semantics",
                "Two-pointer techniques for string and array transformations",
                "In-place versus out-of-place complexity trade-offs"
            ],
            "test_scope": "4 MCQs + 1 Python Challenge (Function: reverse_words) • 15 Mins",
            "mcqs": [
                {
                    "id": "sub_2_1_q1",
                    "topic": "Arrays & Strings",
                    "question": "What is the average time complexity of appending an element to the end of a dynamic array in Python?",
                    "options": {
                        "A": "O(1) amortized",
                        "B": "O(n)",
                        "C": "O(log n)",
                        "D": "O(n^2)"
                    },
                    "correct_option": "A",
                    "explanation": "Appending is O(1) amortized because over-allocation prevents resizing on every append."
                },
                {
                    "id": "sub_2_1_q2",
                    "topic": "Arrays & Strings",
                    "question": "What is the time complexity of slicing a list `items[1:n]`?",
                    "options": {
                        "A": "O(1)",
                        "B": "O(k) where k is the slice length",
                        "C": "O(n log n)",
                        "D": "O(log k)"
                    },
                    "correct_option": "B",
                    "explanation": "Slicing copies k elements to create a new list object, taking O(k) time and space."
                },
                {
                    "id": "sub_2_1_q3",
                    "topic": "Arrays & Strings",
                    "question": "Which Python expression cleanly reverses a list in-place?",
                    "options": {
                        "A": "list[::-1]",
                        "B": "list.reverse()",
                        "C": "reversed(list)",
                        "D": "list.invert()"
                    },
                    "correct_option": "B",
                    "explanation": "`list.reverse()` modifies the list in place with O(1) auxiliary space."
                },
                {
                    "id": "sub_2_1_q4",
                    "topic": "Arrays & Strings",
                    "question": "Which data structure provides O(1) left popping and right appending in Python standard library?",
                    "options": {
                        "A": "collections.deque",
                        "B": "list",
                        "C": "queue.PriorityQueue",
                        "D": "set"
                    },
                    "correct_option": "A",
                    "explanation": "`collections.deque` is a doubly linked list optimized for O(1) appends and pops from both ends."
                }
            ],
            "conceptual_question": {
                "title": "Two-Pointer Strategy",
                "prompt": "Explain how the two-pointer approach optimizes time complexity in sorted array searches.",
                "sample_answer": "Two pointers allow linear O(n) exploration of a search space by converging inwards based on sorted order properties, avoiding brute-force O(n^2) nested loops."
            },
            "coding_challenge": {
                "id": "code_sub_2_1",
                "title": "Reverse Words in Sentence",
                "topic": "Arrays & Strings",
                "description": "Write a function `reverse_words(sentence)` that takes a string of words and returns the words in reverse order joined by a single space, stripping extra whitespace.",
                "function_name": "reverse_words",
                "starter_code": "def reverse_words(sentence):\n    # Return words in reverse order\n    pass\n",
                "test_cases": [
                    {
                        "input": ["the sky is blue"],
                        "expected": "blue is sky the"
                    },
                    {
                        "input": ["  hello world  "],
                        "expected": "world hello"
                    },
                    {
                        "input": ["single"],
                        "expected": "single"
                    }
                ]
            }
        },
        {
            "id": "sub_2_2",
            "module_id": "mod_2",
            "title": "Hash Maps & Frequency Analysis",
            "difficulty": "Intermediate",
            "order": 2,
            "has_coding_challenge": True,
            "coding_challenge_count": 1,
            "topics": ["Hash Maps", "Time Complexity"],
            "what_you_will_learn": [
                "Hash functions, collision resolution mechanisms, and load factors",
                "Using hash tables for O(1) constant-time key lookups and counting",
                "Applying frequency counting algorithms to detect anagrams and duplicates"
            ],
            "test_scope": "4 MCQs + 1 Python Challenge (Function: find_first_unique) • 15 Mins",
            "mcqs": [
                {
                    "id": "sub_2_2_q1",
                    "topic": "Hash Maps",
                    "question": "What is the average time complexity of retrieving a value by key from a hash map?",
                    "options": {
                        "A": "O(1)",
                        "B": "O(log n)",
                        "C": "O(n)",
                        "D": "O(n log n)"
                    },
                    "correct_option": "A",
                    "explanation": "Under normal uniform hashing, key lookup takes average O(1) constant time."
                },
                {
                    "id": "sub_2_2_q2",
                    "topic": "Hash Maps",
                    "question": "What causes worst-case O(n) performance in a hash map?",
                    "options": {
                        "A": "Low memory",
                        "B": "Severe hash collisions where all keys hash to the same bucket",
                        "C": "Using integer keys",
                        "D": "Rehashing during expansion"
                    },
                    "correct_option": "B",
                    "explanation": "If all keys hash to the same bucket, lookups degrade to linear traversal O(n)."
                },
                {
                    "id": "sub_2_2_q3",
                    "topic": "Hash Maps",
                    "question": "Which standard library class counts occurrences of elements into a hash map?",
                    "options": {
                        "A": "collections.Counter",
                        "B": "collections.defaultdict",
                        "C": "collections.OrderedDict",
                        "D": "itertools.count"
                    },
                    "correct_option": "A",
                    "explanation": "`collections.Counter` is a dictionary subclass designed specifically for counting hashable objects."
                },
                {
                    "id": "sub_2_2_q4",
                    "topic": "Time Complexity",
                    "question": "What is the space complexity of creating a frequency map of an array with N elements, where all elements are unique?",
                    "options": {
                        "A": "O(1)",
                        "B": "O(n)",
                        "C": "O(n^2)",
                        "D": "O(log n)"
                    },
                    "correct_option": "B",
                    "explanation": "Storing N distinct key-value pairs requires O(n) auxiliary space."
                }
            ],
            "conceptual_question": {
                "title": "Space-Time Tradeoff",
                "prompt": "How does using a hash map allow the classic Two-Sum problem to improve from O(n^2) to O(n)?",
                "sample_answer": "By caching seen numbers in a hash map, we can check if the complement (target - current) exists in O(1) time rather than scanning the rest of the array."
            },
            "coding_challenge": {
                "id": "code_sub_2_2",
                "title": "First Unique Character",
                "topic": "Hash Maps",
                "description": "Write a function `find_first_unique(s)` that finds the first non-repeating character in a string and returns its index. If no unique character exists, return -1.",
                "function_name": "find_first_unique",
                "starter_code": "def find_first_unique(s):\n    # Return index of first non-repeating character or -1\n    pass\n",
                "test_cases": [
                    {
                        "input": ["leetcode"],
                        "expected": 0
                    },
                    {
                        "input": ["loveleetcode"],
                        "expected": 2
                    },
                    {
                        "input": ["aabb"],
                        "expected": -1
                    }
                ]
            }
        },
        {
            "id": "sub_2_3",
            "module_id": "mod_2",
            "title": "Binary Search & Recursion",
            "difficulty": "Advanced",
            "order": 3,
            "has_coding_challenge": True,
            "coding_challenge_count": 1,
            "topics": ["Binary Search", "Recursion", "Time Complexity"],
            "what_you_will_learn": [
                "Binary search invariant conditions on monotonic arrays",
                "Formulating recursive base cases and recursive relations",
                "Analyzing recursion call stack space complexity and depth"
            ],
            "test_scope": "4 MCQs + 1 Python Challenge (Function: binary_search_target) • 15 Mins",
            "mcqs": [
                {
                    "id": "sub_2_3_q1",
                    "topic": "Binary Search",
                    "question": "What is the prerequisite condition for applying binary search on an array?",
                    "options": {
                        "A": "All elements must be positive integers",
                        "B": "The array must be sorted in monotonic order",
                        "C": "The array size must be an exact power of 2",
                        "D": "The array must contain zero duplicates"
                    },
                    "correct_option": "B",
                    "explanation": "Binary search divides the search space by half, requiring elements to be sorted."
                },
                {
                    "id": "sub_2_3_q2",
                    "topic": "Binary Search",
                    "question": "What is the time complexity of binary search on a sorted array of N items?",
                    "options": {
                        "A": "O(1)",
                        "B": "O(log n)",
                        "C": "O(n)",
                        "D": "O(n log n)"
                    },
                    "correct_option": "B",
                    "explanation": "Halving the search space each step yields O(log n) time complexity."
                },
                {
                    "id": "sub_2_3_q3",
                    "topic": "Recursion",
                    "question": "What error is raised in Python when a recursive function exceeds maximum call stack depth?",
                    "options": {
                        "A": "MemoryError",
                        "B": "RecursionError",
                        "C": "StackOverflowError",
                        "D": "DepthLimitExceeded"
                    },
                    "correct_option": "B",
                    "explanation": "Python raises `RecursionError` when call depth surpasses `sys.getrecursionlimit()`."
                },
                {
                    "id": "sub_2_3_q4",
                    "topic": "Recursion",
                    "question": "What is the base case in a recursive algorithm?",
                    "options": {
                        "A": "The recursive step that calls the function itself",
                        "B": "The termination condition that stops further recursion without making another call",
                        "C": "The initial arguments passed from main",
                        "D": "The memoization cache lookup"
                    },
                    "correct_option": "B",
                    "explanation": "The base case halts recursion and prevents infinite call stack loops."
                }
            ],
            "conceptual_question": {
                "title": "Recursion vs Iteration",
                "prompt": "Compare the space overhead of recursive binary search versus iterative binary search.",
                "sample_answer": "Iterative binary search uses O(1) auxiliary space, whereas recursive binary search consumes O(log n) call stack frames unless tail-call optimized."
            },
            "coding_challenge": {
                "id": "code_sub_2_3",
                "title": "Binary Search Index",
                "topic": "Binary Search",
                "description": "Write a function `binary_search_target(nums, target)` that returns the index of target in a sorted list `nums`, or -1 if not found. Must run in O(log n) time.",
                "function_name": "binary_search_target",
                "starter_code": "def binary_search_target(nums, target):\n    # Return index of target or -1\n    pass\n",
                "test_cases": [
                    {
                        "input": [[-1, 0, 3, 5, 9, 12], 9],
                        "expected": 4
                    },
                    {
                        "input": [[-1, 0, 3, 5, 9, 12], 2],
                        "expected": -1
                    },
                    {
                        "input": [[5], 5],
                        "expected": 0
                    }
                ]
            }
        }
    ]
}


# ─────────────────────────────────────────────────────────────────────────────
# MODULE FINAL EXAMS (15–20 questions, mixed MCQs, conceptual & 2-3 code challenges)
# Supports multiple variants for retakes
# ─────────────────────────────────────────────────────────────────────────────

MODULE_FINAL_EXAMS: Dict[str, Dict[str, Any]] = {
    "mod_1": {
        "variant_a": {
            "variant_id": "variant_a",
            "module_id": "mod_1",
            "title": "Module 1 Final Comprehensive Examination",
            "subtitle": "Comprehensive evaluation covering Python Syntax, Control Flow, Functions, OOP & Error Handling",
            "question_count": 16,
            "passing_percentage": 75.0,
            "duration_minutes": 45,
            "mcqs": [
                {
                    "id": "fe_1_q1",
                    "topic": "Variables & Types",
                    "question": "What is the value of `x` after executing `x = (1, 2, [3, 4]); x[2].append(5)` in Python?",
                    "options": {
                        "A": "Raises TypeError because tuples are immutable",
                        "B": "(1, 2, [3, 4, 5])",
                        "C": "(1, 2, [3, 4])",
                        "D": "Raises ValueError"
                    },
                    "correct_option": "B",
                    "explanation": "While the tuple itself cannot have elements added or removed, mutable objects contained inside the tuple (like lists) can be mutated."
                },
                {
                    "id": "fe_1_q2",
                    "topic": "Operators",
                    "question": "What is the result of `2 ** 3 ** 2` in Python?",
                    "options": {
                        "A": "64",
                        "B": "512",
                        "C": "128",
                        "D": "256"
                    },
                    "correct_option": "B",
                    "explanation": "The exponentiation operator `**` has right-to-left associativity: 3 ** 2 = 9, then 2 ** 9 = 512."
                },
                {
                    "id": "fe_1_q3",
                    "topic": "Control Flow",
                    "question": "Which of the following will correctly print numbers from 1 to 5?",
                    "options": {
                        "A": "for i in range(1, 5): print(i)",
                        "B": "for i in range(1, 6): print(i)",
                        "C": "for i in range(5): print(i)",
                        "D": "for i in range(0, 5): print(i)"
                    },
                    "correct_option": "B",
                    "explanation": "`range(1, 6)` generates integers 1, 2, 3, 4, 5. The upper bound is exclusive."
                },
                {
                    "id": "fe_1_q4",
                    "topic": "Functions & Scope",
                    "question": "What is the output of `(lambda a, b: a if a > b else b)(12, 25)`?",
                    "options": {
                        "A": "12",
                        "B": "25",
                        "C": "True",
                        "D": "None"
                    },
                    "correct_option": "B",
                    "explanation": "The lambda expression evaluates the ternary conditional and returns the maximum (25)."
                },
                {
                    "id": "fe_1_q5",
                    "topic": "OOP & Classes",
                    "question": "In Python, how is private name mangling achieved for attributes within a class?",
                    "options": {
                        "A": "Using the `private` keyword prefix",
                        "B": "Prefixing the attribute name with double underscores `__var`",
                        "C": "Adding an `@private` decorator",
                        "D": "Defining attributes inside `def private():`"
                    },
                    "correct_option": "B",
                    "explanation": "Attributes with leading double underscores (e.g. `__secret`) are internally rewritten to `_ClassName__secret` to avoid collision."
                },
                {
                    "id": "fe_1_q6",
                    "topic": "Error Handling",
                    "question": "What block in Python error handling executes when an exception was NOT raised in `try`?",
                    "options": {
                        "A": "except",
                        "B": "else",
                        "C": "finally",
                        "D": "catch"
                    },
                    "correct_option": "B",
                    "explanation": "The `else` clause in a try-except statement executes only when the `try` block completes cleanly."
                },
                {
                    "id": "fe_1_q7",
                    "topic": "Variables & Types",
                    "question": "Which method removes all elements from a Python dictionary?",
                    "options": {
                        "A": "dict.delete()",
                        "B": "dict.clear()",
                        "C": "dict.empty()",
                        "D": "del dict"
                    },
                    "correct_option": "B",
                    "explanation": "`dict.clear()` empties the dictionary in-place."
                },
                {
                    "id": "fe_1_q8",
                    "topic": "Functions & Scope",
                    "question": "What does the `*args` syntax in a function definition signify?",
                    "options": {
                        "A": "Keyword arguments packed into a dictionary",
                        "B": "Arbitrary positional arguments packed into a tuple",
                        "C": "Pointer dereferencing",
                        "D": "Mandatory arguments"
                    },
                    "correct_option": "B",
                    "explanation": "`*args` collects extraneous positional arguments into a tuple."
                },
                {
                    "id": "fe_1_q9",
                    "topic": "OOP & Classes",
                    "question": "Which built-in function checks whether an object is an instance of a class or a subclass thereof?",
                    "options": {
                        "A": "type(obj) == Cls",
                        "B": "isinstance(obj, Cls)",
                        "C": "issubclass(obj, Cls)",
                        "D": "hasattr(obj, Cls)"
                    },
                    "correct_option": "B",
                    "explanation": "`isinstance(obj, Cls)` inspects both direct class instantiation and inheritance hierarchies."
                },
                {
                    "id": "fe_1_q10",
                    "topic": "Iterators",
                    "question": "What built-in exception signals that an iterator has no further items?",
                    "options": {
                        "A": "IndexError",
                        "B": "StopIteration",
                        "C": "EOFError",
                        "D": "IteratorExhausted"
                    },
                    "correct_option": "B",
                    "explanation": "`StopIteration` is raised by `__next__()` when iteration terminates."
                },
                {
                    "id": "fe_1_q11",
                    "topic": "Error Handling",
                    "question": "How can you manually raise an exception with a custom message in Python?",
                    "options": {
                        "A": "throw ValueError('Invalid input')",
                        "B": "raise ValueError('Invalid input')",
                        "C": "error(ValueError, 'Invalid input')",
                        "D": "panic('Invalid input')"
                    },
                    "correct_option": "B",
                    "explanation": "Python uses the `raise` keyword to signal exceptions."
                },
                {
                    "id": "fe_1_q12",
                    "topic": "Functions & Scope",
                    "question": "What is the scope lookup resolution sequence used by Python?",
                    "options": {
                        "A": "Global -> Local -> Built-in -> Enclosing",
                        "B": "Local -> Enclosing -> Global -> Built-in",
                        "C": "Local -> Global -> Enclosing -> Built-in",
                        "D": "Built-in -> Global -> Local"
                    },
                    "correct_option": "B",
                    "explanation": "Python resolves variables via the LEGB rule (Local, Enclosing, Global, Built-in)."
                }
            ],
            "conceptual_questions": [
                {
                    "id": "fe_1_c1",
                    "title": "Architectural Design: OOP Inheritance vs Composition",
                    "prompt": "Explain the principle 'Favor composition over inheritance' and describe a scenario where composition is superior in Python.",
                    "sample_answer": "Composition builds complex objects by assembling reusable components ('has-a') rather than rigid inheritance hierarchies ('is-a'). It reduces coupling and prevents fragile base class issues."
                },
                {
                    "id": "fe_1_c2",
                    "title": "Memory Management & Garbage Collection",
                    "prompt": "How does CPython manage memory for Python objects, and what role do reference counting and cyclic GC play?",
                    "sample_answer": "CPython uses reference counting as its primary mechanism, immediately deallocating objects when refcount drops to 0. A generational cyclic garbage collector periodically sweeps circular references."
                }
            ],
            "coding_challenges": [
                {
                    "id": "fe_1_code_1",
                    "title": "Final Challenge 1: Anagram Frequency Validator",
                    "topic": "Algorithms & Collections",
                    "description": "Write a function `is_valid_anagram(s, t)` that checks if string `t` is an anagram of string `s` (ignoring case and non-alphanumeric characters). Return True or False.",
                    "function_name": "is_valid_anagram",
                    "starter_code": "def is_valid_anagram(s, t):\n    # Return True if anagram, False otherwise\n    pass\n",
                    "test_cases": [
                        {
                            "input": ["Anagram", "Nag a ram"],
                            "expected": True
                        },
                        {
                            "input": ["rat", "car"],
                            "expected": False
                        },
                        {
                            "input": ["A man, a plan, a canal: Panama", "Panama canal plan a man a"],
                            "expected": True
                        }
                    ]
                },
                {
                    "id": "fe_1_code_2",
                    "title": "Final Challenge 2: Deep Flatten & Type Filter",
                    "topic": "Recursion & Data Model",
                    "description": "Write a function `deep_flatten_integers(nested_list)` that flattens any arbitrarily nested list structure and returns a single list containing only the integer elements in order.",
                    "function_name": "deep_flatten_integers",
                    "starter_code": "def deep_flatten_integers(nested_list):\n    # Return flat list of integers\n    pass\n",
                    "test_cases": [
                        {
                            "input": [[[1, [2, 3], "ignore", [4, [5]]]]],
                            "expected": [1, 2, 3, 4, 5]
                        },
                        {
                            "input": [[[], [[], 7], 8]],
                            "expected": [7, 8]
                        },
                        {
                            "input": [["a", "b", ["c"]]],
                            "expected": []
                        }
                    ]
                }
            ]
        },
        "variant_b": {
            "variant_id": "variant_b",
            "module_id": "mod_1",
            "title": "Module 1 Final Comprehensive Examination (Variant B)",
            "subtitle": "Alternative Exam Suite: Python Data Model, Generators, OOP & Defensive Architecture",
            "question_count": 16,
            "passing_percentage": 75.0,
            "duration_minutes": 45,
            "mcqs": [
                {
                    "id": "fe_1b_q1",
                    "topic": "Variables & Types",
                    "question": "What is the difference between `==` and `is` in Python?",
                    "options": {
                        "A": "`==` checks memory identity, `is` checks value equality",
                        "B": "`==` checks value equality, `is` checks object memory identity",
                        "C": "They are completely interchangeable",
                        "D": "`is` is used for numbers only"
                    },
                    "correct_option": "B",
                    "explanation": "`==` evaluates if the values of the operands are equal; `is` evaluates if both variables point to the identical object in memory."
                },
                {
                    "id": "fe_1b_q2",
                    "topic": "Functions & Scope",
                    "question": "Which keyword turns a standard Python function into a generator that yields values on demand?",
                    "options": {
                        "A": "return",
                        "B": "yield",
                        "C": "generate",
                        "D": "emit"
                    },
                    "correct_option": "B",
                    "explanation": "The `yield` statement suspends function execution and returns an intermediate value, resuming on the next `next()` call."
                },
                {
                    "id": "fe_1b_q3",
                    "topic": "OOP & Classes",
                    "question": "What is a `@classmethod` in Python?",
                    "options": {
                        "A": "A method that cannot access any class attributes",
                        "B": "A method that receives the class `cls` as its first argument instead of `self`",
                        "C": "A method defined outside a class",
                        "D": "An abstract method that cannot be implemented"
                    },
                    "correct_option": "B",
                    "explanation": "`@classmethod` decorator binds the method to the class itself, passing `cls` as the first argument."
                },
                {
                    "id": "fe_1b_q4",
                    "topic": "Error Handling",
                    "question": "Which statement can be placed in a `finally` block to execute cleanups without suppressing existing exceptions?",
                    "options": {
                        "A": "pass",
                        "B": "return None",
                        "C": "file.close()",
                        "D": "exit()"
                    },
                    "correct_option": "C",
                    "explanation": "Resource closing operations like `file.close()` ensure release of OS descriptors without suppressing exceptions."
                },
                {
                    "id": "fe_1b_q5",
                    "topic": "Control Flow",
                    "question": "What is the output of `[i * i for i in range(4) if i % 2 != 0]`?",
                    "options": {
                        "A": "[0, 4]",
                        "B": "[1, 9]",
                        "C": "[1, 4, 9]",
                        "D": "[0, 1, 4, 9]"
                    },
                    "correct_option": "B",
                    "explanation": "range(4) has odd numbers 1 and 3. Their squares are 1 and 9."
                },
                {
                    "id": "fe_1b_q6",
                    "topic": "Variables & Types",
                    "question": "What is the time complexity of checking `x in my_set` where `my_set` is a Python set of size N?",
                    "options": {
                        "A": "O(1) average",
                        "B": "O(n)",
                        "C": "O(log n)",
                        "D": "O(n^2)"
                    },
                    "correct_option": "A",
                    "explanation": "Python sets are implemented using hash tables, offering O(1) average lookup time."
                },
                {
                    "id": "fe_1b_q7",
                    "topic": "OOP & Classes",
                    "question": "Which special method allows an instance of a class to be called like a function `obj()`?",
                    "options": {
                        "A": "__invoke__",
                        "B": "__call__",
                        "C": "__exec__",
                        "D": "__init__"
                    },
                    "correct_option": "B",
                    "explanation": "Implementing `__call__` allows instances of classes to behave as callables."
                },
                {
                    "id": "fe_1b_q8",
                    "topic": "Functions & Scope",
                    "question": "What is the output of `sorted(['10', '2', '1', '20'])` using standard lexicographical sort?",
                    "options": {
                        "A": "['1', '2', '10', '20']",
                        "B": "['1', '10', '2', '20']",
                        "C": "['20', '10', '2', '1']",
                        "D": "['2', '20', '1', '10']"
                    },
                    "correct_option": "B",
                    "explanation": "Strings are sorted character by character: '1' < '10' < '2' < '20'."
                },
                {
                    "id": "fe_1b_q9",
                    "topic": "Iterators",
                    "question": "Which protocol must a Python object implement to be iterable in a `for` loop?",
                    "options": {
                        "A": "__loop__()",
                        "B": "__iter__() and __next__()",
                        "C": "__sequence__()",
                        "D": "__each__()"
                    },
                    "correct_option": "B",
                    "explanation": "The iterator protocol requires `__iter__()` to return an iterator and `__next__()` to fetch items."
                },
                {
                    "id": "fe_1b_q10",
                    "topic": "Error Handling",
                    "question": "What happens if a custom exception class does not inherit from `BaseException` or `Exception`?",
                    "options": {
                        "A": "It works normally",
                        "B": "A TypeError is raised when attempting to raise it",
                        "C": "Python converts it to a warning",
                        "D": "It automatically inherits from object"
                    },
                    "correct_option": "B",
                    "explanation": "Exceptions in Python must derive from `BaseException` (typically `Exception`); otherwise raising them produces a TypeError."
                },
                {
                    "id": "fe_1b_q11",
                    "topic": "Functions & Scope",
                    "question": "What does `functools.lru_cache` decorator do?",
                    "options": {
                        "A": "Saves function code to disk",
                        "B": "Memoizes function return values based on arguments to prevent redundant computation",
                        "C": "Restricts function to a single thread",
                        "D": "Enforces static type checking"
                    },
                    "correct_option": "B",
                    "explanation": "`lru_cache` wraps a function with a Least Recently Used memoization cache."
                },
                {
                    "id": "fe_1b_q12",
                    "topic": "Variables & Types",
                    "question": "Which of the following creates a shallow copy of list `a`?",
                    "options": {
                        "A": "b = a",
                        "B": "b = a.copy() or a[:]",
                        "C": "b = copy.deepcopy(a)",
                        "D": "b = list(a).freeze()"
                    },
                    "correct_option": "B",
                    "explanation": "`a.copy()` or slicing `a[:]` produces a shallow copy."
                }
            ],
            "conceptual_questions": [
                {
                    "id": "fe_1b_c1",
                    "title": "Generators vs List Comprehensions",
                    "prompt": "Compare the memory consumption of generating 10 million integers using a list comprehension vs a generator expression `(x for x in range(10_000_000))`.",
                    "sample_answer": "A list comprehension allocates all 10 million integers in memory upfront (~80MB+), whereas a generator yields one item at a time lazily, requiring constant O(1) memory (~100 bytes)."
                },
                {
                    "id": "fe_1b_c2",
                    "title": "Python GIL (Global Interpreter Lock)",
                    "prompt": "Explain what the GIL is in CPython and how it affects CPU-bound multi-threading versus IO-bound concurrency.",
                    "sample_answer": "The GIL is a mutex protecting access to Python objects, preventing multiple native threads from executing Python bytecode simultaneously. CPU-bound tasks cannot scale across multiple cores with threads (requiring multiprocessing), whereas I/O-bound tasks release the GIL during I/O waits."
                }
            ],
            "coding_challenges": [
                {
                    "id": "fe_1b_code_1",
                    "title": "Final Challenge 1: Clean Running Average Stream",
                    "topic": "Functions & Iterators",
                    "description": "Write a function `running_average(numbers, window_size)` that calculates the moving average for every complete sliding window of size `window_size`. Return a list of averages rounded to 2 decimal places.",
                    "function_name": "running_average",
                    "starter_code": "def running_average(numbers, window_size):\n    # Return list of window averages\n    pass\n",
                    "test_cases": [
                        {
                            "input": [[10, 20, 30, 40, 50], 3],
                            "expected": [20.0, 30.0, 40.0]
                        },
                        {
                            "input": [[1, 2, 3], 1],
                            "expected": [1.0, 2.0, 3.0]
                        },
                        {
                            "input": [[5, 10], 3],
                            "expected": []
                        }
                    ]
                },
                {
                    "id": "fe_1b_code_2",
                    "title": "Final Challenge 2: Group By Frequency Map",
                    "topic": "Collections & Dictionaries",
                    "description": "Write a function `group_by_frequency(items)` that groups items by how many times they appear in the list. Return a dictionary where keys are integer frequencies, and values are sorted lists of unique items with that frequency.",
                    "function_name": "group_by_frequency",
                    "starter_code": "def group_by_frequency(items):\n    # Return dict {frequency: [sorted items]}\n    pass\n",
                    "test_cases": [
                        {
                            "input": [["a", "b", "a", "c", "b", "a"]],
                            "expected": {3: ["a"], 2: ["b"], 1: ["c"]}
                        },
                        {
                            "input": [[1, 2, 3]],
                            "expected": {1: [1, 2, 3]}
                        },
                        {
                            "input": [[]],
                            "expected": {}
                        }
                    ]
                }
            ]
        }
    }
}


def get_submodules_for_module(module_id: str, module_name: Optional[str] = None) -> List[Dict[str, Any]]:
    """
    Returns the curated list of submodules for a module, enriched with W3Schools verified links.
    """
    norm_id = str(module_id).replace('-', '_').lower()
    for k, v in MODULE_SUBMODULES.items():
        if k.replace('-', '_').lower() == norm_id:
            enriched = []
            for s in v:
                item = dict(s)
                item["w3schools_links"] = get_curated_w3schools_resources(s.get("topics", []), "python")
                enriched.append(item)
            return enriched

    # Default fallback submodules for other modules
    sub_names = [
        ("Core Concepts & Syntax", "Beginner", True),
        ("Practical Implementations & Patterns", "Intermediate", True),
        ("Advanced Optimization & Production Architecture", "Advanced", True),
    ]
    
    generated = []
    for idx, (title, diff, has_code) in enumerate(sub_names, 1):
        topics = [f"{module_name or 'Topic'} Part {idx}", "Best Practices", "Implementation"]
        generated.append({
            "id": f"sub_{module_id}_{idx}",
            "module_id": module_id,
            "title": f"{module_name or 'Module'} — {title}",
            "difficulty": diff,
            "order": idx,
            "has_coding_challenge": has_code,
            "coding_challenge_count": 1,
            "topics": topics,
            "what_you_will_learn": [
                f"Master foundational concepts and design principles in {module_name or 'module'}",
                "Write clean, idiomatic code adhering to industry standards",
                "Solve real-world engineering constraints and test cases"
            ],
            "test_scope": f"4 MCQs + 1 Practical Code Challenge • 15 Mins",
            "w3schools_links": get_curated_w3schools_resources(topics, "python"),
            "mcqs": [
                {
                    "id": f"sub_{module_id}_{idx}_q1",
                    "topic": "Best Practices",
                    "question": f"What is the key advantage of modular design in {module_name or 'software engineering'}?",
                    "options": {
                        "A": "Improves testability, separation of concerns, and maintainability",
                        "B": "Allows avoiding all unit tests",
                        "C": "Makes single-file deployments compulsory",
                        "D": "Increases execution latency"
                    },
                    "correct_option": "A",
                    "explanation": "Modularity isolates components for independent verification and refactoring."
                },
                {
                    "id": f"sub_{module_id}_{idx}_q2",
                    "topic": "Implementation",
                    "question": "Which principle guarantees that functions produce the same output for identical inputs without mutating outside state?",
                    "options": {
                        "A": "Idempotence and pure functions",
                        "B": "Global state mutation",
                        "C": "Dynamic monkey patching",
                        "D": "Circular dependencies"
                    },
                    "correct_option": "A",
                    "explanation": "Pure functions eliminate hidden side effects and facilitate deterministic testing."
                }
            ],
            "conceptual_question": {
                "title": f"Production Architecture in {module_name or 'Engineering'}",
                "prompt": "Explain how unit tests and automated verification prevent regressions in high-velocity teams.",
                "sample_answer": "Automated verification runs on every code submission to guarantee adherence to contract invariants and catch edge-case regressions early."
            },
            "coding_challenge": {
                "id": f"code_{module_id}_{idx}",
                "title": f"{module_name or 'Module'} Solution Validator",
                "topic": "Implementation",
                "description": "Write a function `validate_stream(data)` that takes a list of integers and returns only the positive numbers sorted in ascending order.",
                "function_name": "validate_stream",
                "starter_code": "def validate_stream(data):\n    # Return sorted positive integers\n    pass\n",
                "test_cases": [
                    {
                        "input": [[5, -2, 10, -8, 0, 3]],
                        "expected": [3, 5, 10]
                    },
                    {
                        "input": [[-1, -2, -3]],
                        "expected": []
                    },
                    {
                        "input": [[1, 1, 2]],
                        "expected": [1, 1, 2]
                    }
                ]
            }
        })
    return generated


def get_final_exam_for_module(module_id: str, variant: str = "variant_a", module_name: Optional[str] = None) -> Dict[str, Any]:
    """
    Retrieves the 15-20 question Final Exam for a module, supporting multiple variants.
    """
    norm_id = str(module_id).replace('-', '_').lower()
    for k, variants in MODULE_FINAL_EXAMS.items():
        if k.replace('-', '_').lower() == norm_id:
            if variant in variants:
                return variants[variant]
            return variants.get("variant_a", list(variants.values())[0])

    # Dynamic fallback Final Exam with 15 questions
    return {
        "variant_id": variant or "variant_a",
        "module_id": module_id,
        "title": f"{module_name or 'Module'} Final Comprehensive Examination",
        "subtitle": f"15-Question Final Milestone Assessment covering all {module_name or 'core'} concepts and challenges.",
        "question_count": 15,
        "passing_percentage": 75.0,
        "duration_minutes": 45,
        "mcqs": [
            {
                "id": f"fe_{module_id}_q{i}",
                "topic": "Core Fundamentals",
                "question": f"Question #{i}: Which architectural practice best ensures system resilience and fault tolerance in {module_name or 'software systems'}?",
                "options": {
                    "A": "Graceful degradation, timeout boundaries, and circuit breakers",
                    "B": "Infinite retry loops without backoff",
                    "C": "Ignoring error codes and logging nothing",
                    "D": "Single point of failure architectures"
                },
                "correct_option": "A",
                "explanation": "Circuit breakers and timeouts isolate failures and preserve availability."
            } for i in range(1, 12)
        ],
        "conceptual_questions": [
            {
                "id": f"fe_{module_id}_c1",
                "title": "Architectural Scalability",
                "prompt": "Discuss the trade-offs between vertical and horizontal scaling in production backend systems.",
                "sample_answer": "Vertical scaling upgrades existing node capacity (RAM/CPU) with minimal code changes but hardware ceilings. Horizontal scaling adds nodes, requiring stateless architectures and distributed coordination."
            },
            {
                "id": f"fe_{module_id}_c2",
                "title": "API Contract Governance",
                "prompt": "How does semantic versioning and schema validation protect client integrations?",
                "sample_answer": "Strict contracts and versioning guarantee backward compatibility and provide client discovery without unexpected breaking changes."
            }
        ],
        "coding_challenges": [
            {
                "id": f"fe_{module_id}_code_1",
                "title": "Comprehensive Challenge 1: Data Deduplication & Summary",
                "topic": "Data Pipelines",
                "description": "Write a function `summarize_unique_scores(scores)` that takes a list of numeric scores, removes duplicates, and returns a dictionary with 'count', 'max', 'min', and 'avg' (rounded to 2 decimal places). If empty, return {}.",
                "function_name": "summarize_unique_scores",
                "starter_code": "def summarize_unique_scores(scores):\n    # Return summary dict or {}\n    pass\n",
                "test_cases": [
                    {
                        "input": [[10, 20, 20, 30]],
                        "expected": {"count": 3, "max": 30, "min": 10, "avg": 20.0}
                    },
                    {
                        "input": [[]],
                        "expected": {}
                    },
                    {
                        "input": [[100]],
                        "expected": {"count": 1, "max": 100, "min": 100, "avg": 100.0}
                    }
                ]
            },
            {
                "id": f"fe_{module_id}_code_2",
                "title": "Comprehensive Challenge 2: In-Order Pair Matching",
                "topic": "Algorithms",
                "description": "Write a function `find_target_pairs(nums, target)` that returns all unique pairs (a, b) such that a + b == target and a <= b, sorted in ascending order.",
                "function_name": "find_target_pairs",
                "starter_code": "def find_target_pairs(nums, target):\n    # Return sorted list of (a, b) tuples or lists\n    pass\n",
                "test_cases": [
                    {
                        "input": [[1, 2, 3, 4, 5, 6], 7],
                        "expected": [[1, 6], [2, 5], [3, 4]]
                    },
                    {
                        "input": [[1, 1, 1, 1], 2],
                        "expected": [[1, 1]]
                    },
                    {
                        "input": [[1, 2, 3], 10],
                        "expected": []
                    }
                ]
            }
        ]
    }
