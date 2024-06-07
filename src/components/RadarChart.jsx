import { initRadarChart } from "../utils/helpers/radar-chart";
import { useRef, useEffect } from "react";

function RadarChart({ data }) {
  const ref = useRef();

  useEffect(() => {
    if (data != null) {
      initRadarChart({ ref, data });
    }
  }, [data]);

  return (
    <div className="chart-container radar-chart-container">
      <div ref={ref} className="bottom-section"></div>
    </div>
  );
}

export default RadarChart;
