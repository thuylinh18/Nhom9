````
# Screen Flow

# Flow 1 — Researcher Create Survey

```text
Login
  ↓
Survey Dashboard
  ↓
Create Survey
  ↓
Survey Editor
  ↓
Add Question
  ↓
Preview
  ↓
Publish Confirmation
  ↓
Publish Success
  ↓
Survey Dashboard
````

---

## Screen 1 — Login

### Actor

Researcher

### Elements

- Email
- Password / SSO button
- Login button

### States

- Default
- Loading
- Authentication Error

---

## Screen 2 — Survey Dashboard

### Elements

- Page title
- Create Survey button
- Survey list
- Survey status
- Edit button
- View button

### States

- Survey list
- Empty survey list
- Loading
- Error

---

## Screen 3 — Create Survey

### Elements

- Survey title
- Survey description
- Save button
- Cancel button

### Validation

- Title is required.
- Description is optional.

---

## Screen 4 — Survey Editor

### Elements

- Survey title
- Survey description
- Question list
- Add Question button
- Edit question
- Delete question
- Preview
- Publish

---

## Screen 5 — Add Question

### Elements

- Question text
- Question type
- Options
- Required toggle
- Save question

### Question types

- Text
- Multiple choice
- Rating

---

## Screen 6 — Preview

Researcher can preview the survey before publishing.

Buttons:

- Back to Edit
- Publish

---

## Screen 7 — Publish Confirmation

Display:

"Are you sure you want to publish this survey?"

Buttons:

- Cancel
- Publish

---

## Screen 8 — Publish Success

Display:

"Survey published successfully."

Button:

- Back to Dashboard

---

# Flow 2 — Respondent Answer Survey

```
Login
  ↓
Available Surveys
  ↓
Survey Detail
  ↓
Answer Survey
  ↓
Validation
  ↓
Submit Confirmation
  ↓
Success
```

---

## Screen 1 — Available Surveys

Show published surveys.

---

## Screen 2 — Survey Detail

Show:

- Survey title
- Description
- Number of questions
- Start button

---

## Screen 3 — Survey Form

Show:

- Questions
- Answer fields
- Required indicators
- Submit button

---

## Screen 4 — Validation Error

Example:

"Please answer all required questions."

---

## Screen 5 — Submit Confirmation

Display confirmation before submitting.

---

## Screen 6 — Submission Success

Display:

"Your response has been submitted successfully."

---

# Flow 3 — Manager Results

```
Login
  ↓
Manager Dashboard
  ↓
Select Survey
  ↓
Survey Result
  ↓
Response List
  ↓
Feedback
  ↓
AI Analysis
  ↓
Summary
```

---

## Manager Dashboard

Show:

- Total surveys
- Total responses
- Average rating
- Positive sentiment
- Negative sentiment
- Main topics

---

## Survey Result

Show:

- Survey information
- Response count
- Rating distribution
- Feedback

---

## AI Analysis

Show:

### Sentiment

- Positive
- Neutral
- Negative

### Topics

Example:

- Service Quality
- Waiting Time
- Website Usability

### Summary

Example:

"Most respondents were satisfied with the service quality. The main negative feedback concerns waiting time."