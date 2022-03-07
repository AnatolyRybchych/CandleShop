window.addEventListener("load", (ev) => {
    (async () => { 
        var canvases:HTMLCollectionOf<HTMLCanvasElement> = 
        <HTMLCollectionOf<HTMLCanvasElement>> document.getElementsByClassName("candle_fire");
    
        var fires:Fire[] = []; 
    
        for(var i = 0; i < canvases.length; i++){
            fires.push(new Fire(canvases[i]));  
        }
    
        setInterval(() =>{
            fires.forEach((fire)=>{
                fire.Draw();
            })
        }, 100);  
    })();
});


class Fire{
    private canvas:HTMLCanvasElement;
    private gl:WebGLRenderingContext;

    private static vert:WebGLShader;
    private static frag:WebGLShader;
    private static prog:WebGLProgram;

    private static buffer:WebGLBuffer;

    private static Attribute_VertPos;
    private static Uniform_time;

    constructor(canvas:HTMLCanvasElement) {
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl");

        Fire.InitShaders(this.gl);
        Fire.InitBuffers(this.gl);

        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        

    }

    public Draw():void{
        this.gl.clearColor(0.019,0,0,1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.useProgram(Fire.prog);
        var now:Date = new Date();
        var time:number = now.getMinutes() * 60 + now.getSeconds() + now.getMilliseconds()/1000;

        this.gl.uniform1f(Fire.Uniform_time, time);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, Fire.buffer);
        this.gl.enableVertexAttribArray(Fire.Attribute_VertPos);
        this.gl.vertexAttribPointer(Fire.Attribute_VertPos, 2, this.gl.FLOAT, false, 0, 0);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);


    }

    private static InitBuffers(gl:WebGLRenderingContext):void{
        if(Fire.buffer == undefined){
            Fire.buffer = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, Fire.buffer);

            var data:Float32Array = new Float32Array(
                [
                     1.0,   -1.0, 
                    -1.0,    1.0,
                     1.0,    1.0,
                     1.0,   -1.0,
                    -1.0,    1.0,
                    -1.0,   -1.0,
                ]);

            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);            
        }
    }

    private static InitShaders(gl:WebGLRenderingContext):void{
        if(Fire.vert == undefined){
            Fire.vert = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(Fire.vert, Fire.vert_source);
            gl.compileShader(Fire.vert);

            if(!gl.getShaderParameter(Fire.vert, gl.COMPILE_STATUS)){
                console.log("Vrtex shader:\n" + gl.getShaderInfoLog(Fire.vert));

                Fire.vert = undefined;
            }
        }
        
        if(Fire.frag == undefined){
            Fire.frag = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(Fire.frag, Fire.frag_source);
            gl.compileShader(Fire.frag);

            if(!gl.getShaderParameter(Fire.frag, gl.COMPILE_STATUS)){
                console.log("Fragment shader:\n" + gl.getShaderInfoLog(Fire.frag));

                Fire.frag = undefined;
            }
        }

        if(Fire.prog == undefined){
            if(Fire.vert == undefined){
                console.log("Shader program:\nVertex shader is not not compiled");
            }
            if(Fire.frag == undefined){
                console.log("Shader program:\nFragment shader is not not compiled");
            }
            if(Fire.vert == undefined || Fire.frag == undefined){
                return;
            }

            Fire.prog = gl.createProgram();
            gl.attachShader(Fire.prog, Fire.vert);
            gl.attachShader(Fire.prog, Fire.frag);
            gl.linkProgram(Fire.prog);

            if(!gl.getProgramParameter(Fire.prog, gl.LINK_STATUS)){
                console.log("Shader program:\n" + gl.getProgramInfoLog(Fire.prog));

                Fire.prog = undefined;
            }
            Fire.Attribute_VertPos = gl.getAttribLocation(Fire.prog, "VertPos");
            Fire.Uniform_time = gl.getUniformLocation(Fire.prog, "time");
        }
    }




    private static vert_source = 
    `
    attribute vec4 VertPos;
    varying vec2 FragPos;
    varying vec2 uv;
    
    
    void main() {
        gl_Position = VertPos;
        FragPos = VertPos.xy;
        uv = (FragPos + 1.0) / 2.0;
    }
    `;
    private static frag_source = 
    `
    precision mediump float;
    varying vec2 FragPos;
    varying vec2 uv;
    
    uniform float time;
    
    
    #define PI 3.14159265358979323846
    
    float cnoise(vec2 P);
    float snoise(vec2 v);
    float noise(float p);
    float noise(vec2 n);
    
    vec4 permute(vec4 x);
    vec3 permute(vec3 x);
    vec2 fade(vec2 t);
    float rand(vec2 c);
    float rand(float n);
    float clampf(float src);
    
    
    void main() {
    
        vec2 cur_uv = uv;
    
        float snoise_value = clampf(snoise(cur_uv * 0.2 + vec2(0, -time)));
    
        float a =  snoise_value * 0.5;
    
        a += clampf(noise(cur_uv * 2.0 + vec2(0, -time)));
    
        a += clampf(cnoise(cur_uv * 4.0 + vec2(0, -time)));
    
        a += clampf(cnoise(cur_uv * 4.0 + vec2(0, -time * 4.0)));
    
        a *= pow(1.5 - distance(uv, vec2(0.5, 0.1)), 5.0);
    
        a *= 1.0 - abs(FragPos.x * 3.0);
        a = clampf(a);
    
        if(FragPos.y < -0.2)
        {
            a *= 1.2 +  FragPos.y ; 
            if(FragPos.y < -0.8)
            {
                a *= (1.0 + FragPos.y) * 5.0; 
            }
        }
        a = clampf(a);
    
        float glow = 1.2 - distance(vec2(0.0, -0.2), FragPos * vec2(1.8 + pow(FragPos.y, 2.0), 0.5 * FragPos.y));
        glow *= snoise_value * 0.2 + 0.5;
    
        a = max(a, glow);
        a = pow(a, 0.7);
    
        float smoothh = 1.0;
        if(abs(FragPos.y) > 0.8)
        {
            smoothh  = 1.0 -(abs(FragPos.y) - 0.8) * 5.0;
        }
    
        vec4 result = vec4(a ,  a - 0.25  , 0.1, a * pow(smoothh, 0.5));
    
        result.rgb *= 2.8 * (1.0 - abs(FragPos.x)) * (1.0 - abs(FragPos.y * 0.5 + 0.5));
    
        gl_FragColor = result;
    }
    
    
    vec4 permute(vec4 x)
    {
        return mod(((x*34.0)+1.0)*x, 289.0);
    }
    
    vec3 permute(vec3 x)
    {
        return mod(((x*34.0)+1.0)*x, 289.0);
    }
    
    vec2 fade(vec2 t) 
    {
        return t*t*t*(t*(t*6.0-15.0)+10.0);
    }
    
    float rand(vec2 c)
    {
        return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }
    
    float rand(float n)
    {
        return fract(sin(n) * 43758.5453123);
    }
    
    float clampf(float src)
    {
        if(src < 0.0) return 0.0;
        if(src > 1.0) return 1.0;
        return src;
    }
    
    
    float cnoise(vec2 P)
    {
        vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
        vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
        Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
        vec4 ix = Pi.xzxz;
        vec4 iy = Pi.yyww;
        vec4 fx = Pf.xzxz;
        vec4 fy = Pf.yyww;
        vec4 i = permute(permute(ix) + iy);
        vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
        vec4 gy = abs(gx) - 0.5;
        vec4 tx = floor(gx + 0.5);
        gx = gx - tx;
        vec2 g00 = vec2(gx.x,gy.x);
        vec2 g10 = vec2(gx.y,gy.y);
        vec2 g01 = vec2(gx.z,gy.z);
        vec2 g11 = vec2(gx.w,gy.w);
        vec4 norm = 1.79284291400159 - 0.85373472095314 * 
          vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
        g00 *= norm.x;
        g01 *= norm.y;
        g10 *= norm.z;
        g11 *= norm.w;
        float n00 = dot(g00, vec2(fx.x, fy.x));
        float n10 = dot(g10, vec2(fx.y, fy.y));
        float n01 = dot(g01, vec2(fx.z, fy.z));
        float n11 = dot(g11, vec2(fx.w, fy.w));
        vec2 fade_xy = fade(Pf.xy);
        vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
        float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
        return 2.3 * n_xy;
    }
    
    float snoise(vec2 v)
    {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
    }
    
    float noise(float p)
    {
        float fl = floor(p);
        float fc = fract(p);
        return mix(rand(fl), rand(fl + 1.0), fc);
    }
        
    float noise(vec2 n) 
    {
        const vec2 d = vec2(0.0, 1.0);
        vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
        return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
    }
    `;
}