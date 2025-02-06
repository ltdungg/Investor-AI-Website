import ColorForData from "./ColorForData";

// dùng để thay đổi màu và cộng trừ vào dữ liệu
function FluctuationFormat(value, back = undefined) {
    return ColorForData(value, value > 0 ? "+" : undefined, back);
}

export default FluctuationFormat;
