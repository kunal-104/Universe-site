export default {
  id: 'entertainment',
  name: 'Entertainment',
  tagline: 'The attention economy',
  colors: ['#ec4899', '#f59e0b'],
  shape: { type: 'spiral', arms: 5, twist: 2.6 },
  intro: 'Games, streaming, music and social media — industries competing for the one resource you can never get back: your time.',
  teaser: 'Video games now earn more than the global film and recorded-music industries combined.',
  planets: [
    {
      id: 'gaming',
      name: 'Gaming',
      subtitle: 'The biggest entertainment industry',
      look: { type: 'gas', colors: ['#500724', '#ec4899', '#fce7f3'], rings: true },
      size: 1.7,
      summary: 'Games quietly became the largest entertainment business on the planet.',
      insights: [
        {
          stat: '$184B',
          headline: 'Gaming revenue in a year',
          detail: 'Newzoo estimated 2023 games revenue at about $184 billion — more than global box office (~$34B) and recorded music (~$29B) combined.',
          source: { name: 'Newzoo Global Games Market Report', url: 'https://newzoo.com/resources/blog/the-latest-games-market-size-estimates-and-forecasts' },
        },
        {
          stat: '300M',
          headline: 'Copies of Minecraft sold',
          detail: 'Minecraft passed 300 million copies sold in 2023, making it the best-selling video game of all time.',
          source: { name: 'Wikipedia: Minecraft', url: 'https://en.wikipedia.org/wiki/Minecraft' },
        },
        {
          stat: '3 days',
          headline: 'For GTA V to make $1 billion',
          detail: 'Grand Theft Auto V hit $1 billion in sales within three days in 2013 — the fastest any entertainment product had ever done it.',
          source: { name: 'Guinness World Records', url: 'https://www.guinnessworldrecords.com/news/2013/10/confirmed-grand-theft-auto-breaks-six-sales-world-records-51900' },
        },
      ],
      links: [
        { title: 'Newzoo', url: 'https://newzoo.com/', desc: 'Games market intelligence' },
        { title: 'GDC Vault (free talks)', url: 'https://gdcvault.com/free', desc: 'How great games are made' },
      ],
    },
    {
      id: 'streaming',
      name: 'Streaming',
      subtitle: 'Video on demand',
      look: { type: 'lava', colors: ['#1c0505', '#dc2626', '#fecaca'], rings: false },
      size: 1.5,
      summary: 'Streaming rewired TV and film in a single decade.',
      insights: [
        {
          stat: '500 hrs',
          headline: 'Uploaded to YouTube every minute',
          detail: 'More than 500 hours of video are uploaded to YouTube every minute — a lifetime of viewing every few seconds.',
          source: { name: 'YouTube Official Blog', url: 'https://blog.youtube/press/' },
        },
        {
          stat: '1.65B',
          headline: 'Hours of Squid Game in 4 weeks',
          detail: 'Netflix reported Squid Game was viewed for 1.65 billion hours in its first 28 days — about 188,000 years of human attention.',
          source: { name: 'Wikipedia: Squid Game', url: 'https://en.wikipedia.org/wiki/Squid_Game' },
        },
        {
          stat: '$50M',
          headline: 'The deal Blockbuster turned down',
          detail: 'In 2000, Netflix’s founders offered to sell the company to Blockbuster for $50 million. Blockbuster passed. Ten years later it was bankrupt.',
          source: { name: 'Wikipedia: Netflix', url: 'https://en.wikipedia.org/wiki/Netflix' },
        },
      ],
      links: [
        { title: 'Netflix Top 10', url: 'https://www.netflix.com/tudum/top10', desc: 'What the world is watching' },
        { title: 'Blockbuster’s fall', url: 'https://en.wikipedia.org/wiki/Blockbuster_LLC', desc: 'A business-school classic' },
      ],
    },
    {
      id: 'music',
      name: 'Music',
      subtitle: 'An ocean of songs',
      look: { type: 'ocean', colors: ['#431407', '#f59e0b', '#fef3c7'], rings: true },
      size: 1.35,
      summary: 'Anyone can publish a song now — which means almost nobody hears most of them.',
      insights: [
        {
          stat: '~100K',
          headline: 'New tracks uploaded every day',
          detail: 'Data firm Luminate reports roughly 100,000 new tracks are uploaded to streaming services daily.',
          source: { name: 'Luminate year-end report', url: 'https://luminatedata.com/reports/yearend-music-industry-report-2023/' },
        },
        {
          stat: '86%',
          headline: 'Of tracks got under 1,000 plays',
          detail: 'Luminate found that of about 184 million tracks on streaming services in 2023, roughly 86% were played 1,000 times or fewer that year — and about 45 million were never played at all.',
          source: { name: 'Luminate 2023 report', url: 'https://luminatedata.com/reports/yearend-music-industry-report-2023/' },
        },
      ],
      links: [
        { title: 'IFPI Global Music Report', url: 'https://www.ifpi.org/', desc: 'Music industry numbers' },
        { title: 'Every Noise at Once', url: 'https://everynoise.com/', desc: 'A map of 6,000+ music genres' },
      ],
    },
    {
      id: 'social',
      name: 'Social Media',
      subtitle: 'The feed never ends',
      look: { type: 'crystal', colors: ['#172554', '#3b82f6', '#f472b6'], rings: false },
      size: 1.45,
      summary: 'Social apps are engineered to capture attention. The numbers show how well they work.',
      insights: [
        {
          stat: '200,000',
          headline: 'Lifetimes lost daily — said its inventor',
          detail: 'Aza Raskin, who designed infinite scroll, later estimated it wastes the equivalent of about 200,000 human lifetimes of attention every day — and said he regretted it.',
          source: { name: 'BBC (2018)', url: 'https://www.bbc.com/news/technology-44640959' },
        },
        {
          stat: '5B+',
          headline: 'Social-media user identities',
          detail: 'There are now over 5 billion social-media user identities — more than 60% of everyone alive.',
          source: { name: 'DataReportal', url: 'https://datareportal.com/social-media-users' },
        },
      ],
      links: [
        { title: 'The Social Dilemma', url: 'https://www.thesocialdilemma.com/', desc: 'Documentary from the people who built it' },
        { title: 'Center for Humane Technology', url: 'https://www.humanetech.com/', desc: 'Tools to take back your attention' },
      ],
    },
    {
      id: 'film',
      name: 'Film',
      subtitle: 'The dream factories',
      look: { type: 'desert', colors: ['#292524', '#f59e0b', '#fff7ed'], rings: false },
      size: 1.2,
      summary: 'Cinema is barely 135 years old and already one of humanity’s main ways of telling stories.',
      insights: [
        {
          stat: '2 sec',
          headline: 'The oldest surviving film',
          detail: 'The “Roundhay Garden Scene” (1888) is the oldest surviving motion picture — it lasts about two seconds.',
          source: { name: 'Wikipedia: Roundhay Garden Scene', url: 'https://en.wikipedia.org/wiki/Roundhay_Garden_Scene' },
        },
        {
          stat: '$2.9B',
          headline: 'Highest-grossing film ever',
          detail: 'James Cameron’s “Avatar” has earned about $2.9 billion worldwide, the most of any film.',
          source: { name: 'Box Office Mojo', url: 'https://www.boxofficemojo.com/chart/ww_top_lifetime_gross/' },
        },
        {
          stat: '#1',
          headline: 'India makes the most films',
          detail: 'India produces more feature films each year than any other country — well over a thousand, across many languages.',
          source: { name: 'Wikipedia: Cinema of India', url: 'https://en.wikipedia.org/wiki/Cinema_of_India' },
        },
      ],
      links: [
        { title: 'Box Office Mojo', url: 'https://www.boxofficemojo.com/', desc: 'Every film’s earnings' },
        { title: 'Every Frame a Painting', url: 'https://www.youtube.com/@everyframeapainting', desc: 'Learn how films really work' },
      ],
    },
  ],
};
