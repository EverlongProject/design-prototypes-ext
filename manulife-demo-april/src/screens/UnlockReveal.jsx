import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import UnlockTile from '../components/UnlockTile.jsx'
import PrimaryCTA from '../components/PrimaryCTA.jsx'

export default function UnlockReveal({ heading, subheading, tiles = [], primary, secondary }) {
  return (
    <div className="h-full w-full flex flex-col bg-bg-alt">
      <div className="pt-safe bg-white border-b border-stroke">
        <div className="flex items-center justify-center gap-2 px-4 h-12">
          <div className="w-5 h-5 rounded-full bg-manulife-green text-white flex items-center justify-center">
            <Check size={13} strokeWidth={3} />
          </div>
          <div className="text-ink font-semibold text-[15px]">Policy Activated</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <h1 className="text-ink text-2xl font-bold leading-tight mb-2">{heading}</h1>
        <p className="text-ink-soft text-[15px] leading-snug mb-5">{subheading}</p>

        <div className="space-y-2">
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.key}
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1, ease: 'easeOut' }}
            >
              <UnlockTile title={tile.title} subtitle={tile.subtitle} asset={tile.asset} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-2 pb-safe space-y-2">
        {primary && <PrimaryCTA>{primary.replace(/\s*→\s*$/, '')}</PrimaryCTA>}
        {secondary && (
          <div className="w-full text-center text-manulife-green font-semibold py-3">
            {secondary}
          </div>
        )}
      </div>
    </div>
  )
}
