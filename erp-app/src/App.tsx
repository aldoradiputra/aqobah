import { Routes, Route, Navigate } from 'react-router-dom'
import { ErpShell } from './components/shell/ErpShell'
import { RequireAuth } from './auth/RequireAuth'
import { LoginPage } from './auth/LoginPage'
import { DashboardPage } from './features/DashboardPage'
import { ProductsPage } from './features/ProductsPage'
import { ModulePlaceholder } from './features/ModulePlaceholder'
import { AuditPage } from './features/AuditPage'
import { ProductDetailPage } from './features/ProductDetailPage'
import { RequestsPage } from './features/RequestsPage'
import { RequestDetailPage } from './features/RequestDetailPage'
import { CrmLayout, CrmComingSoon } from './features/crm/CrmLayout'
import { CrmSettingsPage } from './features/crm/CrmSettingsPage'
import { RoleGuard } from './auth/RoleGuard'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<RequireAuth />}>
        <Route element={<ErpShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="crm" element={<CrmLayout />}>
            <Route index element={<CrmComingSoon title="Pipeline Deal" note="Papan pipeline hadir di PR berikutnya (deals + kanban)." />} />
            <Route path="customers" element={<CrmComingSoon title="Pelanggan & Mitra" note="Daftar pelanggan & mitra hadir di PR berikutnya." />} />
            <Route
              path="settings"
              element={
                <RoleGuard allow={['admin', 'management']} fallback={<Navigate to="/crm" replace />}>
                  <CrmSettingsPage />
                </RoleGuard>
              }
            />
          </Route>
          <Route path="sales" element={<ModulePlaceholder moduleKey="sales" />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="requests" element={<RequestsPage />} />
          <Route path="requests/:id" element={<RequestDetailPage />} />
          <Route path="ops" element={<ModulePlaceholder moduleKey="ops" />} />
          <Route path="finance" element={<ModulePlaceholder moduleKey="finance" />} />
          <Route path="hr" element={<ModulePlaceholder moduleKey="hr" />} />
          <Route
            path="audit"
            element={
              <RoleGuard allow={['admin', 'management']} fallback={<Navigate to="/" replace />}>
                <AuditPage />
              </RoleGuard>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  )
}
