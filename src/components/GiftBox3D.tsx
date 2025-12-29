import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, RoundedBox, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface GiftBoxProps {
  isOpening: boolean;
}

// Partículas douradas suaves
function GoldenParticles({ isOpening }: { isOpening: boolean }) {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 30; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = 0.3 + Math.random() * 0.4;
      const h = Math.random() * 1.5;
      temp.push({
        position: new THREE.Vector3(
          Math.cos(t) * r,
          h,
          Math.sin(t) * r
        ),
        speed: 0.3 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particles.length * 3);
    particles.forEach((p, i) => {
      positions[i * 3] = p.position.x;
      positions[i * 3 + 1] = p.position.y;
      positions[i * 3 + 2] = p.position.z;
    });
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [particles]);

  useFrame((state) => {
    if (particlesRef.current && isOpening) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      particles.forEach((p, i) => {
        const y = positions[i * 3 + 1];
        positions[i * 3 + 1] = y + p.speed * 0.015;
        if (y > 3.5) positions[i * 3 + 1] = 0;
        
        positions[i * 3] = p.position.x + Math.sin(state.clock.elapsedTime + p.offset) * 0.08;
        positions[i * 3 + 2] = p.position.z + Math.cos(state.clock.elapsedTime + p.offset) * 0.08;
      });
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  if (!isOpening) return null;

  return (
    <points ref={particlesRef}>
      <primitive object={geometry} />
      <pointsMaterial
        size={0.05}
        color="#FFD700"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GiftBox({ isOpening }: GiftBoxProps) {
  const lidRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const [lidPosition, setLidPosition] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0);

  useFrame((state, delta) => {
    // Tampa sobe 15% da altura (0.24 de uma caixa de 1.6 de altura)
    if (isOpening && lidPosition < 0.24) {
      setLidPosition(prev => {
        const target = 0.24;
        const speed = 0.8;
        return prev + (target - prev) * speed * delta;
      });
    }
    
    if (lidRef.current) {
      lidRef.current.position.y = lidPosition;
    }

    // Brilho interno crescendo
    if (isOpening && glowIntensity < 1) {
      setGlowIntensity(prev => Math.min(prev + delta * 1.2, 1));
    }

    if (glowRef.current && isOpening) {
      const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.2 + 0.8;
      glowRef.current.intensity = glowIntensity * pulse * 4;
    }
  });

  // Material da caixa - papel plastificado dourado natural
  const boxMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#F4C430',
    metalness: 0.35,
    roughness: 0.25,
    clearcoat: 0.4,
    clearcoatRoughness: 0.2,
    reflectivity: 0.6,
    ior: 1.45,
    envMapIntensity: 1.0,
    sheen: 0.4,
    sheenRoughness: 0.5,
    sheenColor: new THREE.Color('#FFD700'),
  }), []);

  // Material alternativo para criar gradiente dourado
  const boxMaterialDark = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#D4AF37',
    metalness: 0.4,
    roughness: 0.3,
    clearcoat: 0.35,
    clearcoatRoughness: 0.25,
    reflectivity: 0.5,
    ior: 1.45,
    envMapIntensity: 0.9,
    sheen: 0.4,
    sheenRoughness: 0.5,
    sheenColor: new THREE.Color('#E6B800'),
  }), []);

  // Material da fita - cetim vermelho
  const ribbonMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#C00000',
    metalness: 0.3,
    roughness: 0.25,
    clearcoat: 0.8,
    clearcoatRoughness: 0.15,
    sheen: 1.5,
    sheenRoughness: 0.3,
    sheenColor: new THREE.Color('#D00000'),
    envMapIntensity: 1.5,
    ior: 1.45,
  }), []);

  return (
    <group position={[0, 0.2, 0]}>
      {/* Base da caixa - formato quadrado perfeito */}
      <RoundedBox 
        args={[2.0, 1.6, 2.0]} 
        radius={0.04} 
        smoothness={8} 
        position={[0, 0, 0]} 
        castShadow 
        receiveShadow
      >
        <primitive object={boxMaterial} />
      </RoundedBox>

      {/* Bordas internas com tom mais escuro para profundidade */}
      <mesh position={[0, 0.795, 0]}>
        <boxGeometry args={[1.95, 0.02, 1.95]} />
        <primitive object={boxMaterialDark} />
      </mesh>

      {/* Fita vertical - frente para trás */}
      <RoundedBox 
        args={[0.25, 1.65, 2.05]} 
        radius={0.015} 
        smoothness={6} 
        position={[0, 0, 0]} 
        castShadow
      >
        <primitive object={ribbonMaterial} />
      </RoundedBox>

      {/* Fita horizontal - esquerda para direita */}
      <RoundedBox 
        args={[2.05, 1.65, 0.25]} 
        radius={0.015} 
        smoothness={6} 
        position={[0, 0, 0]} 
        castShadow
      >
        <primitive object={ribbonMaterial} />
      </RoundedBox>

      {/* Tampa suspensa com animação */}
      <group ref={lidRef} position={[0, 0.8, 0]}>
        <RoundedBox 
          args={[2.1, 0.5, 2.1]} 
          radius={0.04} 
          smoothness={8} 
          castShadow 
          receiveShadow
        >
          <primitive object={boxMaterial} />
        </RoundedBox>

        {/* Interior da tampa - dourado acetinado */}
        <mesh position={[0, -0.24, 0]}>
          <boxGeometry args={[1.98, 0.02, 1.98]} />
          <meshPhysicalMaterial
            color="#E6B800"
            metalness={0.85}
            roughness={0.15}
            clearcoat={0.6}
            envMapIntensity={1.8}
          />
        </mesh>

        {/* Fita no topo da tampa */}
        <RoundedBox 
          args={[0.25, 0.52, 2.15]} 
          radius={0.015} 
          smoothness={6} 
          position={[0, 0, 0]} 
          castShadow
        >
          <primitive object={ribbonMaterial} />
        </RoundedBox>
        <RoundedBox 
          args={[2.15, 0.52, 0.25]} 
          radius={0.015} 
          smoothness={6} 
          position={[0, 0, 0]} 
          castShadow
        >
          <primitive object={ribbonMaterial} />
        </RoundedBox>

        {/* Laço detalhado em 3D com volume e curvas naturais */}
        <group position={[0, 0.35, 0]}>
          {/* Centro do laço */}
          <mesh castShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.15, 32]} />
            <primitive object={ribbonMaterial} />
          </mesh>
          
          {/* Loop esquerdo - com volume */}
          <mesh position={[-0.3, 0.02, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
            <torusGeometry args={[0.22, 0.08, 24, 48]} />
            <primitive object={ribbonMaterial} />
          </mesh>
          
          {/* Loop direito - com volume */}
          <mesh position={[0.3, 0.02, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
            <torusGeometry args={[0.22, 0.08, 24, 48]} />
            <primitive object={ribbonMaterial} />
          </mesh>

          {/* Fitas caindo - esquerda */}
          <mesh position={[-0.15, -0.35, 0]} rotation={[0.15, 0, 0.25]} castShadow>
            <boxGeometry args={[0.12, 0.6, 0.04]} />
            <primitive object={ribbonMaterial} />
          </mesh>
          
          {/* Fitas caindo - direita */}
          <mesh position={[0.15, -0.35, 0]} rotation={[0.15, 0, -0.25]} castShadow>
            <boxGeometry args={[0.12, 0.6, 0.04]} />
            <primitive object={ribbonMaterial} />
          </mesh>

          {/* Vincos nas fitas para realismo */}
          <mesh position={[-0.15, -0.15, 0.025]} rotation={[0, 0, 0.25]} castShadow>
            <boxGeometry args={[0.13, 0.015, 0.04]} />
            <meshPhysicalMaterial
              color="#A00000"
              metalness={0.3}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0.15, -0.15, 0.025]} rotation={[0, 0, -0.25]} castShadow>
            <boxGeometry args={[0.13, 0.015, 0.04]} />
            <meshPhysicalMaterial
              color="#A00000"
              metalness={0.3}
              roughness={0.3}
            />
          </mesh>
        </group>
      </group>

      {/* Brilho dourado interno difuso quando abre */}
      {isOpening && (
        <>
          <pointLight
            ref={glowRef}
            position={[0, 0.3, 0]}
            intensity={4}
            distance={5}
            color="#FFD700"
            decay={2}
          />
          
          {/* Luz ambiente interna suave */}
          <pointLight
            position={[0, 0.3, 0]}
            intensity={glowIntensity * 2}
            distance={3}
            color="#FFED99"
            decay={2}
          />
          
          {/* Esfera de brilho difuso */}
          <mesh position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshBasicMaterial 
              color="#FFD700" 
              transparent 
              opacity={glowIntensity * 0.3}
              side={THREE.BackSide}
            />
          </mesh>
        </>
      )}

      {/* Partículas douradas suaves */}
      <GoldenParticles isOpening={isOpening} />
    </group>
  );
}

export function GiftBox3D({ isOpening }: { isOpening: boolean }) {
  return (
    <div className="w-full h-full">
      <Canvas 
        shadows="soft"
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.9,
        }}
        dpr={[1, 2]}
      >
        {/* Fundo cinza-claro minimalista */}
        <color attach="background" args={['#F4F4F4']} />
        
        {/* Perspectiva isométrica levemente superior */}
        <PerspectiveCamera 
          makeDefault 
          position={[3.5, 3.5, 3.5]} 
          fov={35}
        />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.5}
          autoRotate={false}
        />
        
        {/* Iluminação principal - canto superior esquerdo, 5500K */}
        <directionalLight 
          position={[-6, 8, 4]} 
          intensity={3.0}
          color="#FFFFFF"
          castShadow
          shadow-mapSize={[4096, 4096]}
          shadow-bias={-0.00005}
          shadow-camera-far={50}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
          shadow-normalBias={0.02}
        />
        
        {/* Luz de preenchimento suave */}
        <ambientLight intensity={0.8} color="#FFFFFF" />
        
        {/* Luz de reflexo sutil */}
        <pointLight 
          position={[4, 2, -3]} 
          intensity={1.5}
          color="#FFFFFF"
          distance={15}
        />

        {/* Ambiente HDRI para reflexos físicos realistas */}
        <Environment 
          preset="warehouse" 
          background={false} 
          blur={0}
        />

        <GiftBox isOpening={isOpening} />
        
        {/* Sombra de contato suave */}
        <ContactShadows 
          position={[0, -1.0, 0]}
          opacity={0.25} 
          scale={8} 
          blur={2.5} 
          far={3.5} 
          color="#000000"
        />
        
        {/* Plano de chão invisível para sombras */}
        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -1.0, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial 
            color="#F4F4F4" 
            metalness={0}
            roughness={1}
          />
        </mesh>
      </Canvas>
    </div>
  );
}
