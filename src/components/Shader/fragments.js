const glsl = `
#define t iTime
mat2 m(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

float map(vec3 p) {
  p.xz *= m(t * 0.4);
  p.xy *= m(t * 0.3);
  vec3 q = p * 1.25 + t;
  return length(p + vec3(sin(t * 0.7))) * log(length(p) + 0.5) + sin(q.x + sin(q.z + sin(q.y))) * 0.5 - 1.0;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {	
	vec2 p = fragCoord.xy / iResolution.y - vec2(1.1, 0.55);
  vec3 cl = vec3(0.7, 0.2, 1.0);
  float d = 5.0;

  for(int i = 0; i <= 4; i++)	{
		vec3 p = vec3(0.0, 0.0, 5.0) + normalize(vec3(p, -0.8)) * d;
    float rz = map(p);
		float f = clamp((rz - map(p + 0.1)) * 0.5, -0.1, 1.0);
    vec3 l = vec3(0.1, 0.2, 0.45) + vec3(5.0, 2.5, 3.0) * f;
    cl = cl * l + smoothstep(2.5, 0.0, rz) * 0.7 * l;
		d += min(rz, 1.0);
	}
  
  fragColor = vec4(cl, 1.0);
}
`

export default glsl