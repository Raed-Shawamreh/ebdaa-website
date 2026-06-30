# Ebdaa POS — Landing Site

موقع نقطة بيع إبداع (Ebdaa POS) — صفحة هبوط ثابتة على **Cloudflare Pages**.

## النشر

أي push على `main` ينشر تلقائياً عبر Cloudflare Pages إلى:
- https://ebdaa.raedshaw.online (production)

## تحديث رقم الإصدار + رابط التنزيل

في `index.html` بحث عن:
- `__DOWNLOAD_URL__` → استبدله برابط GitHub Release الجديد
- `1.0.7` → الإصدار الجديد
- `115.3 MB` → الحجم الجديد

ثم:
```bash
git add index.html
git commit -m "release: 1.0.x"
git push
```

## تحديث الإحصاءات (يدوي)

في `index.html`:
- `data-count="33"` → عدد التنزيلات الجديد
- `data-count="12"` → عدد العملاء الجديد

## البنية

```
ebdaa-static/
├── index.html       — الصفحة الرئيسية
├── privacy/
│   └── index.html   — سياسة الخصوصية (مطلوبة لـ Google OAuth)
├── icon.svg         — الشعار
├── icon.png
├── favicon.ico
├── _redirects       — Cloudflare Pages routes
├── _headers         — security headers
└── README.md
```
