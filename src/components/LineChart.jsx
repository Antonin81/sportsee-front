import { React, useEffect, useRef } from "react";
import { initLineChart } from "../utils/helpers/line-chart";

/**
 * Creates the linechart element with given data
 *
 * @param {{data: object}}
 * @returns {React.JSX.Element}
 */
function LineChart({ data }) {
  const ref = useRef();

  useEffect(() => {
    if (data != null) {
      initLineChart({ ref, data });
    }
  }, [data]);

  return (
    <div className="chart-container line-chart-container">
      <div className="top-section">
        <h2>Durée moyenne des sessions</h2>
      </div>
      <div ref={ref} className="bottom-section">
        <div className="line-chart-tooltip hidden"></div>
      </div>
    </div>
  );
}

export default LineChart;
