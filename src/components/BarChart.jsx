import { React, useEffect, useRef } from "react";
import { initBarChart } from "../utils/helpers/bar-chart";

function BarChart({ data }) {
  const ref = useRef();

  useEffect(() => {
    if (data != null) {
      initBarChart({ ref, data });
    }
  }, [data]);

  return (
    <div className="chart-container bar-chart-container">
      <div className="top-section">
        <h2>Activité quotidienne</h2>
        <div className="legend-section">
          <div>
            <div className="legend-dot legend-dot-black"></div>
            <p>Poids (kg)</p>
          </div>
          <div>
            <div className="legend-dot legend-dot-red"></div>
            <p>Calories brûlées (kCal)</p>
          </div>
        </div>
      </div>
      <div ref={ref} className="bottom-section">
        <div className="tooltip hidden"></div>
      </div>
    </div>
  );
}

export default BarChart;
