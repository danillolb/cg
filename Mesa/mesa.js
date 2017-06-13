var colors = {
	white: [1., 1., 1., 1.],
	black: [0., 0., 0., 1.],
	red: [1., 0., 0., 1.],
	blue: [0., 0., 1., 1.],
	green: [0., 1., 0., 1.],
	yellow: [1., 1., 0., 1.],
	cyan: [0., 1., 1., 1.],
	magent: [1., 0., 1., 1.],
	brown: [0.647059, 0.164706, 0.164706, 1.0]
};

function mesa(prog, stack, state, primitive)
{
	let top = [];
	
	//a mesa tá rodando pra testar
	top = stack.push();
		mat4.rotateX(top, top, glMatrix.toRadian(state.sol));
		
		// Base
		top = stack.push();
			mat4.scale(top, top, [1.5 , .1, 1.5]);
			gl.uniformMatrix4fv(prog.model, false, top);
			
			gl.uniform4fv(prog.color, colors.brown);
			primitive.solid(primitive.cube);
			gl.uniform4fv(prog.color, colors.yellow);
			primitive.wireframe(primitive.cube);	
		top = stack.pop();

		// Perna 1
		top = stack.push();
			//metade da diagonal do quadrado a raiz de 2 sobre 2 , 
			mat4.translate(top, top, [1.3, -1.5, 1.3]);
			mat4.rotateX(top, top, glMatrix.toRadian(90));
			mat4.scale(top, top, [.2 , .2, 1.5]);
			gl.uniformMatrix4fv(prog.model, false, top);
			
			gl.uniform4fv(prog.color, colors.brown);
			primitive.solid(primitive.cube);
			gl.uniform4fv(prog.color, colors.yellow);
			primitive.wireframe(primitive.cube);	
		top = stack.pop();

		// Perna 2
		top = stack.push();
			mat4.translate(top, top, [-1.3, -1.5, 1.3]);
		    mat4.rotateX(top, top, glMatrix.toRadian(90));
			mat4.scale(top, top, [.2 , .2, 1.5]);
			gl.uniformMatrix4fv(prog.model, false, top);
			
			gl.uniform4fv(prog.color, colors.brown);
			primitive.solid(primitive.cube);
			gl.uniform4fv(prog.color, colors.yellow);
			primitive.wireframe(primitive.cube);	
		top = stack.pop();

		// Perna 3
		top = stack.push();
			mat4.translate(top, top, [1.3, -1.5, -1.3]);
		    mat4.rotateX(top, top, glMatrix.toRadian(90));
			mat4.scale(top, top, [.2 , .2, 1.5]);
			gl.uniformMatrix4fv(prog.model, false, top);
			
			gl.uniform4fv(prog.color, colors.brown);
			primitive.solid(primitive.cube);
			gl.uniform4fv(prog.color, colors.yellow);
			primitive.wireframe(primitive.cube);	
		top = stack.pop();

		// Perna 4
		top = stack.push();
			mat4.translate(top, top, [-1.3, -1.5, -1.3]);
		    mat4.rotateX(top, top, glMatrix.toRadian(90));
			mat4.scale(top, top, [.2 , .2, 1.5]);
			gl.uniformMatrix4fv(prog.model, false, top);
			
			gl.uniform4fv(prog.color, colors.brown);
			primitive.solid(primitive.cube);
			gl.uniform4fv(prog.color, colors.yellow);
			primitive.wireframe(primitive.cube);	
		top = stack.pop();

		// OBJETO 1
		top = stack.push();
			mat4.translate(top, top, [0.4, .5, 0.3]);
			mat4.rotateX(top, top, glMatrix.toRadian(-90));
			mat4.scale(top, top, [.2 , .2, 0.5]);
			gl.uniformMatrix4fv(prog.model, false, top);
			
			gl.uniform4fv(prog.color, colors.magent);
			primitive.solid(primitive.hollow_cone);
			gl.uniform4fv(prog.color, colors.black);
			primitive.wireframe(primitive.hollow_cone);	
		top = stack.pop();

		// OBJETO 2
		top = stack.push();
			mat4.translate(top, top, [-0.4, .5, 0.3]);
			mat4.rotateX(top, top, glMatrix.toRadian(-90));
			mat4.scale(top, top, [.4 , .4, 0.4]);
			gl.uniformMatrix4fv(prog.model, false, top);
			
			gl.uniform4fv(prog.color, colors.green);
			primitive.solid(primitive.sphere);
			gl.uniform4fv(prog.color, colors.black);
			primitive.wireframe(primitive.sphere);	
		top = stack.pop();

		// OBJETO 3
		top = stack.push();
			mat4.translate(top, top, [0.4, .5, -0.8]);
			mat4.rotateX(top, top, glMatrix.toRadian(-90));
			mat4.scale(top, top, [.4 , .4, 0.6]);
			gl.uniformMatrix4fv(prog.model, false, top);
			
			gl.uniform4fv(prog.color, colors.blue);
			primitive.solid(primitive.hollow_cone);
			gl.uniform4fv(prog.color, colors.black);
			primitive.wireframe(primitive.hollow_cone);	
		top = stack.pop();






	stack.pop();
	
	
}

