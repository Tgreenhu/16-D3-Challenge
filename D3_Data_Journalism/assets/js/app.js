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
let svg = d3.select("body")
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
      console.log(error);});

// Function to turn data into intergers
function rowConverter(row) {
    row.poverty = +row.poverty;
    row.obesity = +row.obesity;
    return row;};

// Function to create chart
function createChart(data) {
    let currentX = 'poverty';
    let currentY = 'obesity';
    let xMin;
    let xMax;
    let yMin;
    let yMax;
};

// Functions to get min/max's for both x & y axis to apply to chart creation
function getXDomain() {
    let xMin = d3.min(data, d => d[currentX]);
    let xMax = d3.max(data, d => d[currentX]);
    return [min, max];
};
function getYDomain() {
    let yMin = d3.min(data, d => d[currentY]);
    let yMax = d3.max(data, d => d[currentY]);
    return [min, max];
};

// Function to create the axis's for the chart
function createAxis(){
    // set scales for the axis's
    let xScale = d3.scaleLinear().domain(getXDomain).range([0, chartWidth]);
    let yScale = d3.scaleLinear().domain(getYDomain).range([0, chartHeight]);
    // create both axis's
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);
    // append the axis's to group elements for the chart
    chartGroup.append('g').call(yAxis).attr('class', 'y-axis')attr('transform', `translate(0, ${chartWidth})`);
    chartGroup.append('g').call(xAxis).attr('class', 'x-axis').attr('transform', `translate(0, ${chartHeight})`);
};

// Function to create the circles to plot on the chart
function createCircles(info) {
    let currentX = info.currentX;
    let currentY = info.currentY;
    let xScale = info.xScale;
    let yScale = info.yScale;
    chartGroup.selectAll('circle')
              .data(data)
              .enter()
              .append('circle')
              .attr('cx', d => xScale(d[currentX]))
              .attr('cy', d => yScale(d[currentY]))
              .attr('r', 10)
              .attr('fill', 'green')
              .attr('opacity', '.2');
              .attr('class', (d) => d.abbr);
};