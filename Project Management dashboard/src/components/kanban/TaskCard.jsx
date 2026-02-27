import { useDispatch, useSelector } from 'react-redux'
import { Draggable } from '@hello-pangea/dnd'
import { MessageSquare, Paperclip, Calendar } from 'lucide-react'
import { setActiveTask } from '../../features/tasks/tasksSlice'
import { openTaskModal } from '../../features/ui/uiSlice'
import { selectMembers } from '../../features/members/membersSlice'
import { PriorityBadge, TagBadge } from '../common/Badge'
import { AvatarGroup } from '../common/Avatar'
import { formatDate, isOverdue } from '../../utils/helpers'

export default function TaskCard({ task, index }) {
  const dispatch = useDispatch()
  const members = useSelector(selectMembers)
  const assignees = members.filter(m => task.assignees.includes(m.id))
  const overdue = isOverdue(task.dueDate)

  const handleClick = () => {
    dispatch(setActiveTask(task.id))
    dispatch(openTaskModal())
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleClick}
          className={`
            glass-card p-3.5 cursor-pointer group
            hover:border-base-400 hover:-translate-y-0.5
            active:scale-[0.98] transition-all duration-150
            ${snapshot.isDragging ? 'shadow-glow-cyan border-accent-cyan/40 rotate-1 scale-105' : ''}
            ${overdue && task.status !== 'done' ? 'border-accent-rose/30 urgent-pulse' : ''}
          `}
        >
          {/* Tags */}
          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {task.tags.slice(0, 3).map(tag => <TagBadge key={tag} tag={tag} />)}
              {task.tags.length > 3 && <span className="text-[10px] text-text-muted">+{task.tags.length - 3}</span>}
            </div>
          )}

          {/* Title */}
          <p className="text-sm font-medium text-text-primary mb-2 leading-snug group-hover:text-white transition-colors line-clamp-2">
            {task.title}
          </p>

          {/* Priority */}
          <div className="mb-3">
            <PriorityBadge priority={task.priority} />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Due date */}
              {task.dueDate && (
                <div className={`flex items-center gap-1 text-[10px] font-mono ${overdue && task.status !== 'done' ? 'text-accent-rose' : 'text-text-muted'}`}>
                  <Calendar size={10} />
                  {formatDate(task.dueDate, 'MMM d')}
                </div>
              )}
              {/* Comments */}
              {task.comments.length > 0 && (
                <div className="flex items-center gap-1 text-[10px] text-text-muted">
                  <MessageSquare size={10} />
                  {task.comments.length}
                </div>
              )}
              {/* Attachments */}
              {task.attachments.length > 0 && (
                <div className="flex items-center gap-1 text-[10px] text-text-muted">
                  <Paperclip size={10} />
                  {task.attachments.length}
                </div>
              )}
            </div>

            {/* Assignees */}
            {assignees.length > 0 && (
              <AvatarGroup members={assignees} size="xs" max={3} />
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
}
