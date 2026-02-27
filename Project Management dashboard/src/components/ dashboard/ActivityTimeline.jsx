import { useSelector } from 'react-redux'
import { selectAllTasks } from '../../features/tasks/tasksSlice'
import { selectMembers } from '../../features/members/membersSlice'
import Avatar from '../common/Avatar'
import { formatRelativeDate } from '../../utils/helpers'

const TYPE_COLORS = {
  created: '#00E5FF', status_change: '#7C3AED', comment: '#F59E0B',
  attachment: '#10B981', assigned: '#F43F5E',
}

export default function ActivityTimeline() {
  const tasks = useSelector(selectAllTasks)
  const members = useSelector(selectMembers)

  // Gather all activity across tasks
  const allActivity = tasks.flatMap(task =>
    task.activity.map(act => ({ ...act, taskTitle: task.title, taskId: task.id }))
  ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 12)

  return (
    <div className="glass-card p-5 h-full">
      <h3 className="section-title mb-4">Recent Activity</h3>
      <div className="space-y-4 overflow-y-auto max-h-80">
        {allActivity.map(act => {
          const member = members.find(m => m.id === act.userId)
          const color = TYPE_COLORS[act.type] || '#606080'
          return (
            <div key={act.id} className="flex gap-3">
              <div className="relative flex-shrink-0">
                <Avatar member={member} size="xs" />
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-base-800"
                  style={{ background: color }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-secondary leading-relaxed">
                  <span className="font-semibold text-text-primary">{member?.name?.split(' ')[0]}</span>
                  {' '}{act.detail.toLowerCase()}
                </p>
                <p className="text-[10px] text-text-muted font-mono mt-0.5 truncate">
                  {act.taskTitle} · {formatRelativeDate(act.timestamp)}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
