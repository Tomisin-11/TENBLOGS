import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { TEAMS, COMPETITIONS } from './teamLogos'

const TEAMS_KEY = 'tb_custom_teams'
const COMPS_KEY = 'tb_custom_competitions'

function load(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function persist(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* storage unavailable — ignore */ }
}

const CustomAssetsContext = createContext(null)

export function CustomAssetsProvider({ children }) {
  const [customTeams, setCustomTeams] = useState(() => load(TEAMS_KEY))
  const [customCompetitions, setCustomCompetitions] = useState(() => load(COMPS_KEY))

  useEffect(() => { persist(TEAMS_KEY, customTeams) }, [customTeams])
  useEffect(() => { persist(COMPS_KEY, customCompetitions) }, [customCompetitions])

  const addTeam = useCallback((name, data) => {
    setCustomTeams(prev => ({ ...prev, [name]: data }))
  }, [])

  const removeTeam = useCallback((name) => {
    setCustomTeams(prev => {
      const next = { ...prev }
      delete next[name]
      return next
    })
  }, [])

  const addCompetition = useCallback((name, data) => {
    setCustomCompetitions(prev => ({ ...prev, [name]: data }))
  }, [])

  const removeCompetition = useCallback((name) => {
    setCustomCompetitions(prev => {
      const next = { ...prev }
      delete next[name]
      return next
    })
  }, [])

  // Merged dictionaries — custom entries win on name clashes so users can
  // override a built-in logo if they want.
  const teams = useMemo(() => ({ ...TEAMS, ...customTeams }), [customTeams])
  const competitions = useMemo(() => ({ ...COMPETITIONS, ...customCompetitions }), [customCompetitions])

  const teamNames = useMemo(() => Object.keys(teams).sort(), [teams])
  const competitionNames = useMemo(() => Object.keys(competitions), [competitions])

  const customTeamNames = useMemo(() => Object.keys(customTeams).sort(), [customTeams])
  const customCompetitionNames = useMemo(() => Object.keys(customCompetitions).sort(), [customCompetitions])

  const value = {
    teams, competitions, teamNames, competitionNames,
    customTeamNames, customCompetitionNames,
    addTeam, removeTeam, addCompetition, removeCompetition,
  }

  return (
    <CustomAssetsContext.Provider value={value}>
      {children}
    </CustomAssetsContext.Provider>
  )
}

export function useCustomAssets() {
  const ctx = useContext(CustomAssetsContext)
  if (!ctx) throw new Error('useCustomAssets must be used within a CustomAssetsProvider')
  return ctx
}
