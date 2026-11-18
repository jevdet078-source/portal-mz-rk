# pptx-preview.ps1 — как PPTX выглядит в настоящем PowerPoint: каждый слайд в PNG 1920×1080.
#   powershell -ExecutionPolicy Bypass -File .claude\skills\portal-deck\scripts\pptx-preview.ps1 -Pptx "<файл.pptx>" -Out "<папка>"
# Нужен установленный Microsoft PowerPoint. Файл открывается только для чтения, без окна.
param([Parameter(Mandatory = $true)][string]$Pptx, [Parameter(Mandatory = $true)][string]$Out)
$ErrorActionPreference = 'Stop'
New-Item -ItemType Directory -Force -Path $Out | Out-Null
$app = New-Object -ComObject PowerPoint.Application
try {
  $p = $app.Presentations.Open((Resolve-Path $Pptx).Path, $true, $false, $false)
  $i = 0
  foreach ($s in $p.Slides) { $i++; $s.Export((Join-Path (Resolve-Path $Out).Path ("slide-$i.png")), 'PNG', 1920, 1080) }
  $p.Close()
  Write-Output "slides: $i -> $Out"
} finally { $app.Quit(); [System.Runtime.InteropServices.Marshal]::ReleaseComObject($app) | Out-Null }
