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
let svg = d3.select("scatter")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .attr("class", "chart");
let chartGroup = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);

/*******************************************************************************************************************/

// Read CSV data & call functions to create graph
d3.csv('./data/data.csv', rowConverter)
  .then(createChart)
  .catch(function (error) {
      console.log(error);
    });

// Function to turn data into intergers
function rowConverter(row) {
    row.poverty = +row.poverty;
    row.obesity = +row.obesity;
    return row;
};

// Function to create chart
function createChart(stateData) {
    // store info to use into an object
    let activeInfo = {
        data: stateData,
        currentX: 'poverty',
        currentY: 'obesity'
    };
    // create scales
    activeInfo.xScale = d3.scaleLinear().domain(getXDomain(activeInfo)).range([0, chartWidth]);
    activeInfo.yScale = d3.scaleLinear().domain(getYDomain(activeInfo)).range([0, chartHeight]);
    activeInfo.xAxis = d3.axisBottom(activeInfo.xScale);
    activeInfo.yAxis = d3.axisLeft(activeInfo.yScale);
    // call functions to create charts & update page
    createAxis(activeInfo);
    createCircles(activeInfo);
    createToolTip(activeInfo);
    createLables();
};

// Function to create circles on the chart
function createCircles(activeInfo) {
    let currentX = activeInfo.currentX;
    let currentY = activeInfo.currentY;
    let xScale = activeInfo.xScale;
    let yScale = activeInfo.yScale; 
    chartGroup.selectAll('circle')
              .data(activeInfo.data)
              .enter()
              .append('circle')
              .attr('cx', (d) => xScale(d[currentX]))
              .attr('cy', (d) => yScale(d[currentY]))
              .attr('r', 10)
              .attr('fill', 'green')
              .attr('opacity', '.2');
            //   .attr('class', (d) => d.abbr);
};

// Function to create the axis's for the chart
function createAxis(activeInfo) {
    chartGroup.append("g").call(activeInfo.yAxis).attr("class", "y-axis");
    chartGroup.append("g")
              .call(activeInfo.xAxis)
              .attr("class", "x-axis")
              .attr("transform", `translate(0, ${chartHeight})`);
};

// Functions to get min/max's for both x & y axis to apply to chart creation
function getXDomain() {
    let xMin = d3.min(activeInfo.data, (d) => d[activeInfo.currentX]);
    let xMax = d3.max(activeInfo.data, (d) => d[activeInfo.currentX]);
    return [min, max];
};
function getYDomain() {
    let yMin = 0
    let yMax = d3.max(activeInfo.data, (d) => d[activeInfo.currentY]);
    return [min, max];
};

// Function to create the labels for the chart
function createLables() {
    let xLabels = chartGroup.append('g')
                            .attr('class', 'xText')
                            .attr("transform", `translate(${chartWidth}, ${chartHeight})`);
    xLabels.append("text")
           .attr("x", 0)
           .attr("y", 20)
           .text('Poverty Rate');
    let yLabels = chartGroup.append('g')
                            .attr('class', 'yText')
                            .attr("transform", `translate(${chartHeight})`);
    yLabels.append("text")
           .attr('class', 'yText')
           .text('Obesity Rate');
};