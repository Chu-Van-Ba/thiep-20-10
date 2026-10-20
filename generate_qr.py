import socket
import sys
import qrcode


def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = "127.0.0.1"
    finally:
        s.close()
    return ip


def main():
    port = sys.argv[1] if len(sys.argv) > 1 else "5000"
    ip = get_local_ip()
    url = f"http://{ip}:{port}"

    img = qrcode.make(url)
    img.save("qr.png")

    print(f"Địa chỉ web: {url}")
    print("Đã lưu mã QR vào file qr.png")
    print("Mọi người cùng mạng Wi-Fi quét mã này là xem được trang web.")


if __name__ == "__main__":
    main()
