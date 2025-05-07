export const crosshairPlugin = {
  id: "crosshair",
  afterEvent: (chart, args) => {
    const event = args.event;
    if (!chart.$mouse) chart.$mouse = { x: null, y: null, active: false };
    if (event && event.type === "mousemove") {
      chart.$mouse = {
        x: event.x,
        y: event.y,
        active: true,
      };
      chart.draw();
    } else if (
      event &&
      (event.type === "mouseout" || event.type === "mouseleave")
    ) {
      chart.$mouse.active = false;
      chart.draw();
    }
  },
  afterDraw: (chart) => {
    const { ctx, chartArea } = chart;
    if (!chart.$mouse || !chart.$mouse.active) return;
    const { x, y } = chart.$mouse;

    if (
      x < chartArea.left ||
      x > chartArea.right ||
      y < chartArea.top ||
      y > chartArea.bottom
    )
      return;

    ctx.save();
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = "#1a237e";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(x, chartArea.top);
    ctx.lineTo(x, chartArea.bottom);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(chartArea.left, y);
    ctx.lineTo(chartArea.right, y);
    ctx.stroke();

    ctx.restore();
  },
};
