import { useSelector } from 'react-redux'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid
} from 'recharts'
import { selectAllTasks } from '../../features/tasks/tasksSlice'
import { PRIORITY_CONFIG, STATUS_CONFIG } from '../../utils/constants'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-base-700 border border-base-500 rounded-lg p-3 text-xs shadow-card">
        {label && <p className="text-text-muted mb-1">{label}</p>}
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.fill || p.color }}>{p.name}: <strong>{p.value}</strong></p>
        ))}
      </div>
    )
  }
  return null
}

export function StatusDistributionChart() {
  const tasks = useSelector(selectAllTasks)
  const data = Object.entries(STATUS_CONFIG).map(([key, cfg]) => ({
    name: cfg.label,
    value: tasks.filter(t => t.status === key).length,
    color: cfg.color,
  })).filter(d => d.value > 0)

  return (
    <div className="glass-card p-5">
      <h3 className="section-title mb-1">Status Distribution</h3>
      <p className="text-xs text-text-muted mb-4">{tasks.length} total tasks</p>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width="60%" height={160}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
              {data.map((entry, i) => <Cell key={i} fill={entry.color} stroke="transparent" />)}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-2">
          {data.map(d => (
            <div key={d.name} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
              <span className="text-xs text-text-secondary flex-1">{d.name}</span>
              <span className="text-xs font-mono font-bold" style={{ color: d.color }}>{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PriorityChart() {
  const tasks = useSelector(selectAllTasks)
  const data = Object.entries(PRIORITY_CONFIG).map(([key, cfg]) => ({
    name: cfg.label,
    count: tasks.filter(t => t.priority === key).length,
    fill: cfg.color,
  }))

  return (
    <div className="glass-card p-5">
      <h3 className="section-title mb-1">Priority Breakdown</h3>
      <p className="text-xs text-text-muted mb-4">Tasks by priority level</p>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} barSize={28}>
          <XAxis dataKey="name" tick={{ fill: '#A0A0C0', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#606080', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function VelocityChart() {
  // Simulated velocity data
  const data = [
    { week: 'W1', completed: 3, created: 5 },
    { week: 'W2', completed: 5, created: 4 },
    { week: 'W3', completed: 4, created: 6 },
    { week: 'W4', completed: 7, created: 5 },
    { week: 'W5', completed: 6, created: 3 },
    { week: 'W6', completed: 8, created: 7 },
  ]

  return (
    <div className="glass-card p-5">
      <h3 className="section-title mb-1">Team Velocity</h3>
      <p className="text-xs text-text-muted mb-4">Tasks created vs completed by week</p>
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1A1A2A" />
          <XAxis dataKey="week" tick={{ fill: '#A0A0C0', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#606080', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="completed" stroke="#00E5FF" strokeWidth={2} dot={{ fill: '#00E5FF', r: 3 }} name="Completed" />
          <Line type="monotone" dataKey="created" stroke="#7C3AED" strokeWidth={2} dot={{ fill: '#7C3AED', r: 3 }} strokeDasharray="4 2" name="Created" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
