flowchart TD
    A["Respondent submits Survey"]
    B["Django Response API"]
    C["Validate and save Response, Answer, Feedback"]
    D[("PostgreSQL Database")]

    E["Manager requests AI Analysis"]
    F["Django API: Authentication and Authorization"]
    G["Validate Survey and retrieve stored Feedback"]
    H["AI Analysis Service"]
    I["LLM Provider"]
    J["Validate AI JSON Output"]
    K[("Save AIAnalysis to PostgreSQL")]
    L["React AI Analysis Screen"]
    M["Error / Retry / Fallback"]

    A --> B
    B --> C
    C --> D

    E --> F
    F --> G
    D -. "Read stored Feedback" .-> G
    G --> H
    H --> I
    I --> J

    J -->|Valid output| K
    K --> L

    J -->|Invalid output| M
    I -->|Provider error or timeout| M
    M --> L