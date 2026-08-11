# Generates brand/flyer-letter.png — a print-ready US Letter one-pager for
# handing to office managers, front desks, and reps.
#
# 8.5x11in at 150 DPI = 1275x1650px. Prints cleanly on a home/office printer.
#
# Run: powershell -ExecutionPolicy Bypass -File scripts\make-flyer.ps1

Add-Type -AssemblyName System.Drawing

$W = 1275; $H = 1650

$navy   = [System.Drawing.Color]::FromArgb(22, 35, 58)
$cream  = [System.Drawing.Color]::FromArgb(250, 246, 239)
$creamD = [System.Drawing.Color]::FromArgb(243, 236, 223)
$brand  = [System.Drawing.Color]::FromArgb(232, 111, 45)
$brand2 = [System.Drawing.Color]::FromArgb(243, 166, 113)
$ink600 = [System.Drawing.Color]::FromArgb(60, 76, 105)
$ink400 = [System.Drawing.Color]::FromArgb(111, 130, 160)
$fresh  = [System.Drawing.Color]::FromArgb(62, 142, 92)
$white  = [System.Drawing.Color]::White

$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.TextRenderingHint = 'ClearTypeGridFit'
$g.Clear($cream)

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
function Brush($c) { New-Object System.Drawing.SolidBrush($c) }
function Font($sz, $style) { New-Object System.Drawing.Font('Segoe UI', $sz, $style) }
$B = [System.Drawing.FontStyle]::Bold
$R = [System.Drawing.FontStyle]::Regular

# ---- header band ----
$g.FillRectangle((Brush $navy), 0, 0, $W, 300)
# logo tile
$s = 104; $lx = 96; $ly = 76
$g.FillPath((Brush $brand), (New-RoundRect $lx $ly $s $s 29))
$pen = New-Object System.Drawing.Pen($cream, 7)
$pen.LineJoin = 'Round'; $pen.StartCap = 'Round'; $pen.EndCap = 'Round'
$g.DrawPath($pen, (New-RoundRect ($lx + 28) ($ly + 42) 48 44 9))
$g.DrawArc($pen, ($lx + 37), ($ly + 27), 30, 32, 180, 180)

$g.DrawString('THE LUNCH DESK LLC', (Font 27 $B), (Brush $brand2), 226, 96)
$g.DrawString('Your Office Lunch Concierge', (Font 40 $B), (Brush $cream), 226, 138)
$dot = [char]0x00B7
$g.DrawString("Myrtle Beach  $dot  Conway  $dot  Horry County, SC",
  (Font 19 $R), (Brush ([System.Drawing.Color]::FromArgb(198, 208, 222))), 228, 200)

# ---- headline ----
$g.DrawString('Ordering lunch for the office', (Font 40 $B), (Brush $navy), 96, 360)
$g.DrawString("shouldn't take all morning.", (Font 40 $B), (Brush $brand), 96, 414)

$sf = New-Object System.Drawing.StringFormat
$body = 'Menus, group texts, phone calls, someone''s order missing. We handle it: you tell us the date, the headcount and the budget, and we bring back options, place the order, confirm it, and coordinate pickup.'
$g.DrawString($body, (Font 20 $R), (Brush $ink600),
  (New-Object System.Drawing.RectangleF(96, 486, 1080, 120)), $sf)

# ---- three steps ----
$y = 630
$steps = @(
  @('1', 'Tell us what you need'),
  @('2', 'Choose from options'),
  @('3', 'We coordinate it all')
)
$cardW = 340; $gap = 30; $x = 96
foreach ($s2 in $steps) {
  $g.FillPath((Brush $white), (New-RoundRect $x $y $cardW 150 26))
  $g.FillPath((Brush $brand), (New-RoundRect ($x + 32) ($y + 34) 58 58 18))
  $fn = Font 26 $B
  $m = $g.MeasureString($s2[0], $fn)
  $g.DrawString($s2[0], $fn, (Brush $white), ($x + 32 + (58 - $m.Width) / 2), ($y + 46))
  $g.DrawString($s2[1], (Font 18 $B), (Brush $navy),
    (New-Object System.Drawing.RectangleF(($x + 104), ($y + 46), 210, 80)), $sf)
  $x += $cardW + $gap
}

# ---- what we help with ----
$g.DrawString('What we coordinate', (Font 26 $B), (Brush $navy), 96, 840)
$items = @(
  'Weekly office lunches', 'Staff meetings & trainings',
  'Employee appreciation', 'Client meetings',
  'Pharma & sales rep lunches', 'Large group orders'
)
$y = 900; $col = 0
foreach ($it in $items) {
  $cx = 96 + ($col % 2) * 560
  $cy = $y + [Math]::Floor($col / 2) * 62
  $pen2 = New-Object System.Drawing.Pen($fresh, 5)
  $pen2.StartCap = 'Round'; $pen2.EndCap = 'Round'; $pen2.LineJoin = 'Round'
  $g.DrawLines($pen2, @(
    (New-Object System.Drawing.PointF($cx, ($cy + 22))),
    (New-Object System.Drawing.PointF(($cx + 12), ($cy + 34))),
    (New-Object System.Drawing.PointF(($cx + 34), ($cy + 10)))
  ))
  $g.DrawString($it, (Font 20 $R), (Brush $ink600), ($cx + 52), ($cy + 6))
  $col++
}

# ---- honest note ----
$g.FillPath((Brush $creamD), (New-RoundRect 96 1104 1083 92 24))
$g.DrawString('We coordinate orders and restaurant pickup - we are not a delivery service.',
  (Font 18 $B), (Brush $navy), 130, 1122)
$g.DrawString('Pricing depends on the order. No app, no account, no contract to inquire.',
  (Font 17 $R), (Brush $ink600), 130, 1152)

# ---- contact block ----
$g.FillPath((Brush $navy), (New-RoundRect 96 1240 1083 250 30))
$g.DrawString('Plan your next office lunch', (Font 30 $B), (Brush $cream), 140, 1278)
$g.DrawString('(252) 626-1950', (Font 42 $B), (Brush $brand2), 140, 1336)
$g.DrawString('LunchDeskLLC@gmail.com', (Font 21 $R), (Brush $cream), 140, 1410)
$g.DrawString('thelunchdesk.com', (Font 19 $R),
  (Brush ([System.Drawing.Color]::FromArgb(198, 208, 222))), 140, 1444)
$g.DrawString('Mon-Fri', (Font 15 $B), (Brush $ink400), 980, 1410)
$g.DrawString('8am - 5pm', (Font 15 $B), (Brush $ink400), 980, 1436)

$g.DrawString('The Lunch Desk LLC  ' + $dot + '  Locally owned  ' + $dot + '  Serving the Grand Strand',
  (Font 15 $R), (Brush $ink400), 96, 1548)

$outDir = Join-Path (Split-Path $PSScriptRoot -Parent) 'brand'
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }
$out = Join-Path $outDir 'flyer-letter.png'
$bmp.SetResolution(150, 150)
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
Write-Output "Flyer written: $out ($((Get-Item $out).Length) bytes) - US Letter at 150 DPI"
