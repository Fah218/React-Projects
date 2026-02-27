import { useDispatch, useSelector } from 'react-redux'
import { Search, X, ChevronDown } from 'lucide-react'
import { setFilter, clearFilters, selectFilter } from '../../features/tasks/tasksSlice'
import { selectMembers } from '../../features/members/membersSlice'
import { PRIORITY_CONFIG, TAGS } from '../../utils/constants'
import { useState } from 'react'
import Avatar from '../common/Avatar'

export default function FilterBar() {
  const dispatch = useDispatch()
  const filter = useSelector(selectFilter)
  const members = useSelector(selectMembers)
  const [showPriority, setShowPriority] = useState(false)
  const [showAssignee, setShowAssignee] = useState(false)

  const hasActiveFilters = filter.search || filter.priority.length || filter.assignee.length || filter.tags.length

  const togglePriority = (p) => {
    const current = filter.priority
    dispatch(setFilter({ priority: current.includes(p) ? current.filter(x => x !== p) : [...current, p] }))
  }

  const toggleAssignee = (id) => {
    const current = filter.assignee
    dispatch(setFilter({ assignee: current.includes(id) ? current.filter(x => x !== id) : [...current, id] }))
  }

  const toggleTag = (tag) => {
    const current = filter.tags
    dispatch(setFilter({ tags: current.includes(tag) ? current.filter(x => x !== tag) : [...current, tag] }))
  }

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {/* Search */}
      <div className="relative flex-1 min-w-48 max-w-64">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          className="input-field pl-9"
          placeholder="Search tasks..."
          value={filter.search}
          onChange={e => dispatch(setFilter({ search: e.target.value }))}
        />
      </div>

      {/* Priority dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowPriority(!showPriority)}
          className={`btn-ghost text-xs ${filter.priority.length ? 'text-accent-cyan border-accent-cyan/30 border' : ''}`}
        >
          Priority {filter.priority.length > 0 && `(${filter.priority.length})`}
          <ChevronDown size={12} />
        </button>
        {showPriority && (
          <div className="absolute top-full mt-1 left-0 bg-base-700 border border-base-500 rounded-xl p-2 z-20 min-w-36 shadow-card animate-scale-in">
            {Object.entries(PRIORITY_CONFIG).map(([key, cfg]) => (
              <button
                key={key}
                onClick={() => togglePriority(key)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-2 transition-colors
                  ${filter.priority.includes(key) ? 'bg-base-600' : 'hover:bg-base-600'}`}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
                <span style={{ color: filter.priority.includes(key) ? cfg.color : undefined }}>{cfg.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Assignee dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowAssignee(!showAssignee)}
          className={`btn-ghost text-xs ${filter.assignee.length ? 'text-accent-cyan border-accent-cyan/30 border' : ''}`}
        >
          Assignee {filter.assignee.length > 0 && `(${filter.assignee.length})`}
          <ChevronDown size={12} />
        </button>
        {showAssignee && (
          <div className="absolute top-full mt-1 left-0 bg-base-700 border border-base-500 rounded-xl p-2 z-20 min-w-44 shadow-card animate-scale-in">
            {members.map(m => (
              <button
                key={m.id}
                onClick={() => toggleAssignee(m.id)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-2 transition-colors
                  ${filter.assignee.includes(m.id) ? 'bg-base-600' : 'hover:bg-base-600'}`}
              >
                <Avatar member={m} size="xs" />
                <span className={filter.assignee.includes(m.id) ? 'text-accent-cyan' : 'text-text-secondary'}>{m.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {TAGS.slice(0, 6).map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`text-[10px] px-2 py-1 rounded-md border transition-colors font-mono
              ${filter.tags.includes(tag)
                ? 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30'
                : 'bg-base-800 text-text-muted border-base-600 hover:border-base-400'}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Clear */}
      {hasActiveFilters && (
        <button
          onClick={() => dispatch(clearFilters())}
          className="btn-ghost text-accent-rose text-xs"
        >
          <X size={12} /> Clear
        </button>
      )}

      {/* Click outside handler */}
      {(showPriority || showAssignee) && (
        <div className="fixed inset-0 z-10" onClick={() => { setShowPriority(false); setShowAssignee(false) }} />
      )}
    </div>
  )
}
