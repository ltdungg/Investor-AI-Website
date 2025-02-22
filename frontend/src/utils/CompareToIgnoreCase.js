// so sánh 2 chuỗi không phân biệt hoa thường 
function CompareToIgnoreCase(str1, str2) {
    return str1.localeCompare(str2, undefined, {
        sensitivity: "base",
    });
}

export default CompareToIgnoreCase;
