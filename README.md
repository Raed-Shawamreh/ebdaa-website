# Ebdaa POS — Landing Site

موقع نقطة بيع إبداع (Ebdaa POS) — صفحة هبوط ثابتة على **Cloudflare Pages**.

## النشر

أي push على `main` ينشر تلقائياً عبر Cloudflare Pages إلى:
- https://ebdaa.karmeld.store (production)

## تحديث رقم الإصدار + رابط التنزيل

في `index.html` ابحث عن سطر معلومات التنزيل وحدّث:
- `1.11.0` → رقم الإصدار الجديد
- `117.76 MB` → حجم ملف التثبيت الجديد

رابط التنزيل يشير تلقائياً إلى أحدث Release يحمل ملفاً باسم
`Ebdaa-Setup.exe`، لذلك لا يحتاج إلى تغيير مع كل إصدار.

ثم:
```bash
git add index.html
git commit -m "release: x.y.z"
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
