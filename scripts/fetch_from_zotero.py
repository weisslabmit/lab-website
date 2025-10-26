#!/usr/bin/env python3
import json, os, sys, time
import requests

# Your Zotero Group ID
GROUP_ID = os.getenv("ZOTERO_GROUP_ID") or "6271906"

BASE = f"https://api.zotero.org/groups/6271906/items"
params = {
    "format": "csljson",  # Zotero returns standard CSL-JSON
    "limit": "100",       # paginate in 100s
    "start": "0"
}

all_items = []
while True:
    r = requests.get(BASE, params=params, timeout=60)
    r.raise_for_status()
    batch = r.json()
    if not batch:
        break
    all_items.extend(batch)
    # advance pagination
    params["start"] = str(int(params["start"]) + len(batch))
    time.sleep(0.2)  # polite pause

os.makedirs("data", exist_ok=True)
with open("data/publications.zotero.json", "w", encoding="utf-8") as f:
    json.dump(all_items, f, ensure_ascii=False, indent=2)

print(f"Wrote data/publications.zotero.json with {len(all_items)} items")
