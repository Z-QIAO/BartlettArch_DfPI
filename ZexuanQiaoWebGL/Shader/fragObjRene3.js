module.exports = `
precision mediump float;
varying vec2 vUV;

uniform vec3 uTranslate;
uniform vec3 uColor;

void main() {
 gl_FragColor = vec4(uColor, 1.0);
}`
