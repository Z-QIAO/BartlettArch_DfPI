module.exports = `
precision mediump float;
varying vec2 vUV;
uniform float uTime;
uniform vec3 uTranslate;
uniform vec3 uColor;

void main() {
  float dividend = 10000.0;
 gl_FragColor = vec4(uColor+((uTranslate/10.0) * .015 + .015)/20.0*cos(uTime), 1.0);
}`
