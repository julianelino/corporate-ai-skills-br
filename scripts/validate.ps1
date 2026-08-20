# Portable structural validation for Windows PowerShell. No Python required.
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Fail([string] $Message) {
    Write-Error "PORTABLE_VALIDATION_FAILED: $Message"
    exit 1
}

foreach ($file in @('README.md', 'ARCHITECTURE.md', 'sources/SOURCE_REGISTRY.yaml')) {
    if (-not (Test-Path $file -PathType Leaf)) { Fail "$file is missing" }
}

$skills = @(Get-ChildItem -Path skills -Filter SKILL.md -File -Recurse)
$workflows = @(Get-ChildItem -Path workflows -Filter '*.md' -File -Recurse)
if ($skills.Count -eq 0) { Fail 'no skills found' }
if ($workflows.Count -eq 0) { Fail 'no workflows found' }

if ($skills | Select-String -Pattern 'TODO' -Quiet | Where-Object { $_ }) { Fail 'unresolved TODO found in a skill' }
foreach ($workflow in $workflows) {
    $content = Get-Content -Path $workflow.FullName -Raw
    if ($content -notmatch '(?m)^## Flow\r?$') { Fail "workflow lacks Flow: $($workflow.FullName)" }
    if ($content -notmatch '(?m)^## Controls\r?$') { Fail "workflow lacks Controls: $($workflow.FullName)" }
}

Write-Output "PORTABLE_VALIDATION_PASSED: $($skills.Count) skills, $($workflows.Count) workflows"
