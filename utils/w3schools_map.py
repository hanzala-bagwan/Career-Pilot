"""
CareerPilot AI — W3Schools Curated Resource Mapper
Maps learning topics and keywords to verified W3Schools URLs.
Strict Rule: Every URL must start with 'https://www.w3schools.com/'.
"""

from typing import List, Dict, Any

W3SCHOOLS_SUBJECT_MAP = {
    # Python Topics
    "variables & types": "https://www.w3schools.com/python/python_variables.asp",
    "python syntax": "https://www.w3schools.com/python/python_syntax.asp",
    "data types": "https://www.w3schools.com/python/python_datatypes.asp",
    "numbers & strings": "https://www.w3schools.com/python/python_strings.asp",
    "strings": "https://www.w3schools.com/python/python_strings.asp",
    "booleans": "https://www.w3schools.com/python/python_booleans.asp",
    "operators": "https://www.w3schools.com/python/python_operators.asp",
    "control flow": "https://www.w3schools.com/python/python_conditions.asp",
    "if else conditions": "https://www.w3schools.com/python/python_conditions.asp",
    "while loops": "https://www.w3schools.com/python/python_while_loops.asp",
    "for loops & ranges": "https://www.w3schools.com/python/python_for_loops.asp",
    "functions & scope": "https://www.w3schools.com/python/python_functions.asp",
    "functions": "https://www.w3schools.com/python/python_functions.asp",
    "lambda": "https://www.w3schools.com/python/python_lambda.asp",
    "scope": "https://www.w3schools.com/python/python_scope.asp",
    "lists": "https://www.w3schools.com/python/python_lists.asp",
    "tuples": "https://www.w3schools.com/python/python_tuples.asp",
    "sets": "https://www.w3schools.com/python/python_sets.asp",
    "dictionaries": "https://www.w3schools.com/python/python_dictionaries.asp",
    "hash maps": "https://www.w3schools.com/python/python_dictionaries.asp",
    "oop & classes": "https://www.w3schools.com/python/python_classes.asp",
    "classes & objects": "https://www.w3schools.com/python/python_classes.asp",
    "inheritance": "https://www.w3schools.com/python/python_inheritance.asp",
    "iterators": "https://www.w3schools.com/python/python_iterators.asp",
    "error handling": "https://www.w3schools.com/python/python_try_except.asp",
    "try except blocks": "https://www.w3schools.com/python/python_try_except.asp",
    "modules": "https://www.w3schools.com/python/python_modules.asp",
    "dates": "https://www.w3schools.com/python/python_datetime.asp",
    "math": "https://www.w3schools.com/python/python_math.asp",
    "json": "https://www.w3schools.com/python/python_json.asp",
    "regex": "https://www.w3schools.com/python/python_regex.asp",
    "file handling": "https://www.w3schools.com/python/python_file_handling.asp",
    
    # Data Structures & Algorithms
    "arrays & strings": "https://www.w3schools.com/python/python_arrays.asp",
    "binary search": "https://www.w3schools.com/dsa/dsa_algo_binarysearch.php",
    "recursion": "https://www.w3schools.com/python/python_functions.asp",
    "time complexity": "https://www.w3schools.com/dsa/dsa_theory_timecomplexity.php",
    "data structures": "https://www.w3schools.com/dsa/index.php",
    
    # SQL Topics
    "basic queries": "https://www.w3schools.com/sql/sql_select.asp",
    "sql select": "https://www.w3schools.com/sql/sql_select.asp",
    "sql where": "https://www.w3schools.com/sql/sql_where.asp",
    "joins & subqueries": "https://www.w3schools.com/sql/sql_join.asp",
    "sql join": "https://www.w3schools.com/sql/sql_join.asp",
    "inner join": "https://www.w3schools.com/sql/sql_join_inner.asp",
    "left join": "https://www.w3schools.com/sql/sql_join_left.asp",
    "aggregations": "https://www.w3schools.com/sql/sql_count_avg_sum.asp",
    "group by": "https://www.w3schools.com/sql/sql_groupby.asp",
    "having": "https://www.w3schools.com/sql/sql_having.asp",
    "indexing & transactions": "https://www.w3schools.com/sql/sql_create_index.asp",
    
    # Machine Learning & AI
    "numpy arrays": "https://www.w3schools.com/python/numpy/default.asp",
    "pandas dataframes": "https://www.w3schools.com/python/pandas/default.asp",
    "machine learning": "https://www.w3schools.com/python/python_ml_getting_started.asp",
    "linear regression": "https://www.w3schools.com/python/python_ml_linear_regression.asp",
    "ai fundamentals": "https://www.w3schools.com/ai/default.asp",
    
    # JavaScript & Web
    "async/await & promises": "https://www.w3schools.com/js/js_async.asp",
    "dom manipulation": "https://www.w3schools.com/js/js_htmldom.asp",
    "react components": "https://www.w3schools.com/react/react_components.asp",
    "git version control": "https://www.w3schools.com/git/default.asp",
    "rest api": "https://www.w3schools.com/js/js_api_intro.asp",
}

SECTION_FALLBACKS = {
    "python": "https://www.w3schools.com/python/default.asp",
    "sql": "https://www.w3schools.com/sql/default.asp",
    "dsa": "https://www.w3schools.com/dsa/index.php",
    "ai": "https://www.w3schools.com/ai/default.asp",
    "js": "https://www.w3schools.com/js/default.asp",
    "react": "https://www.w3schools.com/react/default.asp",
    "git": "https://www.w3schools.com/git/default.asp",
}


def map_topic_to_w3schools(topic: str, context_category: str = "python") -> str:
    """
    Returns a strictly validated W3Schools link for the given topic.
    Guarantees that the returned URL begins with 'https://www.w3schools.com/'.
    """
    clean_topic = topic.strip().lower()
    
    # Direct match in curated dictionary
    if clean_topic in W3SCHOOLS_SUBJECT_MAP:
        url = W3SCHOOLS_SUBJECT_MAP[clean_topic]
        if url.startswith("https://www.w3schools.com/"):
            return url
            
    # Fuzzy match keywords
    for key, url in W3SCHOOLS_SUBJECT_MAP.items():
        if key in clean_topic or clean_topic in key:
            if url.startswith("https://www.w3schools.com/"):
                return url

    # Fallback to category index
    clean_cat = context_category.strip().lower()
    for cat_key, fallback_url in SECTION_FALLBACKS.items():
        if cat_key in clean_cat or cat_key in clean_topic:
            return fallback_url
            
    return SECTION_FALLBACKS["python"]


def get_curated_w3schools_resources(topics: List[str], category: str = "python") -> List[Dict[str, str]]:
    """
    Returns a list of structured W3Schools resource items with title and validated URL.
    """
    seen_urls = set()
    resources = []
    
    for topic in topics:
        url = map_topic_to_w3schools(topic, category)
        if url not in seen_urls and url.startswith("https://www.w3schools.com/"):
            seen_urls.add(url)
            # Create a clean title
            slug = url.split("/")[-1].replace(".asp", "").replace(".php", "").replace("python_", "").replace("sql_", "").replace("_", " ").title()
            resources.append({
                "topic": topic,
                "title": f"W3Schools: {slug or topic}",
                "url": url,
                "verified": True
            })
            
    # Always guarantee at least 2 resources
    if len(resources) < 2:
        fallback_url = SECTION_FALLBACKS.get(category.lower(), SECTION_FALLBACKS["python"])
        if fallback_url not in seen_urls:
            resources.append({
                "topic": "General Reference",
                "title": f"W3Schools: {category.title()} Full Guide",
                "url": fallback_url,
                "verified": True
            })
            
    return resources
