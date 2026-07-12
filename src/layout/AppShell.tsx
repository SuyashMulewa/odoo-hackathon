import { useState } from 'react'
import type { TabId } from './navigation'
import { Sidebar } from './Sidebar'
import { Dashboard } from '../features/Dashboard'
import { QrManagement } from '../features/QrManagement'
import { AssetDirectory } from '../features/AssetDirectory'
import { ResourceBooking } from '../features/ResourceBooking'
import { AllocationTransfer } from '../features/AllocationTransfer'
import { MaintenanceManagement } from '../features/MaintenanceManagement'
import { AuditCycles } from '../features/AuditCycles'
import { NotificationsActivityLog } from '../features/NotificationsActivityLog'
import { TabPlaceholder } from '../features/TabPlaceholder'
import { OrganizationSetup } from '../features/OrganizationSetup'

export function AppShell({ onSignOut }: { onSignOut: () => void }) {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard')
  const content = activeTab === 'dashboard' ? <Dashboard onNavigate={setActiveTab} /> : activeTab === 'qr-management' ? <QrManagement /> : activeTab === 'asset-directory' ? <AssetDirectory /> : activeTab === 'resource-booking' ? <ResourceBooking /> : activeTab === 'allocation-transfer' ? <AllocationTransfer /> : activeTab === 'maintenance' ? <MaintenanceManagement /> : activeTab === 'audit-cycles' ? <AuditCycles /> : activeTab === 'notifications' ? <NotificationsActivityLog /> : activeTab === 'organization-setup' ? <OrganizationSetup /> : <TabPlaceholder tab={activeTab} />
  const contentClassName = activeTab === 'notifications' ? 'app-content notifications-content' : 'app-content'
  return <div className="app-shell"><Sidebar activeTab={activeTab} onSelect={setActiveTab} onSignOut={onSignOut}/><main className={contentClassName}>{content}</main></div>
}
