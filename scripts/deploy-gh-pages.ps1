# Builds the static site and publishes it to the `gh-pages` branch,
# which is what https://kylefriesmarketing.github.io/the-lunch-desk/ serves.
#
# Usage (from the project root):
#   powershell -ExecutionPolicy Bypass -File scripts\deploy-gh-pages.ps1
#   powershell -ExecutionPolicy Bypass -File scripts\deploy-gh-pages.ps1 -Message "Add real phone number"
#
# Source code itself lives on `main` — commit and push that separately.

param([string]$Message = "Deploy site")

$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root

# Portable Node isn't on PATH on this machine; add it only if needed.
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  $portableNode = 'C:\Users\kylef\tools\node'
  if (Test-Path $portableNode) { $env:Path = "$portableNode;" + $env:Path }
  else { throw "Node.js not found on PATH and no portable Node at $portableNode" }
}

# basePath is only applied for the GitHub Pages deploy (see next.config.ts).
$env:DEPLOY_TARGET = 'gh-pages'

Write-Host "Building static export..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { throw "Build failed - deploy aborted." }

# .nojekyll stops GitHub Pages from stripping Next's _next/ asset folder.
New-Item -ItemType File (Join-Path $root 'out\.nojekyll') -Force | Out-Null

$remote = (git remote get-url origin).Trim()
if (-not $remote) { throw "No 'origin' remote configured." }

Write-Host "Publishing out/ to gh-pages..." -ForegroundColor Cyan
Push-Location (Join-Path $root 'out')
try {
  git init -b gh-pages -q
  git add -A
  git commit -q -m $Message
  # Force-push: gh-pages is a build artifact branch with no history worth keeping.
  git push -f -q $remote gh-pages
}
finally {
  Pop-Location
  Remove-Item (Join-Path $root 'out\.git') -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "Deployed. Live in ~1 min at https://kylefriesmarketing.github.io/the-lunch-desk/" -ForegroundColor Green
Write-Host "(GitHub's CDN may serve cached assets for a few extra minutes.)" -ForegroundColor DarkGray
