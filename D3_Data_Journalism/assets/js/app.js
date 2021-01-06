// Import Data
const data_file = './data/data.csv';

// Create SVG area 
const svgWidth = 600;
const svgHeight = 400;

// Define graph's margins
const graphMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30};

// Define the dimensions of the chart
const chartWidth = svgWidth - chartMargin.left - chartMargin.right;
const chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Append SVG area to our HTML
const svg = d3.select('body')
              .append('svg')
              .attr('width', svgWidth)
              .attr('height', svgHeight)

// Create a graph group & append a group element
const graphGroup = svg.append("g")
                      .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Read into the CSV file
