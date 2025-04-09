// Kiểm tra email hợp lệ
export function isValidEmail(email) {
    const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// Kiểm tra số điện thoại (10 số, bắt đầu bằng 0)
export function isValidPhone(phone) {
    const regex = /^0\d{9}$/;
    return regex.test(phone);
}

// Kiểm tra mật khẩu (ít nhất 8 ký tự, có số, chữ cái và ký tự đặc biệt)
export function isValidPassword(password) {
    const regex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

export function registerValid(e) {
    const validEmail = isValidEmail(e.email.value);
    const validPhone = isValidPhone(e.phone.value);
    const validPassword = isValidPassword(e.password.value);

    if (!validEmail) alert("email không thỏa mãn");
    if (!validPhone) alert("số điện thoại không hợp lệ");
    if (!validPassword) alert("mật khẩu quá yếu");
    if (e.password.value !== e.repassword.value)
        alert("nhập lại mật khẩu giống với mật khẩu bạn đã nhập");

    return (
        validEmail &&
        validPhone &&
        validPassword &&
        e.password.value === e.repassword.value
    );
}
