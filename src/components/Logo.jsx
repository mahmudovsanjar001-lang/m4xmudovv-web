import { LOGO_RATIO } from '../constants'

export default function Logo({ size = 30 }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-semibold tracking-tight">
      <img src="/logo-mark.webp" width={Math.round(size * LOGO_RATIO)} height={size} alt="" style={{ height: size }} className="w-auto" />
      <span>m4xmudovv</span>
    </span>
  )
}
