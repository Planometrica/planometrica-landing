#!/bin/bash
# Deploy planometrica-landing to staging
# URL: https://staging.planometrica.ru

set -e

echo "🚀 Building planometrica-landing..."
npm run build

echo "📦 Deploying to staging.planometrica.ru..."
rsync -avz --delete ./dist/ root@81.19.135.123:/var/www/staging-landing/

echo "🔧 Setting permissions and reloading nginx..."
ssh root@81.19.135.123 "chown -R www-data:www-data /var/www/staging-landing && nginx -t && nginx -s reload"

echo ""
echo "✅ Deployed successfully!"
echo "🌐 URL: https://staging.planometrica.ru"
echo "🔐 Auth: planometrica / staging2026"
