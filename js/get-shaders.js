// http://stackoverflow.com/questions/19756313/webgl-initgl-is-not-defined
function getShader(gl, id) {
  var shaderScript = document.getElementById(id);
  var str = "";
  var k = shaderScript.firstChild;

  while (k) {
      if (k.nodeType == 3) {
          str += k.textContent;
      }
      k = k.nextSibling;
  }

  var shader;
  if (shaderScript.type == "x-shader/x-fragment") {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
      shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
      return null;
  }

  gl.shaderSource(shader, str);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(shader));
      return null;
  }

  return shader;
}


/**
 * Creates and compiles a shader.
 *
 * @param {!WebGLRenderingContext} gl The WebGL Context.
 * @param {string} shaderSource The GLSL source code for the shader.
 * @param {number} shaderType shader type, VERTEX_SHADER/FRAGMENT_SHADER.
 * @return {!WebGLShader} The shader.
 */
// function getShader(gl, shaderSource, shaderType) {
// // Create the shader object
// var shader = gl.createShader(shaderType);

// // Set the shader source code.
// gl.shaderSource(shader, shaderSource);

// // Compile the shader
// gl.compileShader(shader);

// // Check if it compiled
// // var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
// // if (!success) {
// //   // Something went wrong during compilation; get the error
// //   throw "could not compile shader:" + gl.getShaderInfoLog(shader);
// // }

// return shader;
// }
