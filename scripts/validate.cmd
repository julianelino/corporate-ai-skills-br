@echo off
REM Windows Command Prompt entry point. Delegates to built-in Windows PowerShell.
where powershell >nul 2>nul
if errorlevel 1 (
  echo PORTABLE_VALIDATION_FAILED: Windows PowerShell is required for this Windows validation script.
  exit /b 1
)
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0validate.ps1"
exit /b %ERRORLEVEL%
