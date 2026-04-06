# Start Apache and MySQL
Start-Process "C:\xampp\xampp_start.exe" -Wait

# Optional: keep terminal open to see logs
Write-Host "XAMPP started. Waiting for server to be ready..."
Start-Sleep -Seconds 10