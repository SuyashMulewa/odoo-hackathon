import { useState } from 'react'
import type { TabId } from './navigation'
import { Sidebar } from './Sidebar'
import { Dashboard } from '../features/Dashboard'
import { TabPlaceholder } from '../features/TabPlaceholder'
export function AppShell({ onSignOut }: { onSignOut: () => void }) { const [activeTab, setActiveTab] = useState<TabId>('dashboard'); return <div className="app-shell"><Sidebar activeTab={activeTab} onSelect={setActiveTab} onSignOut={onSignOut}/><main className="app-content">{activeTab === 'dashboard' ? <Dashboard /> : <TabPlaceholder tab={activeTab} />}</main></div> }
