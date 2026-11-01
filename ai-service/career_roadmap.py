
SKILL_ROADMAP = {
    "python": [
        "Practice Python fundamentals",
        "Learn functions, OOP and exception handling",
        "Build small Python projects"
    ],

    "java": [
        "Learn Java syntax, variables and control flow",
        "Practice object-oriented programming",
        "Build a small Java application"
    ],

    "c++": [
        "Learn C++ fundamentals, functions and pointers",
        "Practice classes, STL and data structures",
        "Build a small C++ project"
    ],

    "javascript": [
        "Learn variables, functions, arrays and objects",
        "Practice promises and async/await",
        "Build an interactive web application"
    ],

    "html": [
        "Learn HTML elements, forms and semantic tags",
        "Practice accessible page structures",
        "Build a multi-page website"
    ],

    "css": [
        "Learn selectors, the box model and positioning",
        "Practice Flexbox, Grid and responsive design",
        "Style a responsive website"
    ],

    "react": [
        "Learn React components",
        "Practice state and props",
        "Build a React application"
    ],

    "node.js": [
        "Learn Node.js fundamentals and modules",
        "Practice building REST APIs",
        "Build a backend service"
    ],

    "express.js": [
        "Learn Express routing and middleware",
        "Practice request validation and error handling",
        "Build a REST API with Express"
    ],

    "flask": [
        "Learn Flask routes and request handling",
        "Practice building JSON APIs",
        "Create a Flask application"
    ],

    "fastapi": [
        "Learn FastAPI routes and Pydantic models",
        "Practice request validation",
        "Build and test a REST API"
    ],

    "machine learning": [
        "Learn supervised and unsupervised learning",
        "Practice regression and classification",
        "Build machine learning projects"
    ],

    "deep learning": [
        "Understand artificial neural networks",
        "Learn forward propagation and backpropagation",
        "Build basic deep learning models"
    ],

    "tensorflow": [
        "Learn TensorFlow tensors and basic operations",
        "Build neural networks using Keras",
        "Train and evaluate a deep learning model"
    ],

    "pytorch": [
        "Learn PyTorch tensors and tensor operations",
        "Practice building neural networks with torch.nn",
        "Train and evaluate a deep learning model"
    ],

    "sentence transformers": [
        "Understand sentence embeddings and semantic similarity",
        "Generate text embeddings using Sentence Transformers",
        "Build a semantic search or text-similarity project"
    ],

    "nlp": [
        "Learn text preprocessing",
        "Study TF-IDF and text vectorization",
        "Build an NLP classification project"
    ],

    "natural language processing": [
        "Learn text preprocessing",
        "Study TF-IDF and text embeddings",
        "Build an NLP project"
    ],

    "data analysis": [
        "Learn data cleaning techniques",
        "Practice Pandas and NumPy",
        "Learn data visualization"
    ],

    "data preprocessing": [
        "Learn missing-value handling",
        "Practice feature scaling and encoding",
        "Learn feature selection techniques"
    ],

    "numpy": [
        "Learn NumPy arrays and indexing",
        "Practice vectorized operations",
        "Use NumPy in data-analysis projects"
    ],

    "pandas": [
        "Practice DataFrame operations",
        "Learn data cleaning and transformation",
        "Analyze real-world datasets"
    ],

    "scikit-learn": [
        "Learn model training and evaluation",
        "Practice classification and regression",
        "Build end-to-end ML projects"
    ],

    "sql": [
        "Practice SELECT, WHERE and filtering",
        "Learn JOINs and aggregation",
        "Practice SQL queries on datasets"
    ],

    "mysql": [
        "Learn tables, data types and SQL queries",
        "Practice JOINs and subqueries",
        "Build a relational database project"
    ],

    "postgresql": [
        "Learn PostgreSQL tables and queries",
        "Practice JOINs, indexes and transactions",
        "Build a database-backed application"
    ],

    "mongodb": [
        "Learn collections, documents and CRUD operations",
        "Practice queries and aggregation",
        "Connect MongoDB to a backend application"
    ],

    "statistics": [
        "Learn mean, median, mode and standard deviation",
        "Study probability and statistical distributions",
        "Practice hypothesis testing"
    ],

    "git": [
        "Learn Git basics",
        "Practice branching and merging",
        "Use GitHub for version control"
    ],

    "github": [
        "Learn repositories, commits and pull requests",
        "Practice branches and merge conflict resolution",
        "Publish a project with a clear README"
    ],

    "rest api": [
        "Learn HTTP methods, status codes and JSON",
        "Practice API requests and responses",
        "Build and test a REST API"
    ],

    "streamlit": [
        "Learn Streamlit widgets and page layouts",
        "Practice displaying data and model predictions",
        "Build an interactive ML application"
    ],

    "xgboost": [
        "Learn gradient boosting fundamentals",
        "Train XGBoost classification and regression models",
        "Tune and evaluate an XGBoost model"
    ],

    "shap": [
        "Learn feature attribution and explainability",
        "Generate SHAP values for a trained model",
        "Explain model predictions using SHAP plots"
    ],

    "docker": [
        "Learn images, containers and Dockerfiles",
        "Containerize a small application",
        "Run a multi-container application"
    ],

    "power bi": [
        "Learn data import and transformation",
        "Create measures and relationships",
        "Build an interactive dashboard"
    ],

    "data visualization": [
        "Learn data visualization fundamentals",
        "Practice creating charts using Matplotlib",
        "Build visualizations with real-world datasets"
    ],

    "model evaluation": [
        "Learn accuracy, precision, recall and F1-score",
        "Understand confusion matrices",
        "Practice evaluating machine learning models"
    ],

    "database management": [
        "Understand relational database concepts",
        "Practice database creation and management",
        "Learn database queries and optimization"
    ]
}


def normalize_skill(skill: str) -> str:
    """Normalize skill names and common aliases."""

    skill = str(skill).strip().lower()

    aliases = {
        "machinelearning": "machine learning",
        "deep-learning": "deep learning",
        "dataanalysis": "data analysis",
        "datapreprocessing": "data preprocessing",
        "naturallanguageprocessing": "natural language processing",
        "sklearn": "scikit-learn",
        "scikit learn": "scikit-learn",
        "numpy library": "numpy",
        "pandas library": "pandas",
        "git and github": "git",
        "statistics and probability": "statistics",
        "postgres": "postgresql",
        "node": "node.js",
        "js": "javascript",
        "rest apis": "rest api"
    }

    return aliases.get(skill, skill)


def generate_career_roadmap(
    missing_skills: list[str]
) -> list[dict]:
    """Generate learning steps for missing skills."""

    roadmap = []
    processed_skills = set()
    unsupported_skills = []

    for skill in missing_skills or []:
        if not skill or not str(skill).strip():
            continue

        skill_key = normalize_skill(skill)

        if skill_key in processed_skills:
            continue

        processed_skills.add(skill_key)

        learning_steps = SKILL_ROADMAP.get(skill_key)

        if learning_steps:
            roadmap.append({
                "skill": skill_key.title(),
                "learning_steps": learning_steps
            })
        else:
            unsupported_skills.append(str(skill).strip())

    if unsupported_skills:
        print(
            "Career roadmap has no learning path for: "
            + ", ".join(unsupported_skills)
        )

    return roadmap
