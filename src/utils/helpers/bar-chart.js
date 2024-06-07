import * as d3 from "d3";

export function initBarChart({ ref, data }) {
    const width = 800;
    const height = 150;
    const marginTop = 30;
    const marginRight = 60;
    const marginBottom = 30;
    const marginLeft = 20;

    function indexesArray(array) {
        let arrayToReturn = [];
        for (let i = 0; i < array.length; i++) {
            arrayToReturn.push(`${i + 1}`);
        }
        return arrayToReturn;
    }

    d3.select(ref.current).select("svg").remove();

    const minWeight = d3.min(data, (d) => d.kilogram);
    const maxWeight = d3.max(data, (d) => d.kilogram);


    const svg = d3
        .select(ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height]);

    const x = d3
        .scaleBand()
        .domain(
            indexesArray(data)
        )
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
                .ticks(2)
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

    function mouseOut(e, d) {
        d3.selectAll(".back-rectangle")
            .filter((data) => data === d)
            .attr("fill", "#00000000");
        d3.select(".bar-chart-tooltip").style("display", "none");
    }

    svg
        .append("g")
        // .attr("fill", "#00000015")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("fill", "#00000000")
        .attr("class", "back-rectangle")
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
        .attr("rx", 3)
        .on("mouseover", (e, d) => {
            mouseOver(e, d);
        })
        .on("mouseout", (e, d) => {
            mouseOut(e, d);
        });

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
        .attr("rx", 3)
        .on("mouseover", (e, d) => {
            mouseOver(e, d);
        })
        .on("mouseout", (e, d) => {
            mouseOut(e, d);
        });
}