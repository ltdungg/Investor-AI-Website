const backgroundPlugin = {
  id: "customBackgroundColors",
  
  beforeDraw: (chart) => {
    const { ctx, chartArea, scales } = chart;
    if (!chartArea) return;

    const dataset = chart.data.datasets[0];
    if (!dataset) return;

    const yScale = scales.y;
    const xScale = scales.x;
    const avg = chart.options.plugins.annotation.annotations.line1.yMin;
    const avgPixel = yScale.getPixelForValue(avg);

    // Tạo đường path theo line
    const points = dataset.data.map((value, index) => ({
      x: xScale.getPixelForValue(index),
      y: yScale.getPixelForValue(value)
    }));

    ctx.save();

    // Vẽ nền dưới đường line và trên đường yMin (xanh)
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });

    // Đi ngược lại theo đường yMin
    ctx.lineTo(points[points.length-1].x, avgPixel);
    ctx.lineTo(points[0].x, avgPixel);
    ctx.closePath();

    // Tạo gradient xanh mờ dần từ trên xuống
    const greenGradient = ctx.createLinearGradient(0, chartArea.top, 0, avgPixel);
    greenGradient.addColorStop(0, "rgba(0, 128, 0, 0.3)");  // Xanh đậm hơn ở trên
    greenGradient.addColorStop(1, "rgba(0, 128, 0, 0.05)"); // Xanh rất mờ ở dưới

    // Tô màu với clip dựa trên vị trí
    ctx.save();
    ctx.clip();
    ctx.fillStyle = greenGradient;
    ctx.fillRect(chartArea.left, chartArea.top, chartArea.width, avgPixel);
    ctx.restore();

    // Vẽ nền trên đường line và dưới đường yMin (đỏ)
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });

    // Đi ngược lại theo đường yMin
    ctx.lineTo(points[points.length-1].x, avgPixel);
    ctx.lineTo(points[0].x, avgPixel);
    ctx.closePath();

    // Tạo gradient đỏ mờ dần từ dưới lên
    const redGradient = ctx.createLinearGradient(0, avgPixel, 0, chartArea.bottom);
    redGradient.addColorStop(0, "rgba(255, 0, 0, 0.05)"); // Đỏ rất mờ ở trên
    redGradient.addColorStop(1, "rgba(255, 0, 0, 0.3)");  // Đỏ đậm hơn ở dưới

    // Tô màu với clip dựa trên vị trí
    ctx.save();
    ctx.clip();
    ctx.fillStyle = redGradient;
    ctx.fillRect(chartArea.left, avgPixel, chartArea.width, chartArea.bottom);
    ctx.restore();

    ctx.restore();
  },
};

export default backgroundPlugin;
