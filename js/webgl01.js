(function(){
  var gl,
      shaderProgram,
      vertices,
      matrix = mat4.create(),
      vertexCount = 30;

  initGL();
  createShaders();
  createVertices();
  draw();

  function initGL() {
    var canvas = document.getElementById("canvas");
    gl = canvas.getContext("webgl");// use experimental- prefix if not supported
    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1, 1, 1, 1);
  }

  function createShaders(){
    var vertexShader = getShader(gl, "shader-vs"); //, gl.VERTEX_SHADER
    console.log(getShader(gl, "shader-vs"));
    var fragmentShader = getShader(gl, "shader-fs"); //, gl.FRAGMENT_SHADER
    console.log(getShader(gl, "shader-vs"));

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
  }

  function createVertices(){
    vertices = [];
    var colors = [];
    for(var i = 0; i < vertexCount; i++) {
      vertices.push(Math.random() * 2 - 1);
      vertices.push(Math.random() * 2 - 1);
      vertices.push(Math.random() * 2 - 1);
      colors.push(Math.random());
      colors.push(Math.random());
      colors.push(Math.random());
      colors.push(1);
    }

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var coords = gl.getAttribLocation(shaderProgram, "coords");
    gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coords);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    var colorsLocation = gl.getAttribLocation(shaderProgram, "colors");
    gl.vertexAttribPointer(colorsLocation, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorsLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var pointSize = gl.getAttribLocation(shaderProgram, "pointSize");
    gl.vertexAttrib1f(pointSize, 20);

    // var color = gl.getUniformLocation(shaderProgram, "color");
    // gl.uniform4f(color, 0, 0, 0, 1);
  }

  function draw() {
    mat4.rotateX(matrix, matrix, -0.007);
    mat4.rotateY(matrix, matrix, 0.013);
    mat4.rotateZ(matrix, matrix, 0.01);

    var transformMatrix = gl.getUniformLocation(shaderProgram, "transformMatrix");
    gl.uniformMatrix4fv(transformMatrix, false, matrix);

    gl.clear(gl.COLOR_BUFFER_BIT);
  }

}());
