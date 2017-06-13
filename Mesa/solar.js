var colors = {
	white: [1., 1., 1., 1.],
	black: [0., 0., 0., 1.],
	red: [1., 0., 0., 1.],
	blue: [0., 0., 1., 1.],
	green: [0., 1., 0., 1.],
	yellow: [1., 1., 0., 1.],
	cyan: [0., 1., 1., 1.],
	magent: [1., 0., 1., 1.]
};

function solar(prog, stack, state, primitive)
{
	let top = [];
	
	// Sol
	top = stack.push();

	mat4.rotateY(top, top, glMatrix.toRadian(state.sol));
	mat4.scale(top, top, [1.2, 1.2, 1.2]);
	gl.uniformMatrix4fv(prog.model, false, top);
	
	gl.uniform4fv(prog.color, colors.yellow);
	primitive.solid(primitive.sphere);
	gl.uniform4fv(prog.color, colors.black);
	primitive.wireframe(primitive.sphere);
	
	stack.pop();
	
	// Terra - Sat - Lua
	top = stack.push();

	mat4.rotateY(top, top, glMatrix.toRadian(state.trans_terra));
	mat4.translate(top, top, [3.5, 0, 0]);
	
	// Terra - Sat
	top = stack.push();
	mat4.rotateY(top, top, glMatrix.toRadian(state.rot_terra));
	
	// Terra
	top = stack.push();
	mat4.scale(top, top, [0.4, .4, .4]);
	gl.uniformMatrix4fv(prog.model, false, top);
	
	gl.uniform4fv(prog.color, colors.blue);
	primitive.solid(primitive.sphere);
	gl.uniform4fv(prog.color, colors.white);
	primitive.wireframe(primitive.sphere);
	stack.pop(); // Terra
	
	top = stack.top();
	mat4.rotateZ(top, top, glMatrix.toRadian(state.rot_sat));
	mat4.translate(top, top, [.6, 0, 0]);
	mat4.rotateX(top, top, glMatrix.toRadian(-90));
	mat4.scale(top, top, [.05, .05, .1]);
	gl.uniformMatrix4fv(prog.model, false, top);
	
	gl.uniform4fv(prog.color, colors.magent);
	primitive.solid(primitive.hollow_pyramid);
	stack.pop(); // Terra - Sat

	top = stack.top();
	mat4.rotateY(top, top, glMatrix.toRadian(state.rot_lua));
	mat4.translate(top, top, [1.1, 0, 0]);
	mat4.scale(top, top, [.2, .2, .2]);
	gl.uniformMatrix4fv(prog.model, false, top);
	
	gl.uniform4fv(prog.color, [.5, .5, .5, 1]);
	primitive.solid(primitive.sphere);
	gl.uniform4fv(prog.color, colors.white);
	primitive.wireframe(primitive.sphere);

	stack.pop(); // Terra - Sat - Lua
}

