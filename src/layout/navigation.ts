export type TabId = 'dashboard' | 'qr-management' | 'asset-directory' | 'allocation-transfer' | 'resource-booking' | 'maintenance' | 'audit-cycles' | 'reports-analytics' | 'organization-setup' | 'notifications'
export type NavigationItem = { id: TabId; label: string; icon: string; badge?: string }
export const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
  { id: 'qr-management', label: 'QR Management', icon: 'scan', badge: 'QR' },
  { id: 'asset-directory', label: 'Asset Directory', icon: 'cube' },
  { id: 'allocation-transfer', label: 'Allocation & Transfer', icon: 'transfer' },
  { id: 'resource-booking', label: 'Resource Booking', icon: 'calendar' },
  { id: 'maintenance', label: 'Maintenance', icon: 'wrench' },
  { id: 'audit-cycles', label: 'Audit Cycles', icon: 'clipboard' },
  { id: 'reports-analytics', label: 'Reports & Analytics', icon: 'chart' },
  { id: 'organization-setup', label: 'Organization Setup', icon: 'building' },
  { id: 'notifications', label: 'Notifications', icon: 'bell', badge: '2' },
]
