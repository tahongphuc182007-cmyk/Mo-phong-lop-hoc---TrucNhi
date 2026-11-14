# Mô phỏng Không gian 3D Lớp học 5A

Web 3D (Three.js) mô phỏng lớp học 5A.

## Cấu trúc
- `index.html`: giao diện (HTML)
- `css/style.css`: giao diện CSS
- `js/app.js`: toàn bộ mã 3D và điều khiển
- `images/`: 32 hình ảnh dùng làm texture
- `.nojekyll`: để GitHub Pages phục vụ file nguyên trạng

## Chạy trên máy
Phải chạy qua server (mở trực tiếp file sẽ không nạp được ảnh):
`python3 -m http.server 8000` rồi vào http://localhost:8000

## GitHub Pages
Settings → Pages → Deploy from a branch → `main` / `/ (root)` → Save.
Cần Internet để tải Three.js, Tailwind, Google Fonts từ CDN.
