Write-Host "Stopping XAMPP Apache..."

$apacheStop = "C:\xampp\apache_stop.bat"

Start-Process -FilePath $apacheStop
Write-Host "Apache stopped."