//Zexuan Qiao 2019 on dfpi

//no readme markdown here really, but this is my tribute to Rene Magritte's Golconda

// all the loading... As I got different shaders I need your help to clean them up next week!
const regl = require('regl')()
const strVertex = require(`./Shader/vertxObjRene.js`)
const strVertex2 = require(`./Shader/vertxObjRene2.js`)
const strFrag = require(`./Shader/fragObjRene.js`)
const strFrag2 = require(`./Shader/fragObjRene2.js`)
const strFrag3 = require(`./Shader/fragObjRene3.js`)
const glm = require('gl-matrix')
const loadObj = require('./utils/loadObj.js')
var mat4 = glm.mat4

//for view...
var projectionMatrix = mat4.create()
var fov = 75 * Math.PI / 180
var aspect = window.innerWidth / window.innerHeight
mat4.perspective(projectionMatrix, fov, aspect, 0.01, 10000.0)
var viewMatrix = mat4.create()
mat4.lookAt(viewMatrix, [0, 0, 2], [0, 0, 0], [0, 1, 0])

var currTime = 0



//mouse function lives here
var mouseX = 0
var mouseY = 0
window.addEventListener('mousemove', function(e) {
  var percentX = e.clientX / window.innerWidth
  var percentY = e.clientY / window.innerHeight
  percentX = percentX * 2 - 1
  percentY = percentY * 2 - 1
  var moveRange = 2
  mouseX = -percentX * moveRange
  mouseY = percentY * moveRange
})

//sky and the animation
const clear = () => {
  regl.clear({
    color: [0.12 * Math.cos(currTime) + 0.4, 0.25 * Math.cos(currTime) + 0.4, 0.2 * Math.cos(currTime) + 0.6, 1]
  })
}

//loading different models and functions on them

var drawObj;
var drawObj1;
var drawObj2;
var drawObj3;

//this two are for the House

loadObj("./assets/House1.obj", function(obj) {
  console.log('Model loaded', obj)
  const attributes = {
    aPosition: regl.buffer(obj.positions),
    aUV: regl.buffer(obj.uvs)
  }
  drawObj = regl({
    uniforms: {
      uTime: regl.prop('time'),
      uProjectionMatrix: regl.prop('uProjectionMatrix'),
      uViewMatrix: regl.prop('view'),
      uTranslate: regl.prop('uTranslate'),
      uColor: regl.prop('color')
    },
    frag: strFrag,
    vert: strVertex,
    attributes: attributes,
    count: obj.count,
  })
})

loadObj("./assets/House2.obj", function(obj) {
  console.log('Model loaded', obj)
  const attributes = {
    aPosition: regl.buffer(obj.positions),
    aUV: regl.buffer(obj.uvs)
  }
  drawObj1 = regl({
    uniforms: {
      uTime: regl.prop('time'),
      uProjectionMatrix: regl.prop('uProjectionMatrix'),
      uViewMatrix: regl.prop('view'),
      uTranslate: regl.prop('uTranslate'),
      uColor: regl.prop('color')
    },
    frag: strFrag,
    vert: strVertex,
    attributes: attributes,
    count: obj.count,
  })
})

//this is the flying men part
loadObj("./assets/Man.obj", function(obj) {
  console.log('Model loaded', obj)
  const attributes = {
    aPosition: regl.buffer(obj.positions),
    aUV: regl.buffer(obj.uvs)
  }
  drawObj2 = regl({
    uniforms: {
      uTime: regl.prop('time'),
      uProjectionMatrix: regl.prop('uProjectionMatrix'),
      uViewMatrix: regl.prop('view'),
      uTranslate: regl.prop('uTranslate'),
      uColor: regl.prop('color')
    },
    frag: strFrag2,
    vert: strVertex2,
    attributes: attributes,
    count: obj.count,
  })
})

//the very boring ground I think I shoud just draw two triangles, but I am lazy (I don't want to creat another Vertex Shader!)
loadObj("./assets/Ground.obj", function(obj) {
  console.log('Model loaded', obj)
  const attributes = {
    aPosition: regl.buffer(obj.positions),
    aUV: regl.buffer(obj.uvs)
  }
  drawObj3 = regl({
    uniforms: {
      uTime: regl.prop('time'),
      uProjectionMatrix: regl.prop('uProjectionMatrix'),
      uViewMatrix: regl.prop('view'),
      uTranslate: regl.prop('uTranslate'),
      uColor: regl.prop('color')
    },
    //I still need the third FragShad I need help here to reduce!
    frag: strFrag3,
    vert: strVertex,
    attributes: attributes,
    count: obj.count,
  })
})

//here is the render and camera trigging three objs as well, got some help from Connie!
function render() {
  currTime += 0.01
  mat4.lookAt(viewMatrix, [mouseX, mouseY - 1, 7], [0, 0, 0], [0, 1, 0])

  clear()
  var globalmove = 85
  if (drawObj != undefined) {
    var i = j = k = 0
    var numX = 6
    var numY = 1
    var numZ = 1
    for (var i = -5; i < numX; i++) {
      for (var j = -1; j < numY; j++) {
        for (var k = -4; k < numZ; k++) {
          var obj = {
            time: currTime,
            uProjectionMatrix: projectionMatrix,
            view: viewMatrix,
            uTranslate: [i * globalmove, -globalmove / 2, k * globalmove],
            color: [.60, .0, .0]
          }
          drawObj(obj)
        }
      }
    }
  }

  if (drawObj1 != undefined) {
    var i = j = k = 0
    var numX = 6
    var numY = 1
    var numZ = 1
    for (var i = -5; i < numX; i++) {
      for (var j = -1; j < numY; j++) {
        for (var k = -4; k < numZ; k++) {
          var obj = {
            time: currTime,
            uProjectionMatrix: projectionMatrix,
            view: viewMatrix,
            uTranslate: [i * globalmove, -globalmove / 2, k * globalmove],
            color: [.750, .70, .70]
          }
          drawObj1(obj)
        }
      }
    }
  }

  if (drawObj2 != undefined) {
    var i = j = k = 0
    var numX = 1
    var numY = 4
    var numZ = 4
    for (var i = -4; i < numX; i++) {
      for (var j = 0; j < numY; j++) {
        for (var k = -4; k < numZ; k++) {
          var obj = {
            time: currTime,
            uProjectionMatrix: projectionMatrix,
            view: viewMatrix,
            uTranslate: [i * globalmove, j * globalmove + 10, k * globalmove],
            color: [.10, .10, .10]
          }
          drawObj2(obj)
        }
      }
    }
  }

  if (drawObj3 != undefined) {
    var numX = 3
    var numY = 1
    for (var i = -3; i < numX; i++) {
      for (var j = -3; j < numY; j++) {
        var obj = {
          time: currTime,
          uProjectionMatrix: projectionMatrix,
          view: viewMatrix,
          uTranslate: [i * globalmove, -60, j * globalmove * 2],
          color: [.37250, .350, .350]
        }
        drawObj3(obj)
      }
    }
  }
  traced = false;

  window.requestAnimationFrame(render)
}
render()
// this is my bottom line :)
