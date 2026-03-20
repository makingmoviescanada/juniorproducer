import shutil
import os

# Remove .next build cache
next_dir = "/vercel/share/v0-project/.next"
if os.path.exists(next_dir):
    shutil.rmtree(next_dir)
    print(f"[v0] Removed .next build cache")
else:
    print(f"[v0] .next directory not found")

# Also remove node_modules/.cache if it exists
cache_dir = "/vercel/share/v0-project/node_modules/.cache"
if os.path.exists(cache_dir):
    shutil.rmtree(cache_dir)
    print(f"[v0] Removed node_modules/.cache")
else:
    print(f"[v0] node_modules/.cache not found")

print("[v0] Build cache cleared successfully")
