
var $ = go.GraphObject.make;


var lineH = function(config) {

  return $(go.Shape, "LineH",
    {
      stretch: go.GraphObject.Horizontal,
      //height: 3,
      // this line shape is the port -- what links connect with
      portId: "", 
      fromSpot: go.Spot.LeftRightSides, 
      toSpot: go.Spot.LeftRightSides
    },
    new go.Binding('height', "", function(d) {
      return d.key === 0 ? 0 : config.lineWeight.selected;
    }),
    new go.Binding("stroke", "brush", function(d) {
      return d ? d : config.lineColor;
    }),
    new go.Binding('strokeWidth', '', function(d) {
      return config.lineWeight.selected;
    }),
    // make sure links come in from the proper direction and go out appropriately
    new go.Binding("fromSpot", "dir", function(d) { return spotConverter(d, true); }),
    new go.Binding("toSpot", "dir", function(d) { return spotConverter(d, false); })
  )
}

export default lineH;