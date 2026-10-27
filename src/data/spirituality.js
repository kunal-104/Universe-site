export default {
  id: 'spirituality',
  name: 'Spirituality',
  tagline: 'The science of the inner world',
  colors: ['#c084fc', '#fde68a'],
  shape: { type: 'elliptical', arms: 0, twist: 0 },
  intro: 'Meditation, belief, meaning and the mind–body connection — where ancient practice meets modern measurement.',
  teaser: 'Your mind wanders almost half of your waking life — and a wandering mind is measurably less happy.',
  planets: [
    {
      id: 'meditation',
      name: 'Meditation',
      subtitle: 'Training attention',
      look: { type: 'ocean', colors: ['#2e1065', '#a78bfa', '#ede9fe'], rings: true },
      size: 1.5,
      summary: 'Meditation is attention training. Brain scans show it physically changes the brain.',
      insights: [
        {
          stat: '47%',
          headline: 'Of waking hours your mind is elsewhere',
          detail: 'A Harvard study of thousands of people found minds wander about 47% of the time — and people were less happy while their minds wandered, regardless of the activity.',
          source: { name: 'Killingsworth & Gilbert, Science (2010)', url: 'https://www.science.org/doi/10.1126/science.1192439' },
        },
        {
          stat: '8 weeks',
          headline: 'To measurably change your brain',
          detail: 'After an 8-week mindfulness program, participants showed increased grey-matter density in brain regions linked to learning, memory and emotion regulation.',
          source: { name: 'Hölzel et al. (2011)', url: 'https://pubmed.ncbi.nlm.nih.gov/21071182/' },
        },
      ],
      links: [
        { title: 'NIH: Meditation and mindfulness', url: 'https://www.nccih.nih.gov/health/meditation-and-mindfulness-effectiveness-and-safety', desc: 'What the evidence says' },
        { title: 'UCLA free guided meditations', url: 'https://www.uclahealth.org/uclamindful', desc: 'Start in 3 minutes' },
        { title: 'The wandering mind study', url: 'https://www.science.org/doi/10.1126/science.1192439', desc: 'The original paper' },
      ],
    },
    {
      id: 'faiths',
      name: 'Faiths of the World',
      subtitle: 'How humanity believes',
      look: { type: 'gas', colors: ['#422006', '#fbbf24', '#fef9c3'], rings: false },
      size: 1.7,
      summary: 'Most people on Earth are religious — but the landscape is shifting faster than many realise.',
      insights: [
        {
          stat: '24%',
          headline: 'Of humanity is non-religious',
          detail: 'Pew Research (2025) found Christians at about 29% of the world and Muslims about 26% — with the religiously unaffiliated close behind at about 24%, roughly 1.9 billion people.',
          source: { name: 'Pew Research Center', url: 'https://www.pewresearch.org/religion/2025/06/09/how-the-global-religious-landscape-changed-from-2010-to-2020/' },
        },
        {
          stat: '4,000+',
          headline: 'Religions practised today',
          detail: 'Scholars estimate there are over 4,000 distinct religions, faith groups and denominations in the world.',
          source: { name: 'Wikipedia: List of religions', url: 'https://en.wikipedia.org/wiki/List_of_religions_and_spiritual_traditions' },
        },
      ],
      links: [
        { title: 'Pew Research: Religion', url: 'https://www.pewresearch.org/religion/', desc: 'The best global religion data' },
        { title: 'Crash Course: World Religions', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtNjasccl-WajpONGX3zoY4M', desc: 'Short, balanced video series' },
      ],
    },
    {
      id: 'placebo',
      name: 'Mind over Body',
      subtitle: 'Placebo & nocebo',
      look: { type: 'crystal', colors: ['#4a044e', '#e879f9', '#fdf4ff'], rings: false },
      size: 1.25,
      summary: 'What you believe about a treatment can change how your body responds to it — sometimes dramatically.',
      insights: [
        {
          stat: '0 mg',
          headline: 'Placebos work even when you know',
          detail: 'In a Harvard trial, IBS patients openly told they were taking sugar pills still reported significantly greater improvement than those given no pills.',
          source: { name: 'Kaptchuk et al., PLoS ONE (2010)', url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0015591' },
        },
        {
          stat: '90%',
          headline: 'Of statin “side effects” also came from dummy pills',
          detail: 'In the SAMSON trial, people rotated between statins, placebos and no pills. About 90% of the symptoms they felt on statins also appeared on the placebo — the nocebo effect.',
          source: { name: 'NEJM: SAMSON trial (2020)', url: 'https://www.nejm.org/doi/full/10.1056/NEJMc2031173' },
        },
        {
          stat: 'Sham',
          headline: 'Fake surgery worked as well as real',
          detail: 'A 2002 study of knee arthroscopy for osteoarthritis found patients who got sham surgery (only skin incisions) improved as much as those who got the real operation.',
          source: { name: 'Moseley et al., NEJM (2002)', url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa013259' },
        },
      ],
      links: [
        { title: 'Harvard: The power of the placebo', url: 'https://www.health.harvard.edu/mental-health/the-power-of-the-placebo-effect', desc: 'Accessible overview' },
        { title: 'Placebo (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Placebo', desc: 'History and science' },
      ],
    },
    {
      id: 'meaning',
      name: 'Meaning & Happiness',
      subtitle: 'What makes a good life',
      look: { type: 'terran', colors: ['#1e3a8a', '#fcd34d', '#fff'], rings: false },
      size: 1.35,
      summary: 'Philosophers and scientists keep arriving at the same answer about what makes life good.',
      insights: [
        {
          stat: '85+ yrs',
          headline: 'The longest study of happiness',
          detail: 'The Harvard Study of Adult Development has followed people since 1938. Its clearest finding: close relationships, more than money or fame, predict long, happy, healthy lives.',
          source: { name: 'Harvard Study of Adult Development', url: 'https://www.adultdevelopmentstudy.org/' },
        },
        {
          stat: '9 days',
          headline: 'To write a book read by millions',
          detail: 'Holocaust survivor Viktor Frankl wrote “Man’s Search for Meaning” in about nine days. It has sold over 16 million copies.',
          source: { name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Man%27s_Search_for_Meaning' },
        },
        {
          stat: '0',
          headline: 'Readers Marcus Aurelius intended',
          detail: 'The Roman emperor’s “Meditations”, one of the most-read books on Stoic philosophy, was a private journal — never meant to be published.',
          source: { name: 'Wikipedia: Meditations', url: 'https://en.wikipedia.org/wiki/Meditations' },
        },
      ],
      links: [
        { title: 'Robert Waldinger’s TED talk', url: 'https://www.ted.com/talks/robert_waldinger_what_makes_a_good_life_lessons_from_the_longest_study_on_happiness', desc: 'What makes a good life?' },
        { title: 'Meditations (free text)', url: 'https://www.gutenberg.org/ebooks/2680', desc: 'Read Marcus Aurelius on Project Gutenberg' },
        { title: 'Yale: The Science of Well-Being', url: 'https://www.coursera.org/learn/the-science-of-well-being', desc: 'Free famous course' },
      ],
    },
    {
      id: 'origins',
      name: 'Sacred Origins',
      subtitle: 'Older than history',
      look: { type: 'desert', colors: ['#292524', '#d6d3d1', '#fafaf9'], rings: false },
      size: 1.1,
      summary: 'The urge to build sacred places may be older than farming, writing — even civilisation.',
      insights: [
        {
          stat: '11,600',
          headline: 'Year-old temple — before farming',
          detail: 'Göbekli Tepe in Turkey is a monumental ritual site built about 11,600 years ago — some 6,000 years before Stonehenge, and before humans had farming, writing or the wheel.',
          source: { name: 'Wikipedia: Göbekli Tepe', url: 'https://en.wikipedia.org/wiki/G%C3%B6bekli_Tepe' },
        },
      ],
      links: [
        { title: 'Göbekli Tepe', url: 'https://en.wikipedia.org/wiki/G%C3%B6bekli_Tepe', desc: 'The world’s oldest known temple' },
        { title: 'UNESCO World Heritage', url: 'https://whc.unesco.org/en/list/1572/', desc: 'Official site listing' },
      ],
    },
  ],
};
