import { motion } from 'framer-motion'
import { Github, Linkedin, MapPin, ExternalLink } from 'lucide-react'

export default function ProfileCard() {
  return (
    <motion.div
      className="glass-purple glow-purple card-scanline w-full max-w-md relative overflow-hidden"
      style={{ padding: '2rem' }}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03, rotateY: -3, rotateX: -1 }}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168,85,247,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Top bar: ID label + College Logo */}
      <div className="flex items-start justify-between mb-5 relative z-10">
        <div>
          <p style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(168,85,247,0.7)', textTransform: 'uppercase' }}>
            Developer // ID
          </p>
          <p style={{ fontSize: 11, letterSpacing: '0.15em', color: 'rgba(168,85,247,0.9)', textTransform: 'uppercase', fontWeight: 600 }}>
            DYPSST // 2025
          </p>
        </div>

        {/* College Logo */}
        <div
          className="flex items-center justify-center rounded-xl overflow-hidden"
          style={{
            width: 52,
            height: 52,
            border: '1.5px solid rgba(168,85,247,0.5)',
            boxShadow: '0 0 16px rgba(168,85,247,0.4)',
            background: 'rgba(255,255,255,0.05)',
            padding: 4,
          }}
        >
          <img
            src="/styling/clglogo.png"
            alt="DYPSST College Logo"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.innerHTML = '<span style="font-size:9px;color:#a855f7;text-align:center;padding:4px">DYPSST</span>'
            }}
          />
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent)', marginBottom: '1.5rem' }} />

      {/* Profile section */}
      <div className="flex items-center gap-5 mb-6 relative z-10">
        {/* Avatar */}
        <div className="relative shrink-0">
          {/* Outer glow ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #a855f7, #00d4ff, #ec4899, #a855f7)',
              padding: 3,
              borderRadius: '50%',
              animation: 'spin 4s linear infinite',
            }}
          />
          <div
            className="relative rounded-full overflow-hidden img-ring"
            style={{
              width: 88,
              height: 88,
              border: '3px solid rgba(168,85,247,0.7)',
              boxShadow: '0 0 24px rgba(168,85,247,0.6), 0 0 48px rgba(168,85,247,0.2)',
            }}
          >
            <img
              src="/styling/Virendra.jpeg"
              alt="Virendra Gadekar"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.style.background = 'linear-gradient(135deg, #a855f7, #00d4ff)'
                e.target.parentElement.style.display = 'flex'
                e.target.parentElement.style.alignItems = 'center'
                e.target.parentElement.style.justifyContent = 'center'
                e.target.parentElement.innerHTML = '<span style="font-size:28px;font-weight:700;color:white">VG</span>'
              }}
            />
          </div>

          {/* Online status dot */}
          <div
            className="absolute bottom-1 right-1 rounded-full"
            style={{
              width: 14,
              height: 14,
              background: '#10f0a0',
              border: '2px solid rgba(40,5,60,0.9)',
              boxShadow: '0 0 8px #10f0a0',
            }}
          />
        </div>

        {/* Name & Info */}
        <div>
          <h2 className="text-glow-purple" style={{ fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
            Virendra
          </h2>
          <h2 className="gradient-text-purple" style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.2 }}>
            Gadekar
          </h2>
          <p style={{ fontSize: 12, color: '#a855f7', fontWeight: 500, marginTop: 4 }}>
            Full Stack Developer
          </p>
          <div className="flex items-center gap-1 mt-1">
            <MapPin size={10} color="rgba(148,163,184,0.6)" />
            <p style={{ fontSize: 11, color: 'rgba(148,163,184,0.6)' }}>DYPSST, Mumbai</p>
          </div>
        </div>
      </div>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-2 mb-6 relative z-10">
        {['React', 'Spring Boot', 'Three.js', 'Python', 'AI/ML'].map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: '#a855f7',
              background: 'rgba(168,85,247,0.12)',
              border: '1px solid rgba(168,85,247,0.3)',
              borderRadius: 6,
              padding: '3px 10px',
              letterSpacing: '0.05em',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 relative z-10">
        <motion.a
          href="https://github.com/viru0909-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glow flex items-center gap-2 flex-1 justify-center"
          style={{
            padding: '10px 16px',
            borderRadius: 12,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            textDecoration: 'none',
            cursor: 'pointer',
          }}
          whileHover={{
            background: 'rgba(255,255,255,0.14)',
            boxShadow: '0 0 20px rgba(255,255,255,0.15)',
            borderColor: 'rgba(255,255,255,0.3)',
          }}
          whileTap={{ scale: 0.96 }}
        >
          <Github size={15} />
          GitHub
          <ExternalLink size={11} style={{ opacity: 0.5 }} />
        </motion.a>

        <motion.a
          href="https://www.linkedin.com/in/virendragadekar/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glow flex items-center gap-2 flex-1 justify-center"
          style={{
            padding: '10px 16px',
            borderRadius: 12,
            background: 'linear-gradient(135deg, rgba(168,85,247,0.25), rgba(0,212,255,0.15))',
            border: '1px solid rgba(168,85,247,0.4)',
            color: '#c084fc',
            fontSize: 13,
            fontWeight: 600,
            textDecoration: 'none',
            cursor: 'pointer',
            boxShadow: '0 0 16px rgba(168,85,247,0.2)',
          }}
          whileHover={{
            background: 'linear-gradient(135deg, rgba(168,85,247,0.4), rgba(0,212,255,0.25))',
            boxShadow: '0 0 28px rgba(168,85,247,0.45)',
          }}
          whileTap={{ scale: 0.96 }}
        >
          <Linkedin size={15} />
          LinkedIn
          <ExternalLink size={11} style={{ opacity: 0.5 }} />
        </motion.a>
      </div>
    </motion.div>
  )
}
