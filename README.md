# Thiệp & Vườn hoa 20/10

Web đơn giản bằng Flask: hiện 1 bông hoa nở → bấm "Xem vườn hoa" để
thấy cả vườn hoa đung đưa theo gió, hoặc bấm "Xem thiệp" để đọc lời chúc.

## Cấu trúc
```
thiep-20-10/
  app.py            # chạy server Flask
  generate_qr.py    # tạo mã QR để người khác quét truy cập
  requirements.txt
  templates/index.html
  static/style.css
  static/script.js
```

## 1. Cài đặt (chỉ làm 1 lần)

Cần có Python 3.8+. Mở terminal/cmd tại thư mục `thiep-20-10`, chạy:

```bash
pip install -r requirements.txt
```

## 2. Chạy web

```bash
python app.py
```

Terminal sẽ hiện dòng kiểu `Running on http://0.0.0.0:5000`.
Mở trình duyệt trên máy bạn vào: `http://localhost:5000` để xem thử.

Giữ cửa sổ terminal này chạy — tắt đi là web sẽ ngừng hoạt động.

## 3. Tạo mã QR để người khác quét xem

Mở một terminal **khác** (giữ nguyên terminal đang chạy `app.py`),
vào cùng thư mục rồi chạy:

```bash
python generate_qr.py
```

Script sẽ:
- tự tìm địa chỉ IP mạng LAN của máy bạn,
- tạo file `qr.png` chứa mã QR trỏ tới `http://<IP-của-bạn>:5000`.

Gửi file `qr.png` này cho bạn bè. **Điều kiện: điện thoại của họ phải
kết nối cùng mạng Wi-Fi với máy bạn** thì quét QR mới vào được, vì
đây là web chạy nội bộ (local), chưa đưa lên internet.

Nếu muốn đổi cổng khác (ví dụ 8080), chạy:
```bash
python app.py        # sửa port trong app.py thành 8080
python generate_qr.py 8080
```

## 4. Muốn share cho người KHÔNG cùng Wi-Fi (qua internet)

Cách đơn giản nhất là dùng một dịch vụ tunnel miễn phí, ví dụ **ngrok**:

1. Tải và cài ngrok: https://ngrok.com/download
2. Chạy `python app.py` như bình thường (port 5000).
3. Mở terminal khác, chạy: `ngrok http 5000`
4. Ngrok sẽ cho bạn 1 link dạng `https://xxxx.ngrok-free.app` —
   dùng chính link này để tự tạo QR (ví dụ qua trang qr-code-generator.com,
   hoặc sửa `generate_qr.py` để nhập thẳng link này thay vì tự dò IP).

## Ghi chú
- Web không cần internet để chạy nếu chỉ share trong cùng Wi-Fi.
- Nếu điện thoại không quét được, kiểm tra tường lửa (firewall) trên máy tính
  có đang chặn cổng 5000 không, hoặc tắt tạm thời để thử.
