## Functional Testing (Windows PowerShell)

### Attendance - Check-in
```powershell
Invoke-RestMethod `
  -Uri "http://localhost:3002/attendance/check-in" `
  -Method POST `
  -ContentType "application/json" `
  -Body (@{
    childId = "child-001"
    checkedInBy = "staff-01"
  } | ConvertTo-Json)
