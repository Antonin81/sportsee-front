import * as d3 from "d3";

/**
 * Initializes the line chart with given data and displays it in the element from which comes ref
 * 
 * @param {{ ref: React.MutableRefObject, data: object }} 
 */
export function initLineChart({ ref, data }) {
    const width = 260;
    const height = 200;
    const marginTop = 1;
    const marginBottom = 30;

    const minSession = d3.min(data, (d) => d.sessionLength);

    //virtual x axis with numbers starting from 1 corresponding to days as domain
    const x = d3
        .scalePoint()
        .domain(data.map((d) => d.day))
        .range([0, width])
        .padding(0.1);

    //virtual y axis with session duration as domain
    const y = d3
        .scaleLinear()
        .domain([minSession, d3.max(data, (d) => d.sessionLength)])
        .nice()
        .range([height - marginBottom, marginTop]);

    //d3 function to generate the line of the linechart
    const generateLine = d3
        .line()
        .x((d) => x(d.day))
        .y((d) => y(d.sessionLength))
        .curve(d3.curveBumpX);

    //empties the graph if exists
    d3.select(ref.current).select("svg").remove();

    //creates the svg container
    const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height]);

    //adds a def to the svg for the line's gradient
    const defs = svg.append("defs");

    //adds the line's gradient
    const gradient = defs.append("linearGradient")
        .attr("id", "line-chart-line-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

    //adds the line's gradient starting color
    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "rgba(255, 255, 255, 0.3)");

    //adds the line's gradient ending color
    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "white");

    //displays the x axis
    svg
        .append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(
            d3.axisBottom(x).tickSizeOuter(0).tickSizeInner(0).tickPadding(15)
        )
        .selectAll(".domain")
        .attr("stroke", "none");

    //displays the line with the data
    svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "url(#line-chart-line-gradient)")
        .attr("stroke-width", 2)
        .attr("d", generateLine);

    //displays circles on the data points, in the background, for hover effect
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

    //displays circles on the data points, detecting hover effect
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