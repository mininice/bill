
export default function tree(selector, hasCheckbox) {

  var margin = {top: 30, right: 20, bottom: 30, left: 20},
      width = 960 - margin.left - margin.right,
      barHeight = 20,
      barWidth = width * .8;

  var i = 0,
      duration = 400,
      root;

  var tree = d3.layout.tree()
      .nodeSize([0, 20]);

  var diagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.y, d.x]; });

  var svg = d3.select(selector).append("svg")
      .attr("width", width + margin.left + margin.right)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.json("learn.json", function(error, flare) {
    if (error) throw error;

    flare.x0 = 0;
    flare.y0 = 0;
    update(root = flare);
  });

  function update(source) {

    // Compute the flattened node list. TODO use d3.layout.hierarchy.
    var nodes = tree.nodes(root);

    var height = Math.max(500, nodes.length * barHeight + margin.top + margin.bottom);
    console.log(height);

    d3.select("svg").transition()
        .duration(duration)
        .attr("height", height);

    d3.select(self.frameElement).transition()
        .duration(duration)
        .style("height", height + "px");

    // Compute the "layout".
    nodes.forEach(function(n, i) {
      n.x = i * barHeight + 20;
    });

    // Update the nodes…
    var node = svg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });

    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
        .style("opacity", 1e-6);


    var textX = 10;

    if(hasCheckbox) {
      // Enter any new nodes at the parent's previous position.
      nodeEnter.append("rect")
        .attr("y", -3)
        .attr('x', 14)
        .attr("height", 8)
        .attr("width", 8)
        .style("fill", color)
        .on("click", toggleChecked);
    
      nodeEnter.append('path')
        .attr('d', 'M15,-2L17,3L21,-2')   //lineFunction(lineData))
        .attr('stroke', 'red')
        .attr('stroke-width', '1')
        .attr('fill', '#fff')
        .on('click', toggleChecked)

        textX = 26;

    } 
   
    nodeEnter.append('circle')
      .attr('r', 4)
      .attr('cx', 4)
      .attr('cy', 0)
      .attr('stroke', '#ddd')
      .attr('stroke-width', '1')
      .style('fill', 'blue')
      .on("click", toggleExpand);

    nodeEnter.append("text")
        .attr("dy", 3.5)
        .attr("dx", textX)
        .text(function(d) { return d.name; })

    
    


    // Transition nodes to their new position.
    nodeEnter.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
        .style("opacity", 1);

    node.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
        .style("opacity", 1)
        .select("rect")
        .style("fill", color);

    // Transition exiting nodes to the parent's new position.
    node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
        .style("opacity", 1e-6)
        .remove();

    // Update the links…
    var link = svg.selectAll("path.link")
        .data(tree.links(nodes), function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
          var o = {x: source.x0, y: source.y0};
          return diagonal({source: o, target: o});
        })
      .transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition links to their new position.
    link.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = {x: source.x, y: source.y};
          return diagonal({source: o, target: o});
        })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

 
  function toggleChecked(d) {
      console.log(d);
  }


  // Toggle children on click.
  function toggleExpand(d) {
    console.log(d)
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update(d);
  }

  function color(d) {
    return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
  }
}