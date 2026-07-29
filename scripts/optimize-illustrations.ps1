# Resizes the generated brand illustrations from brand/ into web-ready JPEGs in
# public/img/. The raw generations are ~1.3 MB PNGs — far too heavy to ship.
#
# JPEG (not PNG) because these are smooth flat-colour illustrations that compress
# extremely well; quality 90 keeps the flat fields free of visible banding.
#
# Run: powershell -ExecutionPolicy Bypass -File scripts\optimize-illustrations.ps1

Add-Type -AssemblyName System.Drawing

$root = Split-Path $PSScriptRoot -Parent
$src  = Join-Path $root 'brand'
$dst  = Join-Path $root 'public\img'
if (-not (Test-Path $dst)) { New-Item -ItemType Directory -Path $dst -Force | Out-Null }

# Target width in CSS pixels x2 for retina; these render at ~560px max on the site.
$targetW = 1120

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters(1)
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, 90)

Get-ChildItem $src -Filter 'illus-*.png' | ForEach-Object {
  $img = [System.Drawing.Image]::FromFile($_.FullName)
  $scale = $targetW / $img.Width
  $w = [int]$targetW
  $h = [int][Math]::Round($img.Height * $scale)

  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.SmoothingMode = 'HighQuality'
  $g.PixelOffsetMode = 'HighQuality'
  $g.DrawImage($img, 0, 0, $w, $h)

  $outName = ($_.BaseName -replace '^illus-', '') + '.jpg'
  $outPath = Join-Path $dst $outName
  $bmp.Save($outPath, $codec, $params)

  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
  "{0,-26} {1,4}x{2,-4} {3,8:N0} bytes" -f $outName, $w, $h, (Get-Item $outPath).Length
}

Write-Output "`nWeb illustrations written to: $dst"
