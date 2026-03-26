export const DEFAULT_RATING = {
  name:'RAPHAEL DIAS BELLOLI', club:'FC Barcelona', position:'#11 · Left Midfield',
  match:'Barcelona vs Newcastle', comp:'La Liga', date:'Mar 18, 2026',
  homeTeam:'Barcelona', awayTeam:'Newcastle', homeScore:'7', awayScore:'2',
  rating:'10.0', goals:'2', assists:'2', shots:'5', shotsOnTarget:'3',
  duelsWon:'4', duelsTotal:'6', touches:'43', passAcc:'67',
  passComp:'16', passTotal:'24', minutes:'90', yellowCards:'0',
  dribblesWon:'3', dribblesTotal:'4', keyPasses:'3', xg:'1.8',
}

export const DEFAULT_H2H = {
  homeTeam:'Manchester City', homeDisplayName:'',
  homeTeamLogo:'/logos/clubs/manchester-city.svg', homeTeamColor:'#6CABDD',
  awayTeam:'Arsenal', awayDisplayName:'',
  awayTeamLogo:'/logos/clubs/arsenal.svg', awayTeamColor:'#EF0107',
  comp:'Premier League', date:'Sat 22 Mar 2026',
  homeWins:'18', draws:'12', awayWins:'14',
  homeGoals:'64', awayGoals:'52', homePoss:'56',
  homeAttackingThreat:'72', awayAttackingThreat:'65',
  homeShots:'14.2', awayShots:'11.8',
  homeForm:'WWDLW', awayForm:'WDWWL',
  r1date:'Apr 2025', r1result:'Man City 3-1 Arsenal',
  r2date:'Dec 2024', r2result:'Arsenal 1-0 Man City',
  r3date:'Apr 2024', r3result:'Man City 0-0 Arsenal',
}

export const DEFAULT_ANALYTICS = {
  homeTeam:'Manchester City', homeDisplayName:'',
  homeTeamLogo:'/logos/clubs/manchester-city.svg', homeTeamColor:'#6CABDD',
  awayTeam:'Arsenal', awayDisplayName:'',
  awayTeamLogo:'/logos/clubs/arsenal.svg', awayTeamColor:'#EF0107',
  homeScore:'2', awayScore:'1', status:'FT',
  comp:'Premier League', venue:'Etihad Stadium',
  homePoss:'58', homeShots:'14', awayShots:'8',
  homeSOT:'6', awaySot:'3', homeCorners:'7', awayCorners:'4',
  homeFouls:'10', awayFouls:'13',
  homeYellow:'1', homeRed:'0', awayYellow:'2', awayRed:'0',
  ev1:"23' Haaland", ev1side:'home',
  ev2:"67' Saka",    ev2side:'away',
  ev3:"78' Haaland", ev3side:'home',
  ev4:'',            ev4side:'home',
}

export const DEFAULT_PREDICTION = {
  homeTeam:'Manchester City', homeTeamLogo:'/logos/clubs/manchester-city.svg',
  awayTeam:'Arsenal',         awayTeamLogo:'/logos/clubs/arsenal.svg',
  comp:'Premier League', date:'Sat 22 Mar · 15:00',
  predictedScore:'2 – 1',
  pickNote:'Haaland is unstoppable right now',
  homeWinPct:'58', drawPct:'18', awayWinPct:'24',
}

export const DEFAULT_MATCHDAY = {
  homeTeam:'Manchester City', homeTeamLogo:'/logos/clubs/manchester-city.svg',
  awayTeam:'Arsenal',         awayTeamLogo:'/logos/clubs/arsenal.svg',
  competition:'UEFA Champions League',
  competitionLogo:'/logos/tournaments/tournaments_uefa-champions-league.svg',
  stage:'Quarter Final',
  date:'22 Mar 2026', time:'21:00',
  venue:'Etihad Stadium', bgColor:'#001230',
  homePlayer:null, awayPlayer:null,
}

export const DEFAULT_RESULT = {
  homeTeam:'Brighton', homeTeamLogo:'/logos/clubs/brighton.svg',
  awayTeam:'Liverpool', awayTeamLogo:'/logos/clubs/liverpool.svg',
  homeScore:'2', awayScore:'1',
  stageType:'FULL - TIME',
  stageSubtext:'',
  stageName:'',
  competition:'Premier League',
  competitionLogo:'/logos/tournaments/england_english-premier-league.svg',
  homeScorers:"14' D. Welbeck\n56' D. Welbeck",
  awayScorers:"30' M. Kerkez",
  bgImage:null,
  bgColor:'#100808',
}

export const DEFAULT_EDITOR = {
  ratio: '1:1',
  customW: 1080,
  customH: 1080,
  bgColor: '#0d0d14',
  bgImage: null,
  bgBrightness: 0.8,
  bgSaturate: 1,
  bgPosition: 'center',
  overlayGradient: 'linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.9) 100%)',
  overlayColor: '#000000',
  overlayOpacity: 0,
  accentBar: true,
  accentColor: '#e0000a',
  showBranding: true,
  brandingText: 'TEN BLOGS',
  textBlocks: [
    {
      text: 'YOUR HEADLINE',
      label: 'TEN BLOGS',
      sub: 'Add your subtext here',
      color: '#ffffff',
      labelColor: 'rgba(255,255,255,0.45)',
      subColor: 'rgba(255,255,255,0.6)',
      size: 0.065,
      top: 50,
      align: 'center',
      font: 'bebas',
      uppercase: true,
      shadow: true,
    }
  ],
}
