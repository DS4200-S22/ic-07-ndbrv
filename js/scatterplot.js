/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 

// Set dimensions and margins for plots 


const svg3 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

  d3.csv("data/scatter.csv").then((data3) => {

  console.log(data3)


// TODO: What does this code do? 
//Set values for y Scale
let maxY3 = d3.max(data3, function(d) { return d.score; });

// TODO: What does each line of this code do? 
//Create the yScale  
let yScale3 = d3.scaleLinear()
            .domain([0,maxY3])
            .range([height-margin.bottom,margin.top]); 

// TODO: What does each line of this code do?
//Create the xScale 
let xScale3 = d3.scaleBand()
            .domain(d3.range(data3.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// TODO: What does each line of this code do? 
//adds the yScale to the graph 
svg3.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale3)) 
   .attr("font-size", '20px'); 

// TODO: What does each line of this code do?
// shifts the scale and ands the ticks of the scale 
svg3.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale3) 
            .tickFormat(i => data3[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// TODO: What does each line of this code do?
//Adds a tooltip to the visualization
const tooltip3 = d3.select("#csv-scatter") 
                .append("div") 
                .attr('id', "tooltip3") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// TODO: What does each line of this code do?  
//This is the event handler for a mouseover event
const mouseover3 = function(event, d) {
  tooltip3.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// TODO: What does each line of this code do?
//This is the event handler for when the mouse moves 
const mousemove3 = function(event, d) {
  tooltip3.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// TODO: What does this code do? 
//This is the event handler for when the mouse leaves
const mouseleave3= function(event, d) { 
  tooltip3.style("opacity", 0); 
}

/* 

  Bars 

*/

// TODO: What does each line of this code do? 
//This puts all the above components together
svg3.selectAll(".circle") 
   .data(data3) 
   .enter()  
   .append("circle") 
     .attr("class", "circle")
     .attr("r",20) 
     .attr("cx", (d,i) => xScale3(i)) 
     .attr("cy", (d) => yScale3(d.score)) 
     .on("mouseover", mouseover3) 
     .on("mousemove", mousemove3)
     .on("mouseleave", mouseleave3);

     });








