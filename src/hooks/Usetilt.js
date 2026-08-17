import { useState } from 'react';

// Extracted from ProductCard's mouse-move handler — the 3D tilt +
// glow-follow effect used on every collection card. Any element that
// wants this effect just needs a ref and this hook; no copy-pasted
// mouse-math in the component itself.
export function useTilt(ref, { maxTilt = 10 } = {}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  function handleMouseMove(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -maxTilt, y: (px - 0.5) * maxTilt });
    setGlow({ x: px * 100, y: py * 100 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return { tilt, glow, handleMouseMove, handleMouseLeave };
}