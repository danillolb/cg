vertexShaderText = 
[
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'',
'attribute vec3 vertColor;',
'varying vec3 fragColor;',
'void main()',
'{',
'	gl_Position = vec4(vertPosition, 0.0, 1.0);',
'	fragColor = vertColor;',
'}'
].join('\n');

fragmentShaderText = 
[
'precision mediump float;',
'',
'varying vec3 fragColor;',
'void main()',
'{',
'	gl_FragColor = vec4(fragColor ,1.0);',
'}'
].join('\n');

var InitProg = function(){

	console.log("hello world");
	var canvas = document.getElementById('canvas', {antialias:true});
	
	var gl = canvas.getContext('webgl');
	if(!gl){
		console.log("you're now using the experimental webgl");
		gl.getContext('experimental-webgl');
	}
	if(!gl)	{
		alert("your browser does not support webgl at all");
	}
	// alterando a cor do canvas
	gl.clearColor(0.85, 0.8, 0.96, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	//criando os shaders

	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);

	gl.compileShader(vertexShader);
	if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
		console.log("Error on compiling vertex Shader!", gl.getShaderInfolog(vertexShader));
	}
	gl.compileShader(fragmentShader);
	if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
		console.log("Error on compiling fragment Shader!", gl.getShaderInfolog(fragmentShader));
	}
	// criando o program e adicionando os shaders nele
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);

	gl.linkProgram(program);
	if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
		console.log("Error on linking program!", gl.getProgramInfoLog(program));
	}
	gl.validateProgram(program);
	if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
		console.log("Error on validating program!", gl.getProgramInfoLog(program));
	}

	//criando os buffers

	//inputs for vertex
	var triangles = 
	[//triangulo 1
		-0.5, 0.5, 0.0, 0.6, 0.13,
		0.0, 0.5, 0.3, 0.8, 0.3,
		-0.25, 0.0, 0.7, 0.3, 0.66,
	//triangulo 2
		0.0, -0.5, 0.3, 0.8, 0.3,
		0.25, 0.0, 0.7, 0.3, 0.66,
		0.5, -0.5 , 0.0, 0.6, 0.13
	];

	var triangleVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangles), gl.STATIC_DRAW);

	var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
	gl.vertexAttribPointer(
		positionAttribLocation, //attribute location
		2, //number of elements per attribute
		gl.FLOAT, // Type of elements,
		gl.FALSE,
		5 * Float32Array.BYTES_PER_ELEMENT,// size of an individual vertex
		0 // offset from the beginning of a single vertex to this attribute
		);
	gl.vertexAttribPointer(
		colorAttribLocation, //attribute location
		3, //number of elements per attribute
		gl.FLOAT, // Type of elements,
		gl.FALSE,
		5 * Float32Array.BYTES_PER_ELEMENT,// size of an individual vertex
		2 * Float32Array.BYTES_PER_ELEMENT // offset from the beginning of a single vertex to this attribute
		);

	gl.enableVertexAttribArray(positionAttribLocation);
	gl.enableVertexAttribArray(colorAttribLocation);
	gl.useProgram(program);
	gl.drawArrays(gl.TRIANGLES, 0, 6);
};