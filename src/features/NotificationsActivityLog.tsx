import './NotificationsActivityLog.css'
import { useState } from 'react'

type NotificationTone = 'teal' | 'rose' | 'orange' | 'purple' | 'slate'

type NotificationItem = {
  id: string
  title: string
  detail: string
  actor: string
  role: string
  time: string
  tone: NotificationTone
  unread?: boolean
}

type ActivityItem = {
  id: string
  actor: string
  role: string
  action: string
  target: string
  time: string
}

const notifications: NotificationItem[] = [
  { id: 'n1', title: 'Asset Assigned', detail: 'AF-0001 Dell XPS 15 Laptop assigned to Priya Sharma for department review.', actor: 'Arjun Mehta', role: 'Asset Manager', time: '09:41 · 2026-07-12', tone: 'teal', unread: true },
  { id: 'n2', title: 'Maintenance Approved', detail: 'AF-0002 MacBook Pro M3 maintenance request approved and sent to technical team.', actor: 'Rohan Gupta', role: 'Asset Manager', time: '08:15 · 2026-07-12', tone: 'orange', unread: true },
  { id: 'n3', title: 'Booking Confirmed', detail: 'Meeting Room B2 reserved for Priya Sharma on Jul 14, 09:00-10:30.', actor: 'Priya Sharma', role: 'Department Head', time: 'Yesterday · 17:30', tone: 'purple' },
  { id: 'n4', title: 'Booking Cancelled', detail: 'Standing Desk use window for Marketing was cancelled after schedule change.', actor: 'Sneha Patel', role: 'Department Head', time: 'Yesterday · 14:12', tone: 'slate' },
  { id: 'n5', title: 'Transfer Approved', detail: 'AF-0007 Standing Desk transfer approved from IT to Facilities.', actor: 'Sneha Patel', role: 'Department Head', time: '2026-07-10 · 16:45', tone: 'teal' },
  { id: 'n6', title: 'Overdue Return Alert', detail: 'HP LaserJet Pro (AF-0003) assigned to Priya Sharma is 337 days overdue.', actor: 'System', role: 'Automated Alert', time: '2026-07-10 · 12:08', tone: 'rose' },
  { id: 'n7', title: 'Audit Discrepancy Flagged', detail: 'IT Assets Q2 2026 audit flagged 2 missing assets and 1 damaged device.', actor: 'Audit Bot', role: 'System', time: '2026-07-09 · 10:05', tone: 'orange' },
]

const activityLog: ActivityItem[] = [
  { id: 'a1', actor: 'Arjun Mehta', role: 'Admin', action: 'registered asset', target: 'AF-0012 Oscilloscope', time: '09:41 · 2026-07-12' },
  { id: 'a2', actor: 'Rohan Gupta', role: 'Asset Manager', action: 'approved maintenance request', target: 'MR002 HP LaserJet', time: '09:15 · 2026-07-12' },
  { id: 'a3', actor: 'Priya Sharma', role: 'Department Head', action: 'booked resource', target: 'Meeting Room B2 — Jul 14', time: '17:30 · 2026-07-11' },
  { id: 'a4', actor: 'Kavya Nair', role: 'Employee', action: 'raised maintenance request', target: 'AF-0002 MacBook Pro', time: '08:00 · 2026-07-12' },
  { id: 'a5', actor: 'Vikram Joshi', role: 'Asset Manager', action: 'marked asset verified', target: 'AF-0005 in IT Q2 Audit', time: '14:22 · 2026-07-10' },
  { id: 'a6', actor: 'Rahul Verma', role: 'Employee', action: 'initiated return', target: 'AF-0010 Fiat Tiago', time: '12:00 · 2026-07-10' },
  { id: 'a7', actor: 'Sneha Patel', role: 'Department Head', action: 'approved transfer request', target: 'AF-0007 Standing Desk', time: '16:45 · 2026-07-08' },
]

function toneClass(tone: NotificationTone) {
  return tone
}

function actorInitials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? '').join('') || '?'
}

export function NotificationsActivityLog() {
  const [items, setItems] = useState(notifications)
  const unreadCount = items.filter((notification) => notification.unread).length

  const markAllRead = () => {
    setItems((current) => current.map((notification) => ({ ...notification, unread: false })))
  }

  const toggleRead = (id: string) => {
    setItems((current) => current.map((notification) => notification.id === id ? { ...notification, unread: !notification.unread } : notification))
  }

  return (
    <section className="notifications-page">
      <header className="notifications-header">
        <div>
          <p className="eyebrow">COMMUNICATION HUB</p>
          <h1>Notifications & Activity Log</h1>
          <p>Real-time alerts and a full audit trail of who did what, when.</p>
        </div>
        <div className="notifications-actions">
          <span className="notifications-pill danger">{unreadCount} unread</span>
          <button type="button" className="notifications-secondary" onClick={markAllRead}>Mark all read</button>
        </div>
      </header>

      <div className="notifications-layout">
        <section className="notifications-column">
          <div className="notifications-section-head">
            <div>
              <p className="notifications-kicker">NOTIFICATIONS</p>
              <h2>Unread</h2>
            </div>
          </div>
          <div className="notifications-list">
            {items.map((notification) => (
              <button key={notification.id} type="button" className={`notification-card ${toneClass(notification.tone)} ${notification.unread ? 'unread' : 'read'}`} onClick={() => toggleRead(notification.id)} aria-pressed={!notification.unread}>
                <div className={`notification-icon ${notification.tone}`} aria-hidden="true">
                  <span>{actorInitials(notification.actor)}</span>
                </div>
                <div className="notification-body">
                  <div className="notification-topline">
                    <strong>{notification.title}</strong>
                    {notification.unread && <span className="notification-dot" />}
                  </div>
                  <p>{notification.detail}</p>
                  <div className="notification-meta">
                    <span>{notification.actor}</span>
                    <em>{notification.role}</em>
                    <small>{notification.time}</small>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="activity-column">
          <div className="notifications-section-head">
            <div>
              <p className="notifications-kicker">FULL ACTIVITY LOG</p>
              <h2>Audit Trail</h2>
            </div>
          </div>
          <div className="activity-list">
            {activityLog.map((entry) => (
              <article key={entry.id} className="activity-card">
                <div className="activity-avatar">{actorInitials(entry.actor)}</div>
                <div className="activity-main">
                  <div className="activity-headline">
                    <strong>{entry.actor}</strong>
                    <span>{entry.role}</span>
                  </div>
                  <p><b>{entry.action}</b> {entry.target}</p>
                </div>
                <time>{entry.time}</time>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}
