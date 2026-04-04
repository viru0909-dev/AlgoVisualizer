import { motion } from 'framer-motion'
import { Zap, Navigation, Mouse, Layers, Smartphone, Star } from 'lucide-react'

const rules = [
  {
    icon: <Navigation size={16} />,
    title: 'Explore the Visualizer',
    desc: 'Navigate the pathfinding algorithms in real-time on the interactive grid.',
  },
  {
    icon: <Mouse size={16} />,
    title: 'Mouse Interaction',
    desc: 'Move your mouse to influence the 3D particle field in the background.',
  },
  {
    icon: <Layers size={16} />,
    title: 'Multiple Algorithms',
    desc: 'Switch between BFS, DFS, Dijkstra, and A* from the control panel.',
  },
  {
    icon: <Zap size={16} />,
    title: 'Draw Walls',
    desc: 'Click and drag on the grid to place or remove obstacle walls.',
  },
  {
    icon: <Star size={16} />,
    title: 'Set Start & End',
    desc: 'Drag the start (green) and end (red) nodes anywhere on the grid.',
  },
  {
    icon: <Smartphone size={16} />,
    title: 'Responsive Design',
    desc: 'Fully optimized for desktop, tablet, and mobile experiences.',
  },
]

export default function RulesCard() {
  return (
    <motion.div
      className="glass glow-blue card-scanline w-full max-w-md relative"
      style={{ padding: '2rem' }}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03, rotateY: 3, rotateX: -1 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 40,
            height: 40,
            background: 'linear-gradient(135deg, #00d4ff, #0080ff)',
            boxShadow: '0 0 16px rgba(0,212,255,0.6)',
          }}
        >
          <Zap size={18} color="#fff" />
        </div>
        <div>
          <p style={{ fontSize: 11, letterSpacing: '0.2em', color: '#00d4ff', textTransform: 'uppercase', marginBottom: 2 }}>
            Platform Guide
          </p>
          <h2 className="text-glow-blue" style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>
            How to Use
          </h2>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, #00d4ff44, transparent)', marginBottom: '1.5rem' }} />

      {/* Rules list */}
      <ul className="flex flex-col gap-4">
        {rules.map((rule, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-3 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
          >
            <div
              className="flex items-center justify-center rounded-lg shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
              style={{
                width: 30,
                height: 30,
                background: 'rgba(0, 212, 255, 0.1)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                color: '#00d4ff',
              }}
            >
              {rule.icon}
            </div>
            <div>
              <p style={{ fontWeight: 600, fontSize: 14, color: '#e2e8f0', marginBottom: 2 }}>{rule.title}</p>
              <p style={{ fontSize: 12.5, color: 'rgba(148, 163, 184, 0.85)', lineHeight: '1.5' }}>{rule.desc}</p>
            </div>
          </motion.li>
        ))}
      </ul>

      {/* Footer tag */}
      <div
        className="absolute bottom-4 right-4"
        style={{ fontSize: 10, color: 'rgba(0,212,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase' }}
      >
        v1.0 // antigravity
      </div>
    </motion.div>
  )
}
