from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    # host="0.0.0.0" để các máy/điện thoại khác trong cùng mạng Wi-Fi
    # có thể truy cập được qua địa chỉ IP LAN của máy bạn
    app.run(host="0.0.0.0", port=5000, debug=True)
