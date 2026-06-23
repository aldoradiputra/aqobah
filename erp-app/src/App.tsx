import { Routes, Route, Navigate } from 'react-router-dom'
import { ErpShell } from './components/shell/ErpShell'
import { DashboardPage } from './features/DashboardPage'
import { ProductsPage } from './features/ProductsPage'
import { ModulePlaceholder } from './features/ModulePlaceholder'

export default function App() {
  return (
    <Routes>
      <Route element={<ErpShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="crm" element={<ModulePlaceholder moduleKey="crm" />} />
        <Route path="sales" element={<ModulePlaceholder moduleKey="sales" />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="ops" element={<ModulePlaceholder moduleKey="ops" />} />
        <Route path="finance" element={<ModulePlaceholder moduleKey="finance" />} />
        <Route path="hr" element={<ModulePlaceholder moduleKey="hr" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
