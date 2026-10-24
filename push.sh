#!/bin/bash
set -e

echo "🚀 Memulai proses Push ke GitHub..."

if [ ! -d ".git" ]; then
    git init
    git branch -M main
    git remote add origin https://github.com/Bayuaje12/xiosmp.git
fi

git add .
read -p "Masukkan pesan update (kosongkan untuk default 'update website'): " msg
if [ -z "$msg" ]; then
    msg="update website"
fi

git commit -m "$msg"
git push -u origin main

echo "✅ Berhasil dipush ke GitHub!"
