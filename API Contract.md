| **Method** | **Path**                                      | **Input**                             | **Output**                                      | **Auth**           |
| ---------- | --------------------------------------------- | ------------------------------------- | ----------------------------------------------- | ------------------ |
| POST       | `/api/v1/auth/login/`                         | `{email,password}`                    | Access token + Refresh token + User information | PUBLIC             |
| GET        | `/api/v1/auth/me/`                            | -                                     | Current User information                        | AUTHENTICATED      |
| POST       | `/api/v1/auth/refresh/`                       | `{refresh}`                           | New Access token                                | AUTHENTICATED      |
| POST       | `/api/v1/auth/register/`                      | `{email,password,role,...}`           | Registered User information                     | PUBLIC             |
| GET        | `/api/v1/auth/users/`                         | `role,search,page,...`                | Paginated User[]                                | ADMIN              |
| GET        | `/api/v1/auth/users/{id}/`                    | `id`                                  | User                                            | ADMIN              |
| PUT        | `/api/v1/auth/users/{id}/`                    | User update data                      | Updated User                                    | ADMIN              |
| PATCH      | `/api/v1/auth/users/{id}/`                    | `{role,...}`                          | Updated User                                    | ADMIN              |
| DELETE     | `/api/v1/auth/users/{id}/`                    | `id`                                  | Delete confirmation                             | ADMIN              |
| GET        | `/api/v1/dashboard/`                          | -                                     | Dashboard statistics and KPI data               | MANAGER            |
| GET        | `/api/v1/surveys/{id}/ai-analysis/`           | `id`                                  | AI analysis result                              | MANAGER            |
| POST       | `/api/v1/surveys/{id}/ai-analysis/`           | `id`                                  | Generated AI analysis result                    | MANAGER            |
| GET        | `/api/v1/surveys/{id}/feedback/`              | `id`                                  | Survey Feedback[]                               | MANAGER            |
| GET        | `/api/v1/surveys/{id}/results/`               | `id`                                  | Survey results and response statistics          | MANAGER            |
| POST       | `/api/v1/responses/submit/{survey_id}/`       | `{answers,feedback_text}`             | ResponseDetail                                  | RESPONDENT         |
| POST       | `/api/v1/surveys/{survey_id}/submit/`         | `{answers,feedback_text}`             | ResponseDetail                                  | RESPONDENT         |
| GET        | `/api/v1/surveys/`                            | `page,page_size,...`                  | Paginated Survey[]                              | AUTHENTICATED      |
| POST       | `/api/v1/surveys/`                            | `{title,description,...}`             | Survey                                          | RESEARCHER         |
| GET        | `/api/v1/surveys/{id}/`                       | `id`                                  | SurveyDetail                                    | AUTHENTICATED      |
| PUT        | `/api/v1/surveys/{id}/`                       | Survey update data                    | Updated Survey                                  | RESEARCHER / OWNER |
| PATCH      | `/api/v1/surveys/{id}/`                       | Partial Survey update data            | Updated Survey                                  | RESEARCHER / OWNER |
| DELETE     | `/api/v1/surveys/{id}/`                       | `id`                                  | Delete confirmation                             | RESEARCHER / OWNER |
| POST       | `/api/v1/surveys/{id}/close/`                 | `id`                                  | Closed Survey                                   | RESEARCHER / OWNER |
| POST       | `/api/v1/surveys/{id}/publish/`               | `id`                                  | Published Survey                                | RESEARCHER / OWNER |
| GET        | `/api/v1/surveys/available/`                  | `page,page_size,...`                  | Published Survey[]                              | RESPONDENT         |
| GET        | `/api/v1/surveys/{survey_id}/questions/`      | `survey_id,page,page_size,...`        | Paginated Question[]                            | AUTHENTICATED      |
| POST       | `/api/v1/surveys/{survey_id}/questions/`      | `{text,type,options,is_required,...}` | Question                                        | RESEARCHER / OWNER |
| GET        | `/api/v1/surveys/{survey_id}/questions/{id}/` | `survey_id,id`                        | Question                                        | AUTHENTICATED      |
| PUT        | `/api/v1/surveys/{survey_id}/questions/{id}/` | Question update data                  | Updated Question                                | RESEARCHER / OWNER |
| PATCH      | `/api/v1/surveys/{survey_id}/questions/{id}/` | Partial Question update data          | Updated Question                                | RESEARCHER / OWNER |
| DELETE     | `/api/v1/surveys/{survey_id}/questions/{id}/` | `survey_id,id`                        | Delete confirmation                             | RESEARCHER / OWNER |