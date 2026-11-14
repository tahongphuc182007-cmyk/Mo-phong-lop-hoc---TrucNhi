# Mô phỏng Không gian 3D Lớp học 5A1

Ứng dụng web 3D (Three.js) mô phỏng không gian lớp học 5A1. Chỉ gồm một file `index.html` tự chứa toàn bộ mã và hình ảnh, không cần build.

## Chạy trên máy
Mở trực tiếp `index.html` bằng trình duyệt (cần Internet để tải Three.js, Tailwind, Google Fonts từ CDN).
Hoặc chạy server cục bộ: `python3 -m http.server 8000` rồi vào http://localhost:8000

## Đưa lên GitHub Pages
1. Tạo repository mới trên GitHub, upload toàn bộ nội dung thư mục này (giữ cả `.github` và `.nojekyll`).
2. Vào **Settings → Pages → Build and deployment → Source**, chọn **GitHub Actions**.
3. Mỗi lần push lên nhánh `main`, workflow sẽ tự triển khai. Link web: `https://<tên-tài-khoản>.github.io/<tên-repo>/`

(Cách thay thế: Settings → Pages → Deploy from a branch → `main` / `/ (root)`.)
