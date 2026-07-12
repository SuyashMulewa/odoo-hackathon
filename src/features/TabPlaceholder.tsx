import type { TabId } from '../layout/navigation'
import { navigationItems } from '../layout/navigation'
export function TabPlaceholder({ tab }: { tab: TabId }) { const label = navigationItems.find((item) => item.id === tab)?.label ?? 'Workspace'; return <section className="tab-placeholder"><p className="eyebrow">ASSETNEXSUS</p><h1>{label}</h1><p>This module is ready for implementation.</p></section> }
