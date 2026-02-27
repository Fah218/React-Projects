import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Plus, Bell, Search } from 'lucide-react'
import { openCreateTaskModal } from '../../features/ui/uiSlice'

const TITLES = {
  '/': 'Dashboard',
  '/board': 'Kanban Board',
  '/team': 'Team',
  '/settings': 'Settings',
}

export default function Header() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const title = TITLES[pathname] || 'FlowBoard'

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-base-700 bg-base-900/50 backdrop-blur-sm flex-shrink-0">
      <div>
        <h1 className="font-display font-bold text-xl text-text-primary">{title}</h1>
        <p className="text-xs text-text-muted font-mono">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="btn-ghost">
          <Search size={16} />
        </button>
        <button className="btn-ghost relative">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent-rose rounded-full" />
        </button>
        <button
          onClick={() => dispatch(openCreateTaskModal())}
          className="btn-primary"
        >
          <Plus size={16} />
          New Task
        </button>
      </div>
    </header>
  )
}
