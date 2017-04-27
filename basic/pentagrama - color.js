vertexShaderText = 
[
'attribute vec2 vertPosition;',
'attribute vec3 colorPosition;',
'varying vec3 fragColor;',
'void main()',
'{',
'	gl_Position = vec4(vertPosition, 0.0, 1.0);',
'	fragColor = colorPosition;',
'}'
].join('\n');

fragmentShaderText = 
[
'precision mediump float;',
'varying vec3 fragColor;',
'void main()',
'{',
'	gl_FragColor = vec4(fragColor ,1.0);',
'}'
].join('\n');

var resize = function(canvas) {
    // Lookup the size the browser is displaying the canvas.
    var displayWidth  = canvas.clientWidth;
    var displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    if (canvas.width  != displayWidth ||
        canvas.height != displayHeight) {

      // Make the canvas the same size
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    };
}

var createShader = function(gl, type, source){
 		
 	var shader = gl.createShader(type);
 	gl.shaderSource(shader, source);
 	gl.compileShader(shader);
 	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
 		console.log("error compiling shader!", gl.getShaderInfoLog(shader));
 		return;
 	}
 	console.log("shadercriado");
 	return shader;
 };

var createProgram = function(gl, vertexShader, fragmentShader){

 	var program = gl.createProgram();
 	gl.attachShader(program, vertexShader);
 	gl.attachShader(program, fragmentShader);
 	gl.linkProgram(program);
 	var success = gl.getProgramParameter(program, gl.LINK_STATUS);
 	if(success){
 		console.log("criando programa");
 		return program;

 	}
 	console.log(gl.getProgramInfoLog());
 	gl.deleteProgram(program);

 };


var InitProg = function(){

	var canvas = document.getElementById("canvas");
	console.log("hello world");

	var gl = canvas.getContext('webgl');
	if(!gl){
		return;
	}
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	// criando os shaders
	var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderText);
	var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderText);

	//criando programa, attaching shaders, linking shaders
	
	var program = createProgram(gl, vertexShader, fragmentShader);

	//localizando os atributos
	var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	var colorAttribLocation = gl.getAttribLocation(program, 'colorPosition');
	gl.enableVertexAttribArray(positionAttribLocation);
	gl.enableVertexAttribArray(colorAttribLocation);
	// #### criando os pontos, indices e cores #####

	var points = [];
	for (var i = 0; i<5; i++){
		points.push(Math.sin((i*Math.PI*72)/180), Math.cos((i*Math.PI*72)/180));
		//points.push(Math.cos((i*Math.PI*72)/180));
		
	}

	var indices =[
		0, 3,
		0, 2,
		1, 4,
		1, 3,
		2, 4,
		0, 1,
		1, 2,
		2, 3,
		3, 4,
		4, 0
	];

	var lineColors = [
		1.0, 1.0, 0.3,	 	1.0, 1.0, 0.3,
		1.0, 1.0, 0.3, 		1.0, 1.0, 0.3,
		1.0, 1.0, 0.3, 		1.0, 1.0, 0.3,
		1.0, 1.0, 0.3, 		1.0, 1.0, 0.3,
		1.0, 1.0, 0.3, 		1.0, 1.0, 0.3,

		0.0, 0.8, 0.32, 	0.0, 0.8, 0.32,
		0.0, 0.8, 0.32, 	0.0, 0.8, 0.32,
		0.0, 0.8, 0.32, 	0.0, 0.8, 0.32,
		0.0, 0.8, 0.32, 	0.0, 0.8, 0.32,
		0.0, 0.8, 0.32, 	0.0, 0.8, 0.32		
	];

	


	//PONTOS
	var pointsBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

	//INDICES
	var indicesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

	//CORES
	var colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineColors), gl.STATIC_DRAW);

	//pointers
	gl.vertexAttribPointer( positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 0,0 );
	gl.vertexAttribPointer( colorAttribLocation, 3 , gl.FLOAT, gl.FALSE, 0, 0);

		
		
	gl.useProgram(program);
	gl.drawElements(gl.LINES, 20, gl.UNSIGNED_SHORT, 0);

	};