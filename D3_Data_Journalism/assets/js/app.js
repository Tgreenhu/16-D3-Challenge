// Define SVG dimensions
let svgWidth = 960;
let svgHeight = 500;
let axisDelay = 2500;
let circleDely = 2500;
let margin = { top: 20, right: 40, bottom: 80, left: 100 };

// Calculate chart dimensions
let chartWidth = svgWidth - margin.left - margin.right;
let chartHeight = svgHeight - margin.top - margin.bottom;

// Create SVG wrapper & chart holder
let svg = d3.select("body")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);
let chartGroup = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);

/*******************************************************************************************************************/
// Read CSV data & call functions to create graph
d3.csv('./data/data.csv', rowConverter)
  .then(createChart)
  .catch(function (error) {
      console.log(error);});

// Function to turn data into intergers
function rowConverter(row) {
    row.poverty = +row.poverty;
    row.obesity = +row.obesity;
    return row;};

// Function to create chart based off of specific data & scales
function createChart(data) {
    console.table(data, ['abbr', 'poverty', 'obesity']);
    // store starting chart info
    let info = {
        data: data,
        currentX: 'poverty',
        currentY: 'obesity'};
    info.xScale = d3.scaleLinear().domain(getXDomain(info)).range([0, chartWidth]);
    info.yScale = d3.scaleLinear().domain(getYDomain(info)).range([0, chartHeight]);
    info.xAxis = d3.axisBottom(info.xScale);
    info.yAxis = d3.axisLeft(info.yScale);
    createAxis(info);
    createCircles(info);};

/*******************************************************************************************************************/
// Function to create the axix's for the chart
function createAxis(info){
    chartGroup.append('g').call(info.yAxis).attr('class', 'y-axis');
    chartGroup.append('g').call(info.xAxis).attr('class', 'x-axis').attr('transform', `translate(0, ${chartHeight})`);};

// Function to create the circles to plot on the chart
function createCircles(info) {
    let currentX = info.currentX;
    let currentY = info.currentY;
    let xScale = info.xScale;
    let yScale = info.yScale;
    chartGroup.selectAll('circle')
              .data(info.data)
              .enter()
              .append('circle')
              .attr('cx', d => xScale(d[x]))
              .attr('cy', d => yScale(d[y]))
              .attr('r', 10)
              .attr('fill', 'green')
              .attr('opacity', '.2');};

// Functions to get min/max's for both x & y axis to apply to chart creation
function getXDomain(info) {
    let min = d3.min(info.data, d => d[info.x]);
    let max = d3.max(info.data, d => d[info.x]);
    return [min, max];};
function getYDomain(info) {
    let min = 0;
    let max = d3.max(info.data, d => d[info.y]);};

/*******************************************************************************************************************/







