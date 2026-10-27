export default {
  id: 'stocks',
  name: 'Stock Market',
  tagline: 'Where patience beats genius',
  colors: ['#22c55e', '#facc15'],
  shape: { type: 'barred', arms: 2, twist: 2.4 },
  intro:
    'The stock market is a machine for transferring money from the impatient to the patient. These planets show the surprising rules almost nobody learns at school.',
  teaser: 'Over 15 years, roughly 9 in 10 professional US large-cap fund managers fail to beat a simple index fund.',
  planets: [
    {
      id: 'index-funds',
      name: 'Index Funds',
      subtitle: 'Owning the whole market',
      look: { type: 'terran', colors: ['#14532d', '#4ade80', '#fefce8'], rings: false },
      size: 1.5,
      summary:
        'An index fund buys every company in an index (like the S&P 500) instead of trying to pick winners. Low cost, no guessing.',
      insights: [
        {
          stat: '~90%',
          headline: 'Of pros lose to the index',
          detail:
            'S&P’s SPIVA scorecards consistently find that over 15-year periods, roughly 9 out of 10 actively managed US large-cap funds underperform the S&P 500 — after being paid to try.',
          source: { name: 'S&P Dow Jones Indices — SPIVA', url: 'https://www.spglobal.com/spdji/en/research-insights/spiva/' },
        },
        {
          stat: '$1M',
          headline: 'Buffett’s bet against hedge funds',
          detail:
            'In 2008 Warren Buffett bet $1M that a plain S&P 500 index fund would beat a hand-picked set of hedge funds over 10 years. The index returned about 7.1% a year; the hedge funds about 2.2%. Buffett won easily.',
          source: { name: 'Berkshire Hathaway 2017 Letter', url: 'https://www.berkshirehathaway.com/letters/2017ltr.pdf' },
        },
        {
          stat: '1976',
          headline: '"Bogle’s Folly"',
          detail:
            'John Bogle launched the first index fund for ordinary investors in 1976 and was mocked for it. Today, passive funds hold more US fund assets than active ones.',
          source: { name: 'Wikipedia: John C. Bogle', url: 'https://en.wikipedia.org/wiki/John_C._Bogle' },
        },
      ],
      links: [
        { title: 'Bogleheads Wiki', url: 'https://www.bogleheads.org/wiki/Main_Page', desc: 'The best free investing education online' },
        { title: 'SPIVA Scorecards', url: 'https://www.spglobal.com/spdji/en/research-insights/spiva/', desc: 'Active vs passive, with data' },
        { title: 'Buffett’s 2017 letter', url: 'https://www.berkshirehathaway.com/letters/2017ltr.pdf', desc: 'Read how the bet played out' },
      ],
    },
    {
      id: 'compounding',
      name: 'Compounding',
      subtitle: 'The eighth wonder',
      look: { type: 'gas', colors: ['#713f12', '#facc15', '#fffbeb'], rings: true },
      size: 1.6,
      summary:
        'Compounding means your returns earn returns. It is slow, then sudden — which is why time matters more than talent.',
      insights: [
        {
          stat: '17×',
          headline: 'Growth in 30 years at 10%',
          detail:
            'Divide 72 by your yearly return to see how many years it takes to double ("Rule of 72"). At 10% a year, money doubles about every 7 years — and grows roughly 17× in 30 years without adding a cent.',
          source: { name: 'Investor.gov compound interest calculator', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator' },
        },
        {
          stat: '96%',
          headline: 'Of Buffett’s fortune came after 65',
          detail:
            'Morgan Housel calculated that of Warren Buffett’s $84.5 billion net worth (2018), $81.5 billion was accumulated after his 65th birthday. His real secret wasn’t only skill — it was time.',
          source: { name: 'Morgan Housel, "The Psychology of Money"', url: 'https://www.collabfund.com/blog/the-psychology-of-money/' },
        },
        {
          stat: '10 days',
          headline: 'Miss them and lose half',
          detail:
            'J.P. Morgan’s research on 20 years of S&P 500 returns found that missing just the 10 best trading days roughly halved the final result — and most of those best days came within two weeks of the worst ones.',
          source: { name: 'J.P. Morgan Asset Management', url: 'https://am.jpmorgan.com/us/en/asset-management/adv/insights/retirement-insights/guide-to-retirement/' },
        },
      ],
      links: [
        { title: 'Compound interest calculator', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator', desc: 'Play with your own numbers' },
        { title: 'The Psychology of Money (essay)', url: 'https://www.collabfund.com/blog/the-psychology-of-money/', desc: 'The essay that became the bestseller' },
        { title: 'Khan Academy: Finance', url: 'https://www.khanacademy.org/economics-finance-domain/core-finance', desc: 'Free lessons from zero' },
      ],
    },
    {
      id: 'crashes',
      name: 'Crashes & Bubbles',
      subtitle: 'When crowds go mad',
      look: { type: 'lava', colors: ['#1c0a00', '#ef4444', '#fde047'], rings: false },
      size: 1.4,
      summary:
        'Markets swing between greed and fear. History shows crashes are normal, recoveries are slow, and bubbles always feel different “this time”.',
      insights: [
        {
          stat: '−22.6%',
          headline: 'In a single day',
          detail:
            'On Black Monday, 19 October 1987, the Dow Jones fell 22.6% in one trading session — still the largest one-day percentage drop in its history.',
          source: { name: 'Federal Reserve History: Black Monday', url: 'https://www.federalreservehistory.org/essays/stock-market-crash-of-1987' },
        },
        {
          stat: '25 years',
          headline: 'To recover from 1929',
          detail:
            'After the 1929 crash, the Dow Jones did not regain its September 1929 peak until November 1954 — a full quarter-century later.',
          source: { name: 'Wikipedia: Wall Street Crash of 1929', url: 'https://en.wikipedia.org/wiki/Wall_Street_crash_of_1929' },
        },
        {
          stat: '−78%',
          headline: 'The dot-com wipeout',
          detail:
            'The Nasdaq fell about 78% from its March 2000 peak to its October 2002 low, and took roughly 15 years to get back to its old high.',
          source: { name: 'Wikipedia: Dot-com bubble', url: 'https://en.wikipedia.org/wiki/Dot-com_bubble' },
        },
        {
          stat: '10×',
          headline: 'A salary for one tulip bulb',
          detail:
            'During Dutch “Tulip Mania” in 1637, single rare tulip bulbs reportedly sold for more than ten times a skilled craftsman’s yearly income — one of history’s first recorded bubbles.',
          source: { name: 'Wikipedia: Tulip mania', url: 'https://en.wikipedia.org/wiki/Tulip_mania' },
        },
      ],
      links: [
        { title: 'Federal Reserve History', url: 'https://www.federalreservehistory.org/', desc: 'Essays on every major crisis' },
        { title: 'Dot-com bubble', url: 'https://en.wikipedia.org/wiki/Dot-com_bubble', desc: 'The tech crash, step by step' },
        { title: 'Financial crisis of 2007–2008', url: 'https://en.wikipedia.org/wiki/2007%E2%80%932008_financial_crisis', desc: 'How housing nearly broke the world' },
      ],
    },
    {
      id: 'megacaps',
      name: 'Trillion-Dollar Giants',
      subtitle: 'Bigger than countries',
      look: { type: 'ocean', colors: ['#052e16', '#16a34a', '#bbf7d0'], rings: true },
      size: 1.7,
      summary:
        'A handful of tech companies now carry a huge share of the entire market. Their size is historically unusual.',
      insights: [
        {
          stat: '$4T',
          headline: 'One company’s value',
          detail:
            'In July 2025 Nvidia became the first company ever valued at $4 trillion — more than the yearly economic output (GDP) of the United Kingdom.',
          source: { name: 'Wikipedia: Nvidia', url: 'https://en.wikipedia.org/wiki/Nvidia' },
        },
        {
          stat: '~⅓',
          headline: 'Of the S&P 500 in 7 stocks',
          detail:
            'By 2024 the “Magnificent Seven” tech stocks made up roughly a third of the entire S&P 500’s value — so an “index of 500 companies” leans heavily on seven.',
          source: { name: 'Wikipedia: Magnificent Seven', url: 'https://en.wikipedia.org/wiki/Magnificent_Seven_(stocks)' },
        },
        {
          stat: '1 of 10',
          headline: 'Giants that stayed on top',
          detail:
            'Of the world’s 10 most valuable companies in 2000 — including GE, Cisco, Intel and Nokia — only Microsoft is still in the top ten today. Size is not safety.',
          source: { name: 'CompaniesMarketCap', url: 'https://companiesmarketcap.com/' },
        },
      ],
      links: [
        { title: 'CompaniesMarketCap', url: 'https://companiesmarketcap.com/', desc: 'Live ranking of the world’s biggest companies' },
        { title: 'Magnificent Seven', url: 'https://en.wikipedia.org/wiki/Magnificent_Seven_(stocks)', desc: 'Who they are and why it matters' },
        { title: 'Investopedia: Market cap', url: 'https://www.investopedia.com/terms/m/marketcapitalization.asp', desc: 'What “value” actually means' },
      ],
    },
    {
      id: 'crypto',
      name: 'Crypto',
      subtitle: 'Digital money experiment',
      look: { type: 'crystal', colors: ['#431407', '#f97316', '#ffedd5'], rings: false },
      size: 1.2,
      summary:
        'Bitcoin is a digital currency run by a network instead of a bank. It has a fixed supply and a wild price history.',
      insights: [
        {
          stat: '10,000 BTC',
          headline: 'For two pizzas',
          detail:
            'On 22 May 2010, programmer Laszlo Hanyecz paid 10,000 bitcoin for two pizzas — the first known real-world bitcoin purchase. At 2025 prices those coins were worth over $1 billion.',
          source: { name: 'Wikipedia: History of bitcoin', url: 'https://en.wikipedia.org/wiki/History_of_bitcoin' },
        },
        {
          stat: '~1.1M',
          headline: 'Bitcoin never touched',
          detail:
            'Bitcoin’s anonymous creator, Satoshi Nakamoto, is believed to hold around 1.1 million coins that have never moved. Nobody knows who Satoshi is.',
          source: { name: 'Wikipedia: Satoshi Nakamoto', url: 'https://en.wikipedia.org/wiki/Satoshi_Nakamoto' },
        },
        {
          stat: '21M',
          headline: 'The hard limit',
          detail:
            'Only 21 million bitcoin can ever exist. Millions are thought to be lost forever in forgotten wallets and lost passwords.',
          source: { name: 'Bitcoin whitepaper', url: 'https://bitcoin.org/bitcoin.pdf' },
        },
      ],
      links: [
        { title: 'Bitcoin whitepaper', url: 'https://bitcoin.org/bitcoin.pdf', desc: 'The original 9-page document' },
        { title: 'SEC investor alerts on crypto', url: 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-alerts', desc: 'Scams and risks to know' },
        { title: 'But how does bitcoin work?', url: 'https://www.youtube.com/watch?v=bBC-nXj3Ng4', desc: '3Blue1Brown visual explainer' },
      ],
    },
    {
      id: 'ownership',
      name: 'Who Owns It',
      subtitle: 'Wealth & markets',
      look: { type: 'ice', colors: ['#1e293b', '#a3e635', '#f7fee7'], rings: false },
      size: 1.1,
      summary: 'The market looks public, but ownership — and trading — is concentrated in very few hands.',
      insights: [
        {
          stat: '93%',
          headline: 'Of US stocks owned by the top 10%',
          detail:
            'Federal Reserve data shows the wealthiest 10% of US households hold roughly 93% of all stock-market wealth. When markets boom, most of the gain goes to them.',
          source: { name: 'Federal Reserve: Distributional Financial Accounts', url: 'https://www.federalreserve.gov/releases/z1/dataviz/dfa/' },
        },
        {
          stat: '~50%',
          headline: 'Of trades placed by machines',
          detail:
            'High-frequency trading algorithms — which buy and sell in microseconds — account for roughly half of all US stock trading volume.',
          source: { name: 'Wikipedia: High-frequency trading', url: 'https://en.wikipedia.org/wiki/High-frequency_trading' },
        },
      ],
      links: [
        { title: 'Fed wealth distribution data', url: 'https://www.federalreserve.gov/releases/z1/dataviz/dfa/', desc: 'Interactive charts from the source' },
        { title: 'High-frequency trading', url: 'https://en.wikipedia.org/wiki/High-frequency_trading', desc: 'The microsecond arms race' },
        { title: 'Our World in Data: Inequality', url: 'https://ourworldindata.org/economic-inequality', desc: 'Global charts' },
      ],
    },
  ],
};
