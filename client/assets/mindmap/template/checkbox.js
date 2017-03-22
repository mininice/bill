
import  ActionsSpots from '../actions';
const Actions = ActionsSpots();
const $ = go.GraphObject.make;


const CheckBox = $("CheckBox", "checked", {}, 
    new go.Binding('visible', '', function(d) {
        return d.checkbox ? true: false;
    }),
    {
      "_doClick": function(e, obj) {
        Actions.changeCheckState(obj);
      }
    }
  )

export default  CheckBox;
