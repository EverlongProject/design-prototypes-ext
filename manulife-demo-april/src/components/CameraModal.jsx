import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap, RefreshCw } from 'lucide-react'

export default function CameraModal({ open, imageSrc, onCapture, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-[60] bg-black flex flex-col"
        >
          <div className="flex items-center justify-between px-4 pt-safe pt-3 pb-3 text-white">
            <button onClick={onClose} className="p-2">
              <X size={24} />
            </button>
            <Zap size={20} />
          </div>

          <div className="flex-1 relative overflow-hidden bg-black">
            {imageSrc ? (
              <img src={imageSrc} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-b from-gray-800 to-gray-900" />
            )}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[11px] font-semibold rounded-full px-3 py-1">
              Log your meal
            </div>
          </div>

          <div className="px-8 pt-6 pb-10 bg-black flex items-center justify-between">
            <div className="w-10 h-10" />
            <button
              onClick={onCapture}
              className="w-[72px] h-[72px] rounded-full bg-white border-[6px] border-white flex items-center justify-center active:scale-95 transition-transform"
            >
              <div className="w-full h-full rounded-full bg-white ring-4 ring-black" />
            </button>
            <button className="w-10 h-10 text-white flex items-center justify-center">
              <RefreshCw size={22} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
