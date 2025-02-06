import CompareToIgnoreCase from "./CompareToIgnoreCase";

// kiểm tra một chuỗi có thuộc mảng không không phân biệt hoa thường
function IncludesIgnoreCase(arr, str) {
    return arr.some((item) => !CompareToIgnoreCase(item, str));
}

export default IncludesIgnoreCase;