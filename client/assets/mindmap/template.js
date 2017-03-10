var flag = 'M832 536v192q-181 -16 -384 -117v-185q205 96 384 110zM832 954v197q-172 -8 -384 -126v-189q215 111 384 118zM1664 491v184q-235 -116 -384 -71v224q-20 6 -39 15q-5 3 -33 17t-34.5 17t-31.5 15t-34.5 15.5t-32.5 13t-36 12.5t-35 8.5t-39.5 7.5t-39.5 4t-44 2 q-23 0 -49 -3v-222h19q102 0 192.5 -29t197.5 -82q19 -9 39 -15v-188q42 -17 91 -17q120 0 293 92zM1664 918v189q-169 -91 -306 -91q-45 0 -78 8v-196q148 -42 384 90zM320 1280q0 -35 -17.5 -64t-46.5 -46v-1266q0 -14 -9 -23t-23 -9h-64q-14 0 -23 9t-9 23v1266 q-29 17 -46.5 46t-17.5 64q0 53 37.5 90.5t90.5 37.5t90.5 -37.5t37.5 -90.5zM1792 1216v-763q0 -39 -35 -57q-10 -5 -17 -9q-218 -116 -369 -116q-88 0 -158 35l-28 14q-64 33 -99 48t-91 29t-114 14q-102 0 -235.5 -44t-228.5 -102q-15 -9 -33 -9q-16 0 -32 8 q-32 19 -32 56v742q0 35 31 55q35 21 78.5 42.5t114 52t152.5 49.5t155 19q112 0 209 -31t209 -86q38 -19 89 -19q122 0 310 112q22 12 31 17q31 16 62 -2q31 -20 31 -55z';


var $ = go.GraphObject.make;

import  ActionsSpots from './actions';

var Actions = ActionsSpots();

function getLineWidth(d, wordLineSpead) {
  if(d.indexOf('\n') > -1) {
      var maxLength = 0;
      d.split('\n').forEach(function(item) {
        var zhongwen = item.match(/[\u4e00-\u9fa5]/g);
        var length = zhongwen ? zhongwen.length + item.length : item.length;
        maxLength = Math.max(length, maxLength); 
      });
      return maxLength * wordLineSpead;
    } else {
      return d.length * wordLineSpead; 
    }
}

function template(config) {

  var hasCheckbox = config.hasCheckbox;

  var myDiagram =
    $(go.Diagram, config.id,
      {
        // when the user drags a node, also move/copy/delete the whole subtree starting with that node
        "commandHandler.copiesTree": true,
        "commandHandler.deletesTree": true,
        "draggingTool.dragsTree": true,
        initialContentAlignment: go.Spot.MiddleTop,  // center the whole graph
        "undoManager.isEnabled": true,
        initialAutoScale: go.Diagram.Uniform
      });

  // a node consists of some text with a line shape underneath
  myDiagram.nodeTemplate =
    $(go.Node, "Table",
      {"selectionAdorned": true, defaultAlignment: go.Spot.Left},
      $(go.Panel, 'Auto', {row: 0, column: 0, padding: 3},
        $(go.Shape, "circle", {
            fill: "#fff",
            width: hasCheckbox.size, 
            height: hasCheckbox.size, 
            strokeWidth: hasCheckbox.strokeWidth
          },
          new go.Binding('width', '', function(d) {
            return d.checkbox ? hasCheckbox.size : 0;
          }),
          new go.Binding('height', '', function(d) {
            return d.checkbox ? hasCheckbox.size : 0;
          }),
          new go.Binding('visible', '', function(d) {
            return d.checkbox ? true: false;
          }),
          new go.Binding('stroke', 'checked', function(d) {
            return d ? hasCheckbox.checkedColor : hasCheckbox.defaultColor;
          })
        ),
        $(go.TextBlock, {
          name: "text", 
          scale: 0.8
        },
        new go.Binding('visible', '', function(d) {
            return d.checkbox ? true: false;
        }),
        new go.Binding('stroke', 'checked', function(d) {
          return d ? hasCheckbox.checkedColor : hasCheckbox.defaultColor;
        }),
        new go.Binding('text', "checked", function(d) {
          return d ? '√' : '';
        })),
        {
          cursor: "pointer",
          click: function (e, obj) { Actions.changeCheckState(obj);}
        }
      ),
      $(go.Panel, "Horizontal", {row:0, column: 1, margin: 0, padding: 0},
        $(go.Shape, {geometryString: flag}, {angle: 180, stroke: 'red', width: 10, height: 10},

          new go.Binding('visible', '', function(d) {
            return d.flag ? true: false;
          }),
          new go.Binding('width', 'flag', function(d) {
            return d.size;
          }),
          new go.Binding('height', 'flag', function(d) {
            return d.size;
          }),
          new go.Binding('stroke', 'flag', function(d) {
            return d.color ? d.color : 'red'
          })
        )
      ),
      $(go.Panel, "Auto", { row: 0, column: 2, alignment: go.Spot.Left, margin: 2},
        $(go.TextBlock,
          {
            name: "text",
            editable: true
          },
          // remember not only the text string but the scale and the font in the node data
          new go.Binding("text", "text").makeTwoWay(),
          new go.Binding("scale", "scale").makeTwoWay(),
          new go.Binding("font", "font").makeTwoWay(),
          new go.Binding('stroke', 'fontColor', function(d) {
            return d ? d : config.defaultFontColor;
          }))
      ),
      $(go.Panel, 'Horizontal', {row: 1, column: 0, columnSpan: 3},
        $(go.Shape, "LineH",
          {
            stretch: go.GraphObject.Horizontal,
            //strokeWidth: config.lineWeight, 
            //height: config.lineWeight,
            // this line shape is the port -- what links connect with
            portId: "", fromSpot: go.Spot.LeftRightSides, toSpot: go.Spot.LeftRightSides
          },
          new go.Binding("stroke", "", function(d) {
            if(!d.brush) return config.defaultLineColor;
            return d.brush;
          }),
          new go.Binding('strokeWidth', '', function(d) {
            return config.lineWeight;
          }),
          new go.Binding("width", "", function(d) {  
            return getLineWidth(d.text, config.wordLineSpead);
          }),
          new go.Binding('height', "", function(d) {
            return config.lineWeight;
          }),
          // make sure links come in from the proper direction and go out appropriately
          new go.Binding("fromSpot", "dir", function(d) { return Actions.spotConverter(d, true); }),
          new go.Binding("toSpot", "dir", function(d) { return Actions.spotConverter(d, false); }))
      ),
      // remember the locations of each node in the node data
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      // make sure text "grows" in the desired direction
      new go.Binding("locationSpot", "dir", function(d) { return Actions.spotConverter(d, false); })
    )
      

  // selected nodes show a button for adding children
  myDiagram.nodeTemplate.selectionAdornmentTemplate =
    $(go.Adornment, "Spot",
      $(go.Panel, "Auto",
        // this Adornment has a rectangular blue Shape around the selected node
        $(go.Shape, { fill: null, stroke: "dodgerblue", strokeWidth: 3 }),
        $(go.Placeholder, { margin: new go.Margin(4, 4, 0, 4) })
      )
      /*// and this Adornment has a Button to the right of the selected node
      $("Button",
        {
          alignment: go.Spot.Right,
          alignmentFocus: go.Spot.Left,
          click: addNodeAndLink  // define click behavior for this Button in the Adornment
        },
        $(go.TextBlock, "+",  // the Button content
          { font: "bold 8pt sans-serif" })
      )*/
    );

  // the context menu allows users to change the font size and weight,
  // and to perform a limited tree layout starting at that node
  myDiagram.nodeTemplate.contextMenu = 
    $(go.Adornment, "Vertical",
      $("ContextMenuButton",
        $(go.TextBlock, "Comment"),
        { click: function(e, obj) { Actions.addComment(); } }),
      // $("ContextMenuButton",
      //   $(go.TextBlock, "Smaller"),
      //   { click: function(e, obj) { changeTextSize(obj, 1/1.1); } }),
      $("ContextMenuButton",
        $(go.TextBlock, "Layout"),
        {
          click: function(e, obj) {
              var adorn = obj.part;
              adorn.diagram.startTransaction("Subtree Layout");
              Actions.layoutTree(adorn.adornedPart);
              adorn.diagram.commitTransaction("Subtree Layout");
            }
        }
      ),
      $("ContextMenuButton", 
        $(go.TextBlock, "完成"), 
        {
          click: function(e, obj) { console.log(e, obj); }
        }
      )
    )


  // a link is just a Bezier-curved line of the same color as the node to which it is connected
  myDiagram.linkTemplate =
    $(go.Link,
      {
        curve: go.Link.Bezier,
        fromShortLength: -2,
        toShortLength: -2,
        selectable: false
      },
      $(go.Shape,
        {},
        new go.Binding('strokeWidth', '', function() {
          return config.lineWeight;
        }),
        new go.Binding("stroke", "brush", function(d) {
          return d ? d : config.defaultLineColor;
        }
      )
    )
  );

  myDiagram.nodeTemplateMap.add("Comment",
    $(go.Node,  // this needs to act as a rectangular shape for BalloonLink,
      { background: "transparent" },  // which can be accomplished by setting the background.

      $(go.Panel, "Auto",
      // this Adornment has a rectangular blue Shape around the selected node
        $(go.Shape, { figure: "File", fill: '#F7F6B0', stroke: "#fff", strokeWidth: 2}
        ),
        $(go.TextBlock, {editable: true},
        { margin: 3 },
          new go.Binding("text"),
          new go.Binding("scale", "scale").makeTwoWay(),
          new go.Binding("font", "font").makeTwoWay(),
          new go.Binding('stroke', 'fontColor', function(d) {
            return d ? d : config.defaultFontColor;
          })
        )
      ),
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify)
  ));


  // when the document is modified, add a "*" to the title and enable the "Save" button
  myDiagram.addDiagramListener("Modified", function(e) {
    var idx = document.title.indexOf("*");
    if (myDiagram.isModified) {
      if (idx < 0) document.title += "*";
    } else {
      if (idx >= 0) document.title = document.title.substr(0, idx);
    }
  });

  myDiagram.addDiagramListener("SelectionMoved", function(e) {
    myDiagram.selection.each(function(node) {
      if (node.data.parent !== 0) return; // Only consider nodes connected to the root
      Actions.updateNodeDirection(node);
      Actions.layoutTree(node);
    });
    myDiagram.selection.each(function(node) {
      if (node.data.key === 0) return;
      if (node.data.parent !== 0) {
        Actions.updateNodeDirection(node);
      } 
      Actions.shiftNodesToNewParent(node);
      Actions.layoutTree(node);
    })
  });


  myDiagram.commandHandler.doKeyDown = function() {
    var e = myDiagram.lastInput;
    // The meta (Command) key substitutes for "control" for Mac commands
    var key = e.key;
    var shift = e.shift;
    // Quit on any undo/redo key combination:
    if(shift) {
      Actions.addNodeAndLink();      
    }

    if(key === "L") {
      Actions.layoutSelection();
    }

    // call base method with no arguments (default functionality)
    go.CommandHandler.prototype.doKeyDown.call(this);
  
  }
  return myDiagram;
}

export default template;
