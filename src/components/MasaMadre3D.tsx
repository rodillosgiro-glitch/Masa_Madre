import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Sparkles, MeshTransmissionMaterial, MeshDistortMaterial, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

type Burbuja = { pos: [number, number, number]; r: number };

const FONDO_FRASCO = -1.0;

function JarGroup() {
  const group = useRef<THREE.Group>(null);
  const cuerpoRef = useRef<THREE.Mesh>(null);
  const cupulaRef = useRef<THREE.Mesh>(null);
  const burbujasRef = useRef<THREE.Group>(null);
  const giroBase = useRef(0);

  const burbujas = useMemo<Burbuja[]>(() => {
    const arr: Burbuja[] = [];
    for (let i = 0; i < 10; i++) {
      const angulo = Math.random() * Math.PI * 2;
      const radio = Math.random() * 0.8;
      arr.push({
        pos: [Math.cos(angulo) * radio, 0.5 + Math.random() * 0.2, Math.sin(angulo) * radio],
        r: 0.05 + Math.random() * 0.12,
      });
    }
    return arr;
  }, []);

  // Tapa a cuadros rojos (estilo mermelada) — textura generada en código
  const texturaCuadros = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#f2ede4';
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = '#c92a2a';
    const n = 8, s = 256 / n;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if ((i + j) % 2 === 0) ctx.fillRect(i * s, j * s, s, s);
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    return tex;
  }, []);

  // Superficie de la masa con hoyitos (como en la foto) — textura generada
  const texturaMasa = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#e2cda9';
    ctx.fillRect(0, 0, 512, 512);
    const tonos = ['#a3895f', '#93764d', '#b89a6e', '#c7ad7e'];
    for (let i = 0; i < 220; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const r = 2 + Math.random() * 9;
      ctx.globalAlpha = 0.35 + Math.random() * 0.45;
      ctx.fillStyle = tonos[Math.floor(Math.random() * tonos.length)];
      ctx.beginPath();
      ctx.ellipse(x, y, r, r * (0.6 + Math.random() * 0.5), Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 1);
    return tex;
  }, []);

  // Materiales de la tapa: laterales rojos, arriba a cuadros
  const materialesTapa = useMemo(() => [
    new THREE.MeshStandardMaterial({ color: '#c92a2a', roughness: 0.35 }),
    new THREE.MeshStandardMaterial({ map: texturaCuadros, roughness: 0.35 }),
    new THREE.MeshStandardMaterial({ color: '#a12020', roughness: 0.5 }),
  ], [texturaCuadros]);

  // delta = segundos entre frames → la animación avanza por tiempo real,
  // no por fotogramas: gira igual a 144fps que a 30fps en PCs viejos
  useFrame((state, delta) => {
    if (!group.current) return;
    giroBase.current += delta * 0.25; // giro sutil: ~0.25 rad/segundo
    const objetivoY = giroBase.current + state.pointer.x * 0.5;
    const objetivoX = -state.pointer.y * 0.2;
    // damp = suavizado independiente del framerate
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, objetivoY, 4, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, objetivoX, 4, delta);

    // Ciclo de fermentación: la masa sube desde el fondo hasta llenar el frasco
    const t = state.clock.elapsedTime;
    const p = 0.5 - 0.5 * Math.cos(t * 0.35); // 0→1→0, suave (por tiempo, no por fps)
    const altura = 0.35 + p * 1.3;           // altura total del cuerpo de masa
    if (cuerpoRef.current) {
      cuerpoRef.current.scale.y = altura;
      cuerpoRef.current.position.y = FONDO_FRASCO + altura / 2; // base siempre abajo
    }
    if (cupulaRef.current) {
      const respiro = 1 + Math.sin(t * 1.2) * 0.015;
      const domo = (0.55 + p * 0.2) * respiro;
      cupulaRef.current.scale.set(1, domo, 1);
      cupulaRef.current.position.y = FONDO_FRASCO + altura; // cúpula encima del cuerpo
    }

    // Las burbujas aparecen y crecen con la fermentación
    burbujasRef.current?.children.forEach((burbuja, i) => {
      const pulso = 1 + Math.sin(t * 1.8 + i * 1.3) * 0.18;
      burbuja.scale.setScalar(Math.max(0.001, p * pulso));
    });
  });

  return (
    <group ref={group}>
      {/* Frasco de vidrio con refracción realista */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 0.92, 2.2, 48]} />
        <MeshTransmissionMaterial
          samples={6}
          resolution={512}
          transmission={1}
          roughness={0.06}
          thickness={0.15}
          ior={1.4}
          chromaticAberration={0.02}
        />
      </mesh>

      {/* Tapa a cuadros */}
      <mesh position={[0, 1.18, 0]} material={materialesTapa}>
        <cylinderGeometry args={[1.06, 1.02, 0.16, 48]} />
      </mesh>


      {/* Masa madre: cuerpo cilíndrico que llena el frasco + cúpula burbujeante */}
      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.1}>
        <mesh ref={cuerpoRef} position={[0, FONDO_FRASCO + 0.5, 0]}>
          <cylinderGeometry args={[0.88, 0.88, 1, 48]} />
          <MeshDistortMaterial
            map={texturaMasa}
            roughness={0.95}
            distort={0.04}
            speed={0.4}
          />
        </mesh>
        <mesh ref={cupulaRef} position={[0, FONDO_FRASCO + 1, 0]}>
          <sphereGeometry args={[0.88, 48, 48]} />
          <MeshDistortMaterial
            map={texturaMasa}
            roughness={0.95}
            distort={0.08}
            speed={0.5}
          />
          {/* Burbujas dentro de la cúpula — suben con ella mientras crece */}
          <group ref={burbujasRef}>
            {burbujas.map((b, i) => (
              <mesh key={i} position={[b.pos[0], b.pos[1], b.pos[2]]} scale={0.001}>
                <sphereGeometry args={[b.r, 16, 16]} />
                <meshStandardMaterial color="#f5e8cf" roughness={0.6} />
              </mesh>
            ))}
          </group>
        </mesh>
      </Float>
    </group>
  );
}

export default function MasaMadre3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.6, 4.6], fov: 42 }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} color="#fff2d9" />
      <directionalLight position={[-3, 2, -4]} intensity={0.4} color="#ffd9a0" />

      <JarGroup />

      {/* Partículas tipo levadura */}
      <Sparkles count={40} scale={5} size={2.4} speed={0.25} color="#F5A623" opacity={0.6} />

      <ContactShadows position={[0, -1.35, 0]} opacity={0.35} scale={7} blur={2.4} color="#8B4513" />

      {/* Iluminación ambiental generada en código (sin archivos externos) */}
      <Environment resolution={64}>
        <Lightformer intensity={2} position={[0, 3, 2]} scale={[4, 4, 1]} color="#fff2d9" />
        <Lightformer intensity={1.2} position={[-3, 1, -1]} rotation-y={Math.PI / 2} scale={[3, 2, 1]} color="#ffd9a0" />
        <Lightformer intensity={0.8} position={[3, 0, 1]} rotation-y={-Math.PI / 2} scale={[2, 3, 1]} color="#ffe9c4" />
      </Environment>
    </Canvas>
  );
}
