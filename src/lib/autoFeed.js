/**
 * TEN BLOGS Auto Feed Service
 * Fetches sports news → Wikipedia image → Groq captions → card data
 * APIs: NewsAPI (free key), Wikipedia (no key), Groq (free key)
 */

const getKey = (envKey, windowKey) =>
  (typeof window !== 'undefined' && window[windowKey]) || import.meta.env[envKey] || ''

const NEWS_API_KEY = () => getKey('VITE_NEWS_API_KEY', '__TB_NEWS_KEY__')
const GROQ_API_KEY = () => getKey('VITE_GROQ_API_KEY', '__TB_GROQ_KEY__')

// ── Filter config: sports, leagues, news types ─────────────────

export const SPORTS_CONFIG = {
  football: {
    label: 'Football / Soccer',
    icon: '⚽',
    leagues: [
      { id: 'all',         label: 'All Football',         query: 'football soccer' },
      { id: 'premier',     label: 'Premier League',        query: 'Premier League football' },
      { id: 'laliga',      label: 'La Liga',               query: 'La Liga football' },
      { id: 'bundesliga',  label: 'Bundesliga',            query: 'Bundesliga football' },
      { id: 'seriea',      label: 'Serie A',               query: 'Serie A football' },
      { id: 'ligue1',      label: 'Ligue 1',               query: 'Ligue 1 football' },
      { id: 'ucl',         label: 'Champions League',      query: 'UEFA Champions League' },
      { id: 'europa',      label: 'Europa League',         query: 'UEFA Europa League' },
      { id: 'afcon',       label: 'AFCON / Africa',        query: 'Africa Cup of Nations football' },
      { id: 'worldcup',    label: 'World Cup',             query: 'FIFA World Cup football' },
      { id: 'mls',         label: 'MLS',                   query: 'MLS Major League Soccer' },
    ],
    newsTypes: [
      { id: 'all',         label: 'All News',              keywords: '' },
      { id: 'transfer',    label: 'Transfers',             keywords: 'transfer signing deal' },
      { id: 'result',      label: 'Match Results',         keywords: 'result score full-time' },
      { id: 'injury',      label: 'Injuries',              keywords: 'injury injured out' },
      { id: 'breaking',    label: 'Breaking News',         keywords: 'breaking exclusive confirmed' },
      { id: 'preview',     label: 'Match Previews',        keywords: 'preview vs fixture upcoming' },
    ],
  },
  tennis: {
    label: 'Tennis',
    icon: '🎾',
    leagues: [
      { id: 'all',         label: 'All Tennis',            query: 'tennis' },
      { id: 'wimbledon',   label: 'Wimbledon',             query: 'Wimbledon tennis' },
      { id: 'usopen',      label: 'US Open',               query: 'US Open tennis' },
      { id: 'frenchopen',  label: 'French Open',           query: 'French Open Roland Garros' },
      { id: 'ausopen',     label: 'Australian Open',       query: 'Australian Open tennis' },
      { id: 'atp',         label: 'ATP Tour',              query: 'ATP Tour tennis' },
      { id: 'wta',         label: 'WTA Tour',              query: 'WTA Tour tennis' },
    ],
    newsTypes: [
      { id: 'all',         label: 'All News',              keywords: '' },
      { id: 'result',      label: 'Match Results',         keywords: 'result won defeated' },
      { id: 'ranking',     label: 'Rankings',              keywords: 'ranking world number' },
      { id: 'breaking',    label: 'Breaking News',         keywords: 'breaking exclusive' },
    ],
  },
  basketball: {
    label: 'Basketball',
    icon: '🏀',
    leagues: [
      { id: 'all',         label: 'All Basketball',        query: 'basketball' },
      { id: 'nba',         label: 'NBA',                   query: 'NBA basketball' },
      { id: 'euroleague',  label: 'EuroLeague',            query: 'EuroLeague basketball' },
      { id: 'fiba',        label: 'FIBA',                  query: 'FIBA basketball' },
    ],
    newsTypes: [
      { id: 'all',         label: 'All News',              keywords: '' },
      { id: 'result',      label: 'Game Results',          keywords: 'score points won' },
      { id: 'transfer',    label: 'Trades / Signings',     keywords: 'trade signed deal contract' },
      { id: 'breaking',    label: 'Breaking News',         keywords: 'breaking exclusive' },
    ],
  },
  boxing: {
    label: 'Boxing / MMA',
    icon: '🥊',
    leagues: [
      { id: 'all',         label: 'All Combat Sports',     query: 'boxing MMA UFC' },
      { id: 'boxing',      label: 'Boxing',                query: 'boxing fight championship' },
      { id: 'ufc',         label: 'UFC / MMA',             query: 'UFC MMA fight' },
    ],
    newsTypes: [
      { id: 'all',         label: 'All News',              keywords: '' },
      { id: 'result',      label: 'Fight Results',         keywords: 'result KO TKO decision won' },
      { id: 'preview',     label: 'Fight Previews',        keywords: 'fight preview upcoming vs' },
      { id: 'breaking',    label: 'Breaking News',         keywords: 'breaking confirmed' },
    ],
  },
  cricket: {
    label: 'Cricket',
    icon: '🏏',
    leagues: [
      { id: 'all',         label: 'All Cricket',           query: 'cricket' },
      { id: 'ipl',         label: 'IPL',                   query: 'IPL Indian Premier League cricket' },
      { id: 'test',        label: 'Test Cricket',          query: 'Test match cricket' },
      { id: 'worldcup',    label: 'Cricket World Cup',     query: 'ICC Cricket World Cup' },
    ],
    newsTypes: [
      { id: 'all',         label: 'All News',              keywords: '' },
      { id: 'result',      label: 'Match Results',         keywords: 'result score won innings' },
      { id: 'breaking',    label: 'Breaking News',         keywords: 'breaking exclusive' },
    ],
  },
  rugby: {
    label: 'Rugby',
    icon: '🏉',
    leagues: [
      { id: 'all',         label: 'All Rugby',             query: 'rugby' },
      { id: 'sixnations',  label: 'Six Nations',           query: 'Six Nations rugby' },
      { id: 'worldcup',    label: 'Rugby World Cup',       query: 'Rugby World Cup' },
      { id: 'premership',  label: 'Premiership Rugby',     query: 'Premiership Rugby England' },
    ],
    newsTypes: [
      { id: 'all',         label: 'All News',              keywords: '' },
      { id: 'result',      label: 'Match Results',         keywords: 'result score won tries' },
      { id: 'breaking',    label: 'Breaking News',         keywords: 'breaking' },
    ],
  },
}

export const DEFAULT_FILTERS = {
  sport: 'football',
  league: 'all',
  newsType: 'all',
}

// ── Build search query from filters ───────────────────────────

export function buildSearchQuery(filters = DEFAULT_FILTERS) {
  const sportCfg  = SPORTS_CONFIG[filters.sport] || SPORTS_CONFIG.football
  const leagueCfg = sportCfg.leagues.find(l => l.id === filters.league) || sportCfg.leagues[0]
  const typeCfg   = sportCfg.newsTypes.find(t => t.id === filters.newsType) || sportCfg.newsTypes[0]

  const parts = [leagueCfg.query]
  if (typeCfg.keywords) parts.push(typeCfg.keywords)
  return parts.join(' ')
}

// ── Helpers ────────────────────────────────────────────────────

function extractSubject(title = '', sport = 'football') {
  const playerMap = {
    'ronaldo': 'Cristiano Ronaldo', 'messi': 'Lionel Messi',
    'mbappe': 'Kylian Mbappé', 'haaland': 'Erling Haaland',
    'salah': 'Mohamed Salah', 'neymar': 'Neymar',
    'benzema': 'Karim Benzema', 'lewandowski': 'Robert Lewandowski',
    'kane': 'Harry Kane', 'vinicius': 'Vinicius Junior',
    'bellingham': 'Jude Bellingham', 'saka': 'Bukayo Saka',
    'rashford': 'Marcus Rashford', 'de bruyne': 'Kevin De Bruyne',
    'osimhen': 'Victor Osimhen', 'lookman': 'Ademola Lookman',
    // Tennis
    'djokovic': 'Novak Djokovic', 'federer': 'Roger Federer',
    'nadal': 'Rafael Nadal', 'alcaraz': 'Carlos Alcaraz',
    'swiatek': 'Iga Swiatek', 'serena': 'Serena Williams',
    // Basketball
    'lebron': 'LeBron James', 'curry': 'Stephen Curry',
    'durant': 'Kevin Durant', 'giannis': 'Giannis Antetokounmpo',
    // Boxing
    'fury': 'Tyson Fury', 'joshua': 'Anthony Joshua',
    'usyk': 'Oleksandr Usyk', 'canelo': 'Canelo Alvarez',
  }
  const lower = title.toLowerCase()
  for (const [key, fullName] of Object.entries(playerMap)) {
    if (lower.includes(key)) return fullName
  }
  const words = title.split(' ').filter(w => /^[A-Z]/.test(w) && w.length > 3)
  return words.slice(0, 2).join(' ') || sport
}

function detectCardType(title = '', newsType = 'all') {
  // If user picked a specific type, honour it
  if (newsType === 'transfer') return 'transfer'
  if (newsType === 'result')   return 'result'
  // Otherwise auto-detect
  const t = title.toLowerCase()
  if (/\d\s*[-–]\s*\d/.test(t) || /full.?time|final.?score|ft:|result|score/.test(t)) return 'result'
  if (/sign|transfer|deal|fee|loan|join|arrival|depart|move|traded/.test(t)) return 'transfer'
  return 'news'
}

function extractScore(title = '') {
  const m = title.match(/(\d+)\s*[-–]\s*(\d+)/)
  return m ? { home: m[1], away: m[2] } : null
}

// ── 1. Fetch news with filters ─────────────────────────────────

export async function fetchSportsNews(filters = DEFAULT_FILTERS, page = 1) {
  const _newsKey = NEWS_API_KEY()
  if (!_newsKey) throw new Error('Missing VITE_NEWS_API_KEY')

  const q = buildSearchQuery(filters)

  // NewsAPI free plan only allows /top-headlines from browsers
  // Use q param to filter by sport/league within headlines
  const endpoint = `https://newsapi.org/v2/top-headlines?` +
    `q=${encodeURIComponent(q)}&` +
    `language=en&` +
    `pageSize=10&` +
    `page=${page}&` +
    `apiKey=${_newsKey}`

  const isLocalhost = typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

  const url = isLocalhost
    ? `https://api.allorigins.win/raw?url=${encodeURIComponent(endpoint)}`
    : endpoint

  const res = await fetch(url)
  if (!res.ok) throw new Error(`NewsAPI error: ${res.status}`)
  const data = await res.json()
  if (data.status !== 'ok') throw new Error(data.message || 'NewsAPI failed')
  return (data.articles || []).filter(a => a.title && a.title !== '[Removed]')
}

// ── 2. Wikipedia image ─────────────────────────────────────────

export async function fetchWikipediaImage(subject) {
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?` +
      `action=query&list=search&srsearch=${encodeURIComponent(subject)}&format=json&origin=*&srlimit=3`
    const searchRes = await fetch(searchUrl)
    const searchData = await searchRes.json()
    const results = searchData?.query?.search || []
    if (!results.length) return null

    const pageTitle = results[0].title
    const imageUrl = `https://en.wikipedia.org/w/api.php?` +
      `action=query&titles=${encodeURIComponent(pageTitle)}&prop=pageimages&pithumbsize=1200&format=json&origin=*`
    const imageRes = await fetch(imageUrl)
    const imageData = await imageRes.json()
    const pages = imageData?.query?.pages || {}
    const page = Object.values(pages)[0]
    if (page?.thumbnail?.source) return page.thumbnail.source

    const origUrl = `https://en.wikipedia.org/w/api.php?` +
      `action=query&titles=${encodeURIComponent(pageTitle)}&prop=pageimages&piprop=original&format=json&origin=*`
    const origRes = await fetch(origUrl)
    const origData = await origRes.json()
    const origPages = origData?.query?.pages || {}
    const origPage = Object.values(origPages)[0]
    return origPage?.original?.source || null
  } catch (e) {
    console.warn('Wikipedia image fetch failed:', e.message)
    return null
  }
}

// ── 3. Groq captions — TEN BLOGS style ────────────────────────

export async function generateCaptions(headline, subtext, cardType, sport = 'football', articleTitle = '') {
  const _groqKey = GROQ_API_KEY()

  // Fallback captions (no Groq key) — still follow TEN BLOGS format as closely as possible
  if (!_groqKey) {
    const tag = headline.split(' ').slice(0, 4).join(' ')
    const fb = `🚨🏟️ ${tag}: WHAT YOU NEED TO KNOW\n` +
      `Breaking news from the world of ${sport}! ${subtext || headline}\n\n` +
      `The Story:\n` +
      `📋 The Update — ${headline}\n` +
      `⚽️ The Impact — This could be a big moment heading into the next round of fixtures.\n\n` +
      `💬 What do you think about this? Drop your thoughts below! 👇\n` +
      `🔴 Follow TEN BLOGS for more ${sport} updates!\n` +
      `#TenBlogs #${sport.charAt(0).toUpperCase() + sport.slice(1)}`
    const x = `🚨 ${headline}\n\n${subtext ? subtext + '\n\n' : ''}#${sport} #TenBlogs`
    return { facebook: fb, twitter: x }
  }

  const prompt = `You are a social media writer for TEN BLOGS, a popular African sports page.

Your Facebook caption style is VERY specific. Study this real example carefully and copy the exact format:

EXAMPLE (injury news):
🚨🏟️ WERDER BREMEN UPDATE: IS VICTOR BONIFACE READY?
Huge news coming out of the Weserstadion! Manager Daniel Thioune has confirmed that Victor Boniface is edging closer to his first appearance since suffering a serious knee injury in December 2025. 🏟️✨⚽️
The Situation:
🩹 The Recovery — After a grueling four-month rehab, Boniface has been integrated into full training sessions.
📋 The Quote — "We are not ruling anyone out. If we see an opportunity after the final training session, he could make his comeback," said Thioune.
🎯 The Impact — Bremen have missed his physical presence up front; his return could be the spark they need to finish the season strong.
🔴 Follow TEN BLOGS for the Bremen vs. Hamburg lineup!
#WerderBremen #VictorBoniface #Bundesliga #InjuryNews #ReturnOfTheKing #TENBLOGS

FORMAT RULES (follow exactly):
1. First line: 🚨[relevant emoji] TEAM/PLAYER NAME IN CAPS: PUNCHY QUESTION OR STATEMENT
2. Second line: Exciting opening sentence with context. End with 2-3 relevant emojis.
3. Third line: A section title like "The Situation:", "The Story:", "The Details:", "The Result:", "The Transfer:" (pick the most fitting one)
4. Then 3 bullet points, each on its own line: [emoji] Bold Label — detail sentence.
   - Use labels like: The Recovery, The Quote, The Impact, The Stats, The Fee, The Score, The Reaction, The Next Step
   - Pick emojis that match each point (🩹 for injury, 💰 for fee, ⚽ for goal, 📋 for quote, 🎯 for impact, etc.)
5. End with: 🔴 Follow TEN BLOGS for [specific relevant CTA related to the story]!
6. Final line: 5-7 hashtags including #TENBLOGS, relevant player/team names, league, and topic

Now write a Facebook caption for this ${sport} ${cardType} story:
Headline: "${headline}"
${subtext ? `Detail: "${subtext}"` : ''}
${articleTitle && articleTitle !== headline ? `Original title: "${articleTitle}"` : ''}

Also write a short X/Twitter caption (under 260 chars, punchy, 2-3 hashtags including #TenBlogs).

Return ONLY valid JSON, no markdown, no explanation:
{"facebook": "...", "twitter": "..."}`

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${_groqKey}` },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.85,
      max_tokens: 700,
    }),
  })
  if (!res.ok) throw new Error(`Groq error: ${res.status}`)
  const data = await res.json()
  const text = data.choices?.[0]?.message?.content || ''
  try {
    return JSON.parse(text.replace(/```json|```/g, '').trim())
  } catch {
    // If JSON parse fails, try to extract the content
    const fbMatch = text.match(/"facebook"\s*:\s*"([\s\S]+?)(?:"\s*,\s*"twitter"|"\s*})/)
    const twMatch = text.match(/"twitter"\s*:\s*"([\s\S]+?)"/)
    return {
      facebook: fbMatch ? fbMatch[1].replace(/\\n/g, '\n') : text,
      twitter: twMatch ? twMatch[1] : `🚨 ${headline} #${sport} #TenBlogs`,
    }
  }
}

// ── 4. Build one feed item ─────────────────────────────────────

export async function buildFeedItem(article, filters = DEFAULT_FILTERS) {
  const title    = article.title || ''
  const desc     = article.description || ''
  const cardType = detectCardType(title, filters.newsType)
  const subject  = extractSubject(title, filters.sport)
  const headline = title.replace(/\s*[-–|]\s*[\w\s]+$/, '').trim().toUpperCase()
  const subtext  = desc ? desc.split('. ')[0] : ''

  let bgImage = null
  try { bgImage = await fetchWikipediaImage(subject) }
  catch (e) { console.warn('Wikipedia fetch failed:', e.message) }

  let captions = { facebook: '', twitter: '' }
  try {
    captions = await generateCaptions(headline, subtext, cardType, filters.sport, title)
  } catch (e) {
    const tag = headline.split(' ').slice(0, 4).join(' ')
    captions = {
      facebook: `🚨🏟️ ${tag}: WHAT YOU NEED TO KNOW\n${subtext || headline}\n\nThe Story:\n📋 The Update — ${headline}\n🎯 The Impact — Stay tuned for more details as this story develops.\n\n🔴 Follow TEN BLOGS for more updates!\n#TenBlogs`,
      twitter: `🚨 ${headline} #TenBlogs`,
    }
  }

  let cardData = {}
  if (cardType === 'result') {
    const score = extractScore(title)
    cardData = {
      type: 'result',
      data: {
        homeTeam: subject.split(' ')[0] || 'Home',
        awayTeam: subject.split(' ')[1] || 'Away',
        homeScore: score?.home || '0',
        awayScore: score?.away || '0',
        stageType: 'FULL - TIME',
        competition: '',
        bgImage, bgColor: '#100818',
        homeScorers: '', awayScorers: '',
      },
    }
  } else if (cardType === 'transfer') {
    cardData = {
      type: 'transfer',
      data: {
        bgImage, bgColor: '#060612',
        badgeType: 'BREAKING', badgeSubtext: 'NEWS',
        mainText: headline, mainTextSize: '80',
        sideText: subtext, sideTextSize: '32',
      },
    }
  } else {
    cardData = {
      type: 'news',
      data: {
        bgImage, bgColor: '#0d0d14',
        category: 'LATEST NEWS',
        headline,
        headlineSize: headline.length > 40 ? '72' : '88',
        subtext, subtextSize: '34',
        source: article.source?.name || '',
        sourcePos: 'bottom-right',
      },
    }
  }

  return {
    id: Date.now() + Math.random(),
    cardType: cardData.type,
    cardData: cardData.data,
    captions,
    sport: filters.sport,
    publishedAt: article.publishedAt || new Date().toISOString(),
    originalTitle: title,
    sourceUrl: article.url,
  }
}

// ── 5. Main scan — tracks seen URLs to always fetch fresh news ─

// Store seen article URLs globally so each scan skips what was already shown
const _seenUrls = new Set()

export async function scanAndBuildFeed(filters = DEFAULT_FILTERS, maxItems = 6) {
  // Try up to 3 pages to find unseen articles
  let freshArticles = []
  for (let page = 1; page <= 3 && freshArticles.length < maxItems; page++) {
    const articles = await fetchSportsNews(filters, page)
    const unseen = articles.filter(a => a.url && !_seenUrls.has(a.url))
    freshArticles = [...freshArticles, ...unseen]
    // If we got enough fresh ones stop early
    if (freshArticles.length >= maxItems) break
    // If this page returned nothing new at all, stop
    if (unseen.length === 0) break
  }

  const top = freshArticles.slice(0, maxItems)
  const items = []
  for (const article of top) {
    try {
      const item = await buildFeedItem(article, filters)
      items.push(item)
      // Mark as seen after successful build
      if (article.url) _seenUrls.add(article.url)
    } catch (e) {
      console.warn('Failed to build feed item:', e.message)
    }
  }

  // Keep seen set from growing forever — trim to last 200
  if (_seenUrls.size > 200) {
    const arr = [..._seenUrls]
    arr.slice(0, arr.length - 200).forEach(u => _seenUrls.delete(u))
  }

  return items
}
