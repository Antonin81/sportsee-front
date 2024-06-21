import * as d3 from "d3";

export function initRadarChart({ ref, data }) {
    const dataToDisplay = data.data;
    const kind = data.kind;

    const width = 250;
    const height = 250;
    const viewboxWidth = width + 40;
    const viewboxHeight = height + 40;
    const marginBlock = 50;
    const marginInline = 100;

    const maxValue = d3.max(dataToDisplay, (d) => d.value);
    const levels = 5;
    const diameter = Math.min(width - marginInline / 2, height - marginBlock / 2);
    const radius = diameter / 2;
    const anglePortion = Math.PI * 2 / dataToDisplay.length;

    const generateScale = d3.scaleLinear().range([0, radius]).domain([0, maxValue]);
    const allAxis = (dataToDisplay.map((d) => kind[d.kind]));
    const radarLine = d3.lineRadial()
        .curve(d3.curveLinearClosed)
        .radius(d => radius * d)
        .angle((d, i) => i * anglePortion);
    const radarArea = radarLine(dataToDisplay.map(d => d.value / maxValue));

    function calculateAngle(i) {
        return anglePortion * i - Math.PI / 2;
    }
    function translateX(d, i) {
        const angle = calculateAngle(i);
        const endX = Math.cos(angle);
        if (endX < 0.0) {
            return "-30";
        }
        if (endX > 0.1) {
            return "30";

        } else {
            return "0";
        }
    }
    function translateY(d, i) {
        const angle = calculateAngle(i);
        const endY = Math.sin(angle);
        if (endY < 0.0) {
            return "-15";
        }
        if (endY > 0.1) {
            return "15";

        } else {
            return "0";
        }
    }

    d3.select(ref.current).select("svg").remove();

    const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, viewboxWidth, viewboxHeight])
        .append("g")
        .attr("transform", `translate(${viewboxWidth / 2},${viewboxHeight / 2})`);

    const axisGrid = svg.append("g").attr("class", "axisWrapper");

    axisGrid
        .selectAll(".grid-polygon")
        .data(d3.range(1, levels + 1).reverse())
        .enter()
        .append("path")
        .attr("class", "grid-polygon")
        .attr("d", d => radarLine(Array(dataToDisplay.length).fill(d / levels)))
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", "2px");

    const axis = axisGrid
        .selectAll(".axis")
        .data(allAxis)
        .enter()
        .append("g")
        .attr("class", "axis");

    axis.append("text")
        .attr("class", "legend-radar-chart")
        .attr("text-anchor", "middle")
        .attr("dy", "5.5px")
        .attr("x", (d, i) => generateScale(maxValue) * Math.cos(calculateAngle(i)))
        .attr("y", (d, i) => generateScale(maxValue) * Math.sin(calculateAngle(i)))
        .attr("transform", (d, i) => `translate(${translateX(d, i)},${translateY(d, i)})`)
        .text(d => d);

    svg.append("path")
        .attr("class", "radarArea")
        .attr("d", radarArea)
        .attr("fill", "#FF0101B2");
}