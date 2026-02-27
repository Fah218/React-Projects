import { createSlice } from '@reduxjs/toolkit'
import { generateId } from '../../utils/helpers'

const now = new Date()
const d = (offsetDays) => {
  const date = new Date(now)
  date.setDate(date.getDate() + offsetDays)
  return date.toISOString().split('T')[0]
}

const SEED_TASKS = [
  {
    id: 't1', title: 'Design new onboarding flow', description: 'Create wireframes and high-fidelity mockups for the new user onboarding experience. Focus on reducing drop-off rates.',
    status: 'done', priority: 'high', assignees: ['m2'], tags: ['Design', 'UX'],
    dueDate: d(-3), createdAt: d(-14), updatedAt: d(-3),
    comments: [
      { id: 'c1', userId: 'm1', text: 'Looks great! Just need to review the mobile version.', createdAt: d(-5) },
      { id: 'c2', userId: 'm2', text: 'Updated the mobile screens, ready for review.', createdAt: d(-4) },
    ],
    attachments: [
      { id: 'a1', name: 'onboarding-v2.fig', size: 2048000, uploadedAt: d(-4), userId: 'm2' }
    ],
    activity: [
      { id: 'ac1', type: 'created', userId: 'm2', timestamp: d(-14), detail: 'Created task' },
      { id: 'ac2', type: 'status_change', userId: 'm1', timestamp: d(-3), detail: 'Changed status to Done' },
    ]
  },
  {
    id: 't2', title: 'Implement JWT authentication', description: 'Set up JWT-based auth with refresh tokens, secure cookie storage, and proper logout flow.',
    status: 'in_progress', priority: 'urgent', assignees: ['m3'], tags: ['Backend', 'Security'],
    dueDate: d(2), createdAt: d(-7), updatedAt: d(-1),
    comments: [
      { id: 'c3', userId: 'm3', text: 'Refresh token rotation is done. Working on the logout flow.', createdAt: d(-2) },
    ],
    attachments: [],
    activity: [
      { id: 'ac3', type: 'created', userId: 'm1', timestamp: d(-7), detail: 'Created task' },
      { id: 'ac4', type: 'assigned', userId: 'm1', timestamp: d(-7), detail: 'Assigned to Marcus Webb' },
      { id: 'ac5', type: 'status_change', userId: 'm3', timestamp: d(-4), detail: 'Changed status to In Progress' },
    ]
  },
  {
    id: 't3', title: 'Dashboard analytics components', description: 'Build reusable chart components using Recharts. Include line charts, bar charts, and donut charts for the analytics page.',
    status: 'in_progress', priority: 'medium', assignees: ['m4', 'm2'], tags: ['Frontend', 'Feature'],
    dueDate: d(5), createdAt: d(-5), updatedAt: d(-1),
    comments: [],
    attachments: [
      { id: 'a2', name: 'chart-specs.pdf', size: 512000, uploadedAt: d(-3), userId: 'm2' }
    ],
    activity: [
      { id: 'ac6', type: 'created', userId: 'm4', timestamp: d(-5), detail: 'Created task' },
    ]
  },
  {
    id: 't4', title: 'Set up CI/CD pipeline', description: 'Configure GitHub Actions for automated testing and deployment to staging and production environments.',
    status: 'todo', priority: 'high', assignees: ['m6'], tags: ['DevOps'],
    dueDate: d(7), createdAt: d(-2), updatedAt: d(-2),
    comments: [],
    attachments: [],
    activity: [
      { id: 'ac7', type: 'created', userId: 'm1', timestamp: d(-2), detail: 'Created task' },
    ]
  },
  {
    id: 't5', title: 'Write API documentation', description: 'Document all REST API endpoints using OpenAPI 3.0. Include request/response examples and error codes.',
    status: 'todo', priority: 'low', assignees: ['m3', 'm1'], tags: ['Docs', 'API'],
    dueDate: d(12), createdAt: d(-1), updatedAt: d(-1),
    comments: [],
    attachments: [],
    activity: [
      { id: 'ac8', type: 'created', userId: 'm1', timestamp: d(-1), detail: 'Created task' },
    ]
  },
  {
    id: 't6', title: 'Fix responsive layout on mobile', description: 'Multiple components break on screens smaller than 375px. Needs a full audit and fix.',
    status: 'in_review', priority: 'high', assignees: ['m4'], tags: ['Frontend', 'Bug'],
    dueDate: d(1), createdAt: d(-3), updatedAt: d(0),
    comments: [
      { id: 'c4', userId: 'm5', text: 'Found 3 more issues in the settings page.', createdAt: d(-1) },
      { id: 'c5', userId: 'm4', text: 'All fixed! Ready for another pass.', createdAt: d(0) },
    ],
    attachments: [],
    activity: [
      { id: 'ac9', type: 'created', userId: 'm5', timestamp: d(-3), detail: 'Created task' },
      { id: 'ac10', type: 'status_change', userId: 'm4', timestamp: d(0), detail: 'Changed status to In Review' },
    ]
  },
  {
    id: 't7', title: 'Performance audit & optimization', description: 'Run Lighthouse audits and optimize bundle size, lazy loading, and caching strategies.',
    status: 'backlog', priority: 'medium', assignees: ['m4', 'm6'], tags: ['Performance', 'Frontend'],
    dueDate: d(20), createdAt: d(-1), updatedAt: d(-1),
    comments: [],
    attachments: [],
    activity: [
      { id: 'ac11', type: 'created', userId: 'm1', timestamp: d(-1), detail: 'Created task' },
    ]
  },
  {
    id: 't8', title: 'User role & permissions system', description: 'Implement role-based access control with admin, manager, and viewer roles.',
    status: 'backlog', priority: 'medium', assignees: ['m3'], tags: ['Backend', 'Security'],
    dueDate: d(25), createdAt: d(0), updatedAt: d(0),
    comments: [],
    attachments: [],
    activity: [
      { id: 'ac12', type: 'created', userId: 'm3', timestamp: d(0), detail: 'Created task' },
    ]
  },
  {
    id: 't9', title: 'Email notification system', description: 'Send email notifications for task assignments, due date reminders, and status changes.',
    status: 'todo', priority: 'medium', assignees: ['m3', 'm6'], tags: ['Backend', 'Feature'],
    dueDate: d(10), createdAt: d(-2), updatedAt: d(-2),
    comments: [],
    attachments: [],
    activity: [
      { id: 'ac13', type: 'created', userId: 'm1', timestamp: d(-2), detail: 'Created task' },
    ]
  },
  {
    id: 't10', title: 'Accessibility audit (WCAG 2.1)', description: 'Full accessibility review and fixes to meet WCAG 2.1 AA compliance.',
    status: 'backlog', priority: 'low', assignees: ['m5', 'm2'], tags: ['Testing', 'UX'],
    dueDate: d(30), createdAt: d(0), updatedAt: d(0),
    comments: [],
    attachments: [],
    activity: [
      { id: 'ac14', type: 'created', userId: 'm2', timestamp: d(0), detail: 'Created task' },
    ]
  },
]

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: SEED_TASKS,
    filter: { search: '', priority: [], assignee: [], tags: [] },
    activeTaskId: null,
  },
  reducers: {
    createTask: (state, action) => {
      const task = {
        id: generateId(),
        comments: [],
        attachments: [],
        activity: [{ id: generateId(), type: 'created', userId: action.payload.creatorId || 'm1', timestamp: new Date().toISOString(), detail: 'Created task' }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        assignees: [],
        tags: [],
        ...action.payload,
      }
      state.tasks.push(task)
    },
    updateTask: (state, action) => {
      const idx = state.tasks.findIndex(t => t.id === action.payload.id)
      if (idx !== -1) {
        state.tasks[idx] = { ...state.tasks[idx], ...action.payload, updatedAt: new Date().toISOString() }
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload)
    },
    moveTask: (state, action) => {
      const { taskId, newStatus } = action.payload
      const task = state.tasks.find(t => t.id === taskId)
      if (task) {
        task.status = newStatus
        task.updatedAt = new Date().toISOString()
        task.activity.push({
          id: generateId(), type: 'status_change',
          userId: 'm1', timestamp: new Date().toISOString(),
          detail: `Moved to ${newStatus.replace('_', ' ')}`
        })
      }
    },
    addComment: (state, action) => {
      const { taskId, comment } = action.payload
      const task = state.tasks.find(t => t.id === taskId)
      if (task) {
        task.comments.push({ id: generateId(), createdAt: new Date().toISOString(), ...comment })
        task.activity.push({ id: generateId(), type: 'comment', userId: comment.userId, timestamp: new Date().toISOString(), detail: 'Added a comment' })
        task.updatedAt = new Date().toISOString()
      }
    },
    deleteComment: (state, action) => {
      const { taskId, commentId } = action.payload
      const task = state.tasks.find(t => t.id === taskId)
      if (task) task.comments = task.comments.filter(c => c.id !== commentId)
    },
    addAttachment: (state, action) => {
      const { taskId, attachment } = action.payload
      const task = state.tasks.find(t => t.id === taskId)
      if (task) {
        task.attachments.push({ id: generateId(), uploadedAt: new Date().toISOString(), ...attachment })
        task.activity.push({ id: generateId(), type: 'attachment', userId: attachment.userId, timestamp: new Date().toISOString(), detail: `Attached ${attachment.name}` })
      }
    },
    removeAttachment: (state, action) => {
      const { taskId, attachmentId } = action.payload
      const task = state.tasks.find(t => t.id === taskId)
      if (task) task.attachments = task.attachments.filter(a => a.id !== attachmentId)
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload }
    },
    clearFilters: (state) => {
      state.filter = { search: '', priority: [], assignee: [], tags: [] }
    },
    setActiveTask: (state, action) => {
      state.activeTaskId = action.payload
    },
  },
})

export const {
  createTask, updateTask, deleteTask, moveTask,
  addComment, deleteComment, addAttachment, removeAttachment,
  setFilter, clearFilters, setActiveTask,
} = tasksSlice.actions

export const selectAllTasks = (state) => state.tasks.tasks
export const selectFilter = (state) => state.tasks.filter
export const selectActiveTaskId = (state) => state.tasks.activeTaskId
export const selectActiveTask = (state) =>
  state.tasks.tasks.find(t => t.id === state.tasks.activeTaskId)

export const selectFilteredTasks = (state) => {
  const { tasks, filter } = state.tasks
  return tasks.filter(task => {
    if (filter.search && !task.title.toLowerCase().includes(filter.search.toLowerCase()) &&
        !task.description?.toLowerCase().includes(filter.search.toLowerCase())) return false
    if (filter.priority.length && !filter.priority.includes(task.priority)) return false
    if (filter.assignee.length && !task.assignees.some(a => filter.assignee.includes(a))) return false
    if (filter.tags.length && !task.tags.some(t => filter.tags.includes(t))) return false
    return true
  })
}

export const selectTasksByStatus = (state) => {
  const filtered = selectFilteredTasks(state)
  return filtered.reduce((acc, task) => {
    if (!acc[task.status]) acc[task.status] = []
    acc[task.status].push(task)
    return acc
  }, {})
}

export const selectStats = (state) => {
  const tasks = state.tasks.tasks
  const total = tasks.length
  const done = tasks.filter(t => t.status === 'done').length
  const inProgress = tasks.filter(t => t.status === 'in_progress').length
  const overdue = tasks.filter(t => {
    if (!t.dueDate || t.status === 'done') return false
    return new Date(t.dueDate) < new Date()
  }).length
  return { total, done, inProgress, overdue, completion: total ? Math.round((done / total) * 100) : 0 }
}

export default tasksSlice.reducer