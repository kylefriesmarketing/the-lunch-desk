# Generates brand/logo-1024.png — a square logo mark for Google Business Profile,
# social avatars, and anywhere a square brand image is needed.
#
# Matches the site favicon and OG card: white lunch-bag glyph on brand terracotta.
# Google renders profile logos in a circle, so the glyph is kept well inside a
# centre safe zone and the background is full-bleed.
#
# Run: powershell -ExecutionPolicy Bypass -File scripts\make-logo.ps1

Add-Type -AssemblyName System.Drawing

$S = 1024
$bmp = New-Object System.Drawing.Bitmap($S, $S)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'

$brand  = [System.Drawing.Color]::FromArgb(232, 111, 45)
$brand2 = [System.Drawing.Color]::FromArgb(207, 90, 30)
$cream  = [System.Drawing.Color]::FromArgb(250, 246, 239)

# Full-bleed background with a subtle vertical gradient so it isn't flat.
$rect = New-Object System.Drawing.Rectangle(0, 0, $S, $S)
$bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $brand, $brand2, 90)
$g.FillRectangle($bg, $rect)

function New-RoundRect($x, $y, $w, $h, $r) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  return $path
}

# Lunch bag glyph, centred inside the circular safe zone (~62% of canvas).
$pen = New-Object System.Drawing.Pen($cream, 46)
$pen.LineJoin = 'Round'; $pen.StartCap = 'Round'; $pen.EndCap = 'Round'

$bagW = 380; $bagH = 350
$bagX = ($S - $bagW) / 2
$bagY = ($S - $bagH) / 2 + 40
$g.DrawPath($pen, (New-RoundRect $bagX $bagY $bagW $bagH 64))

# Handle arc above the bag.
$hw = 210; $hh = 230
$g.DrawArc($pen, (($S - $hw) / 2), ($bagY - $hh / 2 - 10), $hw, $hh, 180, 180)

$outDir = Join-Path (Split-Path $PSScriptRoot -Parent) 'brand'
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }
$outFile = Join-Path $outDir 'logo-1024.png'
$bmp.Save($outFile, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
Write-Output "Logo written: $outFile ($((Get-Item $outFile).Length) bytes)"
