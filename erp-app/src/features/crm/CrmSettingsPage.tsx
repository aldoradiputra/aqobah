import { useMemo, useState, type CSSProperties } from 'react'
import {
  useCrmPipelines,
  useAllPipelineStages,
  useSavePipeline,
  useSaveStage,
  useDeleteStage,
  useReorderStages,
} from '../../lib/queries'
import { Panel } from '../../components/ui'
import type { CrmPipeline, CrmPipelineStage } from '../../lib/types'
import { CrmTeamsPanel } from './CrmTeamsPanel'

const CHANNEL_LABEL: Record<string, string> = { direct: 'Langsung', indirect: 'Tidak Langsung' }

// Pipeline & stage configuration (admin/management). Stages are fully editable —
// add, rename, reorder, mark terminal won/lost, delete — and apply to every team
// that uses the pipeline. Gated to admin/management at the route (App.tsx).
export function CrmSettingsPage() {
  const { data: pipelines = [], isLoading } = useCrmPipelines()
  const { data: stages = [] } = useAllPipelineStages()

  const byChannel = useMemo(() => {
    const groups: Record<string, CrmPipeline[]> = { direct: [], indirect: [] }
    for (const p of pipelines) (groups[p.channel] ??= []).push(p)
    return groups
  }, [pipelines])

  const stagesByPipeline = useMemo(() => {
    const m: Record<string, CrmPipelineStage[]> = {}
    for (const s of stages) (m[s.pipeline_id] ??= []).push(s)
    for (const k of Object.keys(m)) m[k].sort((a, b) => a.sort_order - b.sort_order)
    return m
  }, [stages])

  if (isLoading) return <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>Memuat…</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
        Kelola pipeline penjualan dan tahapannya. Perubahan berlaku untuk seluruh tim yang memakai pipeline tersebut.
      </div>
      {(['direct', 'indirect'] as const).map((channel) => (
        <div key={channel} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            style={{
              fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--text-muted)',
            }}
          >
            Channel {CHANNEL_LABEL[channel]}
          </div>
          {(byChannel[channel] ?? []).map((p) => (
            <PipelineCard key={p.id} pipeline={p} stages={stagesByPipeline[p.id] ?? []} />
          ))}
        </div>
      ))}
      <AddPipeline existingCount={pipelines.length} />
      <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: 6, paddingTop: 18 }}>
        <CrmTeamsPanel />
      </div>
    </div>
  )
}

function PipelineCard({ pipeline, stages }: { pipeline: CrmPipeline; stages: CrmPipelineStage[] }) {
  const savePipeline = useSavePipeline()
  const saveStage = useSaveStage()
  const delStage = useDeleteStage()
  const reorder = useReorderStages()
  const [newStage, setNewStage] = useState('')

  function move(i: number, dir: -1 | 1) {
    const j = i + dir
    if (j < 0 || j >= stages.length) return
    const next = [...stages]
    ;[next[i], next[j]] = [next[j], next[i]]
    reorder.mutate(next.map((s, idx) => ({ id: s.id, sort_order: idx + 1 })))
  }

  async function addStage() {
    const name = newStage.trim()
    if (!name) return
    try {
      await saveStage.mutateAsync({
        pipeline_id: pipeline.id,
        name,
        sort_order: (stages[stages.length - 1]?.sort_order ?? 0) + 1,
      })
      setNewStage('')
    } catch (e) {
      alert((e as Error).message)
    }
  }

  async function rename(s: CrmPipelineStage) {
    const name = window.prompt('Nama tahapan', s.name)?.trim()
    if (!name || name === s.name) return
    try {
      await saveStage.mutateAsync({ id: s.id, name })
    } catch (e) {
      alert((e as Error).message)
    }
  }

  async function remove(s: CrmPipelineStage) {
    if (!window.confirm(`Hapus tahapan "${s.name}"?`)) return
    try {
      await delStage.mutateAsync(s.id)
    } catch (e) {
      alert((e as Error).message)
    }
  }

  return (
    <Panel
      title={pipeline.name}
      action={
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={pipeline.is_active}
            onChange={() => savePipeline.mutate({ id: pipeline.id, is_active: !pipeline.is_active })}
          />
          Aktif
        </label>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {stages.length === 0 && (
          <div style={{ fontSize: 13, color: 'var(--text-muted)', padding: '4px 2px' }}>Belum ada tahapan.</div>
        )}
        {stages.map((s, i) => (
          <div key={s.id} style={stageRow}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', width: 16, flexShrink: 0 }}>{i + 1}</span>
            <span style={{ fontWeight: 600, fontSize: 13, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {s.name}
            </span>
            <button
              type="button"
              onClick={() => saveStage.mutate({ id: s.id, is_won: !s.is_won, is_lost: false })}
              style={pillToggle(s.is_won, 'won')}
            >
              Menang
            </button>
            <button
              type="button"
              onClick={() => saveStage.mutate({ id: s.id, is_lost: !s.is_lost, is_won: false })}
              style={pillToggle(s.is_lost, 'lost')}
            >
              Kalah
            </button>
            <button className="btn-ghost" style={iconBtn} onClick={() => move(i, -1)} disabled={i === 0} title="Naik">
              ↑
            </button>
            <button className="btn-ghost" style={iconBtn} onClick={() => move(i, 1)} disabled={i === stages.length - 1} title="Turun">
              ↓
            </button>
            <button className="btn-ghost" style={smallBtn} onClick={() => rename(s)}>
              Ubah
            </button>
            <button className="btn-ghost" style={{ ...smallBtn, color: 'var(--danger-500)' }} onClick={() => remove(s)}>
              Hapus
            </button>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <input
            value={newStage}
            onChange={(e) => setNewStage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addStage()
            }}
            placeholder="Tambah tahapan…"
            style={inputStyle}
          />
          <button className="btn-primary" onClick={addStage} disabled={!newStage.trim()}>
            Tambah
          </button>
        </div>
      </div>
    </Panel>
  )
}

function AddPipeline({ existingCount }: { existingCount: number }) {
  const save = useSavePipeline()
  const [name, setName] = useState('')
  const [channel, setChannel] = useState('direct')

  async function add() {
    const n = name.trim()
    if (!n) return
    try {
      await save.mutateAsync({ name: n, channel, sort_order: existingCount + 1 })
      setName('')
    } catch (e) {
      alert((e as Error).message)
    }
  }

  return (
    <Panel title="Tambah Pipeline">
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama pipeline…" style={inputStyle} />
        <select value={channel} onChange={(e) => setChannel(e.target.value)} style={{ ...inputStyle, flex: '0 0 auto' }}>
          <option value="direct">Langsung</option>
          <option value="indirect">Tidak Langsung</option>
        </select>
        <button className="btn-primary" onClick={add} disabled={!name.trim()}>
          Tambah
        </button>
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
        Pipeline baru dibuat tanpa tahapan — tambahkan tahapannya setelah dibuat.
      </div>
    </Panel>
  )
}

function pillToggle(active: boolean, tone: 'won' | 'lost'): CSSProperties {
  const fg = tone === 'won' ? 'var(--success-500)' : 'var(--danger-500)'
  const bg = tone === 'won' ? 'var(--success-50)' : 'var(--danger-50)'
  return {
    fontSize: 11,
    padding: '3px 9px',
    borderRadius: 'var(--radius-pill)',
    cursor: 'pointer',
    border: `1px solid ${active ? fg : 'var(--border-default)'}`,
    background: active ? bg : 'transparent',
    color: active ? fg : 'var(--text-muted)',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    flexShrink: 0,
  }
}

const inputStyle: CSSProperties = {
  flex: 1,
  minWidth: 140,
  padding: '8px 11px',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border-default)',
  fontFamily: 'var(--font-ui)',
  fontSize: 14,
  color: 'var(--text-primary)',
  outline: 'none',
  background: 'var(--surface-card)',
}
const stageRow: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '6px 8px',
  borderRadius: 'var(--radius-sm)',
  background: 'var(--surface-sunken)',
}
const iconBtn: CSSProperties = { padding: '3px 8px', flexShrink: 0 }
const smallBtn: CSSProperties = { padding: '3px 8px', fontSize: 12, flexShrink: 0 }
