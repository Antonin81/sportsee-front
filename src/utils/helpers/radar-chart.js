import * as d3 from "d3";

export function initRadarChart({ ref, data }) {
    const dataToDisplay = data.data;
    const kind = data.kind;

    const width = 200;
    const height = 200;
    const marginBlock = 50;
    const marginInline = 100;

    const maxValue = d3.max(dataToDisplay, (d) => d.value);

    const levels = 5;
    const diameter = Math.min(width - marginInline / 2, height - marginBlock / 2);
    const radius = diameter / 2;

    const generateScale = d3.scaleLinear().range([0, radius]).domain([0, maxValue]);

    const anglePortion = Math.PI * 2 / 6;

    function calculateAngle(i) {
        return anglePortion * i - Math.PI / 2;
    }

    d3.select(ref.current).select("svg").remove();

    const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const allAxis = (dataToDisplay.map((d) => kind[d.kind]));

    const axisGrid = svg.append("g").attr("class", "axisWrapper");

    const radarLine = d3.lineRadial()
        .curve(d3.curveLinearClosed)
        .radius(d => radius * d)
        .angle((d, i) => i * anglePortion);

    axisGrid
        .selectAll(".gridCircle")
        .data(d3.range(1, levels + 1).reverse())
        .enter()
        .append("path")
        .attr("class", "gridCircle")
        .attr("d", d => radarLine(Array(dataToDisplay.length).fill(d / levels)))
        .style("fill", "none")
        .style("stroke", "#CDCDCD");

    const axis = axisGrid
        .selectAll(".axis")
        .data(allAxis)
        .enter()
        .append("g")
        .attr("class", "axis");

    axis.append("text")
        .attr("class", "legend")
        .style("font-size", "11px")
        .attr("text-anchor", "middle")
        .attr("dy", "5.5px")
        .attr("x", (d, i) => generateScale(maxValue) * Math.cos(calculateAngle(i)))
        .attr("y", (d, i) => generateScale(maxValue) * Math.sin(calculateAngle(i)))
        .attr("transform", (d, i) => `translate("0",${Math.sin(calculateAngle(i)) < 0 ? "-15" : "15"})`)
        .text(d => d);

    const radarArea = radarLine(dataToDisplay.map(d => d.value / maxValue));

    svg.append("path")
        .attr("class", "radarArea")
        .attr("d", radarArea)
        .style("fill", "rgba(255, 0, 0, 0.5)")
        .style("stroke", "#E60000")
        .style("stroke-width", "2px");
}