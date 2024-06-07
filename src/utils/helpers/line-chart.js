import * as d3 from "d3";

export function initLineChart({ ref, data }) {
    const width = 260;
    const height = 200;
    const marginTop = 1;
    const marginBottom = 30;

    const minSession = d3.min(data, (d) => d.sessionLength);

    const x = d3
        .scalePoint()
        .domain(data.map((d) => d.day))
        .range([0, width])
        .padding(0.1);
    const y = d3
        .scaleLinear()
        .domain([minSession, d3.max(data, (d) => d.sessionLength)])
        .nice()
        .range([height - marginBottom, marginTop]);
    const generateLine = d3
        .line()
        .x((d) => x(d.day))
        .y((d) => y(d.sessionLength))
        .curve(d3.curveBumpX);

    d3.select(ref.current).select("svg").remove();

    const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height]);

    const defs = svg.append("defs");

    const gradient = defs.append("linearGradient")
        .attr("id", "line-chart-line-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "rgba(255, 255, 255, 0.3)");

    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "white");

    svg
        .append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(
            d3.axisBottom(x).tickSizeOuter(0).tickSizeInner(0).tickPadding(15)
        )
        .selectAll(".domain")
        .attr("stroke", "none");

    svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "url(#line-chart-line-gradient)")
        .attr("stroke-width", 2)
        .attr("d", generateLine);

    svg
        .selectAll(".circle-background")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "circle-background")
        .attr("cx", (d) => x(d.day))
        .attr("cy", (d) => y(d.sessionLength))
        .attr("r", 10)
        .attr("fill", "rgba(255, 255, 255, 0.3)")
        .style("display", "none");

    svg
        .selectAll(".basic-circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "basic-circle")
        .attr("cx", (d) => x(d.day))
        .attr("cy", (d) => y(d.sessionLength))
        .attr("r", 4)
        .attr("fill", "transparent")
        .on("mouseover", (e, d) => {
            const mx = e.pageX - ref.current.offsetLeft;
            const my = e.pageY - ref.current.offsetTop;
            d3.select(".line-chart-tooltip")
                .style("top", `${my - 30}px`)
                .style("left", `${mx + 20}px`)
                .style("display", `block`)
                .html(`<p>${d.sessionLength} min</p>`);
            svg.selectAll(".circle-background")
                .filter((data) => data === d)
                .style("display", "block");
        })
        .on("mouseout", (e, d) => {
            d3.select(".line-chart-tooltip").style("display", "none");
            svg.selectAll(".circle-background")
                .filter((data) => data === d)
                .style("display", "none");
        });

}