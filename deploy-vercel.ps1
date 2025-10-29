# Auto Deploy to Vercel Script
Write-Host "🚀 Starting automatic Vercel deployment..." -ForegroundColor Green

# Navigate to frontend directory
Set-Location -Path "frontend-fhe-dunt"

# Create input file for vercel prompts
$inputs = @"
yes
no
duck-hunt-fhe


no
"@

# Deploy with automated inputs
$inputs | vercel --prod

Write-Host "`n✅ Deployment completed!" -ForegroundColor Green
Write-Host "⚠️ Don't forget to add Environment Variables!" -ForegroundColor Yellow


