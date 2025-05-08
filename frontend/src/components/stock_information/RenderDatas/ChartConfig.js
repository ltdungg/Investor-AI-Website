import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";
import Annotation from "chartjs-plugin-annotation";
import zoomPlugin from "chartjs-plugin-zoom";
import backgroundPlugin from "./BackgroundChartPLugin";
import { crosshairPlugin } from "./CrosshairPlugin";
import 'chartjs-adapter-date-fns';
import { vi } from 'date-fns/locale';

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
);

export default ChartJS;
