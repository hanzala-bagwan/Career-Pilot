from typing import Dict, Any, List


def format_score_badge(score: float) -> Dict[str, str]:
    """
    Returns visual badge styling for scores based on pass/fail thresholds.
    """
    if score >= 75.0:
        return {
            "status": "Pass",
            "color": "#34D399",
            "bg": "rgba(52,211,153,0.15)",
            "border": "rgba(52,211,153,0.3)"
        }
    elif score >= 50.0:
        return {
            "status": "Needs Improvement",
            "color": "#F59E0B",
            "bg": "rgba(245,158,11,0.15)",
            "border": "rgba(245,158,11,0.3)"
        }
    else:
        return {
            "status": "Fail",
            "color": "#EF4444",
            "bg": "rgba(239,68,68,0.15)",
            "border": "rgba(239,68,68,0.3)"
        }


def get_competency_tier(accuracy_percentage: float) -> str:
    """
    Maps topic accuracy to skill mastery levels.
    """
    if accuracy_percentage >= 85:
        return "Advanced Mastery"
    elif accuracy_percentage >= 75:
        return "Proficient"
    elif accuracy_percentage >= 50:
        return "Intermediate (Needs Review)"
    else:
        return "Foundational (Review Required)"
