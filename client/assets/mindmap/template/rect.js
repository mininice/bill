

var $ = go.GraphObject.make;

var Rect = $(go.Shape, "RoundedRectangle", 
   {
      parameter1: 5,  // the corner has a large radius
      fill: $(go.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" }),
      stroke: null,
      portId: "",  // this Shape is the Node's port, not the whole Node
      fromLinkable: true,
      fromLinkableSelfNode: true, 
      fromLinkableDuplicates: true,
      toLinkable: true, 
      toLinkableSelfNode: true, 
      toLinkableDuplicates: true,
      cursor: "pointer"
    },
    new go.Binding('visible', '', function(d) {
      return d.key === 0 ? true : false;
    })
);

export default Rect
