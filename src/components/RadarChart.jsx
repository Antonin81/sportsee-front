import { initRadarChart } from "../utils/helpers/radar-chart";
import { useRef, useEffect } from "react";

/**
 * Creates the radarchart element with given data
 *
 * @param {{data: object}}
 * @returns {React.JSX.Element}
 */
function RadarChart({ data }) {
  const ref = useRef();
  console.log(data.data);
  useEffect(() => {
    if (data != null) {
      initRadarChart({ ref, data });
    }
  }, [data]);

  return (
    <div className="chart-container radar-chart-container">
      <div ref={ref}></div>
    </div>
  );
}

export default RadarChart;
