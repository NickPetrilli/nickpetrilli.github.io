import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
  attribute float scale;
  uniform float uTime;
  void main() {
    vec3 p = position;
    float s = scale;
    p.y += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
    p.x += (sin(p.y + uTime) * 0.5);
    s += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = s * 15.0 * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  void main() {
    gl_FragColor = vec4(uColor, uOpacity);
  }
`;

const ParticleWave = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, winWidth / winHeight, 0.01, 1000);
    camera.position.set(0, 6, 5);

    // Scene
    const scene = new THREE.Scene();

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(winWidth, winHeight);
    renderer.setClearColor(0x000000, 0); // transparent — Home.css sets the bg

    // Particles grid
    const gap = 0.3;
    const amountX = 150;
    const amountY = 150;
    const count = amountX * amountY;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    let i = 0, j = 0;
    for (let ix = 0; ix < amountX; ix++) {
      for (let iy = 0; iy < amountY; iy++) {
        positions[i]     = ix * gap - (amountX * gap) / 2;
        positions[i + 1] = 0;
        positions[i + 2] = iy * gap - (amountY * gap) / 2;
        scales[j] = 1;
        i += 3;
        j++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale',    new THREE.BufferAttribute(scales, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime:    { value: 0 },
        uColor:   { value: new THREE.Vector3(0.0, 1.0, 0.0) }, // #00FF00 green
        uOpacity: { value: 0.35 },
      },
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let animId = null;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      material.uniforms.uTime.value += 0.04;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    sceneRef.current = { scene, renderer, geometry, material, animId };

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 4,
      }}
    />
  );
};

export default ParticleWave;
