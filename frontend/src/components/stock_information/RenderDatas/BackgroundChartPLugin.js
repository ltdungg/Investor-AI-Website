const backgroundPlugin = {
  id: "customBackgroundColors",
  
  beforeDraw: (chart) => {
    const { ctx, chartArea, scales } = chart;

    // Kiểm tra điều kiện cơ bản
    if (!chartArea || !scales?.x || !scales?.y) return;

    // Kiểm tra annotation configuration
    const annotation = chart.options?.plugins?.annotation?.annotations?.line1;
    if (!annotation || typeof annotation.yMin !== 'number') {
      console.error('Annotation configuration missing or invalid');
      return;
    }

    // Tính toán giá trị avgPixel
    const avgPixel = scales.y.getPixelForValue(annotation.yMin);
    if (!isFinite(avgPixel)) {
      console.error('Invalid avgPixel value:', avgPixel);
      return;
    }

    // Xử lý dataset và points
    const dataset = chart.data.datasets[0];
    if (!dataset?.data?.length) return;

    const points = dataset.data.map((value, index) => {
      // Xử lý nhãn thời gian nếu cần
      const label = chart.data.labels?.[index];
      const xValue = scales.x.parse(label);

      return {
        x: scales.x.getPixelForValue(xValue instanceof Date ? xValue.getTime() : xValue),
        y: scales.y.getPixelForValue(value)
      };
    });

    ctx.save();

    // Vẽ gradient xanh (phía trên đường avg)
    const greenGradient = ctx.createLinearGradient(
      0, Math.max(chartArea.top, 0),
      0, Math.min(avgPixel, chartArea.bottom)
    );
    greenGradient.addColorStop(0, "rgba(0, 128, 0, 0.3)");
    greenGradient.addColorStop(1, "rgba(0, 128, 0, 0.05)");

    // Vẽ path và fill gradient
    const drawArea = (ctx, points) => {
      ctx.beginPath();
      points.forEach((point, index) => {
        index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y);
      });
      ctx.closePath();
    };

    const fillGradient = (ctx, gradient, chartArea, position) => {
      ctx.save();
      ctx.clip();
      ctx.fillStyle = gradient;
      ctx.fillRect(
        chartArea.left,
        position === 'top' ? chartArea.top : avgPixel,
        chartArea.width,
        position === 'top' ? avgPixel - chartArea.top : chartArea.bottom - avgPixel
      );
      ctx.restore();
    };

    // Vẽ gradient đỏ (phía dưới đường avg)
    const redGradient = ctx.createLinearGradient(
      0, Math.max(avgPixel, chartArea.top),
      0, Math.min(chartArea.bottom, ctx.canvas.height)
    );
    redGradient.addColorStop(0, "rgba(255, 0, 0, 0.05)");
    redGradient.addColorStop(1, "rgba(255, 0, 0, 0.3)");

    this.drawArea(ctx, points, avgPixel, chartArea);
    this.fillGradient(ctx, redGradient, chartArea, avgPixel, 'bottom');

    ctx.restore();
  },

  drawArea(ctx, points, avgPixel, chartArea) {
    ctx.beginPath();
    points.forEach((point, index) => {
      index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(points[points.length-1].x, avgPixel);
    ctx.lineTo(points[0].x, avgPixel);
    ctx.closePath();
  },

  fillGradient(ctx, gradient, chartArea, avgPixel, position) {
    ctx.save();
    ctx.clip();
    ctx.fillStyle = gradient;

    const fillHeight = position === 'top'
      ? avgPixel - chartArea.top
      : chartArea.bottom - avgPixel;

    ctx.fillRect(
      chartArea.left,
      position === 'top' ? chartArea.top : avgPixel,
      chartArea.width,
      Math.max(0, fillHeight)
    );
    ctx.restore();
  }
};

export default backgroundPlugin;
