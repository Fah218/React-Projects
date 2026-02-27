import { getInitials, getAvatarColor } from '../../utils/helpers'

const sizes = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
}

export default function Avatar({ member, size = 'sm', className = '', showTooltip = false }) {
  if (!member) return null
  const initials = getInitials(member.name)
  const color = getAvatarColor(member.name)

  return (
    <div className={`relative inline-block group ${className}`}>
      <div
        className={`${sizes[size]} rounded-full flex items-center justify-center font-display font-bold flex-shrink-0 ring-2 ring-base-800`}
        style={{ backgroundColor: color + '20', color, borderColor: color + '40' }}
        title={member.name}
      >
        {initials}
      </div>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-base-600 text-text-primary text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 border border-base-500">
          {member.name}
          <div className="text-text-muted text-[10px]">{member.role}</div>
        </div>
      )}
    </div>
  )
}

export function AvatarGroup({ members, size = 'sm', max = 3 }) {
  const visible = members.slice(0, max)
  const extra = members.length - max

  return (
    <div className="flex -space-x-2">
      {visible.map(m => (
        <Avatar key={m.id} member={m} size={size} showTooltip />
      ))}
      {extra > 0 && (
        <div className={`${sizes[size]} rounded-full bg-base-600 border-2 border-base-800 flex items-center justify-center text-[10px] font-bold text-text-secondary`}>
          +{extra}
        </div>
      )}
    </div>
  )
}
