import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import Annotation from "chartjs-plugin-annotation";
import zoomPlugin from "chartjs-plugin-zoom";
import backgroundPlugin from "./BackgroundChartPLugin";
import { crosshairPlugin } from "./CrosshairPlugin";
import "chartjs-adapter-date-fns";
import { vi } from "date-fns/locale"; // Thêm dòng này để import locale tiếng Việt

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  Annotation,
  backgroundPlugin,
  crosshairPlugin,
  TimeScale,
);

// Export locale để có thể sử dụng ở các file khác
export const viLocale = vi;
export default ChartJS;
