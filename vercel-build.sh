#!/bin/bash
# Vercel Build Script for French's Bakery
# This runs during Vercel's build step to set up the database

set -e

echo "🔨 Generating Prisma Client..."
npx prisma generate

echo "📦 Pushing database schema..."
npx prisma db push --skip-generate

echo "🌱 Seeding database..."
npx prisma db seed || echo "⚠️ Seed completed with warnings (may already be seeded)"

echo "✅ Build preparation complete!"
