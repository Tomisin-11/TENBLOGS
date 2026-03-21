import { TEAMS, COMPETITIONS } from './teamLogos'

const t = name => TEAMS[name]?.logo || null
const c = name => COMPETITIONS[name]?.logo || null

export const DEFAULT_RATING = {
  name:'RAPHAEL DIAS BELLOLI', club:'FC Barcelona', position:'#11 · Left Midfield',
  match:'Barcelona vs Newcastle', comp:'La Liga', date:'Mar 18, 2026',
  homeTeam:'FC Barcelona', awayTeam:'Newcastle United', homeScore:'7', awayScore:'2',
  rating:'10.0', goals:'2', assists:'2', shots:'5', shotsOnTarget:'3',
  duelsWon:'4', duelsTotal:'6', touches:'43', passAcc:'67',
  passComp:'16', passTotal:'24', minutes:'90', yellowCards:'0',
  dribblesWon:'3', dribblesTotal:'4', keyPasses:'3', xg:'1.8',
}

export const DEFAULT_H2H = {
  homeTeam:'Manchester City', homeTeamLogo: t('Manchester City'), homeTeamColor:'#6CABDD',
  awayTeam:'Arsenal',         awayTeamLogo: t('Arsenal'),         awayTeamColor:'#EF0107',
  comp:'Premier League', date:'Sat 22 Mar 2026',
  homeWins:'18', draws:'12', awayWins:'14',
  homeGoals:'64', awayGoals:'52', homePoss:'56',
  homeShots:'14.2', awayShots:'11.8',
  homeForm:'WWDLW', awayForm:'WDWWL',
  r1date:'Apr 2025', r1result:'Man City 3–1 Arsenal',
  r2date:'Dec 2024', r2result:'Arsenal 1–0 Man City',
  r3date:'Apr 2024', r3result:'Man City 0–0 Arsenal',
}

export const DEFAULT_ANALYTICS = {
  homeTeam:'Manchester City', homeTeamLogo: t('Manchester City'), homeTeamColor:'#6CABDD',
  awayTeam:'Arsenal',         awayTeamLogo: t('Arsenal'),         awayTeamColor:'#EF0107',
  homeScore:'2', awayScore:'1', status:'FT',
  comp:'Premier League', venue:'Etihad Stadium',
  homePoss:'58', homeShots:'14', awayShots:'8',
  homeSOT:'6', awaySot:'3', homeCorners:'7', awayCorners:'4',
  homeFouls:'10', awayFouls:'13',
  homeYellow:'1', homeRed:'0', awayYellow:'2', awayRed:'0',
  ev1:"23' Haaland ⚽", ev1side:'home',
  ev2:"67' Saka ⚽",    ev2side:'away',
  ev3:"78' Haaland ⚽", ev3side:'home',
  ev4:'',               ev4side:'home',
}

export const DEFAULT_PREDICTION = {
  homeTeam:'Manchester City', homeTeamLogo: t('Manchester City'),
  awayTeam:'Arsenal',         awayTeamLogo: t('Arsenal'),
  comp:'Premier League', date:'Sat 22 Mar · 15:00',
  predictedScore:'2 – 1', pickNote:'Haaland is unstoppable right now',
  homeWinPct:'58', drawPct:'18', awayWinPct:'24',
}

export const DEFAULT_MATCHDAY = {
  homeTeam:'Manchester City', homeTeamLogo: t('Manchester City'),
  awayTeam:'Arsenal',         awayTeamLogo: t('Arsenal'),
  competition:'UEFA Champions League', competitionLogo: c('UEFA Champions League'),
  stage:'Quarter Final', date:'22 Mar 2026', time:'21:00',
  venue:'Etihad Stadium', bgColor:'#001230',
  homePlayer:null, awayPlayer:null,
}

export const DEFAULT_RESULT = {
  homeTeam:'West Ham United', homeTeamLogo: t('West Ham United'),
  awayTeam:'Brentford',       awayTeamLogo: t('Brentford'),
  homeScore:'3', awayScore:'2',
  competition:'', competitionLogo:null,
  stage:'', bgImage:null,
}
