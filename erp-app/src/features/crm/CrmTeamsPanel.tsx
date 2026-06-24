import { useMemo, useState, type CSSProperties } from 'react'
import {
  useSalesTeams,
  useSaveTeam,
  useDeleteTeam,
  useCrmPipelines,
  useTeamPipelines,
  useAddTeamPipeline,
  useRemoveTeamPipeline,
  useTeamMembers,
  useSaveTeamMember,
  useRemoveTeamMember,
  useProfiles,
} from '../../lib/queries'
import { Panel } from '../../components/ui'
import type { SalesTeam, SalesTeamMember, CrmPipeline, Profile } from '../../lib/types'

// Sales teams (admin/management). A team works one or more pipelines and has
// members with per-team seniority (member | lead). A lead sees every deal in the
// team's pipeline(s) — enforced by deal RLS in 2.4 via can_access_deal().
export function CrmTeamsPanel() {
  const { data: teams = [], isLoading } = useSalesTeams()
  const { data: pipelines = [] } = useCrmPipelines()
  const { data: teamPipelines = [] } = useTeamPipelines()
  const { data: members = [] } = useTeamMembers()
  const { data: profiles = [] } = useProfiles()
  const save = useSaveTeam()
  const [newTeam, setNewTeam] = useState('')

  const pipelineIdsByTeam = useMemo(() => {
    const m: Record<string, Set<string>> = {}
    for (const tp of teamPipelines) (m[tp.team_id] ??= new Set()).add(tp.pipeline_id)
    return m
  }, [teamPipelines])

  const membersByTeam = useMemo(() => {
    const m: Record<string, SalesTeamMember[]> = {}
    for (const mem of members) (m[mem.team_id] ??= []).push(mem)
    return m
  }, [members])

  const profilesById = useMemo(() => {
    const m: Record<string, Profile> = {}
    for (const p of profiles) m[p.id] = p
    return m
  }, [profiles])

  async function addTeam() {
    const name = newTeam.trim()
    if (!name) return
    try {
      await save.mutateAsync({ name })
      setNewTeam('')
    } catch (e) {
      alert((e as Error).message)
    }
  }

  if (isLoading) return <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>Memuat tim…</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
        Tim Penjualan
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: -4 }}>
        Petakan tim ke pipeline dan tambahkan anggotanya. Lead melihat seluruh deal di pipeline timnya; anggota hanya miliknya.
      </div>
      {teams.length === 0 && <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Belum ada tim.</div>}
      {teams.map((t) => (
        <TeamCard
          key={t.id}
          team={t}
          pipelines={pipelines}
          attached={pipelineIdsByTeam[t.id] ?? new Set()}
          members={membersByTeam[t.id] ?? []}
          profiles={profiles}
          profilesById={profilesById}
        />
      ))}
      <Panel title="Tambah Tim">
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={newTeam}
            onChange={(e) => setNewTeam(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addTeam()
            }}
            placeholder="Nama tim… (mis. Tim Umrah Jakarta)"
            style={inputStyle}
          />
          <button className="btn-primary" onClick={addTeam} disabled={!newTeam.trim()}>
            Tambah
          </button>
        </div>
      </Panel>
    </div>
  )
}

function nameOf(p: Profile): string {
  return p.full_name || p.email || p.id.slice(0, 8)
}

function TeamCard({
  team,
  pipelines,
  attached,
  members,
  profiles,
  profilesById,
}: {
  team: SalesTeam
  pipelines: CrmPipeline[]
  attached: Set<string>
  members: SalesTeamMember[]
  profiles: Profile[]
  profilesById: Record<string, Profile>
}) {
  const save = useSaveTeam()
  const del = useDeleteTeam()
  const addPipe = useAddTeamPipeline()
  const removePipe = useRemoveTeamPipeline()
  const saveMember = useSaveTeamMember()
  const removeMember = useRemoveTeamMember()
  const [pick, setPick] = useState('')

  function togglePipeline(pipelineId: string) {
    if (attached.has(pipelineId)) removePipe.mutate({ team_id: team.id, pipeline_id: pipelineId })
    else addPipe.mutate({ team_id: team.id, pipeline_id: pipelineId })
  }

  async function addMember() {
    if (!pick) return
    try {
      await saveMember.mutateAsync({ team_id: team.id, user_id: pick, seniority: 'member' })
      setPick('')
    } catch (e) {
      alert((e as Error).message)
    }
  }

  async function remove() {
    if (!window.confirm(`Hapus tim "${team.name}"? Anggota & pemetaan pipeline ikut terhapus.`)) return
    try {
      await del.mutateAsync(team.id)
    } catch (e) {
      alert((e as Error).message)
    }
  }

  const memberUserIds = new Set(members.map((m) => m.user_id))
  const available = profiles.filter((p) => !memberUserIds.has(p.id))

  return (
    <Panel
      title={team.name}
      action={
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)', cursor: 'pointer' }}>
            <input type="checkbox" checked={team.is_active} onChange={() => save.mutate({ id: team.id, is_active: !team.is_active })} />
            Aktif
          </label>
          <button className="btn-ghost" style={{ padding: '3px 8px', fontSize: 12, color: 'var(--danger-500)' }} onClick={remove}>
            Hapus
          </button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div style={subhead}>Pipeline</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {pipelines.length === 0 && <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Belum ada pipeline.</span>}
            {pipelines.map((p) => (
              <button key={p.id} type="button" onClick={() => togglePipeline(p.id)} style={chipToggle(attached.has(p.id))}>
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={subhead}>Anggota</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {members.length === 0 && <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Belum ada anggota.</div>}
            {members.map((m) => {
              const prof = profilesById[m.user_id]
              const isLead = m.seniority === 'lead'
              return (
                <div key={m.id} style={memberRow}>
                  <span style={{ flex: 1, minWidth: 0, fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {prof ? nameOf(prof) : m.user_id.slice(0, 8)}
                  </span>
                  <button
                    type="button"
                    title="Ubah senioritas"
                    onClick={() => saveMember.mutate({ id: m.id, seniority: isLead ? 'member' : 'lead' })}
                    style={leadToggle(isLead)}
                  >
                    {isLead ? 'Lead' : 'Member'}
                  </button>
                  <button
                    className="btn-ghost"
                    style={{ padding: '3px 8px', fontSize: 12, color: 'var(--danger-500)', flexShrink: 0 }}
                    onClick={() => removeMember.mutate(m.id)}
                  >
                    Keluarkan
                  </button>
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <select value={pick} onChange={(e) => setPick(e.target.value)} style={inputStyle}>
              <option value="">Tambah anggota…</option>
              {available.map((p) => (
                <option key={p.id} value={p.id}>
                  {nameOf(p)} · {p.role}
                </option>
              ))}
            </select>
            <button className="btn-primary" onClick={addMember} disabled={!pick}>
              Tambah
            </button>
          </div>
        </div>
      </div>
    </Panel>
  )
}

const subhead: CSSProperties = { fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }
const memberRow: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '6px 8px',
  borderRadius: 'var(--radius-sm)',
  background: 'var(--surface-sunken)',
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

function chipToggle(on: boolean): CSSProperties {
  return {
    fontSize: 12,
    padding: '5px 11px',
    borderRadius: 'var(--radius-pill)',
    cursor: 'pointer',
    border: `1px solid ${on ? 'var(--brand-primary)' : 'var(--border-default)'}`,
    background: on ? 'var(--brand-primary)' : 'transparent',
    color: on ? '#fff' : 'var(--text-muted)',
    fontWeight: 600,
    whiteSpace: 'nowrap',
  }
}

function leadToggle(isLead: boolean): CSSProperties {
  return {
    fontSize: 11,
    padding: '3px 10px',
    borderRadius: 'var(--radius-pill)',
    cursor: 'pointer',
    border: `1px solid ${isLead ? 'var(--gold-400)' : 'var(--border-default)'}`,
    background: isLead ? 'rgba(252,176,23,0.14)' : 'transparent',
    color: isLead ? 'var(--text-primary)' : 'var(--text-muted)',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    flexShrink: 0,
  }
}
