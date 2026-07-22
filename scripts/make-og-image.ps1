# Regenerates public/og-image.png — the 1200x630 social share card used by
# Open Graph / Twitter cards on every page.
#
# Run from anywhere:  powershell -ExecutionPolicy Bypass -File scripts\make-og-image.ps1
# Then rebuild + redeploy (scripts\deploy-gh-pages.ps1) for it to go live.
#
# Note: non-ASCII glyphs are built with [char] codes rather than typed
# literally, so the file's encoding can never mangle them.

Add-Type -AssemblyName System.Drawing

$W = 1200; $H = 630
$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.TextRenderingHint = 'ClearTypeGridFit'
$g.InterpolationMode = 'HighQualityBicubic'

# --- brand palette (mirrors @theme in src/app/globals.css) ---
$navy   = [System.Drawing.Color]::FromArgb(22, 35, 58)
$navy2  = [System.Drawing.Color]::FromArgb(32, 45, 68)
$cream  = [System.Drawing.Color]::FromArgb(250, 246, 239)
$brand  = [System.Drawing.Color]::FromArgb(232, 111, 45)
$brand2 = [System.Drawing.Color]::FromArgb(243, 166, 113)
$ink200 = [System.Drawing.Color]::FromArgb(198, 208, 222)
$fresh  = [System.Drawing.Color]::FromArgb(62, 142, 92)

# --- background gradient ---
$bgRect = New-Object System.Drawing.Rectangle(0, 0, $W, $H)
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($bgRect, $navy2, $navy, 55)
$g.FillRectangle($bgBrush, $bgRect)

# --- soft dot grid (echoes the site's .dot-grid hero texture) ---
$dotBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(16, 255, 255, 255))
for ($y = 40; $y -lt $H; $y += 46) {
  for ($x = 40; $x -lt $W; $x += 46) { $g.FillEllipse($dotBrush, $x, $y, 4, 4) }
}

# --- warm glow blobs ---
function New-Glow($cx, $cy, $r, $color) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddEllipse($cx - $r, $cy - $r, $r * 2, $r * 2)
  $pgb = New-Object System.Drawing.Drawing2D.PathGradientBrush($path)
  $pgb.CenterColor = $color
  $pgb.SurroundColors = @([System.Drawing.Color]::FromArgb(0, $color))
  $g.FillPath($pgb, $path)
}
New-Glow 1120 90 260 ([System.Drawing.Color]::FromArgb(70, $brand))
New-Glow 80 600 220 ([System.Drawing.Color]::FromArgb(45, $fresh))

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

# --- logo tile (terracotta rounded square + lunch bag glyph) ---
$tileX = 90; $tileY = 96; $tileS = 96
$g.FillPath((New-Object System.Drawing.SolidBrush($brand)), (New-RoundRect $tileX $tileY $tileS $tileS 26))
$bagPen = New-Object System.Drawing.Pen($cream, 6)
$bagPen.LineJoin = 'Round'; $bagPen.StartCap = 'Round'; $bagPen.EndCap = 'Round'
$g.DrawPath($bagPen, (New-RoundRect ($tileX + 26) ($tileY + 38) 44 40 8))
$g.DrawArc($bagPen, ($tileX + 34), ($tileY + 22), 28, 32, 180, 180)

# --- wordmark ---
$fontBrandName = New-Object System.Drawing.Font('Segoe UI', 30, [System.Drawing.FontStyle]::Bold)
$g.DrawString('THE LUNCH DESK LLC', $fontBrandName, (New-Object System.Drawing.SolidBrush($brand2)), 210, 118)

# --- headline (two-tone) ---
$fontH = New-Object System.Drawing.Font('Segoe UI', 74, [System.Drawing.FontStyle]::Bold)
$sf = [System.Drawing.StringFormat]::GenericTypographic
$t1 = 'Your Office'
$g.DrawString($t1, $fontH, (New-Object System.Drawing.SolidBrush($cream)), 88, 240, $sf)
$m1 = $g.MeasureString($t1, $fontH, 2000, $sf)
$g.DrawString(' Lunch', $fontH, (New-Object System.Drawing.SolidBrush($brand2)), (88 + $m1.Width - 6), 240, $sf)
$g.DrawString('Concierge', $fontH, (New-Object System.Drawing.SolidBrush($cream)), 88, 332, $sf)

# --- supporting line ---
$fontSub = New-Object System.Drawing.Font('Segoe UI', 26, [System.Drawing.FontStyle]::Regular)
$g.DrawString('One point of contact for office lunches from local restaurants.', $fontSub, (New-Object System.Drawing.SolidBrush($ink200)), 90, 470)

# --- service-area pill ---
$dot = [char]0x00B7
$pillText = "Myrtle Beach  $dot  Conway  $dot  Horry County, SC"
$fontPill = New-Object System.Drawing.Font('Segoe UI', 22, [System.Drawing.FontStyle]::Bold)
$pm = $g.MeasureString($pillText, $fontPill)
$g.FillPath((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(28, 255, 255, 255))), (New-RoundRect 90 520 ($pm.Width + 56) 60 30))
$g.FillEllipse((New-Object System.Drawing.SolidBrush($fresh)), 116, 543, 16, 16)
$g.DrawString($pillText, $fontPill, (New-Object System.Drawing.SolidBrush($cream)), 148, 536)

$outDir = Join-Path (Split-Path $PSScriptRoot -Parent) 'public'
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }
$outFile = Join-Path $outDir 'og-image.png'
$bmp.Save($outFile, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
Write-Output "OG image written: $outFile ($((Get-Item $outFile).Length) bytes)"
