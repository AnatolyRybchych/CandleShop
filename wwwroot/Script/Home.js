var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
window.addEventListener("load", function (ev) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var canvases, fires, i;
        return __generator(this, function (_a) {
            canvases = document.getElementsByClassName("candle_fire");
            fires = [];
            for (i = 0; i < canvases.length; i++) {
                fires.push(new Fire(canvases[i]));
            }
            setInterval(function () {
                fires.forEach(function (fire) {
                    fire.Draw();
                });
            }, 100);
            return [2 /*return*/];
        });
    }); })();
});
var Fire = /** @class */ (function () {
    function Fire(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl");
        Fire.InitShaders(this.gl);
        Fire.InitBuffers(this.gl);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    }
    Fire.prototype.Draw = function () {
        this.gl.clearColor(0.019, 0, 0, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.useProgram(Fire.prog);
        var now = new Date();
        var time = now.getMinutes() * 60 + now.getSeconds() + now.getMilliseconds() / 1000;
        this.gl.uniform1f(Fire.Uniform_time, time);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, Fire.buffer);
        this.gl.enableVertexAttribArray(Fire.Attribute_VertPos);
        this.gl.vertexAttribPointer(Fire.Attribute_VertPos, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    };
    Fire.InitBuffers = function (gl) {
        if (Fire.buffer == undefined) {
            Fire.buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, Fire.buffer);
            var data = new Float32Array([
                1.0, -1.0,
                -1.0, 1.0,
                1.0, 1.0,
                1.0, -1.0,
                -1.0, 1.0,
                -1.0, -1.0,
            ]);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        }
    };
    Fire.InitShaders = function (gl) {
        if (Fire.vert == undefined) {
            Fire.vert = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(Fire.vert, Fire.vert_source);
            gl.compileShader(Fire.vert);
            if (!gl.getShaderParameter(Fire.vert, gl.COMPILE_STATUS)) {
                console.log("Vrtex shader:\n" + gl.getShaderInfoLog(Fire.vert));
                Fire.vert = undefined;
            }
        }
        if (Fire.frag == undefined) {
            Fire.frag = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(Fire.frag, Fire.frag_source);
            gl.compileShader(Fire.frag);
            if (!gl.getShaderParameter(Fire.frag, gl.COMPILE_STATUS)) {
                console.log("Fragment shader:\n" + gl.getShaderInfoLog(Fire.frag));
                Fire.frag = undefined;
            }
        }
        if (Fire.prog == undefined) {
            if (Fire.vert == undefined) {
                console.log("Shader program:\nVertex shader is not not compiled");
            }
            if (Fire.frag == undefined) {
                console.log("Shader program:\nFragment shader is not not compiled");
            }
            if (Fire.vert == undefined || Fire.frag == undefined) {
                return;
            }
            Fire.prog = gl.createProgram();
            gl.attachShader(Fire.prog, Fire.vert);
            gl.attachShader(Fire.prog, Fire.frag);
            gl.linkProgram(Fire.prog);
            if (!gl.getProgramParameter(Fire.prog, gl.LINK_STATUS)) {
                console.log("Shader program:\n" + gl.getProgramInfoLog(Fire.prog));
                Fire.prog = undefined;
            }
            Fire.Attribute_VertPos = gl.getAttribLocation(Fire.prog, "VertPos");
            Fire.Uniform_time = gl.getUniformLocation(Fire.prog, "time");
        }
    };
    Fire.vert_source = "\n    attribute vec4 VertPos;\n    varying vec2 FragPos;\n    varying vec2 uv;\n    \n    \n    void main() {\n        gl_Position = VertPos;\n        FragPos = VertPos.xy;\n        uv = (FragPos + 1.0) / 2.0;\n    }\n    ";
    Fire.frag_source = "\n    precision mediump float;\n    varying vec2 FragPos;\n    varying vec2 uv;\n    \n    uniform float time;\n    \n    \n    #define PI 3.14159265358979323846\n    \n    float cnoise(vec2 P);\n    float snoise(vec2 v);\n    float noise(float p);\n    float noise(vec2 n);\n    \n    vec4 permute(vec4 x);\n    vec3 permute(vec3 x);\n    vec2 fade(vec2 t);\n    float rand(vec2 c);\n    float rand(float n);\n    float clampf(float src);\n    \n    \n    void main() {\n    \n        vec2 cur_uv = uv;\n    \n        float snoise_value = clampf(snoise(cur_uv * 0.2 + vec2(0, -time)));\n    \n        float a =  snoise_value * 0.5;\n    \n        a += clampf(noise(cur_uv * 2.0 + vec2(0, -time)));\n    \n        a += clampf(cnoise(cur_uv * 4.0 + vec2(0, -time)));\n    \n        a += clampf(cnoise(cur_uv * 4.0 + vec2(0, -time * 4.0)));\n    \n        a *= pow(1.5 - distance(uv, vec2(0.5, 0.1)), 5.0);\n    \n        a *= 1.0 - abs(FragPos.x * 3.0);\n        a = clampf(a);\n    \n        if(FragPos.y < -0.2)\n        {\n            a *= 1.2 +  FragPos.y ; \n            if(FragPos.y < -0.8)\n            {\n                a *= (1.0 + FragPos.y) * 5.0; \n            }\n        }\n        a = clampf(a);\n    \n        float glow = 1.2 - distance(vec2(0.0, -0.2), FragPos * vec2(1.8 + pow(FragPos.y, 2.0), 0.5 * FragPos.y));\n        glow *= snoise_value * 0.2 + 0.5;\n    \n        a = max(a, glow);\n        a = pow(a, 0.7);\n    \n        float smoothh = 1.0;\n        if(abs(FragPos.y) > 0.8)\n        {\n            smoothh  = 1.0 -(abs(FragPos.y) - 0.8) * 5.0;\n        }\n    \n        vec4 result = vec4(a ,  a - 0.25  , 0.1, a * pow(smoothh, 0.5));\n    \n        result.rgb *= 2.8 * (1.0 - abs(FragPos.x)) * (1.0 - abs(FragPos.y * 0.5 + 0.5));\n    \n        gl_FragColor = result;\n    }\n    \n    \n    vec4 permute(vec4 x)\n    {\n        return mod(((x*34.0)+1.0)*x, 289.0);\n    }\n    \n    vec3 permute(vec3 x)\n    {\n        return mod(((x*34.0)+1.0)*x, 289.0);\n    }\n    \n    vec2 fade(vec2 t) \n    {\n        return t*t*t*(t*(t*6.0-15.0)+10.0);\n    }\n    \n    float rand(vec2 c)\n    {\n        return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);\n    }\n    \n    float rand(float n)\n    {\n        return fract(sin(n) * 43758.5453123);\n    }\n    \n    float clampf(float src)\n    {\n        if(src < 0.0) return 0.0;\n        if(src > 1.0) return 1.0;\n        return src;\n    }\n    \n    \n    float cnoise(vec2 P)\n    {\n        vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);\n        vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);\n        Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation\n        vec4 ix = Pi.xzxz;\n        vec4 iy = Pi.yyww;\n        vec4 fx = Pf.xzxz;\n        vec4 fy = Pf.yyww;\n        vec4 i = permute(permute(ix) + iy);\n        vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...\n        vec4 gy = abs(gx) - 0.5;\n        vec4 tx = floor(gx + 0.5);\n        gx = gx - tx;\n        vec2 g00 = vec2(gx.x,gy.x);\n        vec2 g10 = vec2(gx.y,gy.y);\n        vec2 g01 = vec2(gx.z,gy.z);\n        vec2 g11 = vec2(gx.w,gy.w);\n        vec4 norm = 1.79284291400159 - 0.85373472095314 * \n          vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));\n        g00 *= norm.x;\n        g01 *= norm.y;\n        g10 *= norm.z;\n        g11 *= norm.w;\n        float n00 = dot(g00, vec2(fx.x, fy.x));\n        float n10 = dot(g10, vec2(fx.y, fy.y));\n        float n01 = dot(g01, vec2(fx.z, fy.z));\n        float n11 = dot(g11, vec2(fx.w, fy.w));\n        vec2 fade_xy = fade(Pf.xy);\n        vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\n        float n_xy = mix(n_x.x, n_x.y, fade_xy.y);\n        return 2.3 * n_xy;\n    }\n    \n    float snoise(vec2 v)\n    {\n        const vec4 C = vec4(0.211324865405187, 0.366025403784439,\n                 -0.577350269189626, 0.024390243902439);\n        vec2 i  = floor(v + dot(v, C.yy) );\n        vec2 x0 = v -   i + dot(i, C.xx);\n        vec2 i1;\n        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n        vec4 x12 = x0.xyxy + C.xxzz;\n        x12.xy -= i1;\n        i = mod(i, 289.0);\n        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))\n        + i.x + vec3(0.0, i1.x, 1.0 ));\n        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),\n          dot(x12.zw,x12.zw)), 0.0);\n        m = m*m ;\n        m = m*m ;\n        vec3 x = 2.0 * fract(p * C.www) - 1.0;\n        vec3 h = abs(x) - 0.5;\n        vec3 ox = floor(x + 0.5);\n        vec3 a0 = x - ox;\n        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n        vec3 g;\n        g.x  = a0.x  * x0.x  + h.x  * x0.y;\n        g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n        return 130.0 * dot(m, g);\n    }\n    \n    float noise(float p)\n    {\n        float fl = floor(p);\n        float fc = fract(p);\n        return mix(rand(fl), rand(fl + 1.0), fc);\n    }\n        \n    float noise(vec2 n) \n    {\n        const vec2 d = vec2(0.0, 1.0);\n        vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));\n        return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);\n    }\n    ";
    return Fire;
}());
