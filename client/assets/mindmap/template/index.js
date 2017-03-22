

var $ = go.GraphObject.make;

import  ActionsSpots from '../actions';
import Flag from './flag';
import Text from './text';
import Rect from './rect';
import CheckICON from './checkbox';
import LineH from './lineH';


var Actions = ActionsSpots();


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

  myDiagram.toolManager.textEditingTool.defaultTextEditor = window.TextEditor;


var template = 
  $(go.Node, 'Auto',
    Rect,
    $(go.Panel, "Vertical",
      $(go.Panel, "Horizontal", {alignment: go.Spot.Left, padding: new go.Margin(0, 4) },
        CheckICON,
        Flag,
        Text(config)
      ),
      $(go.Panel, "Auto", {stretch: go.GraphObject.Horizontal},
        LineH(config)
      )
    ),
    // remember the locations of each node in the node data
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    // make sure text "grows" in the desired direction
    new go.Binding("locationSpot", "dir", function(d) { return Actions.spotConverter(d, false); })
  );



  // a node consists of some text with a line shape underneath
  myDiagram.nodeTemplate = template;

      

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
        $(go.TextBlock, "Comment(C)"),
        { click: function(e, obj) { Actions.addComment(); } }),

      $("ContextMenuButton",
        $(go.TextBlock, "New(N)"),
        { click: function(e, obj) { Actions.addNodeAndLink(); } }),

      $("ContextMenuButton",
        $(go.TextBlock, "Layout(L)"),
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
        $(go.TextBlock, "Bigger(B)"),
        { click: function(e, obj) { Actions.changeTextSize(obj, 1.1); } }),
      $("ContextMenuButton",
        $(go.TextBlock, "Smaller(S)"),
        { click: function(e, obj) { Actions.changeTextSize(obj, 1/1.1); } }),
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
          return config.lineWeight.selected;
        }),
        new go.Binding("stroke", "brush", function(d) {
          return d ? d : config.lineColor;
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
            return d ? d : config.fontColor;
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


  myDiagram.commandHandler.doKeyDown = function(e) {
    var e = myDiagram.lastInput;
    // The meta (Command) key substitutes for "control" for Mac commands
    var key = e.key;
    var shift = e.shift;
    // Quit on any undo/redo key combination:
    if(e.tab || key === "N") {
      Actions.addNodeAndLink();      
    }

    if(key === "L") {
      Actions.layoutSelection();
    }

    if(key === "B") {
      Actions.changeTextSize(null, 1.1);
    }
    if(key === "S") {
      Actions.changeTextSize(null, 1/1.1);
    }

    if(key === "C") {
      Actions.addComment();
    }
  
    // call base method with no arguments (default functionality)
    go.CommandHandler.prototype.doKeyDown.call(this);
  
  }
  return myDiagram;
}



function move(e, diagram) {
  // moves all selected parts in the specified direction
  var vdistance = 0;
  var hdistance = 0;
  // if control is being held down, move pixel by pixel. Else, moves by grid cell size    
  if (e.control || e.meta) {
    vdistance = 5;
    hdistance = 5;
  } else if (diagram.grid !== null) {
    var cellsize = diagram.grid.gridCellSize;
    hdistance = cellsize.width;
    vdistance = cellsize.height;
  }
  diagram.startTransaction("arrowKeyMove");

  diagram.selection.each(function(part) {
    if (e.key === "Up") {
      part.move(new go.Point(part.actualBounds.x, part.actualBounds.y - vdistance));
    } else if (e.key === "Down") {
      part.move(new go.Point(part.actualBounds.x, part.actualBounds.y + vdistance));
    } else if (e.key === "Left") {
      part.move(new go.Point(part.actualBounds.x - hdistance, part.actualBounds.y));
    } else if (e.key === "Right") {
      part.move(new go.Point(part.actualBounds.x + hdistance, part.actualBounds.y));
    }
  });
  diagram.commitTransaction("arrowKeyMove");
}

export default template;
