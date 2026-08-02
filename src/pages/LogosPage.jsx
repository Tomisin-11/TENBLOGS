import { useRef, useState } from 'react'
import { ImagePlus, Trash2, Shield, Users, Trophy, Loader2, CheckCircle2, AlertTriangle, PenLine, Plus, RotateCcw } from 'lucide-react'
import { useCustomAssets } from '../lib/CustomAssetsContext'
import { uploadLogo, isCloudinaryConfigured } from '../lib/cloudinary'
import { SectionLabel, Field, ColorField } from '../components/ui/SharedUI'

function LogoDrop({ preview, onFile, uploading }) {
  const ref = useRef()
  return (
    <div>
      <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">Logo Image</label>
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-white/[0.04] border border-white/[0.08] p-1.5">
          {uploading
            ? <Loader2 size={18} className="animate-spin text-white/30" />
            : preview
              ? <img src={preview} alt="logo preview" className="max-w-full max-h-full object-contain" />
              : <ImagePlus size={18} className="text-white/20" />
          }
        </div>
        <button
          type="button"
          onClick={() => ref.current?.click()}
          disabled={uploading}
          className="flex-1 border border-white/[0.08] bg-white/[0.03] hover:border-white/20 text-white/50 text-[12px] tracking-widest py-2.5 transition-colors uppercase disabled:opacity-40"
        >
          {uploading ? 'Uploading…' : preview ? '✓ Change Logo' : 'Upload Logo (PNG/SVG)'}
        </button>
        <input ref={ref} type="file" accept="image/*" className="hidden"
          onChange={e => { const f = e.target.files[0]; if (f) onFile(f) }} />
      </div>
    </div>
  )
}

function EmptyRow({ label }) {
  return <div className="text-[11px] text-white/25 italic py-3">{label}</div>
}

function ModeToggle({ mode, setMode, addLabel, editLabel }) {
  return (
    <div className="flex gap-1 bg-white/[0.03] border border-white/[0.06] p-1 mb-4 w-fit">
      {[['add', addLabel, Plus], ['edit', editLabel, PenLine]].map(([id, label, Icon]) => (
        <button key={id} onClick={() => setMode(id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] uppercase transition-colors ${
            mode === id ? 'bg-[#e0000a] text-white' : 'text-white/40 hover:text-white/70'
          }`}>
          <Icon size={12} /> {label}
        </button>
      ))}
    </div>
  )
}

export default function LogosPage() {
  const {
    customTeamNames, customCompetitionNames, teams, competitions, teamNames, competitionNames,
    addTeam, removeTeam, addCompetition, removeCompetition,
  } = useCustomAssets()

  const [tab, setTab] = useState('teams') // teams | competitions
  const [teamMode, setTeamMode] = useState('add') // add | edit
  const [compMode, setCompMode] = useState('add')

  // ── Team form state (used for both Add and Edit) ──
  const [tSelected, setTSelected] = useState('') // which existing team is being edited
  const [tName, setTName] = useState('')
  const [tType, setTType] = useState('Club')
  const [tLogo, setTLogo] = useState(null)
  const [tHome, setTHome] = useState('#e0000a')
  const [tAway, setTAway] = useState('#ffffff')
  const [tUploading, setTUploading] = useState(false)

  // ── Competition form state ──
  const [cSelected, setCSelected] = useState('')
  const [cName, setCName] = useState('')
  const [cLogo, setCLogo] = useState(null)
  const [cColor, setCColor] = useState('#e0000a')
  const [cBg, setCBg] = useState('#0d0d14')
  const [cUploading, setCUploading] = useState(false)

  const [toast, setToast] = useState(null) // { type: 'ok'|'err', text }
  const flash = (type, text) => { setToast({ type, text }); setTimeout(() => setToast(null), 3500) }

  const resetTeamForm = () => { setTName(''); setTLogo(null); setTHome('#e0000a'); setTAway('#ffffff'); setTType('Club'); setTSelected('') }
  const resetCompForm = () => { setCName(''); setCLogo(null); setCColor('#e0000a'); setCBg('#0d0d14'); setCSelected('') }

  const loadTeamForEdit = (name) => {
    setTSelected(name)
    const t = teams[name]
    setTName(name)
    setTLogo(t?.logo || null)
    setTHome(t?.home || '#e0000a')
    setTAway(t?.away || '#ffffff')
    setTType(t?.type === 'country' || t?.logo?.includes('/logos/flags/') ? 'Country' : 'Club')
  }

  const loadCompForEdit = (name) => {
    setCSelected(name)
    const c = competitions[name]
    setCName(name)
    setCLogo(c?.logo || null)
    setCColor(c?.color || '#e0000a')
    setCBg(c?.bg || '#0d0d14')
  }

  const handleTeamFile = async (file) => {
    setTUploading(true)
    try { setTLogo(await uploadLogo(file)) }
    catch (err) { flash('err', err.message || 'Upload failed') }
    finally { setTUploading(false) }
  }

  const handleCompFile = async (file) => {
    setCUploading(true)
    try { setCLogo(await uploadLogo(file)) }
    catch (err) { flash('err', err.message || 'Upload failed') }
    finally { setCUploading(false) }
  }

  const submitTeam = () => {
    if (!tName.trim()) { flash('err', 'Give the team a name first'); return }
    if (teamMode === 'add' && teams[tName.trim()]) {
      flash('err', 'That name already exists — switch to "Edit Existing" to change it'); return
    }
    addTeam(tName.trim(), {
      logo: tLogo, home: tHome, away: tAway, bg: '#0a0a0a',
      type: tType === 'Country' ? 'country' : 'club',
    })
    flash('ok', teamMode === 'edit'
      ? `${tName.trim()} updated everywhere it's used`
      : `${tName.trim()} added — it'll now show up in every team dropdown`)
    resetTeamForm()
  }

  const submitCompetition = () => {
    if (!cName.trim()) { flash('err', 'Give the competition a name first'); return }
    if (compMode === 'add' && competitions[cName.trim()]) {
      flash('err', 'That name already exists — switch to "Edit Existing" to change it'); return
    }
    addCompetition(cName.trim(), { logo: cLogo, color: cColor, bg: cBg })
    flash('ok', compMode === 'edit'
      ? `${cName.trim()} updated everywhere it's used`
      : `${cName.trim()} added — it'll now show up in every competition dropdown`)
    resetCompForm()
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">

      {/* Header */}
      <div className="relative overflow-hidden border border-white/[0.06] p-6"
        style={{ background:'linear-gradient(135deg,rgba(224,0,10,0.1) 0%,rgba(224,0,10,0.02) 40%,transparent 70%)' }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background:'linear-gradient(90deg,#e0000a 0%,rgba(224,0,10,0.3) 60%,transparent 100%)' }} />
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 flex items-center justify-center bg-[#e0000a]/15 border border-[#e0000a]/30">
            <ImagePlus size={16} className="text-[#e0000a]" />
          </div>
          <div>
            <h1 className="font-bebas text-[24px] tracking-[0.04em] text-white leading-none">Logo Library</h1>
            <p className="text-[11px] text-white/35 mt-1">Add new teams & competitions, or edit any existing one's logo/colors — changes apply everywhere in the app instantly.</p>
          </div>
        </div>
        {!isCloudinaryConfigured() && (
          <div className="mt-3 flex items-start gap-2 text-[11px] text-amber-400/80 bg-amber-500/[0.06] border border-amber-500/20 px-3 py-2">
            <AlertTriangle size={13} className="shrink-0 mt-0.5" />
            <span>Cloudinary isn't configured yet, so uploads are stored locally in this browser (won't sync across devices). Set <code className="text-amber-300">VITE_CLOUDINARY_CLOUD_NAME</code> and <code className="text-amber-300">VITE_CLOUDINARY_UPLOAD_PRESET</code> in your <code className="text-amber-300">.env</code> to enable cloud storage — see <code className="text-amber-300">src/lib/cloudinary.js</code>.</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/[0.06]">
        {[
          { id:'teams', label:'Teams & Countries', Icon:Users },
          { id:'competitions', label:'Competitions', Icon:Trophy },
        ].map(({ id, label, Icon }) => (
          <button key={id} onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-3 text-[11px] font-bold tracking-[0.15em] uppercase border-b-2 transition-colors ${
              tab === id ? 'text-white border-[#e0000a]' : 'text-white/35 border-transparent hover:text-white/60'
            }`}>
            <Icon size={13} /> {label}
          </button>
        ))}
      </div>

      {/* Toast */}
      {toast && (
        <div className={`flex items-center gap-2 text-[12px] px-3 py-2.5 border ${
          toast.type === 'ok'
            ? 'text-green-400 bg-green-500/[0.06] border-green-500/25'
            : 'text-red-400 bg-red-500/[0.06] border-red-500/25'
        }`}>
          {toast.type === 'ok' ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
          {toast.text}
        </div>
      )}

      {tab === 'teams' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add / Edit team form */}
          <div className="border border-white/[0.06] p-5" style={{ background:'rgba(255,255,255,0.012)' }}>
            <ModeToggle mode={teamMode} setMode={m => { setTeamMode(m); resetTeamForm() }} addLabel="Add New" editLabel="Edit Existing" />

            {teamMode === 'edit' && (
              <div className="mb-3">
                <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">Pick a team or country to edit</label>
                <select value={tSelected} onChange={e => e.target.value ? loadTeamForEdit(e.target.value) : resetTeamForm()}
                  className="w-full bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] text-white/90 text-[13px] px-3 py-2 transition-colors focus:border-[#e0000a]">
                  <option value="" className="bg-[#0d0d16]">— Select —</option>
                  {teamNames.map(n => <option key={n} value={n} className="bg-[#0d0d16]">{n}</option>)}
                </select>
              </div>
            )}

            {(teamMode === 'add' || tSelected) && (
              <div className="flex flex-col gap-3">
                <Field label="Name" value={tName} onChange={setTName} />
                <Field label="Type" value={tType} onChange={setTType} options={['Club', 'Country']} />
                <LogoDrop preview={tLogo} onFile={handleTeamFile} uploading={tUploading} />
                <div className="grid grid-cols-2 gap-3">
                  <ColorField label="Home Kit Color" value={tHome} onChange={setTHome} />
                  <ColorField label="Away Kit Color" value={tAway} onChange={setTAway} />
                </div>
                <button onClick={submitTeam} disabled={tUploading}
                  className="mt-1 bg-[#e0000a] hover:bg-[#ff2535] disabled:opacity-40 text-white text-[12px] font-bold tracking-[0.18em] uppercase py-2.5 transition-colors">
                  {teamMode === 'edit' ? 'Save Changes' : '+ Add to Library'}
                </button>
              </div>
            )}
          </div>

          {/* Custom teams list */}
          <div className="border border-white/[0.06] p-5" style={{ background:'rgba(255,255,255,0.012)' }}>
            <SectionLabel>Your Custom / Overridden Teams ({customTeamNames.length})</SectionLabel>
            {customTeamNames.length === 0
              ? <EmptyRow label="Nothing here yet. Added teams, and any built-in team you've edited, will show up here." />
              : (
                <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-1">
                  {customTeamNames.map(name => {
                    const t = teams[name]
                    return (
                      <div key={name} className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] px-3 py-2.5">
                        <div className="w-9 h-9 shrink-0 flex items-center justify-center bg-white/[0.05] p-1">
                          {t.logo
                            ? <img src={t.logo} alt={name} className="max-w-full max-h-full object-contain" />
                            : <span className="text-[9px] text-white/30">{name.slice(0,3).toUpperCase()}</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-semibold text-white/85 truncate">{name}</div>
                          <div className="text-[9px] text-white/30 uppercase tracking-wide">{t.type === 'country' ? 'Country' : 'Club'}</div>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <div className="w-4 h-4 rounded-full border border-white/20" style={{ background: t.home }} title="Home color" />
                          <div className="w-4 h-4 rounded-full border border-white/20" style={{ background: t.away }} title="Away color" />
                        </div>
                        <button onClick={() => { setTeamMode('edit'); loadTeamForEdit(name) }}
                          className="shrink-0 text-white/25 hover:text-white/70 transition-colors p-1" title="Edit">
                          <PenLine size={14} />
                        </button>
                        <button onClick={() => removeTeam(name)}
                          className="shrink-0 text-white/25 hover:text-red-400 transition-colors p-1" title="Remove override / delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
          </div>
        </div>
      )}

      {tab === 'competitions' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add / Edit competition form */}
          <div className="border border-white/[0.06] p-5" style={{ background:'rgba(255,255,255,0.012)' }}>
            <ModeToggle mode={compMode} setMode={m => { setCompMode(m); resetCompForm() }} addLabel="Add New" editLabel="Edit Existing" />

            {compMode === 'edit' && (
              <div className="mb-3">
                <label className="block text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 mb-1.5">Pick a competition to edit</label>
                <select value={cSelected} onChange={e => e.target.value ? loadCompForEdit(e.target.value) : resetCompForm()}
                  className="w-full bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] text-white/90 text-[13px] px-3 py-2 transition-colors focus:border-[#e0000a]">
                  <option value="" className="bg-[#0d0d16]">— Select —</option>
                  {competitionNames.map(n => <option key={n} value={n} className="bg-[#0d0d16]">{n}</option>)}
                </select>
              </div>
            )}

            {(compMode === 'add' || cSelected) && (
              <div className="flex flex-col gap-3">
                <Field label="Name" value={cName} onChange={setCName} />
                <LogoDrop preview={cLogo} onFile={handleCompFile} uploading={cUploading} />
                <div className="grid grid-cols-2 gap-3">
                  <ColorField label="Accent Color" value={cColor} onChange={setCColor} />
                  <ColorField label="Background Color" value={cBg} onChange={setCBg} />
                </div>
                <button onClick={submitCompetition} disabled={cUploading}
                  className="mt-1 bg-[#e0000a] hover:bg-[#ff2535] disabled:opacity-40 text-white text-[12px] font-bold tracking-[0.18em] uppercase py-2.5 transition-colors">
                  {compMode === 'edit' ? 'Save Changes' : '+ Add to Library'}
                </button>
              </div>
            )}
          </div>

          {/* Custom competitions list */}
          <div className="border border-white/[0.06] p-5" style={{ background:'rgba(255,255,255,0.012)' }}>
            <SectionLabel>Your Custom / Overridden Competitions ({customCompetitionNames.length})</SectionLabel>
            {customCompetitionNames.length === 0
              ? <EmptyRow label="Nothing here yet. Added competitions, and any built-in one you've edited, will show up here." />
              : (
                <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-1">
                  {customCompetitionNames.map(name => {
                    const c = competitions[name]
                    return (
                      <div key={name} className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] px-3 py-2.5">
                        <div className="w-9 h-9 shrink-0 flex items-center justify-center bg-white/[0.05] p-1">
                          {c.logo
                            ? <img src={c.logo} alt={name} className="max-w-full max-h-full object-contain" />
                            : <span className="text-[9px] text-white/30">—</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-semibold text-white/85 truncate">{name}</div>
                        </div>
                        <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" style={{ background: c.color }} title="Accent color" />
                        <button onClick={() => { setCompMode('edit'); loadCompForEdit(name) }}
                          className="shrink-0 text-white/25 hover:text-white/70 transition-colors p-1" title="Edit">
                          <PenLine size={14} />
                        </button>
                        <button onClick={() => removeCompetition(name)}
                          className="shrink-0 text-white/25 hover:text-red-400 transition-colors p-1" title="Remove override / delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
          </div>
        </div>
      )}

      {/* Footer note */}
      <div className="flex items-start gap-2 text-[10px] text-white/25 px-1">
        <Shield size={12} className="shrink-0 mt-0.5" />
        <span>"Edit Existing" works on built-in teams/competitions too — it saves your version as an override, so the original ships untouched but your edit is what shows up everywhere. Hit the trash icon on an override to revert back to the built-in default.</span>
      </div>
    </div>
  )
}
