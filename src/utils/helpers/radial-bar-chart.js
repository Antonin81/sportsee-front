import * as d3 from "d3";

export function initRadialBarChart({ ref, data }) {

    const width = 200;
    const height = 200;

    const innerRadius = height / 2 - 10;
    const outerRadius = height / 2;
    const lineBorderRadius = 40;

    const generateArc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(0)
        .endAngle(d => d)
        .cornerRadius(lineBorderRadius);

    d3.select(ref.current).select("svg").remove();

    const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    svg.append("circle")
        .attr("cx", "0")
        .attr("cy", "0")
        .attr("r", innerRadius)
        .style("fill", "white");

    svg.append("path")
        .datum(-data * 2 * Math.PI)
        .attr("fill", "#E60000")
        .attr("d", generateArc);

    svg.append("text")
        .attr("text-anchor", "middle")
        .text(`${data * 100}%`)
        .style("font-size", "36px")
        .style("font-weight", "bold")
        .style("fill", "#282D30");
    svg.append("text")
        .attr("text-anchor", "middle")
        .text("de votre")
        .attr("dy", "30px")
        .style("font-size", "20px")
        .style("fill", "#74798C");
    svg.append("text")
        .attr("text-anchor", "middle")
        .text("objectif")
        .attr("dy", "60px")
        .style("font-size", "20px")
        .style("fill", "#74798C");

}