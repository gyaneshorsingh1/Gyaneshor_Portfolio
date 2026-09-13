"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Timer } from "three";

type ScrollSculptureProps = {
  reduced?: boolean;
};

export function ScrollSculpture({ reduced = false }: ScrollSculptureProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduceMotion = motionQuery.matches;

    let webgl = true;
    try {
      const test = document.createElement("canvas");
      webgl = !!(
        test.getContext("webgl") || test.getContext("experimental-webgl")
      );
    } catch {
      webgl = false;
    }
    if (!webgl) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: !reduced,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, reduced ? 1.15 : 1.6),
    );
    wrap.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
    camera.position.set(0, 0, 6.2);

    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const key = new THREE.PointLight(0x9fd7e4, 0.85);
    key.position.set(3.4, 2.2, 4.2);
    scene.add(key);
    const rim = new THREE.PointLight(0xffffff, 0.22);
    rim.position.set(-3.2, -1.4, 2.2);
    scene.add(rim);

    const sculpture = new THREE.Group();
    scene.add(sculpture);

    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x161616,
      metalness: 0.72,
      roughness: 0.28,
      emissive: 0x7ec8d8,
      emissiveIntensity: 0.1,
      transparent: true,
      opacity: 0.92,
    });

    const segments = reduced ? 64 : 96;
    const radial = reduced ? 8 : 12;

    const outer = new THREE.Mesh(
      new THREE.TorusGeometry(1.72, 0.012, radial, segments),
      ringMat,
    );
    const mid = new THREE.Mesh(
      new THREE.TorusGeometry(1.38, 0.01, radial, segments),
      ringMat.clone(),
    );
    mid.rotation.x = Math.PI / 2;
    const inner = new THREE.Mesh(
      new THREE.TorusGeometry(1.04, 0.008, radial, Math.max(48, segments - 16)),
      ringMat.clone(),
    );
    inner.rotation.y = Math.PI / 2;

    const core = new THREE.Mesh(
      new THREE.OctahedronGeometry(reduced ? 0.28 : 0.34, 0),
      new THREE.MeshStandardMaterial({
        color: 0x0c0c0c,
        emissive: 0x7ec8d8,
        emissiveIntensity: 0.2,
        wireframe: true,
        transparent: true,
        opacity: 0.62,
      }),
    );

    sculpture.add(outer, mid, inner, core);

    const geometries = [outer.geometry, mid.geometry, inner.geometry, core.geometry];
    const materials = [outer.material, mid.material, inner.material, core.material];

    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);

    const scroll = { current: 0, target: 0 };
    const readScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      scroll.target = max <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / max));
    };
    readScroll();
    window.addEventListener("scroll", readScroll, { passive: true });

    const timer = new Timer();
    timer.connect(document);

    let raf = 0;
    const tick = (timestamp: number) => {
      timer.update(timestamp);
      scroll.current += (scroll.target - scroll.current) * 0.075;

      const p = scroll.current;
      const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

      if (!reduceMotion) {
        sculpture.rotation.y =
          ease * Math.PI * 1.15 + pointer.x * 0.12;
        sculpture.rotation.x =
          0.16 + Math.sin(ease * Math.PI) * 0.2 + pointer.y * 0.06;
        sculpture.position.x = Math.sin(ease * Math.PI * 2) * 0.72;
        sculpture.position.y = Math.cos(ease * Math.PI) * 0.12;

        const spin = ease * 0.85;
        outer.rotation.z = spin * 0.35;
        mid.rotation.z = -spin * 0.28;
        inner.rotation.z = spin * 0.22;
        core.rotation.y = spin * 0.4;
      }

      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);

    const onVisibility = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        raf = window.requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", readScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
      timer.dispose();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => (m as THREE.Material).dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [reduced]);

  return <div ref={wrapRef} className="absolute inset-0" />;
}
