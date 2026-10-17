import { useState, useEffect } from 'react';
import { AppTheme } from '../types';

export function useTheme() {
  const [theme, setTheme] = useState<AppTheme>(() => {
    const saved = localStorage.getItem('carrierpilot-theme') as AppTheme;
    // Default to 'emerald' as requested
    return saved === 'cyberpunk' || saved === 'm3' ? 'emerald' : (saved || 'emerald');
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('carrierpilot-theme', theme);
  }, [theme]);

  const themes: { id: AppTheme; label: string; tag: string; description: string }[] = [
    {
      id: 'emerald',
      label: 'Emerald Horizon',
      tag: 'Default • Emerald Green',
      description: 'Surface #f9f9ff, Emerald #10b981 & #059669, Deep CTA #047857'
    },
    {
      id: 'cyberpunk',
      label: 'Luminous Cyberpunk',
      tag: 'Dark 3D Edition',
      description: 'Obsidian #0d0e13, Neon Indigo #6366f1, Cyan Glow #06b6d4'
    },
    {
      id: 'm3',
      label: 'Material Design 3',
      tag: 'M3 Edition',
      description: 'Surface #f3fbf5, Primary #006a4e, Pill Badges #c8eed9'
    }
  ];

  return { theme, setTheme, themes };
}
