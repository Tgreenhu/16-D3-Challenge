// Define SVG dimensions
let svgWidth = 960;
let svgHeight = 500;
let axisDelay = 2500;
let circleDely = 2500;
let margin = { top: 20, right: 40, bottom: 80, left: 100 };

// Calculate chart dimensions
let chartWidth = svgWidth - margin.left - margin.right;
let chartHeight = svgHeight - margin.top - margin.bottom;
let labelArea = 120;

// Create SVG wrapper & chart holder
let svg = d3.select("#scatter")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .attr("class", "chart");
let chartGroup = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);

/*******************************************************************************************************************/

// Read CSV data & call functions to create graph
d3.csv('assets/data/data.csv').then(function(stateData) {
    // convert data into intergers
    stateData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;
    });
    // create scales
    let xScale = d3.scaleLinear()
        .domain([8, d3.max(stateData, d => d.poverty)])
        .range([0, chartWidth]);
    let yScale = d3.scaleLinear()
        .domain([15, d3.max(stateData, d => d.obesity)])
        .range([chartHeight, 0]);
    // create axis
    let bottomAxis = d3.axisBottom(xScale);
    let leftAxis = d3.axisLeft(yScale);
    // append axis to chart
    chartGroup.append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(bottomAxis);
    chartGroup.append("g")
        .call(leftAxis);
    // create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 20)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .attr("font-weight", 'bold')
      .style("font-size", "20px")
      .text("Poverty %");
    chartGroup.append("text")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top + 50})`)
      .attr("class", "axisText")
      .attr("font-weight", 'bold')
      .style("font-size", "20px")
      .text("Obesity %");
    // create circles
    let circleGroup = chartGroup.selectAll('circle')
        .data(stateData)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.poverty))
        .attr('cy', d => yScale(d.obesity))
        .attr('r', '20')
        .attr('fill', 'teal')
        .attr("stroke","black")
        .attr('opacity', '.50')
        .append('text')
        .text(function(d) {return d.attr;});
    // add state abbr to each cirle
    circleGroup.append('text')
        .text(function(d){return d.abbr})
        .attr("dx", function(d) {return xScale(d['poverty']);})
        .attr("dy", function(d) {return yScale(d['obesity']) + 10 / 2.5;})
        .attr("font-size", "12px")
        .attr("stroke", "white")
});