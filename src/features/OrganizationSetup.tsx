import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../context/AuthContext'
import { dataApi } from '../services/dataApi'

type Department = { id: string; name: string; head: string; employees: number; status: 'Active' | 'Inactive' }
type Category = { name: string; code: string; assets: number; custodian: string; status: 'Active' | 'Inactive' }
type Employee = { name: string; employeeId: string; department: string; role: string; email: string; status: 'Active' | 'Inactive' }
type SetupTab = 'departments' | 'categories' | 'employees'

const initialDepartments: Department[] = [
  { id: 'D001', name: 'Information Technology', head: 'Arjun Mehta', employees: 34, status: 'Active' },
  { id: 'D002', name: 'Human Resources', head: 'Priya Sharma', employees: 12, status: 'Active' },
  { id: 'D003', name: 'Finance', head: 'Rohan Gupta', employees: 18, status: 'Active' },
  { id: 'D004', name: 'Operations', head: 'Sneha Patel', employees: 45, status: 'Active' },
  { id: 'D005', name: 'Marketing', head: 'Kavya Nair', employees: 22, status: 'Active' },
  { id: 'D006', name: 'Facilities', head: 'Vikram Joshi', employees: 8, status: 'Active' },
  { id: 'D007', name: 'Research & Development', head: 'Ananya Das', employees: 0, status: 'Inactive' },
]
const initialCategories: Category[] = [
  { name: 'IT Equipment', code: 'CAT-IT', assets: 148, custodian: 'Information Technology', status: 'Active' },
  { name: 'Office Furniture', code: 'CAT-OFF', assets: 86, custodian: 'Facilities', status: 'Active' },
  { name: 'Vehicles', code: 'CAT-VEH', assets: 14, custodian: 'Operations', status: 'Active' },
  { name: 'Software Licenses', code: 'CAT-SW', assets: 67, custodian: 'Information Technology', status: 'Active' },
]
const employeesSeed: Employee[] = [
  { name: 'Arjun Mehta', employeeId: 'EMP-1001', department: 'Information Technology', role: 'Department Head', email: 'arjun@assetnesus.com', status: 'Active' },
  { name: 'Priya Sharma', employeeId: 'EMP-1002', department: 'Human Resources', role: 'Department Head', email: 'priya@assetnesus.com', status: 'Active' },
  { name: 'Rohan Gupta', employeeId: 'EMP-1003', department: 'Finance', role: 'Department Head', email: 'rohan@assetnesus.com', status: 'Active' },
  { name: 'Sneha Patel', employeeId: 'EMP-1004', department: 'Operations', role: 'Department Head', email: 'sneha@assetnesus.com', status: 'Active' },
]

const tabMeta: { id: SetupTab; label: string; icon: string }[] = [
  { id: 'departments', label: 'Departments', icon: '▦' }, { id: 'categories', label: 'Asset Categories', icon: '◇' }, { id: 'employees', label: 'Employee Directory', icon: '♙' },
]
function ActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      className="notifications-secondary"
      type="button"
      style={{
        height: '28px',
        fontSize: '11px',
        fontWeight: 600,
        padding: '0 10px',
        borderRadius: '6px',
        marginLeft: '6px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle'
      }}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export function OrganizationSetup() {
  const { token, user } = useAuth()
  const [tab, setTab] = useState<SetupTab>('departments')
  const [departments, setDepartments] = useState(initialDepartments)
  const [categories, setCategories] = useState(initialCategories)
  const [employees, setEmployees] = useState<Employee[]>(employeesSeed)
  const [query, setQuery] = useState('')
  const [notice, setNotice] = useState('')
  const [editing, setEditing] = useState<Department | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [promoteOpenId, setPromoteOpenId] = useState<string | null>(null)

  useEffect(() => { if (!token) return; Promise.all([dataApi.list<Department>('departments', token), dataApi.list<Category>('categories', token), dataApi.list<Employee & { employee_id?: string }>('employees', token)]).then(([departmentData, categoryData, employeeData]) => { if (departmentData.departments.length) setDepartments(departmentData.departments); if (categoryData.categories.length) setCategories(categoryData.categories); if (employeeData.employees.length) setEmployees(employeeData.employees.map((employee) => ({ ...employee, employeeId: employee.employeeId || employee.employee_id || '' }))) }).catch(() => setNotice('Unable to load organization data from the database.')) }, [token])

  if (user?.role !== 'admin') return <section className="organization-page"><header className="org-header"><div><h1>Organization Setup</h1><p>Only administrators can manage departments, categories, employees, and role promotions.</p></div><div className="admin-pill">Admin access required</div></header></section>

  const tabLabel = tab === 'departments' ? 'Department' : tab === 'categories' ? 'Category' : 'Employee'
  const filteredDepartments = useMemo(() => departments.filter((row) => row.name.toLowerCase().includes(query.toLowerCase())), [departments, query])
  const filteredCategories = useMemo(() => categories.filter((row) => row.name.toLowerCase().includes(query.toLowerCase())), [categories, query])
  const filteredEmployees = useMemo(() => employees.filter((row) => `${row.name} ${row.department}`.toLowerCase().includes(query.toLowerCase())), [employees, query])

  const openNew = () => {
    setEditing(null)
    setModalOpen(true)
  }

  const editDepartment = (row: Department) => {
    setEditing(row)
    setModalOpen(true)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!token) return
    const form = new FormData(event.currentTarget)

    if (tab === 'departments') {
      const name = String(form.get('name')).trim()
      const head = String(form.get('head')).trim()
      if (!name || !head) return
      const record: Department = editing ? { ...editing, name, head, status: String(form.get('status')) as Department['status'] } : { id: `D${String(departments.length + 1).padStart(3, '0')}`, name, head, employees: Number(form.get('employees')) || 0, status: 'Active' }
      try {
        await dataApi.save('departments', record, token)
        setDepartments((rows) => editing ? rows.map((row) => row.id === record.id ? record : row) : [...rows, record])
        setModalOpen(false)
        setNotice(`${name} has been ${editing ? 'updated' : 'added'} successfully.`)
      } catch {
        setNotice('Department could not be saved to the database.')
      }
    } else if (tab === 'categories') {
      const name = String(form.get('name')).trim()
      const code = String(form.get('code')).trim()
      const custodian = String(form.get('custodian')).trim()
      if (!name || !code || !custodian) return
      const record: Category = { name, code, custodian, assets: 0, status: 'Active' }
      try {
        await dataApi.save('categories', record, token)
        setCategories((rows) => [...rows, record])
        setModalOpen(false)
        setNotice(`Category ${name} has been created successfully.`)
      } catch {
        setNotice('Asset Category could not be saved to the database.')
      }
    } else if (tab === 'employees') {
      const name = String(form.get('name')).trim()
      const employeeId = String(form.get('employeeId')).trim()
      const email = String(form.get('email')).trim()
      const department = String(form.get('department')).trim()
      const role = String(form.get('role')).trim()
      if (!name || !employeeId || !email || !department || !role) return
      const record = { name, employee_id: employeeId, department, role, email, status: 'Active' }
      try {
        await dataApi.save('employees', record, token)
        setEmployees((rows) => [...rows, { name, employeeId, department, role, email, status: 'Active' as const }])
        setModalOpen(false)
        setNotice(`Employee ${name} has been added successfully.`)
      } catch {
        setNotice('Employee could not be saved to the database.')
      }
    }
  }

  const handlePromote = async (emp: Employee, targetRole: 'Asset Manager' | 'Department Head') => {
    if (!token) return
    setPromoteOpenId(null)
    const updatedEmp = {
      name: emp.name,
      employee_id: emp.employeeId,
      department: emp.department,
      role: targetRole,
      email: emp.email,
      status: emp.status
    }
    try {
      await dataApi.save('employees', updatedEmp, token)
      setEmployees((current) => current.map((item) => item.employeeId === emp.employeeId ? { ...item, role: targetRole } : item))
      try {
        const response = await fetch('/api/admin/employees', { headers: { Authorization: `Bearer ${token}` } })
        if (response.ok) {
          const data = await response.json()
          const matchedUser = data.users?.find((u: any) => u.email.toLowerCase() === emp.email.toLowerCase())
          if (matchedUser) {
            const patchRole = targetRole === 'Asset Manager' ? 'asset_manager' : 'department_head'
            const patchResponse = await fetch(`/api/admin/employees/${matchedUser.id}/role`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              body: JSON.stringify({ role: patchRole })
            })
            if (patchResponse.ok) {
              setNotice(`Promoted ${emp.name} to ${targetRole} and synchronized login account.`)
            } else {
              setNotice(`Promoted ${emp.name} to ${targetRole} (login sync skipped).`)
            }
          } else {
            setNotice(`Promoted ${emp.name} to ${targetRole}.`)
          }
        } else {
          setNotice(`Promoted ${emp.name} to ${targetRole}.`)
        }
      } catch {
        setNotice(`Promoted ${emp.name} to ${targetRole}.`)
      }
    } catch {
      setNotice('Could not update employee role in the database.')
    }
  }

  const showNotice = (message: string) => setNotice(message)

  return <section className="organization-page">
    <header className="org-header"><div><h1>Organization Setup</h1><p>Admin-only · Manage master data for departments, categories, and employees</p></div><div className="admin-pill"><span>◇</span> Admin access required</div></header>
    <div className="org-tabs" role="tablist">{tabMeta.map((item) => <button key={item.id} role="tab" aria-selected={tab === item.id} className={tab === item.id ? 'selected' : ''} onClick={() => { setTab(item.id); setQuery(''); setNotice(''); setPromoteOpenId(null) }}><span>{item.icon}</span>{item.label}</button>)}</div>
    <div className="org-toolbar"><p>{tab === 'departments' ? `${departments.length} departments` : tab === 'categories' ? `${categories.length} asset categories` : `${employees.length} employees`}</p><div><label className="org-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${tabLabel.toLowerCase()}...`} /></label><button className="new-record" onClick={openNew}>＋ New {tabLabel}</button></div></div>
    {notice && <div className="org-notice">{notice}<button onClick={() => setNotice('')}>×</button></div>}
    {tab === 'departments' && <div className="org-table-wrap"><table className="org-table"><thead><tr><th>ID</th><th>Department</th><th>Head</th><th>Employees</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filteredDepartments.map((row) => <tr key={row.id}><td className="mono">{row.id}</td><td className="primary-cell">{row.name}</td><td>{row.head}</td><td>{row.employees}</td><td><span className={`status ${row.status.toLowerCase()}`}>{row.status}</span></td><td><ActionButton label="Edit" onClick={() => editDepartment(row)} /><ActionButton label="View" onClick={() => showNotice(`${row.name}: ${row.employees} assigned employees.`)} /></td></tr>)}</tbody></table></div>}
    {tab === 'categories' && <div className="org-table-wrap"><table className="org-table"><thead><tr><th>Code</th><th>Asset Category</th><th>Assets</th><th>Custodian</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filteredCategories.map((row) => <tr key={row.code}><td className="mono">{row.code}</td><td className="primary-cell">{row.name}</td><td>{row.assets}</td><td>{row.custodian}</td><td><span className="status active">{row.status}</span></td><td><ActionButton label="Edit" onClick={() => showNotice(`Editing ${row.name} is ready for configuration.`)} /><ActionButton label="View" onClick={() => showNotice(`${row.name} contains ${row.assets} registered assets.`)} /></td></tr>)}</tbody></table></div>}
    {tab === 'employees' && <div className="org-table-wrap"><table className="org-table"><thead><tr><th>Employee ID</th><th>Employee</th><th>Department</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filteredEmployees.map((row) => <tr key={row.employeeId}><td className="mono">{row.employeeId}</td><td className="primary-cell"><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}><div style={{ display: 'flex', alignItems: 'center' }}><span className="avatar">{row.name.split(' ').map((part) => part[0]).join('')}</span><div><div>{row.name}</div><small style={{ fontWeight: 400, color: '#71819b' }}>{row.email}</small></div></div>{row.role !== 'admin' && row.role !== 'Admin' && <div style={{ position: 'relative' }}><button type="button" className="notifications-secondary" style={{ height: '26px', fontSize: '11px', padding: '0 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setPromoteOpenId(promoteOpenId === row.employeeId ? null : row.employeeId) }}>Promote ▾</button>{promoteOpenId === row.employeeId && <div style={{ position: 'absolute', right: 0, top: '30px', backgroundColor: '#fff', border: '1px solid #cfd9e5', borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 100, minWidth: '130px' }}><button type="button" style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', border: 0, background: 'none', fontSize: '12px', cursor: 'pointer', color: '#1d3049' }} onClick={() => handlePromote(row, 'Asset Manager')}>Asset Manager</button><button type="button" style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', border: 0, background: 'none', fontSize: '12px', cursor: 'pointer', color: '#1d3049', borderTop: '1px solid #f0f4f9' }} onClick={() => handlePromote(row, 'Department Head')}>Department Head</button></div>}</div>}</div></td><td>{row.department}</td><td>{row.role}</td><td><span className="status active">{row.status}</span></td><td><ActionButton label="View" onClick={() => showNotice(`${row.name} · ${row.email}`)} /></td></tr>)}</tbody></table></div>}
    {modalOpen && <div className="setup-modal-backdrop" role="presentation"><form className="setup-modal" onSubmit={handleSubmit}><div><h2>{editing ? `Edit ${tabLabel}` : `New ${tabLabel}`}</h2><button type="button" onClick={() => setModalOpen(false)}>×</button></div>{tab === 'departments' && <><label>Department name<input name="name" defaultValue={editing?.name} required /></label><label>Department head<input name="head" defaultValue={editing?.head} required /></label>{!editing && <label>Employees<input name="employees" type="number" min="0" defaultValue="0" /></label>}{editing && <label>Status<select name="status" defaultValue={editing.status}><option>Active</option><option>Inactive</option></select></label>}</>}{tab === 'categories' && <><label>Category name<input name="name" required placeholder="e.g. IT Equipment" /></label><label>Category code<input name="code" required placeholder="e.g. CAT-IT" /></label><label>Custodian Department<select name="custodian" required>{departments.map((dept) => <option key={dept.id} value={dept.name}>{dept.name}</option>)}</select></label></>}{tab === 'employees' && <><label>Employee ID<input name="employeeId" required placeholder="e.g. EMP-1005" /></label><label>Full Name<input name="name" required placeholder="e.g. Ramesh Choudhary" /></label><label>Email Address<input name="email" type="email" required placeholder="e.g. ramesh@company.com" /></label><label>Department<select name="department" required>{departments.map((dept) => <option key={dept.id} value={dept.name}>{dept.name}</option>)}</select></label><label>Role<select name="role" required><option value="Employee">Employee</option><option value="Department Head">Department Head</option><option value="Asset Manager">Asset Manager</option></select></label></>}<footer><button type="button" onClick={() => setModalOpen(false)}>Cancel</button><button className="new-record" type="submit">Save {tabLabel}</button></footer></form></div>}
  </section>
}
