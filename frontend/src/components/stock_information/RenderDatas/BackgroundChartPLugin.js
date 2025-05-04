// Custom plugin to draw colored background
const backgroundPlugin = {
  id: "customBackgroundColors",
  beforeDraw: (chart) => {
    const { ctx, chartArea, scales } = chart;
    if (!chartArea) return;

    const yScale = scales.y;
    const averageValue =
      chart.options.plugins.annotation.annotations.line1.yMin;

    const averageValuePixel = yScale.getPixelForValue(averageValue);

    // Draw red background below the line
    ctx.fillStyle = "rgba(255, 0, 0, 0.2)"; // Red with transparency
    ctx.fillRect(
      chartArea.left,
      averageValuePixel,
      chartArea.width,
      chartArea.bottom - averageValuePixel
    );

    // Draw green background above the line
    ctx.fillStyle = "rgba(0, 128, 0, 0.2)"; // Green with transparency
    ctx.fillRect(
      chartArea.left,
      chartArea.top,
      chartArea.width,
      averageValuePixel - chartArea.top
    );
  },
};

export default backgroundPlugin;