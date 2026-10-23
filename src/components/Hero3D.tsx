'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from './ThemeProvider';

/* ── Earth Radius & Dimension Constants ── */
const GLOBE_RADIUS = 2.5;

/* ── Precise Global Landmass Coordinate Regions ── */
const LAND_REGIONS = [
  // North America
  { latMin: 58, latMax: 72, lonMin: -168, lonMax: -130 }, // Alaska
  { latMin: 48, latMax: 70, lonMin: -140, lonMax: -55 },  // Canada
  { latMin: 25, latMax: 49, lonMin: -125, lonMax: -68 },  // USA
  { latMin: 14, latMax: 32, lonMin: -116, lonMax: -86 },  // Mexico
  { latMin: 8, latMax: 18, lonMin: -90, lonMax: -77 },    // Central America
  { latMin: 60, latMax: 83, lonMin: -55, lonMax: -20 },   // Greenland
  { latMin: 18, latMax: 24, lonMin: -85, lonMax: -65 },   // Caribbean
  
  // South America
  { latMin: -5, latMax: 12, lonMin: -80, lonMax: -50 },   // North SA (Col/Ven/Guyana)
  { latMin: -18, latMax: -2, lonMin: -78, lonMax: -35 },  // Brazil North/Amazon
  { latMin: -34, latMax: -15, lonMin: -60, lonMax: -35 }, // Brazil South
  { latMin: -56, latMax: -18, lonMin: -75, lonMax: -55 }, // Argentina / Chile
  { latMin: -20, latMax: 0, lonMin: -81, lonMax: -68 },   // Peru / Ecuador
  
  // Europe
  { latMin: 36, latMax: 44, lonMin: -10, lonMax: 4 },    // Spain / Portugal
  { latMin: 43, latMax: 51, lonMin: -5, lonMax: 9 },     // France
  { latMin: 50, latMax: 59, lonMin: -10, lonMax: 2 },    // UK / Ireland
  { latMin: 36, latMax: 47, lonMin: 6, lonMax: 19 },     // Italy
  { latMin: 47, latMax: 55, lonMin: 6, lonMax: 25 },     // Central Europe (DE, PL, CZ)
  { latMin: 55, latMax: 71, lonMin: 5, lonMax: 32 },     // Scandinavia (NO, SE, FI)
  { latMin: 44, latMax: 65, lonMin: 25, lonMax: 60 },    // Eastern Europe / Western Russia
  { latMin: 36, latMax: 42, lonMin: 19, lonMax: 29 },    // Greece / Balkans
  
  // Africa
  { latMin: 20, latMax: 37, lonMin: -13, lonMax: 35 },   // North Africa (Morocco to Egypt)
  { latMin: 4, latMax: 20, lonMin: -18, lonMax: 15 },    // West Africa
  { latMin: -5, latMax: 15, lonMin: 10, lonMax: 32 },    // Central Africa
  { latMin: -12, latMax: 15, lonMin: 30, lonMax: 52 },   // East Africa (KE, ET, TZ)
  { latMin: -35, latMax: -12, lonMin: 12, lonMax: 36 },  // Southern Africa
  { latMin: -26, latMax: -12, lonMin: 43, lonMax: 51 },  // Madagascar
  
  // Asia & Middle East
  { latMin: 12, latMax: 34, lonMin: 35, lonMax: 60 },    // Middle East (Arabia, Levant)
  { latMin: 30, latMax: 42, lonMin: 26, lonMax: 65 },    // Turkey, Iran
  { latMin: 50, latMax: 75, lonMin: 60, lonMax: 175 },   // Siberia / Northern Russia
  { latMin: 35, latMax: 55, lonMin: 50, lonMax: 90 },    // Central Asia (KZ, UZ)
  { latMin: 8, latMax: 35, lonMin: 68, lonMax: 92 },     // India / Pakistan / Bangladesh
  { latMin: 5.5, latMax: 10, lonMin: 79.5, lonMax: 82 }, // Sri Lanka (Nevoxio home base!)
  { latMin: 20, latMax: 50, lonMin: 90, lonMax: 125 },   // China / Mongolia
  { latMin: 30, latMax: 45, lonMin: 128, lonMax: 146 },  // Japan
  { latMin: 34, latMax: 42, lonMin: 124, lonMax: 130 },  // Korea
  { latMin: 10, latMax: 24, lonMin: 95, lonMax: 110 },   // Indochina (VN, TH, MM)
  { latMin: 1, latMax: 7, lonMin: 99, lonMax: 119 },     // Malaysia / Singapore
  { latMin: -10, latMax: 6, lonMin: 95, lonMax: 141 },   // Indonesia
  { latMin: 5, latMax: 19, lonMin: 117, lonMax: 127 },   // Philippines
  
  // Australia & Oceania
  { latMin: -39, latMax: -11, lonMin: 113, lonMax: 154 }, // Australia
  { latMin: -47, latMax: -34, lonMin: 166, lonMax: 179 }, // New Zealand
];

function isCoordinateOnLand(lat: number, lon: number): boolean {
  for (let i = 0; i < LAND_REGIONS.length; i++) {
    const r = LAND_REGIONS[i];
    if (lat >= r.latMin && lat <= r.latMax && lon >= r.lonMin && lon <= r.lonMax) {
      return true;
    }
  }
  return false;
}

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

/* ── 15 Key Strategic Hubs (Glowing Red Beacon Stars) ── */
interface Hub {
  name: string;
  lat: number;
  lon: number;
  isHQ?: boolean;
}

const GLOBAL_HUBS: Hub[] = [
  { name: 'Colombo, Sri Lanka', lat: 6.9271, lon: 79.8612, isHQ: true }, // NEVOXIO HQ
  { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
  { name: 'Dubai, UAE', lat: 25.2048, lon: 55.2708 },
  { name: 'London, UK', lat: 51.5074, lon: -0.1278 },
  { name: 'Frankfurt, Germany', lat: 50.1109, lon: 8.6821 },
  { name: 'Paris, France', lat: 48.8566, lon: 2.3522 },
  { name: 'New York, USA', lat: 40.7128, lon: -74.0060 },
  { name: 'San Francisco, USA', lat: 37.7749, lon: -122.4194 },
  { name: 'Tokyo, Japan', lat: 35.6762, lon: 139.6503 },
  { name: 'Sydney, Australia', lat: -33.8688, lon: 151.2093 },
  { name: 'São Paulo, Brazil', lat: -23.5505, lon: -46.6333 },
  { name: 'Mumbai, India', lat: 19.0760, lon: 72.8777 },
  { name: 'Cape Town, South Africa', lat: -33.9249, lon: 18.4241 },
  { name: 'Toronto, Canada', lat: 43.6532, lon: -79.3832 },
  { name: 'Seoul, South Korea', lat: 37.5665, lon: 126.9780 },
];

/* ── High-Speed Digital Network Links (Arcs) ── */
const NETWORK_LINKS: [string, string][] = [
  ['Colombo, Sri Lanka', 'Singapore'],
  ['Colombo, Sri Lanka', 'Dubai, UAE'],
  ['Colombo, Sri Lanka', 'Mumbai, India'],
  ['Singapore', 'Tokyo, Japan'],
  ['Singapore', 'Sydney, Australia'],
  ['Dubai, UAE', 'Frankfurt, Germany'],
  ['Dubai, UAE', 'London, UK'],
  ['London, UK', 'Paris, France'],
  ['London, UK', 'New York, USA'],
  ['Frankfurt, Germany', 'New York, USA'],
  ['New York, USA', 'Toronto, Canada'],
  ['New York, USA', 'San Francisco, USA'],
  ['San Francisco, USA', 'Tokyo, Japan'],
  ['New York, USA', 'São Paulo, Brazil'],
  ['London, UK', 'Cape Town, South Africa'],
  ['Tokyo, Japan', 'Seoul, South Korea'],
  ['Seoul, South Korea', 'Singapore'],
];

/* ── 1. Continents Particle Cloud (Glowing Cyan & Violet Dots) ── */
function ContinentParticles({ isDark }: { isDark: boolean }) {
  const { positions, colors } = useMemo(() => {
    const pos: number[] = [];
    const col: number[] = [];

    const primaryColor = isDark ? new THREE.Color('#38bdf8') : new THREE.Color('#1e40af'); // Cyan / Deep Royal
    const secondaryColor = isDark ? new THREE.Color('#818cf8') : new THREE.Color('#4338ca'); // Violet / Indigo
    const highlightColor = isDark ? new THREE.Color('#00f2fe') : new THREE.Color('#2563eb'); // Bright Cyan / Electric Blue
    const oceanColor = isDark ? new THREE.Color('#172554') : new THREE.Color('#cbd5e1'); // Dim Grid

    const sampleCount = 7200;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < sampleCount; i++) {
      const y = 1 - (i / (sampleCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const lat = 90 - Math.acos(y) * (180 / Math.PI);
      const lon = ((Math.atan2(z, -x) * (180 / Math.PI)) - 180 + 540) % 360 - 180;

      const onLand = isCoordinateOnLand(lat, lon);

      if (onLand) {
        const v = latLonToVector3(lat, lon, GLOBE_RADIUS);
        pos.push(v.x, v.y, v.z);

        const mixRatio = Math.sin(lat * 0.06 + lon * 0.04) * 0.5 + 0.5;
        const c = primaryColor.clone().lerp(secondaryColor, mixRatio);
        col.push(c.r, c.g, c.b);

        if (i % 3 === 0) {
          const jitterLat = lat + (Math.sin(i * 1.7) * 1.2);
          const jitterLon = lon + (Math.cos(i * 1.7) * 1.2);
          const vj = latLonToVector3(jitterLat, jitterLon, GLOBE_RADIUS * 1.003);
          pos.push(vj.x, vj.y, vj.z);
          col.push(highlightColor.r, highlightColor.g, highlightColor.b);
        }
      } else if (i % 12 === 0) {
        const v = latLonToVector3(lat, lon, GLOBE_RADIUS);
        pos.push(v.x, v.y, v.z);
        col.push(oceanColor.r, oceanColor.g, oceanColor.b);
      }
    }

    return {
      positions: new Float32Array(pos),
      colors: new Float32Array(col),
    };
  }, [isDark]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isDark ? 0.046 : 0.038}
        vertexColors
        transparent
        opacity={isDark ? 0.95 : 0.82}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── 2. Glowing Red Beacon Stars (Nodes) with Radar Waves & Diffraction Star Spikes ── */
function GlowingRedBeaconNode({
  hub,
  index,
  isDark,
}: {
  hub: Hub;
  index: number;
  isDark: boolean;
}) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const spikeGroupRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Mesh>(null);

  const position = useMemo(() => {
    return latLonToVector3(hub.lat, hub.lon, GLOBE_RADIUS * 1.015);
  }, [hub]);

  const normal = useMemo(() => {
    return position.clone().normalize();
  }, [position]);

  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    return q;
  }, [normal]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const phase = index * 0.52;

    // Star twinkling & radiant pulse
    const twinkle = 0.85 + Math.sin(t * 4 + phase) * 0.35;
    if (coreRef.current) {
      coreRef.current.scale.setScalar(twinkle * (hub.isHQ ? 1.4 : 1.0));
    }

    // Expanding Radar Wave Ring 1
    if (ring1Ref.current) {
      const cycle1 = ((t * 0.75 + phase * 0.3) % 1);
      const s1 = 0.4 + cycle1 * 2.2;
      ring1Ref.current.scale.set(s1, s1, s1);
      const m1 = ring1Ref.current.material as THREE.MeshBasicMaterial;
      if (m1) m1.opacity = (1 - cycle1) * (isDark ? 0.85 : 0.6);
    }

    // Expanding Radar Wave Ring 2 (Staggered offset)
    if (ring2Ref.current) {
      const cycle2 = ((t * 0.75 + phase * 0.3 + 0.5) % 1);
      const s2 = 0.4 + cycle2 * 2.2;
      ring2Ref.current.scale.set(s2, s2, s2);
      const m2 = ring2Ref.current.material as THREE.MeshBasicMaterial;
      if (m2) m2.opacity = (1 - cycle2) * (isDark ? 0.85 : 0.6);
    }

    // 4-Point Star Diffraction Spikes Slow Celestial Rotation
    if (spikeGroupRef.current) {
      spikeGroupRef.current.rotation.z = t * 0.35 + phase;
      const s = 0.8 + Math.sin(t * 3.5 + phase) * 0.25;
      spikeGroupRef.current.scale.setScalar(s);
    }

    // Radial Laser Beam Pulse
    if (beamRef.current) {
      const beamMat = beamRef.current.material as THREE.MeshBasicMaterial;
      if (beamMat) {
        beamMat.opacity = (0.4 + Math.sin(t * 3 + phase) * 0.3) * (isDark ? 0.8 : 0.5);
      }
    }
  });

  const spikeLen = hub.isHQ ? 0.36 : 0.26;
  const spikeWidth = 0.016;

  return (
    <group position={position} quaternion={quaternion}>
      {/* Radiant Central Star Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[hub.isHQ ? 0.075 : 0.055, 16, 16]} />
        <meshBasicMaterial
          color={isDark ? '#ff0055' : '#dc2626'}
          transparent
          opacity={0.98}
        />
      </mesh>

      {/* Radial Vertical Laser Pin extending from surface */}
      <mesh ref={beamRef} position={[0, 0, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.24, 8]} />
        <meshBasicMaterial
          color={isDark ? '#ff3b69' : '#ef4444'}
          transparent
          opacity={0.7}
          depthWrite={false}
        />
      </mesh>

      {/* 4-Point Star Diffraction Spikes (Intersecting Cross Rays) */}
      <group ref={spikeGroupRef} position={[0, 0, 0.002]}>
        {/* Horizontal Spike */}
        <mesh>
          <planeGeometry args={[spikeLen, spikeWidth]} />
          <meshBasicMaterial
            color={isDark ? '#ff2b56' : '#ef4444'}
            transparent
            opacity={isDark ? 0.85 : 0.7}
            blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Vertical Spike */}
        <mesh>
          <planeGeometry args={[spikeWidth, spikeLen]} />
          <meshBasicMaterial
            color={isDark ? '#ff2b56' : '#ef4444'}
            transparent
            opacity={isDark ? 0.85 : 0.7}
            blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Concentric Radar Beacon Wave Ring 1 */}
      <mesh ref={ring1Ref} position={[0, 0, 0.003]}>
        <ringGeometry args={[0.065, 0.088, 32]} />
        <meshBasicMaterial
          color={isDark ? '#ff1744' : '#e11d48'}
          transparent
          opacity={0.65}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Concentric Radar Beacon Wave Ring 2 */}
      <mesh ref={ring2Ref} position={[0, 0, 0.004]}>
        <ringGeometry args={[0.065, 0.088, 32]} />
        <meshBasicMaterial
          color={isDark ? '#ff1744' : '#e11d48'}
          transparent
          opacity={0.65}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* ── 3. High-Speed 3D Curved Network Arcs with Multiple Photons ── */
function NetworkArc({
  startHub,
  endHub,
  index,
  isDark,
}: {
  startHub: Hub;
  endHub: Hub;
  index: number;
  isDark: boolean;
}) {
  const photon1Ref = useRef<THREE.Mesh>(null);
  const photon2Ref = useRef<THREE.Mesh>(null);

  const { curve, geometry } = useMemo(() => {
    const startVec = latLonToVector3(startHub.lat, startHub.lon, GLOBE_RADIUS * 1.015);
    const endVec = latLonToVector3(endHub.lat, endHub.lon, GLOBE_RADIUS * 1.015);

    const distance = startVec.distanceTo(endVec);
    const midVec = startVec.clone().add(endVec).multiplyScalar(0.5);
    
    // Smooth elevation proportional to distance
    const altitude = GLOBE_RADIUS * (1.14 + Math.min(distance * 0.1, 0.42));
    midVec.normalize().multiplyScalar(altitude);

    const bezier = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
    const points = bezier.getPoints(45);
    const geo = new THREE.BufferGeometry().setFromPoints(points);

    return { curve: bezier, geometry: geo };
  }, [startHub, endHub]);

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.6;
    const speed = 0.55 + (index % 5) * 0.15;

    if (photon1Ref.current) {
      const p1 = ((t * speed + index * 0.18) % 1);
      photon1Ref.current.position.copy(curve.getPointAt(p1));
    }

    if (photon2Ref.current) {
      const p2 = ((t * speed + index * 0.18 + 0.5) % 1);
      photon2Ref.current.position.copy(curve.getPointAt(p2));
    }
  });

  return (
    <group>
      {/* 3D Curved Glowing Arc Line */}
      <line geometry={geometry}>
        <lineBasicMaterial
          color={isDark ? '#ff2d55' : '#e11d48'}
          transparent
          opacity={isDark ? 0.6 : 0.42}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          linewidth={1.5}
          depthWrite={false}
        />
      </line>

      {/* Travelling Photon Pulse 1 */}
      <mesh ref={photon1Ref}>
        <sphereGeometry args={[0.032, 12, 12]} />
        <meshBasicMaterial
          color={isDark ? '#ffffff' : '#be123c'}
          transparent
          opacity={0.98}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </mesh>

      {/* Travelling Photon Pulse 2 */}
      <mesh ref={photon2Ref}>
        <sphereGeometry args={[0.024, 12, 12]} />
        <meshBasicMaterial
          color={isDark ? '#ff99aa' : '#ef4444'}
          transparent
          opacity={0.9}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </mesh>
    </group>
  );
}

/* ── 4. Cyber Latitudinal & Longitudinal Orbital Rings ── */
function CyberGridRings({ isDark }: { isDark: boolean }) {
  const rings = useMemo(() => {
    const list: JSX.Element[] = [];
    const ringColor = isDark ? '#38bdf8' : '#64748b';
    const ringOpacity = isDark ? 0.16 : 0.1;

    const latitudes = [-45, -23.5, 0, 23.5, 45, 66.5];
    latitudes.forEach((lat, i) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const ringRadius = GLOBE_RADIUS * Math.sin(phi);
      const ringY = GLOBE_RADIUS * Math.cos(phi);

      list.push(
        <mesh key={`lat-${i}`} position={[0, ringY, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[ringRadius - 0.007, ringRadius + 0.007, 64]} />
          <meshBasicMaterial
            color={ringColor}
            transparent
            opacity={ringOpacity}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      );
    });

    return list;
  }, [isDark]);

  return <group>{rings}</group>;
}

/* ── 5. Atmospheric Horizon Rim Glow (Matching User Reference Image) ── */
function AtmosphericLimb({ isDark }: { isDark: boolean }) {
  return (
    <group>
      {/* Inner Solid Planetary Core (Gives Depth & Hides Back Nodes) */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 0.99, 48, 48]} />
        <meshBasicMaterial
          color={isDark ? '#030712' : '#f5f3ef'}
          transparent
          opacity={isDark ? 0.96 : 0.88}
        />
      </mesh>

      {/* Radiant Electric Blue / Cyan Horizon Halo */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 1.035, 48, 48]} />
        <meshBasicMaterial
          color={isDark ? '#00e5ff' : '#60a5fa'}
          transparent
          opacity={isDark ? 0.24 : 0.14}
          side={THREE.BackSide}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Secondary Soft Ambient Outer Bloom */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 1.08, 48, 48]} />
        <meshBasicMaterial
          color={isDark ? '#3b82f6' : '#93c5fd'}
          transparent
          opacity={isDark ? 0.12 : 0.07}
          side={THREE.BackSide}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ── 6. Cosmic Space Dust & Star Particles ── */
const STAR_FIELD_POINTS = (() => {
  const pos: number[] = [];
  const count = 420;
  let seed = 42;
  const pseudoRandom = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < count; i++) {
    const radius = GLOBE_RADIUS * (1.5 + pseudoRandom() * 2.4);
    const theta = pseudoRandom() * Math.PI * 2;
    const phi = Math.acos(pseudoRandom() * 2 - 1);

    pos.push(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    );
  }
  return new Float32Array(pos);
})();

function StarField({ isDark }: { isDark: boolean }) {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[STAR_FIELD_POINTS, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isDark ? 0.026 : 0.018}
        color={isDark ? '#93c5fd' : '#64748b'}
        transparent
        opacity={isDark ? 0.5 : 0.28}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Main Interactive 3D World Globe Rig ── */
function GlobeScene({ isDark }: { isDark: boolean }) {
  const globeRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0.22, y: -0.35 });
  const currentRotation = useRef({ x: 0.22, y: -0.35 });
  const mousePos = useRef({ x: 0, y: 0 });
  const scrollOffset = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollOffset.current = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state) => {
    if (!globeRef.current) return;
    const t = state.clock.elapsedTime;

    const autoSpin = t * 0.045;
    const scrollSpin = scrollOffset.current * 0.0022;

    const mouseTiltX = mousePos.current.y * 0.18;
    const mouseTiltY = mousePos.current.x * 0.24;

    targetRotation.current.y = autoSpin + scrollSpin + mouseTiltY;
    targetRotation.current.x = 0.22 + mouseTiltX + scrollOffset.current * 0.00015;

    currentRotation.current.x = THREE.MathUtils.lerp(
      currentRotation.current.x,
      targetRotation.current.x,
      0.05
    );
    currentRotation.current.y = THREE.MathUtils.lerp(
      currentRotation.current.y,
      targetRotation.current.y,
      0.05
    );

    globeRef.current.rotation.x = currentRotation.current.x;
    globeRef.current.rotation.y = currentRotation.current.y;

    globeRef.current.position.y = -0.35 - scrollOffset.current * 0.0005;
  });

  const hubMap = useMemo(() => {
    const m = new Map<string, Hub>();
    GLOBAL_HUBS.forEach((h) => m.set(h.name, h));
    return m;
  }, []);

  return (
    <group ref={globeRef} position={[0, -0.35, -1.3]}>
      {/* Atmosphere Horizon Glow & Core */}
      <AtmosphericLimb isDark={isDark} />

      {/* Cyber Lat/Lon Grid Lines */}
      <CyberGridRings isDark={isDark} />

      {/* Continents Particle Cloud */}
      <ContinentParticles isDark={isDark} />

      {/* Glowing Red Beacon Stars (Nodes) */}
      {GLOBAL_HUBS.map((hub, idx) => (
        <GlowingRedBeaconNode
          key={hub.name}
          hub={hub}
          index={idx}
          isDark={isDark}
        />
      ))}

      {/* 3D Curved Red Network Arcs */}
      {NETWORK_LINKS.map(([startName, endName], idx) => {
        const startHub = hubMap.get(startName);
        const endHub = hubMap.get(endName);
        if (!startHub || !endHub) return null;
        return (
          <NetworkArc
            key={`${startName}-${endName}`}
            startHub={startHub}
            endHub={endHub}
            index={idx}
            isDark={isDark}
          />
        );
      })}

      {/* Distant Orbit Starfield */}
      <StarField isDark={isDark} />
    </group>
  );
}

/* ── Top-Level Exported Canvas Component ── */
export default function Hero3D() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="w-full h-full relative pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0.2, 5.0], fov: 44 }}
        dpr={[1, 1.8]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={isDark ? 0.45 : 0.85} />
        <directionalLight position={[5, 8, 5]} intensity={isDark ? 0.7 : 1.2} />
        <directionalLight position={[-5, -4, -3]} intensity={isDark ? 0.35 : 0.55} color={isDark ? '#38bdf8' : '#94a3b8'} />
        
        <GlobeScene isDark={isDark} />
      </Canvas>
    </div>
  );
}
