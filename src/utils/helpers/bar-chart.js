import * as d3 from "d3";

/**
 * Initializes the bar chart with given data and displays it in the element from which comes ref
 * 
 * @param {{ ref: React.MutableRefObject, data: object }} 
 */
export function initBarChart({ ref, data }) {
    const width = 800;
    const height = 150;
    const marginTop = 30;
    const marginRight = 60;
    const marginBottom = 30;
    const marginLeft = 20;

    const minWeight = d3.min(data, (d) => d.kilogram);
    const maxWeight = d3.max(data, (d) => d.kilogram);

    //virtual x axis with numbers starting from 1 as domain
    const x = d3
        .scaleBand()
        .domain(
            indexesArray(data)
        )
        .range([marginLeft, width - marginRight]);

    //virtual y1 axis with calories data as domain
    const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.calories)])
        .nice()
        .range([height - marginBottom, marginTop]);

    //virtual y2 axis with weight data as domain
    const y2 = d3
        .scaleLinear()
        .domain([minWeight - 1, d3.max(data, (d) => d.kilogram)])
        .nice()
        .range([height - marginBottom, marginTop]);

    /**
     * creates an array with the same length than the given array with numbers starting from 1
     * 
     * @param {any[]} array 
     * @returns {Number[]}
     */
    function indexesArray(array) {
        let arrayToReturn = [];
        for (let i = 0; i < array.length; i++) {
            arrayToReturn.push(`${i + 1}`);
        }
        return arrayToReturn;
    }

    /**
     * Reacts to a mouseover by displaying a tooltip with the right data and highlighting the hovered data
     * 
     * @param {MouseEvent} e the event object
     * @param {object} d the data associated with the event
     */
    function mouseOver(e, d) {
        const mx = e.pageX - ref.current.offsetLeft;
        const my = e.pageY - ref.current.offsetTop;
        d3.selectAll(".back-rectangle")
            .filter((data) => data === d)
            .attr("fill", "#00000015");
        d3.select(".bar-chart-tooltip")
            .style("top", `${my - 50}px`)
            .style("left", `${mx + 20}px`)
            .style("display", `block`)
            .html(`<p>${d.kilogram}kg</p><p>${d.calories}Kcal</p>`);
    }

    /**
     * Reacts to a mouseout by stop displaying the displayed tooltip and stop highlighting the previously hovered data
     * 
     * @param {MouseEvent} e the event object
     * @param {object} d the data associated with the event
     */
    function mouseOut(e, d) {
        d3.selectAll(".back-rectangle")
            .filter((data) => data === d)
            .attr("fill", "#00000000");
        d3.select(".bar-chart-tooltip").style("display", "none");
    }

    //empties the graph if exists
    d3.select(ref.current).select("svg").remove();

    //creates the svg container
    const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height]);

    //displays the y2 axis
    svg
        .append("g")
        .attr("transform", `translate(${width - marginRight},0)`)
        .call(
            d3
                .axisRight(y2)
                .ticks(2)
                .tickSizeOuter(0)
                .tickSizeInner(-width + marginLeft + marginRight)
                .tickPadding(45)
        )
        .selectAll("line")
        .attr("stroke-dasharray", "3, 3");

    //removes the line of the axis, leaving nothing but the labels and horizontal lines 
    svg.select(".domain").remove();

    //displays the x axis
    svg
        .append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(
            d3.axisBottom(x).tickSizeOuter(0).tickSizeInner(0).tickPadding(15)
        )
        .selectAll(".domain")
        .attr("stroke", "#dedede");

    //adds "barchart-label" to the labels class for styling
    svg.selectAll(".tick text").attr("class", "barchart-label");

    //adds bars in the background to hover effect
    svg
        .append("g")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("fill", "#00000000")
        .attr("class", "back-rectangle")
        .attr("x", (d) => x(`${data.indexOf(d) + 1}`) + x.bandwidth() / 2 - 56 / 2)
        .attr("y", () => y2(maxWeight))
        .attr("height", () => 120 - y2(maxWeight))
        .attr("width", 56)
        .attr("rx", 3);

    //adds bars for each calories data
    svg
        .append("g")
        .attr("fill", "#E60000")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (d) => x(`${data.indexOf(d) + 1}`) + x.bandwidth() / 2 + 4)
        .attr("y", (d) => y1(d.calories))
        .attr("height", (d) => y1(0) - y1(d.calories))
        .attr("width", 7)
        .attr("rx", 3);

    //adds bars for each weight data
    svg
        .append("g")
        .attr("fill", "#282D30")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (d) => x(`${data.indexOf(d) + 1}`) + x.bandwidth() / 2 - 11)
        .attr("y", (d) => y2(d.kilogram))
        .attr("height", (d) => 120 - y2(d.kilogram))
        .attr("width", 7)
        .attr("rx", 3);

    //adds bars in the foreground to detect hover effect
    svg
        .append("g")
        .selectAll(".forward-rectangle")
        .data(data)
        .join("rect")
        .attr("fill", "#00000000")
        .attr("class", "forward-rectangle")
        .attr("x", (d) => x(`${data.indexOf(d) + 1}`) + x.bandwidth() / 2 - 56 / 2)
        .attr("y", () => y2(maxWeight))
        .attr("height", () => 120 - y2(maxWeight))
        .attr("width", 56)
        .attr("rx", 3)
        .on("mouseover", (e, d) => {
            mouseOver(e, d);
        })
        .on("mouseout", (e, d) => {
            mouseOut(e, d);
        });
}