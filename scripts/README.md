# Platform Scripts

These scripts validate the portable repository structure and require no Python, Node.js, package manager, or SDK.

| Platform | Command |
| --- | --- |
| Linux | `bash scripts/validate.sh` |
| macOS | `bash scripts/validate.sh` |
| Windows PowerShell | `powershell -ExecutionPolicy Bypass -File scripts/validate.ps1` |
| Windows Command Prompt | `scripts\validate.cmd` |

For optional, dependency-free Node.js automation, use `npm run check`, `npm run eval`, or `npm run token:audit`. Node.js is never required to consume the pack.
