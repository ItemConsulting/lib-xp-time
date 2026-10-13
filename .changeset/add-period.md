---
"@item-enonic-types/lib-time": minor
---

Add `Period`, an amount of years, months and days that follows the calendar.

It can be added to and subtracted from `LocalDate`, `LocalDateTime`, `OffsetDateTime` and `ZonedDateTime` with `plus()` and `minus()`, and `LocalDate.until()` gives the `Period` between two dates.
