import * as d3 from "d3";
import { React, useEffect, useRef } from "react";

function BarChart({ data }) {
  const width = 800;
  const height = 300;
  const marginTop = 30;
  const marginRight = 60;
  const marginBottom = 30;
  const marginLeft = 80;
  const ref = useRef();

  useEffect(() => {
    if (data != null) {
      d3.select(ref.current).select("svg").remove();

      const minWeight = d3.min(data, (d) => d.kilogram);

      const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height]);

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.day))
        .range([marginLeft, width - marginRight]);

      const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.calories)])
        .nice()
        .range([height - marginBottom, marginTop]);

      const y2 = d3
        .scaleLinear()
        .domain([minWeight - 1, d3.max(data, (d) => d.kilogram)])
        .nice()
        .range([height - marginBottom, marginTop]);

      svg
        .append("g")
        .attr("transform", `translate(${width - marginRight},0)`)
        .call(
          d3
            .axisRight(y2)
            .tickSizeOuter(0)
            .tickSizeInner(-width + marginLeft + marginRight)
            .tickPadding(45)
        )
        .selectAll("line")
        .style("stroke-dasharray", "3, 3");

      svg.select(".domain").remove();

      svg
        .append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(
          d3.axisBottom(x).tickSizeOuter(0).tickSizeInner(0).tickPadding(15)
        )
        .selectAll(".domain")
        .style("stroke", "#dedede");

      svg.selectAll(".tick text").attr("class", "barchart-label");

      svg
        .append("g")
        .attr("fill", "#E60000")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (d) => x(d.day) + x.bandwidth() / 2 + 4)
        .attr("y", (d) => y1(d.calories))
        .attr("height", (d) => y1(0) - y1(d.calories))
        .attr("width", 7)
        .attr("rx", 3)
        .on("mouseover", (e, d) => {
          const [mx, my] = d3.pointer(e);
          console.log(mx, my);
          d3.select(".tooltip")
            .style("top", `${my - 50}px`)
            .style("left", `${mx + 20}px`)
            .style("display", `block`)
            .html(`<p>${d.kilogram}kg</p><p>${d.calories}Kcal</p>`);
        })
        .on("mouseout", () => {
          d3.select(".tooltip").style("display", "none");
        });

      svg
        .append("g")
        .attr("fill", "#282D30")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (d) => x(d.day) + x.bandwidth() / 2 - 11)
        .attr("y", (d) => y2(d.kilogram))
        .attr("height", (d) => 270 - y2(d.kilogram))
        .attr("width", 7)
        .attr("rx", 3)
        .on("mouseover", (e, d) => {
          const [mx, my] = d3.pointer(e);
          console.log(mx, my);
          d3.select(".tooltip")
            .style("top", `${my - 50}px`)
            .style("left", `${mx + 20}px`)
            .style("display", `block`)
            .html(`<p>${d.kilogram}kg</p><p>${d.calories}Kcal</p>`);
        })
        .on("mouseout", () => {
          d3.select(".tooltip").style("display", "none");
        });
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
