import { initRadialBarChart } from "../utils/helpers/radial-bar-chart";
import { useRef, useEffect } from "react";

function RadialBarChart({ data }) {
  const ref = useRef();

  useEffect(() => {
    if (data != null) {
      initRadialBarChart({ ref, data });
    }
  }, [data]);

  return (
    <div className="chart-container radial-bar-chart-container">
      <div className="top-section">
        <h2>Score</h2>
      </div>
      <div ref={ref} className="bottom-section"></div>
    </div>
  );
}

export default RadialBarChart;
