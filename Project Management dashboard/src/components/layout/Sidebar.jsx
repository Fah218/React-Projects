import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  LayoutDashboard, Kanban, Users, Settings,
  ChevronLeft, ChevronRight, Zap, Bell
} from 'lucide-react'
import { toggleSidebar } from '../../features/ui/uiSlice'
import { selectCurrentUser } from '../../features/members/membersSlice'
import { selectStats } from '../../features/tasks/tasksSlice'
import Avatar from '../common/Avatar'

const NAV_ITEMS = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/board', icon: Kanban, label: 'Kanban Board' },
  { to: '/team', icon: Users, label: 'Team' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  const dispatch = useDispatch()
  const collapsed = useSelector(s => s.ui.sidebarCollapsed)
  const currentUser = useSelector(selectCurrentUser)
  const stats = useSelector(selectStats)

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} flex-shrink-0 bg-base-900 border-r border-base-700 flex flex-col transition-all duration-300 relative`}>
      {/* Logo */}
      <div className={`h-16 flex items-center border-b border-base-700 px-4 ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center flex-shrink-0">
          <Zap size={16} className="text-accent-cyan" />
        </div>
        {!collapsed && (
          <div>
            <div className="font-display font-bold text-text-primary text-sm leading-none">FlowBoard</div>
            <div className="text-[10px] text-text-muted font-mono mt-0.5">PROJECT MANAGEMENT</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group relative
              ${isActive
                ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20'
                : 'text-text-secondary hover:text-text-primary hover:bg-base-700'
              } ${collapsed ? 'justify-center' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} className="flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{label}</span>}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-2 py-1 bg-base-600 text-text-primary text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 border border-base-500">
                    {label}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Stats */}
      {!collapsed && (
        <div className="mx-3 mb-3 p-3 bg-base-800 border border-base-600 rounded-xl">
          <div className="text-[10px] font-mono text-text-muted uppercase tracking-wider mb-3">Sprint Progress</div>
          <div className="flex justify-between text-xs mb-2">
            <span className="text-text-secondary">{stats.done}/{stats.total} tasks</span>
            <span className="text-accent-cyan font-bold">{stats.completion}%</span>
          </div>
          <div className="h-1.5 bg-base-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-cyan rounded-full transition-all duration-500"
              style={{ width: `${stats.completion}%` }}
            />
          </div>
          {stats.overdue > 0 && (
            <div className="mt-2 text-[10px] text-accent-rose flex items-center gap-1">
              <Bell size={10} /> {stats.overdue} overdue task{stats.overdue > 1 ? 's' : ''}
            </div>
          )}
        </div>
      )}

      {/* User */}
      <div className={`p-3 border-t border-base-700 flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
        <Avatar member={currentUser} size="sm" />
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-text-primary truncate">{currentUser?.name}</div>
            <div className="text-[10px] text-text-muted truncate">{currentUser?.role}</div>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="absolute -right-3 top-20 w-6 h-6 bg-base-700 border border-base-500 rounded-full flex items-center justify-center hover:bg-base-600 transition-colors z-10"
      >
        {collapsed ? <ChevronRight size={12} className="text-text-secondary" /> : <ChevronLeft size={12} className="text-text-secondary" />}
      </button>
    </aside>
  )
}
