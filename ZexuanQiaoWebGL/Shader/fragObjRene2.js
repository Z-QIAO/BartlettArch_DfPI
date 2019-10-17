module.exports = `
precision mediump float;
varying vec2 vUV;

uniform vec3 uTranslate;
uniform vec3 uColor;

void main() {
  float dividend = 3000.0;
  gl_FragColor = vec4(0.2+uTranslate.y/dividend,0.2+uTranslate.z/dividend/2.,0.2+uTranslate.x/dividend, 1.0);
}`
