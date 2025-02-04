// thay đổi màu phù hợp với dữ liệu tăng giảm
function ColorForData(value, front = undefined, back = undefined) {
    const colorPalette = {
        red: "red",
        green: "green",
        yellow: "#fece0c",
    }
    let color;

    if (value < 0) color = colorPalette.red;
    else if (value > 0) color = colorPalette.green;
    else color = colorPalette.yellow;

    return (
        <span style={{ color: color }}>
            {front ? front : ""}
            {value}
            {back ? back : ""}
        </span>
    );
}

export default ColorForData;