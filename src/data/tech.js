export default {
  id: 'tech',
  name: 'Technology',
  tagline: 'The invisible machinery of modern life',
  colors: ['#38bdf8', '#6366f1'],
  shape: { type: 'spiral', arms: 3, twist: 4 },
  intro:
    'You use these systems every minute without seeing them. Zoom in to find out how fragile, how concentrated and how astonishing they are.',
  teaser: 'About 99% of data crossing oceans travels through cables on the sea floor — not satellites.',
  planets: [
    {
      id: 'chips',
      name: 'Semiconductors',
      subtitle: 'The world’s most complex objects',
      look: { type: 'crystal', colors: ['#0c4a6e', '#38bdf8', '#e0f2fe'], rings: true },
      size: 1.6,
      summary: 'Every chip is built from billions of tiny switches (transistors). Making the best ones depends on a handful of companies.',
      insights: [
        {
          stat: '~90%',
          headline: 'Of the most advanced chips: one company',
          detail:
            'Taiwan’s TSMC manufactures roughly 90% of the world’s most advanced chips — the ones inside iPhones, Nvidia AI GPUs and more. A single island underpins the global tech economy.',
          source: { name: 'Wikipedia: TSMC', url: 'https://en.wikipedia.org/wiki/TSMC' },
        },
        {
          stat: '1',
          headline: 'Company can make the machine that makes them',
          detail:
            'Only the Dutch firm ASML builds EUV lithography machines needed for leading-edge chips. Each costs well over $150M and ships in about 40 freight containers on several cargo planes.',
          source: { name: 'ASML: Lithography principles', url: 'https://www.asml.com/en/technology/lithography-principles' },
        },
        {
          stat: '92B',
          headline: 'Transistors in one laptop chip',
          detail:
            'Apple’s M3 Max chip packs about 92 billion transistors — more than ten for every person on Earth — onto a piece of silicon smaller than a postage stamp.',
          source: { name: 'Wikipedia: Transistor count', url: 'https://en.wikipedia.org/wiki/Transistor_count' },
        },
      ],
      links: [
        { title: 'Chip War (book)', url: 'https://www.simonandschuster.com/books/Chip-War/Chris-Miller/9781982172008', desc: 'The definitive history of the chip industry' },
        { title: 'Asianometry', url: 'https://www.youtube.com/@Asianometry', desc: 'Superb deep-dive videos on chips' },
        { title: 'How EUV works (ASML)', url: 'https://www.asml.com/en/technology/lithography-principles', desc: 'From the only company that makes it' },
      ],
    },
    {
      id: 'internet',
      name: 'The Internet',
      subtitle: 'Cables, not clouds',
      look: { type: 'ocean', colors: ['#082f49', '#0ea5e9', '#f0f9ff'], rings: false },
      size: 1.7,
      summary: 'The “cloud” is physical: data centres, and hundreds of cables lying on the ocean floor.',
      insights: [
        {
          stat: '99%',
          headline: 'Of intercontinental data goes under the sea',
          detail:
            'Around 99% of data travelling between continents moves through roughly 500+ undersea fibre-optic cables, some only as thick as a garden hose. Satellites carry a tiny fraction.',
          source: { name: 'TeleGeography Submarine Cable Map', url: 'https://www.submarinecablemap.com/' },
        },
        {
          stat: '2.6B',
          headline: 'People are still offline',
          detail:
            'The UN’s ITU estimated in 2024 that about 2.6 billion people — around a third of humanity — have never used the internet.',
          source: { name: 'ITU Facts and Figures 2024', url: 'https://www.itu.int/itu-d/reports/statistics/facts-figures-2024/' },
        },
        {
          stat: '"LO"',
          headline: 'The first message ever sent',
          detail:
            'In 1969 the first ARPANET message was supposed to be “LOGIN”. The system crashed after two letters — so the internet’s first word was “LO”.',
          source: { name: 'Computer History Museum', url: 'https://www.computerhistory.org/internethistory/1960s/' },
        },
      ],
      links: [
        { title: 'Submarine Cable Map', url: 'https://www.submarinecablemap.com/', desc: 'See every cable on the ocean floor' },
        { title: 'Internet history timeline', url: 'https://www.computerhistory.org/internethistory/', desc: 'Computer History Museum' },
        { title: 'How the internet works', url: 'https://www.khanacademy.org/computing/computers-and-internet', desc: 'Khan Academy course' },
      ],
    },
    {
      id: 'quantum',
      name: 'Quantum Computing',
      subtitle: 'Computing with physics itself',
      look: { type: 'gas', colors: ['#1e1b4b', '#818cf8', '#e0e7ff'], rings: true },
      size: 1.3,
      summary: 'Quantum computers use qubits that can be in many states at once, letting them attack certain problems no normal computer can.',
      insights: [
        {
          stat: '10²⁵ yrs',
          headline: 'vs. under 5 minutes',
          detail:
            'In 2024 Google said its Willow chip did a benchmark computation in under five minutes that would take today’s fastest supercomputer about 10 septillion years — far longer than the age of the universe.',
          source: { name: 'Google: Meet Willow', url: 'https://blog.google/technology/research/google-willow-quantum-chip/' },
        },
        {
          stat: '0.01 K',
          headline: 'Colder than outer space',
          detail:
            'Many quantum chips run at around 0.01 kelvin — hundreds of times colder than deep space (about 2.7 K) — because heat destroys fragile quantum states.',
          source: { name: 'IBM Quantum Learning', url: 'https://learning.quantum.ibm.com/' },
        },
        {
          stat: 'Now',
          headline: '“Harvest now, decrypt later”',
          detail:
            'Security agencies warn that attackers may already be storing encrypted data today, hoping future quantum computers can break it. New “post-quantum” encryption standards were published in 2024.',
          source: { name: 'NIST post-quantum cryptography', url: 'https://csrc.nist.gov/projects/post-quantum-cryptography' },
        },
      ],
      links: [
        { title: 'IBM Quantum Learning', url: 'https://learning.quantum.ibm.com/', desc: 'Free courses — and real quantum hardware' },
        { title: 'Quantum computing for the very curious', url: 'https://quantum.country/qcvc', desc: 'Interactive essay by Andy Matuschak & Michael Nielsen' },
        { title: 'NIST post-quantum crypto', url: 'https://csrc.nist.gov/projects/post-quantum-cryptography', desc: 'The new encryption standards' },
      ],
    },
    {
      id: 'cyber',
      name: 'Cybersecurity',
      subtitle: 'Humans are the weak link',
      look: { type: 'lava', colors: ['#020617', '#22d3ee', '#a5f3fc'], rings: false },
      size: 1.25,
      summary: 'Most hacks don’t break encryption — they trick people.',
      insights: [
        {
          stat: '$4.88M',
          headline: 'Average cost of one data breach',
          detail: 'IBM’s 2024 study put the average global cost of a single data breach at $4.88 million — the highest ever recorded.',
          source: { name: 'IBM Cost of a Data Breach 2024', url: 'https://www.ibm.com/reports/data-breach' },
        },
        {
          stat: '68%',
          headline: 'Of breaches involve a human mistake',
          detail:
            'Verizon’s 2024 report found a human element — clicking a phishing link, reusing a password, misconfiguring a system — in about 68% of breaches.',
          source: { name: 'Verizon DBIR', url: 'https://www.verizon.com/business/resources/reports/dbir/' },
        },
        {
          stat: '$81M',
          headline: 'Stolen — and a typo saved $850M more',
          detail:
            'In 2016 hackers stole $81M from Bangladesh’s central bank. Nearly a billion dollars more was blocked partly because one transfer misspelled “foundation” as “fandation”.',
          source: { name: 'Wikipedia: Bangladesh Bank robbery', url: 'https://en.wikipedia.org/wiki/2016_Bangladesh_Bank_robbery' },
        },
      ],
      links: [
        { title: 'Have I Been Pwned', url: 'https://haveibeenpwned.com/', desc: 'Check if your email was in a breach — right now' },
        { title: 'CISA: Secure Our World', url: 'https://www.cisa.gov/secure-our-world', desc: 'Four simple steps to stay safe' },
        { title: 'Darknet Diaries', url: 'https://darknetdiaries.com/', desc: 'True stories from the dark side of the internet' },
      ],
    },
    {
      id: 'smartphone',
      name: 'Your Smartphone',
      subtitle: 'A supercomputer in your pocket',
      look: { type: 'terran', colors: ['#312e81', '#6366f1', '#c7d2fe'], rings: false },
      size: 1.1,
      summary: 'Your phone is the most powerful and most attention-hungry device most people will ever own.',
      insights: [
        {
          stat: '100,000×',
          headline: 'More powerful than Apollo 11',
          detail:
            'The computer that guided Apollo 11 to the Moon had about 4 KB of RAM. A modern smartphone is easily more than 100,000 times faster — and it fits in your pocket.',
          source: { name: 'Wikipedia: Apollo Guidance Computer', url: 'https://en.wikipedia.org/wiki/Apollo_Guidance_Computer' },
        },
        {
          stat: '6h 40m',
          headline: 'Online every day',
          detail:
            'The average internet user spends around six and a half hours online daily — roughly 40% of waking life.',
          source: { name: 'DataReportal: Digital 2024', url: 'https://datareportal.com/reports/digital-2024-global-overview-report' },
        },
      ],
      links: [
        { title: 'DataReportal', url: 'https://datareportal.com/', desc: 'Global digital usage statistics' },
        { title: 'Center for Humane Technology', url: 'https://www.humanetech.com/', desc: 'How apps are designed for attention' },
        { title: 'Apollo Guidance Computer', url: 'https://en.wikipedia.org/wiki/Apollo_Guidance_Computer', desc: 'The computer that went to the Moon' },
      ],
    },
  ],
};
