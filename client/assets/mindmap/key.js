

var keyBoard = {
	ArrowLeft: "ArrowLeft",
	ArrowRight: 'ArrowRight',
	ArrowUp: 'ArrowUp',
	ArrowDown: 'ArrowDown'
}

function bodydelegate(diagram) {
	var text = null;
    $("body").keyup(function (e) {
		var textEditingTool = diagram.toolManager.textEditingTool;
	    if (e.key == "Tab") {// tab 
	    	if(TextEditor.tool && text) {
	    		TextEditor.tool.state = go.TextEditingTool.StateActive;
	      		TextEditor.tool.acceptText(go.TextEditingTool.Tab);
	      		TextEditor.hide(diagram, textEditingTool);
	    	}
	    } else if(e.shiftKey && e.keyCode == 13) { //enter
	  	 	var selection = diagram.selection.first();
	      	if(!selection) return;
		    text = selection.findObject('mytext');
		    TextEditor.show(text, diagram, textEditingTool);
      		textEditingTool.Wg = text;
		    textEditingTool.doActivate();

	    } else if(keyBoard[e.key]) {
	    	moveToNext(diagram, e.key);
	    }
	});
}


function moveToNext(diagram, direction) {
	var selection = diagram.selection.first();
	if(!selection) {
		selection = diagram.findNodeForKey(0);
	}

	var dir = getDir(diagram, selection);
	if(dir === 'left' && selection.data.key !== 0) {
		if(direction === 'ArrowRight' ) {
			direction = 'ArrowLeft';
		} else if(direction === 'ArrowLeft') {
			direction = 'ArrowRight';
		}
	}

	/*
	-左边找父节点
	-右边找第一个孩子
	－上下找相近的兄弟节点
	*/
	var next = null;
	if(direction === keyBoard.ArrowRight) {
		if(selection.data.key === 0) {
	 		next = findFirstChildren(selection, direction);
		} else {
			next = selection.findTreeChildrenNodes().first();
		}
 	} else if(direction === keyBoard.ArrowLeft) {
		var parent = selection.data.parent;
		if(selection.data.key === 0) {
			next = findFirstChildren(selection, direction);	
		} else {
			next = diagram.findNodeForKey(parent);
		}
	} else if(direction === keyBoard.ArrowUp || direction === keyBoard.ArrowDown) {
		next = findNextSibling(diagram, selection, direction);
	}

	if(next) {
  		selection.isSelected = false;
	  	next.isSelected = true;
	}

}

function getDir(diagram, node) {
  var nodeY = node.location.y;
  var nodeX = node.location.x;
  var rootX = diagram.findNodeForKey(0).location.x;

  return rootX < nodeX ? "right" : "left";
}

function findNextSibling(diagram, selection, direction) {
	if(selection.data.parent === undefined) return;
	var parent = diagram.findNodeForKey(selection.data.parent);
	var children = parent.findTreeChildrenNodes();

 	var index = 0;
 	var currentIndex = 0;
 	var currentObj = {};
 	children.each(function(item) {
 		currentObj[index] = item;
		if(item === selection) {
			currentIndex = index; 
		}
		index++
	});

 	if(direction === keyBoard.ArrowUp) {
 		return (currentIndex-1) < 0 ? currentObj[children.count-1] : currentObj[currentIndex-1];
 	} else {
 		return (currentIndex+1) > (children.count-1) ? currentObj[0] : currentObj[currentIndex+1];
 	}
}


function findFirstChildren(selection, direction) {
 	var it = selection.findTreeChildrenNodes();
 	var next = it.first();
 	while(it.next()) {
 		var val = it.value;
 		if(val.data.dir === 'left' && direction === keyBoard.ArrowLeft) {
 			next = val;
 			break;
 		}
 		if(val.data.dir === 'right' && direction === keyBoard.ArrowRight) {
 			next = val;
 			break;
 		}
 	}
 	return next;
}

function init(diagram) {
	bodydelegate(diagram);
}
export default init;