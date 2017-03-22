
var flagStr = 'M832 536v192q-181 -16 -384 -117v-185q205 96 384 110zM832 954v197q-172 -8 -384 -126v-189q215 111 384 118zM1664 491v184q-235 -116 -384 -71v224q-20 6 -39 15q-5 3 -33 17t-34.5 17t-31.5 15t-34.5 15.5t-32.5 13t-36 12.5t-35 8.5t-39.5 7.5t-39.5 4t-44 2 q-23 0 -49 -3v-222h19q102 0 192.5 -29t197.5 -82q19 -9 39 -15v-188q42 -17 91 -17q120 0 293 92zM1664 918v189q-169 -91 -306 -91q-45 0 -78 8v-196q148 -42 384 90zM320 1280q0 -35 -17.5 -64t-46.5 -46v-1266q0 -14 -9 -23t-23 -9h-64q-14 0 -23 9t-9 23v1266 q-29 17 -46.5 46t-17.5 64q0 53 37.5 90.5t90.5 37.5t90.5 -37.5t37.5 -90.5zM1792 1216v-763q0 -39 -35 -57q-10 -5 -17 -9q-218 -116 -369 -116q-88 0 -158 35l-28 14q-64 33 -99 48t-91 29t-114 14q-102 0 -235.5 -44t-228.5 -102q-15 -9 -33 -9q-16 0 -32 8 q-32 19 -32 56v742q0 35 31 55q35 21 78.5 42.5t114 52t152.5 49.5t155 19q112 0 209 -31t209 -86q38 -19 89 -19q122 0 310 112q22 12 31 17q31 16 62 -2q31 -20 31 -55z';
var $ = go.GraphObject.make;
var flag = $(go.Shape, 
	{
		geometryString: flagStr
	}, 

	{
	  angle: 180, 
	  margin: 4, 
	  stroke: 'red', 
	  width: 10, 
	  height: 10
	},

	new go.Binding('visible', '', function(d) {
	  return d.flag ? true: false;
	}),
	new go.Binding('width', '', function(d) {
		d.scale = d.scale || 1;
	  return parseInt(d.scale * 10);
	}),
	new go.Binding('height', '', function(d) {
		d.scale = d.scale || 1;
	  return parseInt(d.scale * 10);
	}),
	new go.Binding('stroke', 'flag', function(d) {
	  return d.color ? d.color : 'red'
	})
);

export default flag