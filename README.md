# 16-D3-Challenge

In this assignment, we were tasked with creating a scatter plot using the Javascript library D3 from the data given to us in a CSV file.  For this assignment, I chose to plot the Poverty % vs Obesity % to test any correlation.

To start, I created a base index.html file to run on a live server to show the plot.  Along with this, CSS was created and added to customize the site for the user to easily view the content I provide.

Next, using Javascript I defined an SVG object to be added to the HTML and created the chart piece by piece:
    - Define chart dimensions
    - Append chart to HTML
    - Read the data using D3
    - Create chart scales & axis
    - Create chart labels
    - Append circles to scatter plot for each data point

The biggest difficulty I had was to append the state abbreviations to the circles.  In the code, you will see my last attempt that I could not get to work.  I will still be working on adding this in. 
