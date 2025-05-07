// dùng để format lại số cho dễ đọc
function NumberFormat(number) {
    if (number !== 0 && !number) {
        return;
    }
    return number.toLocaleString("en-US");
}

export default NumberFormat;