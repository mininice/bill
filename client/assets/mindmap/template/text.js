

var $ = go.GraphObject.make;

var Text = function(config) {
  return $(go.TextBlock,
    {
      name: "mytext",
      editable: true,
      minSize: new go.Size(30, 15),
      margin: new go.Margin(0, 4)
    },
    // remember not only the text string but the scale and the font in the node data
    new go.Binding("text", "text").makeTwoWay(),
    new go.Binding("scale", "scale").makeTwoWay(),
    new go.Binding("font", "font").makeTwoWay(),
    new go.Binding('stroke', 'fontColor', function(d) {
      return d ? d : config.fontColor;
    })
  )
};


export default Text

