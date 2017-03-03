

var myDiagram = null;

function actions(diagram) {
  myDiagram = diagram;
}

export default {
  setConfig: setConfig,
  addComment: addComment,
  changeSelectionsProperty: changeSelectionsProperty,
  changeCheckState: changeCheckState,
  spotConverter: spotConverter,
  layoutTree: layoutTree,


}


function spotConverter(dir, from) {
  if (dir === "left") {
    return (from ? go.Spot.Left : go.Spot.Right);
  } else {
    return (from ? go.Spot.Right : go.Spot.Left);
  }
}


function changeCheckState(obj, checked) {
  var part = obj.part;
  checked = checked !== undefined  ? checked : !part.data.checked;
  part.diagram.model.setDataProperty(part.data, "checked", checked);

  console.log(part);
  // gives us an iterator of the child nodes related to this particular node
  if(checked) {
      var chl = part.findTreeChildrenNodes(); 
      while(chl.next()) {
        changeCheckState(chl.value, checked);
      }
  } else {
      var parents = part.findTreeParentNode();
      if(parents) {
        changeCheckState(parents, false);
      }
  }
}


//改变文字大小
function changeTextSize(obj, factor) {
  var adorn = obj.part;
  adorn.diagram.startTransaction("Change Text Size");
  var scale = adorn.data.scale || 1;
  adorn.diagram.model.setDataProperty(adorn.data, "scale", scale * factor);
  adorn.diagram.commitTransaction("Change Text Size");
}

//moved的时候改变自节点布局和方向
function updateNodeDirection(node, dir) {
  var nodeY = node.location.y;
  var nodeX = node.location.x;
  var rootX = myDiagram.findNodeForKey(0).location.x;

  var dir = dir || (rootX < nodeX ? "right" : "left");
  var loc = parseInt(nodeX) + " " + parseInt(nodeY);

  myDiagram.model.setDataProperty(node.data, "loc", loc);
  myDiagram.model.setDataProperty(node.data, "dir", dir);

  // recursively update the direction of the child nodes

  var chl = node.findTreeChildrenNodes(); // gives us an iterator of the child nodes related to this particular node
  while(chl.next()) {
    updateNodeDirection(chl.value, dir);
  }
}


//新增节点
function addNodeAndLink(e, obj) {
  addNodeFromSelection();
}

//新增评论
function addComment() {
  return addNodeFromSelection('comment');
}


function addNodeFromSelection(type, obj) {
  var part = getSelectionNode();
  if(!part) return;
  var olddata = part.data;
  var brush = olddata.brush || config.defaultLineColor;
  var newdata = { text: "New Node", brush: brush, dir: olddata.dir, parent: olddata.key};
  if(type === 'comment') {
    newdata.category = "Comment";
    newdata.text = 'New Comment'
  }
  part.diagram.startTransaction("Add" + type);
  part.diagram.model.addNodeData(newdata);
  layoutTree(part);
  part.diagram.commitTransaction('Add Comment');
}


function getSelectionNode() {
  if(myDiagram.selection.size > 1) {
    alert("请选择一个节点添加备注!");
    return null;
  }
  if(myDiagram.selection.size === 1) {
    var iterator = myDiagram.selection.iterator;
    while(iterator.next()) {
      return iterator.value.part;
    }
  } else {
    return null;
  }
}


//布局子节点
function layoutTree(node) {
  if (node.data.key === 0) {  // adding to the root?
    layoutAll();  // lay out everything
  } else {  // otherwise lay out only the subtree starting at this parent node
    var parts = node.findTreeParts();
    layoutAngle(parts, node.data.dir === "left" ? 180 : 0);
  }
}

function layoutAngle(parts, angle) {
  var layout = go.GraphObject.make(go.TreeLayout, {
      angle: angle,
      arrangement: go.TreeLayout.ArrangementFixedRoots,
      nodeSpacing: 5,
      layerSpacing: 20,
      setsPortSpot: false, // don't set port spots since we're managing them with our spotConverter function
      setsChildPortSpot: false 
  });
  layout.doLayout(parts);
}

function layoutAll() {
  var root = myDiagram.findNodeForKey(0);
  if (root === null) return;
  myDiagram.startTransaction("Layout");
  // split the nodes and links into two collections
  var rightward = new go.Set(go.Part);
  var leftward = new go.Set(go.Part);
  root.findLinksConnected().each(function(link) {
      var child = link.toNode;
      if (child.data.dir === "left") {
        leftward.add(root);  // the root node is in both collections
        leftward.add(link);
        leftward.addAll(child.findTreeParts());
      } else {
        rightward.add(root);  // the root node is in both collections
        rightward.add(link);
        rightward.addAll(child.findTreeParts());
      }
  });
  // do one layout and then the other without moving the shared root node
  layoutAngle(rightward, 0);
  layoutAngle(leftward, 180);
  myDiagram.commitTransaction("Layout");
}

// Show the diagram's model in JSON format
function save() {
  var model = myDiagram.model.toJson();
  myDiagram.isModified = false;
  console.log(model);
}

function load() {
  myDiagram.model = go.Model.fromJson(JSON.parse(myDiagram.modelStr));
}

function changeSelectionsProperty(p, value) {
  if(myDiagram.selection.size >= 1) {
    var iterator = myDiagram.selection.iterator;
    while(iterator.next()) {
      var item = iterator.value;
      var part = item.part;
      part.diagram.model.setDataProperty(part.data, p, value);
    }
  }
}


function setConfig(p, value) {
  myDiagram.config[p] = value
}