import { PRIORITY_CONFIG, STATUS_CONFIG } from '../../utils/constants'

export function PriorityBadge({ priority }) {
  const config = PRIORITY_CONFIG[priority]
  if (!config) return null
  return (
    <span
      className="tag text-[10px] font-mono font-semibold uppercase tracking-wider"
      style={{ color: config.color, background: config.bg, borderColor: config.border }}
    >
      {config.label}
    </span>
  )
}

export function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status]
  if (!config) return null
  return (
    <span
      className="flex items-center gap-1.5 text-xs font-medium"
      style={{ color: config.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: config.color }} />
      {config.label}
    </span>
  )
}

export function TagBadge({ tag }) {
  return (
    <span className="tag text-[10px] text-text-muted border-base-500 bg-base-700">
      {tag}
    </span>
  )
}
