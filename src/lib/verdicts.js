export const VERDICTS = [
  { min: 9.8, label: 'Legendary', color: '#f5c842', tw: 'text-yellow-400 border-yellow-400/40 bg-yellow-400/10' },
  { min: 8.5, label: 'Superb',    color: '#e0000a', tw: 'text-red-500   border-red-500/40   bg-red-600/10'     },
  { min: 7.5, label: 'Excellent', color: '#ff6030', tw: 'text-orange-400 border-orange-400/40 bg-orange-500/10' },
  { min: 6.5, label: 'Good',      color: '#4ade80', tw: 'text-green-400 border-green-400/40 bg-green-500/10'   },
  { min: 5.0, label: 'Average',   color: '#94a3b8', tw: 'text-slate-400 border-slate-400/40 bg-slate-500/10'   },
  { min: 0,   label: 'Poor',      color: '#ef4444', tw: 'text-red-400   border-red-400/40   bg-red-500/10'     },
]
export const getVerdict = r => VERDICTS.find(v => parseFloat(r) >= v.min) || VERDICTS[5]
export const safePct    = (a, b) => { const n = parseFloat(b); return n ? Math.round((parseFloat(a) / n) * 100) : 0 }
