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
'	gl_FragColor = vec4(1.0,1.0,1.0 ,1.0);',
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
	//var colorAttribLocation = gl.getAttribLocation(program, 'colorPosition');
	gl.enableVertexAttribArray(positionAttribLocation);

	var circulo = [];
	for (var i = 0; i<100; i++){
		circulo.push(0.9*Math.sin((i*Math.PI*3.6)/180), 0.9*Math.cos((i*Math.PI*3.6)/180));	
	}
	var circuloBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, circuloBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(circulo), gl.STATIC_DRAW);
	gl.vertexAttribPointer( positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 0, 0);

	gl.useProgram(program);
	gl.drawArrays(gl.LINE_LOOP, 0, 100);

	var minutos  = [];
	for (var i = 0; i<60; i++){
		minutos.push(0.85*Math.sin((i*Math.PI*6)/180), 0.85*Math.cos((i*Math.PI*6)/180));
		minutos.push(0.80*Math.sin((i*Math.PI*6)/180), 0.80*Math.cos((i*Math.PI*6)/180));
	}
	var minutosBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, minutosBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(minutos), gl.STATIC_DRAW);
	gl.vertexAttribPointer( positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 0, 0);
	gl.useProgram(program)
	gl.drawArrays(gl.LINES, 0, 120);

	var horas  = [];
	for (var i = 0; i<12; i++){
		horas.push(0.75*Math.sin((i*Math.PI*30)/180), 0.75*Math.cos((i*Math.PI*30)/180));
		horas.push(0.60*Math.sin((i*Math.PI*30)/180), 0.60*Math.cos((i*Math.PI*30)/180));
	}

	var horasBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, horasBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(horas), gl.STATIC_DRAW);
	gl.vertexAttribPointer( positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 0, 0);
	gl.useProgram(program)
	gl.drawArrays(gl.LINES, 0, 24);


	var ponteiroHoraEMinuto = [
		-0.02, -0.02, 
		-0.02, 0.8, //MINUTO
		0.03, 0.8,
		-0.02, -0.02,
		0.02, 0.8,
		0.02, -0.02,

		0.0, 0.02,
		0.55, 0.02, //HORA
		0.0, -0.02,
		0.55, 0.02,
		0.0, -0.02,
		0.55, -0.02
	];

	var ponteiroHoraEMinutoBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, ponteiroHoraEMinutoBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ponteiroHoraEMinuto), gl.STATIC_DRAW);
	gl.vertexAttribPointer( positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 0, 0);
	gl.useProgram(program);
	gl.drawArrays(gl.TRIANGLES, 0, 12);

	var pointeiroSeg = [
		0.0, 0.0,
		0.0, -0.8
	];
	var ponteiroSegBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, ponteiroSegBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointeiroSeg), gl.STATIC_DRAW);
	gl.vertexAttribPointer( positionAttribLocation, 2, gl.FLOAT, gl.FALSE, 0, 0);
	gl.useProgram(program);
	gl.drawArrays(gl.LINES, 0, 2);
	};