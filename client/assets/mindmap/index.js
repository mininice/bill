import Actions from './actions';
import Template from './template';



function mindmap(config, model) {
  var diagram = Template(config);
  var modelStr = JSON.stringify(model);
  diagram.modelStr = modelStr;
  diagram.config = config;
  diagram.model = go.Model.fromJson(model);
  diagram.actions = Actions(diagram);
  return diagram;
}


export default mindmap;