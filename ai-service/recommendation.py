
def get_recommendation(match_score: float) -> str:
    """
    Generate a recommendation based on the overall
    resume-JD match score.
    """

    if not isinstance(match_score, (int, float)):
        raise TypeError("match_score must be a number")

    if not 0 <= match_score <= 100:
        raise ValueError("match_score must be between 0 and 100")

    if match_score >= 80:
        return "Excellent Match"
    elif match_score >= 60:
        return "Strong Match"
    elif match_score >= 40:
        return "Moderate Match"
    else:
        return "Weak Match"
