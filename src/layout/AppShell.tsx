import { useState } from 'react'
import type { TabId } from './navigation'
import { Sidebar } from './Sidebar'
import { Dashboard } from '../features/Dashboard'
import { TabPlaceholder } from '../features/TabPlaceholder'
import { OrganizationSetup } from '../features/OrganizationSetup'
import { QrManagement } from '../features/QrManagement'
export function AppShell({ onSignOut }: { onSignOut: () => void }) { const [activeTab, setActiveTab] = useState<TabId>('dashboard'); return <div className="app-shell"><Sidebar activeTab={activeTab} onSelect={setActiveTab} onSignOut={onSignOut}/><main className="app-content">{activeTab === 'dashboard' ? <Dashboard /> : activeTab === 'organization-setup' ? <OrganizationSetup /> : activeTab === 'qr-management' ? <QrManagement /> : <TabPlaceholder tab={activeTab} />}</main></div> }
