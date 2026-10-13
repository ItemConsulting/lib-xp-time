---
"@item-enonic-types/lib-time": patch
---

Fix `formatDate()` throwing on date strings with a negative UTC offset, such as `2023-06-07T10:00:00-05:00`.
