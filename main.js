function salaryCal() {
    // 1. Lấy giá trị và loại bỏ khoảng trắng thừa
    const dateInput = document.getElementById('date').value.trim();

    // 2. Ép kiểu
    const day = Number(dateInput);

    // 3. Kiểm tra logic
    // Kiểm tra: Trống, Không phải số, Nhỏ hơn hoặc bằng 0
    if (dateInput === "" || isNaN(day) || day <= 0) {
        Swal.fire({
            title: "Lỗi nhập liệu!",
            text: "Vui lòng nhập số ngày làm việc (lớn hơn 0)",
            icon: "error"
        });
        return;
    }

    // 4. Tính toán
    const salary = 100000 * day;

    // 5. Hiển thị kết quả
    return Swal.fire({
        title: "Kết quả tính lương",
        html: `Tổng lương của bạn là: <b style="color: #ef4444;">${salary.toLocaleString()} VNĐ</b>`,
        icon: "success"
    });
}

function calcAverage() {
    // 1. Lấy giá trị từ các ô input
    const inputs = [
        document.getElementById('num1').value,
        document.getElementById('num2').value,
        document.getElementById('num3').value,
        document.getElementById('num4').value,
        document.getElementById('num5').value
    ];

    // 2. Duyệt qua mảng để kiểm tra từng số
    for (let i = 0; i < inputs.length; i++) {
        const value = inputs[i];
        const num = parseFloat(value);

        // Kiểm tra bỏ trống
        if (value.trim() === "") {
            Swal.fire({
                title: "Trống dữ liệu!",
                text: `Vui lòng không để trống ô thứ ${i + 1}`,
                icon: "warning"
            });
            return;
        }

        // Kiểm tra xem có phải là số thực hợp lệ không
        if (isNaN(num) && value != null) {
            Swal.fire({
                title: "Sai định dạng!",
                text: `Ô thứ ${i + 1} không phải là số hợp lệ.`,
                icon: "error"
            });
            return;
        }
    }

    // 3. tính toán
    // Sử dụng Map để chuyển toàn bộ mảng string sang mảng số thực
    const numbers = inputs.map(val => parseFloat(val));

    // Tính tổng bằng hàm reduce
    const total = numbers.reduce((sum, current) => sum + current, 0);
    const average = total / 5;

    // 4. Xuất kết quả ra
    return Swal.fire({
        title: "Kết quả tính toán",
        // Định dạng số tối đa 2 chữ số thập phân cho đẹp
        html: `Giá trị trung bình của 5 số là: <b style="color: #2563eb; font-size: 1.2em;">${average.toLocaleString()}</b>`,
        icon: "success"
    });
}

function resetinputcalcAverage() {
    const inputIds = ['num1', 'num2', 'num3', 'num4', 'num5'];
    inputIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = "";
        }
    });
}

function convertCurrency() {
    // 1. Số tiền người dùng nhập
    const RATE = 23500;
    const usdInput = document.getElementById('usdAmount').value;
    const resultDiv = document.getElementById('currencyResult');

    var usd = Number(usdInput);

    // 2. Kiểm tra dữ liệu nhập
    if (usdInput === "" || usd <= 0 || isNaN(usd)) {
        Swal.fire({
            title: "Nhập tiền tệ hợp lệ!",
            text: `Số tiền phải lớn hơn 0 và là số.`,
            icon: "warning"
        });
        return;
    }

    // 3. Tính toán
    const vnd = usd * RATE;

    // 4. Định dạng tiền tệ VNĐ (Thêm dấu phân cách nghìn)
    const formattedVnd = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(vnd);

    // 5. Xuất kết quả ra màn hình
    resultDiv.innerHTML = `Kết quả: ${formattedVnd}`;
    resultDiv.classList.remove('hidden');
}

function resetInputConvertCurrency() {
    const result = document.getElementById('currencyResult');
    const input = document.getElementById('usdAmount');

    input.value = ('');
    result.classList.add('hidden');
}

function calcRectangle() {
    // 1. Lấy dữ liệu đầu vào
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const resultBox = document.getElementById('rectResult');

    // 2. Kiểm tra dữ liệu hợp lệ
    if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) {
        Swal.fire({
            title: "Dữ liệu không hợp lệ!",
            text: `Vui lòng nhập chiều dài & rộng hợp lệ`,
            icon: "error"
        });
        return;
    }

    // 3. Tính toán theo công thức
    const area = length * width;
    const perimeter = (length + width) * 2;

    // 4. Hiển thị kết quả
    document.getElementById('areaResult').innerHTML = `Diện tích: <b>${area.toLocaleString()}</b>`;
    document.getElementById('perimeterResult').innerHTML = `Chu vi: <b>${perimeter.toLocaleString()}</b>`;

    resultBox.classList.remove('hidden');
}

function resetRectangle() {
    document.getElementById('length').value = '';
    document.getElementById('width').value = '';
    document.getElementById('rectResult').classList.add('hidden');
}

function calcDigitSum() {
    // 1. Lấy giá trị nhập vào
    const number = parseInt(document.getElementById('twoDigitNumber').value);
    const resultDiv = document.getElementById('digitSumResult');

    // 2. Kiểm tra xem có đúng là số có 2 chữ số không (từ 10 đến 99 hoặc -99 đến -10)
    if (isNaN(number) || Math.abs(number) < 10 || Math.abs(number) > 99) {
        Swal.fire({
            title: "Dữ liệu không hợp lệ!",
            text: `Vui lòng nhập số có 2 chữ số VD: 12, 44`,
            icon: "error"
        });
        return;
    }

    // Làm việc với số dương để tách ký số chính xác
    const positiveNumber = Math.abs(number);

    // 3. Tách số hàng chục và hàng đơn vị
    // Cách lấy số hàng chục: chia cho 10 và làm tròn xuống
    const ten = Math.floor(positiveNumber / 10);
    // Cách lấy số hàng đơn vị: chia lấy dư cho 10
    const unit = positiveNumber % 10;

    // 4. Tính tổng
    const sum = ten + unit;

    // 5. Xuất kết quả
    resultDiv.innerHTML = `Tổng 2 ký số của ${number} là: ${ten} + ${unit} = <b>${sum}</b>`;
    resultDiv.classList.remove('hidden');
}

function resetDigitSum() {
    document.getElementById('twoDigitNumber').value = '';
    document.getElementById('digitSumResult').classList.add('hidden');
}