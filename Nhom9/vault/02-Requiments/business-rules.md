# Business Rules

| ID     | Business Rule                                                                                           |
| ------ | ------------------------------------------------------------------------------------------------------- |
| BR-001 | Chỉ survey ở trạng thái Published mới cho phép Respondent xem và tham gia.                              |
| BR-002 | Survey ở trạng thái Closed không nhận thêm response.                                                    |
| BR-003 | Mỗi response phải thuộc về một survey cụ thể.                                                           |
| BR-004 | Respondent chỉ có thể submit response cho survey đang ở trạng thái Published.                           |
| BR-005 | Response và feedback phải được lưu trữ sau khi Respondent submit survey.                                |
| BR-006 | Feedback dạng văn bản có thể được AI phân tích sentiment.                                               |
| BR-007 | Feedback dạng văn bản có thể được AI phân tích topic.                                                   |
| BR-008 | AI có thể tạo summary dựa trên dữ liệu feedback đã thu thập.                                            |
| BR-009 | Kết quả phân tích AI chỉ có vai trò hỗ trợ và không thay thế response hoặc feedback gốc của Respondent. |
| BR-010 | Chỉ Researcher có quyền tạo, chỉnh sửa, publish và close survey.                                        |
| BR-011 | Chỉ Manager có quyền xem kết quả survey, feedback và kết quả phân tích AI.                              |
| BR-012 | Survey phải có question trước khi được publish.                                                         |
| BR-013 | Response đã submit phải gắn với các question thuộc survey tương ứng.                                    |
| BR-014 | AI chỉ được phân tích feedback đã được hệ thống lưu trữ.                                                |
| BR-015 | Dữ liệu response và feedback gốc không được thay đổi bởi kết quả phân tích AI.                          |