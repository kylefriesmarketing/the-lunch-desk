# Generates the brand image set in brand/ — a Google Business Profile cover
# photo plus square marketing graphics suitable for GBP photos and posts.
#
# These are BRAND GRAPHICS, not photographs. That is deliberate: The Lunch Desk
# is a service-area business with no storefront, and posting AI or stock imagery
# of a storefront / of food we did not coordinate would misrepresent the
# business (and is a common cause of Google profile suspension). Replace these
# with real photos once operations start.
#
# Run: powershell -ExecutionPolicy Bypass -File scripts\make-brand-images.ps1

Add-Type -AssemblyName System.Drawing

$navy   = [System.Drawing.Color]::FromArgb(22, 35, 58)
$navy2  = [System.Drawing.Color]::FromArgb(32, 45, 68)
$cream  = [System.Drawing.Color]::FromArgb(250, 246, 239)
$creamD = [System.Drawing.Color]::FromArgb(243, 236, 223)
$brand  = [System.Drawing.Color]::FromArgb(232, 111, 45)
$brand2 = [System.Drawing.Color]::FromArgb(243, 166, 113)
$ink200 = [System.Drawing.Color]::FromArgb(198, 208, 222)
$ink600 = [System.Drawing.Color]::FromArgb(60, 76, 105)
$fresh  = [System.Drawing.Color]::FromArgb(62, 142, 92)

$outDir = Join-Path (Split-Path $PSScriptRoot -Parent) 'brand'
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

function New-RoundRect($x, $y, $w, $h, $r) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $p.AddArc($x, $y, $d, $d, 180, 90)
  $p.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $p.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $p.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $p.CloseFigure()
  return $p
}

function Add-Glow($g, $cx, $cy, $r, $color) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $p.AddEllipse($cx - $r, $cy - $r, $r * 2, $r * 2)
  $b = New-Object System.Drawing.Drawing2D.PathGradientBrush($p)
  $b.CenterColor = $color
  $b.SurroundColors = @([System.Drawing.Color]::FromArgb(0, $color))
  $g.FillPath($b, $p)
}

function Add-DotGrid($g, $w, $h, $alpha) {
  $b = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb($alpha, 255, 255, 255))
  for ($y = 30; $y -lt $h; $y += 44) {
    for ($x = 30; $x -lt $w; $x += 44) { $g.FillEllipse($b, $x, $y, 4, 4) }
  }
}

# Terracotta rounded-square logo tile with the lunch-bag glyph.
function Add-LogoTile($g, $x, $y, $s) {
  $g.FillPath((New-Object System.Drawing.SolidBrush($brand)), (New-RoundRect $x $y $s $s ($s * 0.27)))
  $pen = New-Object System.Drawing.Pen($cream, [Math]::Max(3, $s * 0.062))
  $pen.LineJoin = 'Round'; $pen.StartCap = 'Round'; $pen.EndCap = 'Round'
  $bw = $s * 0.46; $bh = $s * 0.42
  $g.DrawPath($pen, (New-RoundRect ($x + ($s - $bw) / 2) ($y + $s * 0.40) $bw $bh ($s * 0.085)))
  $hw = $s * 0.29; $hh = $s * 0.30
  $g.DrawArc($pen, ($x + ($s - $hw) / 2), ($y + $s * 0.40 - $hh / 2), $hw, $hh, 180, 180)
}

function New-Canvas($w, $h) {
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.TextRenderingHint = 'ClearTypeGridFit'
  $g.InterpolationMode = 'HighQualityBicubic'
  return @($bmp, $g)
}

function Save-Canvas($bmp, $g, $name) {
  $f = Join-Path $outDir $name
  $bmp.Save($f, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
  Write-Output ("{0,-30} {1,8:N0} bytes" -f $name, (Get-Item $f).Length)
}

$dot = [char]0x00B7

# ---------------------------------------------------------------- COVER 16:9
# Google Business Profile cover photo. Minimum 480x270; 1200x675 is safe.
$c = New-Canvas 1200 675; $bmp = $c[0]; $g = $c[1]
$rect = New-Object System.Drawing.Rectangle(0, 0, 1200, 675)
$g.FillRectangle((New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $navy2, $navy, 55)), $rect)
Add-DotGrid $g 1200 675 15
Add-Glow $g 1080 110 300 ([System.Drawing.Color]::FromArgb(72, $brand))
Add-Glow $g 90 620 240 ([System.Drawing.Color]::FromArgb(46, $fresh))

Add-LogoTile $g 90 96 96
$g.DrawString('THE LUNCH DESK LLC', (New-Object System.Drawing.Font('Segoe UI', 27, [System.Drawing.FontStyle]::Bold)),
  (New-Object System.Drawing.SolidBrush($brand2)), 212, 120)

$fH = New-Object System.Drawing.Font('Segoe UI', 66, [System.Drawing.FontStyle]::Bold)
$sf = [System.Drawing.StringFormat]::GenericTypographic
$g.DrawString('Your Office', $fH, (New-Object System.Drawing.SolidBrush($cream)), 88, 250, $sf)
$g.DrawString('Lunch Concierge', $fH, (New-Object System.Drawing.SolidBrush($brand2)), 88, 336, $sf)

$g.DrawString('We coordinate the food. You focus on your business.',
  (New-Object System.Drawing.Font('Segoe UI', 24, [System.Drawing.FontStyle]::Regular)),
  (New-Object System.Drawing.SolidBrush($ink200)), 90, 452)

$pill = "Myrtle Beach  $dot  Conway  $dot  Horry County, SC"
$fP = New-Object System.Drawing.Font('Segoe UI', 21, [System.Drawing.FontStyle]::Bold)
$pm = $g.MeasureString($pill, $fP)
$g.FillPath((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(30, 255, 255, 255))),
  (New-RoundRect 90 520 ($pm.Width + 56) 58 29))
$g.FillEllipse((New-Object System.Drawing.SolidBrush($fresh)), 116, 542, 15, 15)
$g.DrawString($pill, $fP, (New-Object System.Drawing.SolidBrush($cream)), 147, 536)
Save-Canvas $bmp $g 'cover-1200x675.png'

# ------------------------------------------------------- SQUARE: HOW IT WORKS
$c = New-Canvas 1200 1200; $bmp = $c[0]; $g = $c[1]
$g.Clear($cream)
Add-Glow $g 1100 100 380 ([System.Drawing.Color]::FromArgb(40, $brand))
Add-LogoTile $g 90 90 76
$g.DrawString('THE LUNCH DESK', (New-Object System.Drawing.Font('Segoe UI', 22, [System.Drawing.FontStyle]::Bold)),
  (New-Object System.Drawing.SolidBrush($brand)), 186, 112)
$g.DrawString('Lunch in three easy steps',
  (New-Object System.Drawing.Font('Segoe UI', 52, [System.Drawing.FontStyle]::Bold)),
  (New-Object System.Drawing.SolidBrush($navy)), 88, 236)

$steps = @(
  @('1', 'Tell us what you need', 'Date, headcount, budget, and any preferences.'),
  @('2', 'Choose your lunch', 'We bring back options that fit your office.'),
  @('3', 'We coordinate the order', 'We place, confirm, and arrange pickup details.')
)
$y = 380
foreach ($s in $steps) {
  $g.FillPath((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)), (New-RoundRect 88 $y 1024 200 34))
  $g.FillPath((New-Object System.Drawing.SolidBrush($brand)), (New-RoundRect 128 ($y + 52) 96 96 28))
  $fN = New-Object System.Drawing.Font('Segoe UI', 40, [System.Drawing.FontStyle]::Bold)
  $nm = $g.MeasureString($s[0], $fN)
  $g.DrawString($s[0], $fN, (New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)), (128 + (96 - $nm.Width) / 2), ($y + 74))
  $g.DrawString($s[1], (New-Object System.Drawing.Font('Segoe UI', 30, [System.Drawing.FontStyle]::Bold)),
    (New-Object System.Drawing.SolidBrush($navy)), 262, ($y + 60))
  $g.DrawString($s[2], (New-Object System.Drawing.Font('Segoe UI', 21, [System.Drawing.FontStyle]::Regular)),
    (New-Object System.Drawing.SolidBrush($ink600)), 262, ($y + 108))
  $y += 232
}
$g.DrawString('One point of contact for office lunches.',
  (New-Object System.Drawing.Font('Segoe UI', 24, [System.Drawing.FontStyle]::Bold)),
  (New-Object System.Drawing.SolidBrush($brand)), 88, 1096)
Save-Canvas $bmp $g 'graphic-how-it-works.png'

# ---------------------------------------------------------- SQUARE: SERVICES
$c = New-Canvas 1200 1200; $bmp = $c[0]; $g = $c[1]
$rect = New-Object System.Drawing.Rectangle(0, 0, 1200, 1200)
$g.FillRectangle((New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $navy2, $navy, 60)), $rect)
Add-DotGrid $g 1200 1200 13
Add-Glow $g 1120 140 340 ([System.Drawing.Color]::FromArgb(66, $brand))
Add-LogoTile $g 90 90 76
$g.DrawString('THE LUNCH DESK', (New-Object System.Drawing.Font('Segoe UI', 22, [System.Drawing.FontStyle]::Bold)),
  (New-Object System.Drawing.SolidBrush($brand2)), 186, 112)
$g.DrawString('What we coordinate', (New-Object System.Drawing.Font('Segoe UI', 52, [System.Drawing.FontStyle]::Bold)),
  (New-Object System.Drawing.SolidBrush($cream)), 88, 232)

$svc = @(
  'Weekly office lunches', 'Employee appreciation meals',
  'Staff meetings & training days', 'Client meetings',
  'Pharmaceutical & sales rep lunches', 'Corporate events',
  'Large group orders', 'Recurring lunch programs'
)
$y = 366
foreach ($s in $svc) {
  $g.FillPath((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(18, 255, 255, 255))),
    (New-RoundRect 88 $y 1024 82 26))
  # check mark
  $pen = New-Object System.Drawing.Pen($fresh, 6); $pen.StartCap = 'Round'; $pen.EndCap = 'Round'; $pen.LineJoin = 'Round'
  $g.DrawLines($pen, @(
    (New-Object System.Drawing.PointF(136, ($y + 42))),
    (New-Object System.Drawing.PointF(150, ($y + 55))),
    (New-Object System.Drawing.PointF(174, ($y + 28)))
  ))
  $g.DrawString($s, (New-Object System.Drawing.Font('Segoe UI', 25, [System.Drawing.FontStyle]::Regular)),
    (New-Object System.Drawing.SolidBrush($cream)), 208, ($y + 22))
  $y += 96
}
Save-Canvas $bmp $g 'graphic-services.png'

# ------------------------------------------------------------- SQUARE: AREAS
$c = New-Canvas 1200 1200; $bmp = $c[0]; $g = $c[1]
$g.Clear($cream)
Add-Glow $g 120 1120 380 ([System.Drawing.Color]::FromArgb(38, $fresh))
Add-Glow $g 1090 120 340 ([System.Drawing.Color]::FromArgb(44, $brand))
Add-LogoTile $g 90 90 76
$g.DrawString('THE LUNCH DESK', (New-Object System.Drawing.Font('Segoe UI', 22, [System.Drawing.FontStyle]::Bold)),
  (New-Object System.Drawing.SolidBrush($brand)), 186, 112)
$g.DrawString('Serving the Grand Strand', (New-Object System.Drawing.Font('Segoe UI', 50, [System.Drawing.FontStyle]::Bold)),
  (New-Object System.Drawing.SolidBrush($navy)), 88, 240)

$areas = @(
  @('Myrtle Beach', 'Medical offices, resorts, dealerships'),
  @('Conway', 'Law firms, government offices, growing teams'),
  @('Horry County', 'Wherever your office sits')
)
$y = 400
foreach ($a in $areas) {
  $g.FillPath((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)), (New-RoundRect 88 $y 1024 176 34))
  $g.FillPath((New-Object System.Drawing.SolidBrush($creamD)), (New-RoundRect 132 ($y + 46) 84 84 26))
  # map pin
  $pen = New-Object System.Drawing.Pen($brand, 6); $pen.StartCap = 'Round'; $pen.EndCap = 'Round'
  $g.DrawArc($pen, 158, ($y + 66), 32, 32, 160, 220)
  $g.DrawLines($pen, @(
    (New-Object System.Drawing.PointF(163, ($y + 92))),
    (New-Object System.Drawing.PointF(174, ($y + 112))),
    (New-Object System.Drawing.PointF(185, ($y + 92)))
  ))
  $g.DrawString($a[0], (New-Object System.Drawing.Font('Segoe UI', 32, [System.Drawing.FontStyle]::Bold)),
    (New-Object System.Drawing.SolidBrush($navy)), 254, ($y + 50))
  $g.DrawString($a[1], (New-Object System.Drawing.Font('Segoe UI', 21, [System.Drawing.FontStyle]::Regular)),
    (New-Object System.Drawing.SolidBrush($ink600)), 254, ($y + 100))
  $y += 208
}
$g.DrawString('(252) 626-9250', (New-Object System.Drawing.Font('Segoe UI', 30, [System.Drawing.FontStyle]::Bold)),
  (New-Object System.Drawing.SolidBrush($brand)), 88, 1074)
Save-Canvas $bmp $g 'graphic-areas.png'

Write-Output "`nBrand images written to: $outDir"
