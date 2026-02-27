import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext } from '@hello-pangea/dnd'
import { moveTask, selectTasksByStatus } from '../../features/tasks/tasksSlice'
import { COLUMN_ORDER } from '../../utils/constants'
import KanbanColumn from './KanbanColumn'

export default function KanbanBoard() {
  const dispatch = useDispatch()
  const tasksByStatus = useSelector(selectTasksByStatus)

  const onDragEnd = (result) => {
    const { destination, draggableId } = result
    if (!destination) return
    const newStatus = destination.droppableId
    dispatch(moveTask({ taskId: draggableId, newStatus }))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-5 overflow-x-auto pb-4 min-h-full">
        {COLUMN_ORDER.map(status => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={tasksByStatus[status] || []}
          />
        ))}
      </div>
    </DragDropContext>
  )
}
