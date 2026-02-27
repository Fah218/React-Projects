export default function StatsCard({ title, value, subtitle, icon: Icon, color = '#00E5FF', trend }) {
  return (
    <div className="glass-card-hover p-5 relative overflow-hidden group">
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity blur-2xl"
        style={{ background: color }}
      />

      <div className="flex items-start justify-between relative">
        <div>
          <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">{title}</p>
          <p className="font-display font-bold text-3xl text-text-primary mb-1">{value}</p>
          {subtitle && <p className="text-xs text-text-secondary">{subtitle}</p>}
          {trend !== undefined && (
            <p className={`text-xs font-medium mt-1 ${trend >= 0 ? 'text-accent-emerald' : 'text-accent-rose'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last sprint
            </p>
          )}
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: color + '15', border: `1px solid ${color}30` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
      </div>
    </div>
  )
}
