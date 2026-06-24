import { useMemo, useState, type CSSProperties } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  useDeals,
  useMoveDealStage,
  useCrmPipelines,
  usePipelineStages,
  useTeamMembers,
  useTeamPipelines,
  useCustomers,
} from '../../lib/queries'
import { useSession } from '../../auth/SessionProvider'
import { Panel, Pill, DataTable } from '../../components/ui'
import type { Column, PillTone } from '../../components/ui'
import { FilterBar, KanbanBoard } from '../../components/data-view'
import type { KanbanGroup } from '../../components/data-view'
import { DealModal } from './DealModal'
import type { Deal, CrmPipelineStage } from '../../lib/types'

const WRITE_ROLES = ['admin', 'management', 'sales']
function rp(n: number | null): string {
  return n != null ? 'Rp' + Number(n).toLocaleString('id-ID') : '—'
}
function fmtDate(d: string | null): string {
  return d ? new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'
}
function pillFor(s?: CrmPipelineStage): PillTone {
  if (!s) return 'neutral'
  if (s.is_won) return 'green'
  if (s.is_lost) return 'red'
  return 'blue'
}

// The CRM landing surface (/crm): a pipeline selector + drag-and-drop deal kanban
// (list toggle). Pipelines shown = all active for admin/management, else the
// pipelines of the teams the user belongs to.
export function DealsBoard() {
  const { user, role } = useSession()
  const navigate = useNavigate()
  const isAdmin = role === 'admin' || role === 'management'
  const canWrite = role != null && WRITE_ROLES.includes(role)
  const { data: pipelines = [] } = useCrmPipelines()
  const { data: members = [] } = useTeamMembers()
  const { data: teamPipes = [] } = useTeamPipelines()
  const { data: customers = [] } = useCustomers()

  const visiblePipelines = useMemo(() => {
    const active = pipelines.filter((p) => p.is_active)
    if (isAdmin) return active
    const myTeams = new Set(members.filter((m) => m.user_id === user?.id).map((m) => m.team_id))
    const myPipes = new Set(teamPipes.filter((tp) => myTeams.has(tp.team_id)).map((tp) => tp.pipeline_id))
    return active.filter((p) => myPipes.has(p.id))
  }, [pipelines, members, teamPipes, isAdmin, user?.id])

  const [pipelineId, setPipelineId] = useState('')
  const pid = pipelineId || visiblePipelines[0]?.id || ''
  const { data: stages = [] } = usePipelineStages(pid || undefined)
  const { data: deals = [] } = useDeals(pid || undefined)
  const move = useMoveDealStage()
  const [view, setView] = useState<'list' | 'kanban'>('kanban')
  const [search, setSearch] = useState('')
  const [creating, setCreating] = useState(false)

  const custName = useMemo(() => Object.fromEntries(customers.map((c) => [c.id, c.name])), [customers])
  const stageById = useMemo(() => {
    const m: Record<string, CrmPipelineStage> = {}
    for (const s of stages) m[s.id] = s
    return m
  }, [stages])

  const filtered = useMemo(
    () =>
      deals.filter((d) => {
        if (!search) return true
        const q = search.toLowerCase()
        return d.title.toLowerCase().includes(q) || (!!d.customer_id && (custName[d.customer_id] ?? '').toLowerCase().includes(q))
      }),
    [deals, search, custName],
  )

  const groups: KanbanGroup[] = stages.map((s) => ({
    key: s.id,
    label: s.name,
    accent: s.is_won ? 'var(--success-500)' : s.is_lost ? 'var(--danger-500)' : 'var(--brand-primary)',
  }))

  function onMove(dealId: string, toStageId: string) {
    const target = stageById[toStageId]
    if (target?.is_lost) {
      const reason = window.prompt('Alasan kalah (opsional):')
      move.mutate({ id: dealId, stage_id: toStageId, lost_reason: reason || null })
    } else {
      move.mutate({ id: dealId, stage_id: toStageId })
    }
  }

  const columns: Column<Deal>[] = [
    {
      key: 'title',
      label: 'Deal',
      render: (d) => (
        <Link to={`/crm/deals/${d.id}`} style={{ fontWeight: 600, color: 'var(--text-link)', textDecoration: 'none' }}>
          {d.title}
        </Link>
      ),
    },
    { key: 'stage_id', label: 'Tahap', render: (d) => <Pill tone={pillFor(stageById[d.stage_id])}>{stageById[d.stage_id]?.name ?? '—'}</Pill> },
    { key: 'customer_id', label: 'Pelanggan', render: (d) => (d.customer_id ? custName[d.customer_id] ?? '—' : '—') },
    { key: 'estimated_value', label: 'Nilai', render: (d) => rp(d.estimated_value) },
    { key: 'forecast_close_date', label: 'Closing', render: (d) => fmtDate(d.forecast_close_date) },
  ]

  return (
    <Panel
      title="Pipeline Deal"
      noPad
      action={
        visiblePipelines.length > 0 ? (
          <select value={pid} onChange={(e) => setPipelineId(e.target.value)} style={selStyle}>
            {visiblePipelines.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        ) : undefined
      }
    >
      <div style={{ padding: '16px 20px 0' }}>
        {visiblePipelines.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', fontSize: 14, paddingBottom: 20 }}>
            Anda belum tergabung di tim mana pun. Minta admin menambahkan Anda ke tim di CRM → Pengaturan.
          </div>
        ) : (
          <>
            <FilterBar
              search={search}
              onSearch={setSearch}
              searchPlaceholder="Cari deal / pelanggan…"
              view={view}
              onView={setView}
              right={canWrite ? <button className="btn-primary" onClick={() => setCreating(true)}>+ Deal</button> : undefined}
            />
            {stages.length === 0 && (
              <div style={{ color: 'var(--text-muted)', fontSize: 14, paddingBottom: 20 }}>Pipeline ini belum punya tahapan (atur di Pengaturan).</div>
            )}
            {stages.length > 0 && filtered.length === 0 && (
              <div style={{ color: 'var(--text-muted)', fontSize: 14, paddingBottom: 20 }}>Belum ada deal.</div>
            )}
          </>
        )}
      </div>

      {visiblePipelines.length > 0 && stages.length > 0 && view === 'kanban' && (
        <div style={{ padding: '0 20px 20px' }}>
          <KanbanBoard<Deal>
            items={filtered}
            getId={(d) => d.id}
            groupBy={(d) => d.stage_id}
            groups={groups}
            onMove={canWrite ? onMove : undefined}
            renderCard={(d) => (
              <div onClick={() => navigate(`/crm/deals/${d.id}`)} style={{ cursor: 'pointer' }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{d.title}</div>
                {d.customer_id && <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{custName[d.customer_id]}</div>}
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6, display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span>{rp(d.estimated_value)}</span>
                  <span>{fmtDate(d.forecast_close_date)}</span>
                </div>
              </div>
            )}
          />
        </div>
      )}
      {visiblePipelines.length > 0 && view === 'list' && filtered.length > 0 && <DataTable columns={columns} rows={filtered} />}

      {creating && <DealModal pipelineId={pid} onClose={() => setCreating(false)} />}
    </Panel>
  )
}

const selStyle: CSSProperties = {
  appearance: 'none',
  background: 'var(--surface-card)',
  border: '1px solid var(--border-default)',
  borderRadius: 'var(--radius-sm)',
  padding: '6px 12px',
  fontFamily: 'var(--font-ui)',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-secondary)',
  cursor: 'pointer',
}
