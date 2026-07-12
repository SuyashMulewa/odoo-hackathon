import { useState } from 'react'
import type { TabId } from './navigation'
import { Sidebar } from './Sidebar'
import { Dashboard } from '../features/Dashboard'
import { QrManagement } from '../features/QrManagement'
import { ResourceBooking } from '../features/ResourceBooking'
import { OrganizationSetup } from '../features/OrganizationSetup'
import { TabPlaceholder } from '../features/TabPlaceholder'

export function AppShell({ onSignOut }: { onSignOut: () => void }) { const [activeTab, setActiveTab] = useState<TabId>('dashboard'); return <div className="app-shell"><Sidebar activeTab={activeTab} onSelect={setActiveTab} onSignOut={onSignOut}/><main className="app-content">{activeTab === 'dashboard' ? <Dashboard /> : activeTab === 'qr-management' ? <QrManagement /> : activeTab === 'resource-booking' ? <ResourceBooking /> : activeTab === 'organization-setup' ? <OrganizationSetup /> : <TabPlaceholder tab={activeTab} />}</main></div> }
