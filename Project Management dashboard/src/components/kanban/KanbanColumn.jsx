import { Droppable } from '@hello-pangea/dnd'
import { Plus } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { openCreateTaskModal } from '../../features/ui/uiSlice'
import { STATUS_CONFIG } from '../../utils/constants'
import TaskCard from './TaskCard'

export default function KanbanColumn({ status, tasks }) {
  const dispatch = useDispatch()
  const config = STATUS_CONFIG[status]

  return (
    <div className="flex flex-col w-72 flex-shrink-0">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: config.accent }} />
          <span className="font-display font-semibold text-sm text-text-primary">{config.label}</span>
          <span
            className="text-xs font-mono px-2 py-0.5 rounded-full"
            style={{
              background: config.accent + '15',
              color: config.accent,
              border: `1px solid ${config.accent}30`
            }}
          >
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => dispatch(openCreateTaskModal(status))}
          className="btn-ghost p-1.5 rounded-lg"
          title={`Add task to ${config.label}`}
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Accent line */}
      <div className="h-0.5 rounded-full mb-3" style={{ background: `linear-gradient(to right, ${config.accent}60, transparent)` }} />

      {/* Droppable area */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 min-h-24 space-y-2.5 rounded-xl p-2 transition-colors duration-150
              ${snapshot.isDraggingOver ? 'bg-accent-cyan/5 border border-dashed border-accent-cyan/30' : 'border border-transparent'}`}
          >
            {tasks.map((task, i) => (
              <TaskCard key={task.id} task={task} index={i} />
            ))}
            {provided.placeholder}

            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-10 h-10 rounded-xl bg-base-800 border border-base-600 flex items-center justify-center mb-2 opacity-50">
                  <Plus size={16} className="text-text-muted" />
                </div>
                <p className="text-xs text-text-muted">Drop tasks here</p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  )
}
