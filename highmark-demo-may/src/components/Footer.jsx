import { Linkedin } from 'lucide-react'

const ASSET = (name) => `${import.meta.env.BASE_URL}assets/${name}`

// Footer shown on the Benefits and Journey pages. Mirrors the Figma
// (Highmark logo + Legal/All Languages + social + app store badges +
// fine print).
export default function Footer() {
  return (
    <footer className="w-full bg-highmark-primary-pastel/40 border-t border-border mt-12">
      <div className="max-w-[1100px] mx-auto px-8 py-8">
        <div className="flex items-start justify-between gap-8 mb-6">
          <div className="flex items-center gap-6">
            <img src={ASSET('Highmark-Logo.svg')} alt="" className="h-7 w-auto" />
            <a className="font-sans text-button-2 text-highmark-primary hover:underline" href="#">Legal</a>
            <a className="font-sans text-button-2 text-highmark-primary hover:underline" href="#">All Languages</a>
          </div>

          <div className="flex items-center gap-3 text-ink-subdued">
            <a aria-label="LinkedIn" href="#" className="hover:text-highmark-primary">
              <Linkedin className="w-5 h-5" />
            </a>
            <a aria-label="Blog" href="#" className="hover:text-highmark-primary">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-ink-subdued text-white text-[10px] font-bold">B</span>
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 h-9 px-3 rounded border border-ink/20 text-ink font-sans text-caption">
            <span className="font-bold text-base"></span>
            <span className="leading-tight">
              <span className="block text-[10px] text-ink-subdued">Download on the</span>
              <span className="block text-[12px] font-semibold">App Store</span>
            </span>
          </span>
          <span className="inline-flex items-center gap-2 h-9 px-3 rounded border border-ink/20 text-ink font-sans text-caption">
            <span className="font-bold text-base">▶</span>
            <span className="leading-tight">
              <span className="block text-[10px] text-ink-subdued">GET IT ON</span>
              <span className="block text-[12px] font-semibold">Google Play</span>
            </span>
          </span>
        </div>

        <div className="font-sans text-[11px] text-ink-subdued leading-relaxed space-y-2 max-w-[820px]">
          <p>©Highmark is a registered mark of Highmark Inc. ©2023 Highmark Inc., All Rights Reserved.</p>
          <p>®Blue Shield and the Shield symbol are registered service marks of the BlueCross and Blue Shield Association, an association of independent Blue Cross and Blue Shield plans.</p>
          <p>Important Legal Information: Health care benefit programs are issued or administered by or through Highmark Blue Shield, Highmark Select Resources, Highmark Benefits Group, [Highmark Senior Health Company,] or Highmark Health Insurance Company, all of which are independent licensees of the Blue Cross and Blue Shield Association, an association of independent Blue Cross and Blue Shield plans.</p>
          <p>Y0037_23_2036_M</p>
        </div>
      </div>
    </footer>
  )
}
