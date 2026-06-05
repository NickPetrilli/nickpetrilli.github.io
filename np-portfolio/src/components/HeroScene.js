import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/* ── Timing (seconds) ─────────────────── */
const D_SWARM   = 1.2;   // random → name
const D_HOLD    = 1.6;   // name held
const D_SCATTER = 1.6;   // name → network
// CSS text starts at D_SWARM + D_HOLD = 2.8s

/* ── Counts ──────────────────────────── */
const PARTICLES = 2500;
const NODES     = 100;
const SIGNALS   = 5;
const EDGE_DIST = 3.6;
const MAX_EDGES = 4;

/* ── Ease ────────────────────────────── */
const easeOut   = t => 1 - Math.pow(1 - t, 3);
const easeInOut = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;

/* ── Sample "NICK PETRILLI" pixels ───── */
function sampleText() {
  const W = 900, H = 140;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const cx = cv.getContext('2d');
  cx.fillStyle = '#fff';
  cx.font = 'bold 70px "Courier New",monospace';
  cx.textAlign = 'center';
  cx.textBaseline = 'middle';
  cx.fillText('NICK PETRILLI', W / 2, H / 2);

  const { data } = cx.getImageData(0, 0, W, H);
  const raw = [];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (data[(y * W + x) * 4 + 3] > 110) {
        raw.push(
          (x / W - 0.5) * 17,
          -(y / H - 0.5) * 2.8,
          (Math.random() - 0.5) * 0.2
        );
      }
    }
  }
  // Subsample to fill PARTICLES
  const want = Math.floor(PARTICLES * 0.72);
  const step = Math.max(1, Math.floor(raw.length / 3 / want));
  const out = [];
  for (let i = 0; i < raw.length; i += step * 3) {
    out.push(raw[i], raw[i + 1], raw[i + 2]);
    if (out.length / 3 >= want) break;
  }
  return out; // flat [x,y,z, ...]
}

/* ── Build graph ─────────────────────── */
function buildGraph() {
  const nodes = Array.from({ length: NODES }, () => ({
    x: (Math.random() - 0.5) * 22,
    y: (Math.random() - 0.5) * 12,
    z: (Math.random() - 0.5) * 12,
  }));
  const edges = [];
  const cnt = new Array(NODES).fill(0);
  for (let i = 0; i < NODES; i++) {
    for (let j = i + 1; j < NODES; j++) {
      if (cnt[i] >= MAX_EDGES || cnt[j] >= MAX_EDGES) continue;
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dz = nodes[i].z - nodes[j].z;
      if (Math.sqrt(dx*dx + dy*dy + dz*dz) < EDGE_DIST) {
        edges.push([i, j]);
        cnt[i]++; cnt[j]++;
      }
    }
  }
  return { nodes, edges };
}

/* ── Component ───────────────────────── */
const HeroScene = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    /* Camera */
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 16);

    const scene = new THREE.Scene();

    /* Build position arrays */
    const textFlat  = sampleText();
    const { nodes: gNodes, edges: gEdges } = buildGraph();

    const textPos    = new Float32Array(PARTICLES * 3);
    const networkPos = new Float32Array(PARTICLES * 3);
    const startPos   = new Float32Array(PARTICLES * 3);
    const aSizes     = new Float32Array(PARTICLES);
    const aBrights   = new Float32Array(PARTICLES);

    for (let i = 0; i < PARTICLES; i++) {
      const b = i * 3;
      // text positions
      if (b < textFlat.length) {
        textPos[b] = textFlat[b]; textPos[b+1] = textFlat[b+1]; textPos[b+2] = textFlat[b+2];
      } else {
        textPos[b]   = (Math.random()-0.5) * 20;
        textPos[b+1] = (Math.random()-0.5) * 6;
        textPos[b+2] = -4 - Math.random() * 4;
      }
      // network positions
      if (i < NODES) {
        networkPos[b]   = gNodes[i].x;
        networkPos[b+1] = gNodes[i].y;
        networkPos[b+2] = gNodes[i].z;
        aSizes[i]   = 2.8;
        aBrights[i] = 1.0;
      } else {
        networkPos[b]   = (Math.random()-0.5) * 44;
        networkPos[b+1] = (Math.random()-0.5) * 28;
        networkPos[b+2] = (Math.random()-0.5) * 16;
        aSizes[i]   = 0.7 + Math.random() * 1.0;
        aBrights[i] = 0.12 + Math.random() * 0.28;
      }
      // start: random scatter off-screen
      startPos[b]   = (Math.random()-0.5) * 36;
      startPos[b+1] = (Math.random()-0.5) * 22;
      startPos[b+2] = -10 + (Math.random()-0.5) * 8;
    }

    /* Geometry */
    const curPos = new Float32Array(startPos);
    const geom   = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(curPos, 3));
    geom.setAttribute('aSize',    new THREE.BufferAttribute(aSizes, 1));
    geom.setAttribute('aBright',  new THREE.BufferAttribute(aBrights, 1));

    /* Shader */
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uCol:   { value: new THREE.Color(0x00ff00) },
        uAlpha: { value: 1.0 },
        uPhase: { value: 0.0 }, // 0=text, 1=network
      },
      vertexShader: `
        attribute float aSize;
        attribute float aBright;
        uniform float uPhase;
        varying float vB;
        void main() {
          float sz = mix(1.4, aSize, uPhase);
          vB = mix(0.8, aBright, uPhase);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = sz * (300.0 / -mv.z);
          gl_Position  = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3  uCol;
        uniform float uAlpha;
        uniform float uPhase;
        varying float vB;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.02, d) * vB * uAlpha;
          vec3 col = mix(vec3(0.35, 1.0, 0.55), uCol, uPhase);
          gl_FragColor = vec4(col, a);
        }
      `,
    });

    const points = new THREE.Points(geom, mat);
    scene.add(points);

    /* Edges */
    const edgeArr = [];
    gEdges.forEach(([i, j]) => {
      edgeArr.push(gNodes[i].x, gNodes[i].y, gNodes[i].z,
                   gNodes[j].x, gNodes[j].y, gNodes[j].z);
    });
    const edgeGeom = new THREE.BufferGeometry();
    edgeGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(edgeArr), 3));
    const edgeMat  = new THREE.LineBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0 });
    const lines    = new THREE.LineSegments(edgeGeom, edgeMat);
    scene.add(lines);

    /* Signals */
    const sigs   = Array.from({ length: SIGNALS }, () => ({
      ei: Math.floor(Math.random() * Math.max(gEdges.length, 1)),
      t:  Math.random(),
      sp: 0.2 + Math.random() * 0.3,
    }));
    const sigPos  = new Float32Array(SIGNALS * 3);
    const sigGeom = new THREE.BufferGeometry();
    sigGeom.setAttribute('position', new THREE.BufferAttribute(sigPos, 3));
    const sigMat  = new THREE.PointsMaterial({
      color: 0x00ffff, size: 0.28, sizeAttenuation: true, transparent: true, opacity: 0,
    });
    scene.add(new THREE.Points(sigGeom, sigMat));

    /* Mouse parallax */
    let mx = 0, my = 0;
    const onMouse = e => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    /* Animation loop */
    const clock = new THREE.Clock();
    let prevT = 0, rotY = 0, animId;

    const tSwarmEnd   = D_SWARM;
    const tHoldEnd    = D_SWARM + D_HOLD;
    const tScatterEnd = D_SWARM + D_HOLD + D_SCATTER;

    const tick = () => {
      animId = requestAnimationFrame(tick);
      const now   = clock.getElapsedTime();
      const delta = now - prevT;
      prevT = now;

      /* Phase & lerp */
      let src, dst, lerpT, phase;
      if (now < tSwarmEnd) {
        src = startPos; dst = textPos;
        lerpT = easeOut(Math.min(now / D_SWARM, 1));
        phase = 0;
      } else if (now < tHoldEnd) {
        src = textPos; dst = textPos; lerpT = 1; phase = 0;
        // Subtle pulse during hold
        mat.uniforms.uAlpha.value = 0.82 + Math.sin((now - tSwarmEnd) * Math.PI * 3) * 0.18;
      } else if (now < tScatterEnd) {
        src = textPos; dst = networkPos;
        lerpT = easeInOut(Math.min((now - tHoldEnd) / D_SCATTER, 1));
        phase = lerpT;
        mat.uniforms.uAlpha.value = 1.0;
      } else {
        src = networkPos; dst = networkPos; lerpT = 1; phase = 1;
      }
      mat.uniforms.uPhase.value = phase;

      /* Interpolate positions */
      const pa = geom.attributes.position.array;
      for (let i = 0; i < PARTICLES * 3; i++) {
        pa[i] = src[i] + (dst[i] - src[i]) * lerpT;
      }
      geom.attributes.position.needsUpdate = true;

      /* Fade edges + signals in during scatter */
      if (now > tHoldEnd) {
        const p = Math.min((now - tHoldEnd) / D_SCATTER, 1);
        edgeMat.opacity = p * 0.18;
        sigMat.opacity  = p * 0.88;
      }

      /* Network rotation + signal movement */
      if (now > tScatterEnd) {
        rotY += 0.0015;
        points.rotation.y = rotY;
        lines.rotation.y  = rotY;

        if (gEdges.length > 0) {
          sigs.forEach((s, si) => {
            s.t += s.sp * delta;
            if (s.t > 1) {
              s.t  = 0;
              s.ei = Math.floor(Math.random() * gEdges.length);
              s.sp = 0.18 + Math.random() * 0.32;
            }
            const [ni, nj] = gEdges[s.ei];
            const a = gNodes[ni], bv = gNodes[nj];
            sigPos[si*3]   = a.x + (bv.x - a.x) * s.t;
            sigPos[si*3+1] = a.y + (bv.y - a.y) * s.t;
            sigPos[si*3+2] = a.z + (bv.z - a.z) * s.t;
          });
          sigGeom.attributes.position.needsUpdate = true;
        }
      }

      /* Camera parallax */
      camera.position.x += (mx * 3.0 - camera.position.x) * 0.07;
      camera.position.y += (-my * 2.0 - camera.position.y) * 0.07;
      camera.position.z = 16;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      geom.dispose(); mat.dispose();
      edgeGeom.dispose(); edgeMat.dispose();
      sigGeom.dispose(); sigMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:4 }}
    />
  );
};

export default HeroScene;
