export default {
  id: 'education',
  name: 'Education',
  tagline: 'How humans actually learn',
  colors: ['#10b981', '#a3e635'],
  shape: { type: 'spiral', arms: 3, twist: 2.2 },
  intro: 'Much of how school is run ignores what learning science has known for decades. Zoom in for the evidence.',
  teaser: 'Students with a one-to-one tutor performed better than 98% of students taught in a normal classroom.',
  planets: [
    {
      id: 'memory',
      name: 'Memory Science',
      subtitle: 'Why you forget',
      look: { type: 'ocean', colors: ['#022c22', '#10b981', '#d1fae5'], rings: false },
      size: 1.5,
      summary: 'The brain is built to forget — unless you use a few proven tricks.',
      insights: [
        {
          stat: '~⅔',
          headline: 'Forgotten within a day',
          detail: 'In Hermann Ebbinghaus’s classic memory experiments, about two-thirds of newly learned material was forgotten within 24 hours without review — the “forgetting curve”.',
          source: { name: 'Wikipedia: Forgetting curve', url: 'https://en.wikipedia.org/wiki/Forgetting_curve' },
        },
        {
          stat: '61% vs 40%',
          headline: 'Testing beats re-reading',
          detail: 'Students who practised recalling a text remembered about 61% of it a week later, versus about 40% for those who simply re-read it — the “testing effect”.',
          source: { name: 'Roediger & Karpicke (2006)', url: 'https://journals.sagepub.com/doi/10.1111/j.1467-9280.2006.01693.x' },
        },
      ],
      links: [
        { title: 'Learning How to Learn', url: 'https://www.coursera.org/learn/learning-how-to-learn', desc: 'One of the most popular free courses ever' },
        { title: 'Anki', url: 'https://apps.ankiweb.net/', desc: 'Free spaced-repetition flashcards' },
        { title: 'The Learning Scientists', url: 'https://www.learningscientists.org/', desc: 'Six proven study strategies' },
      ],
    },
    {
      id: 'tutoring',
      name: 'Tutoring & Myths',
      subtitle: 'What works, what doesn’t',
      look: { type: 'terran', colors: ['#14532d', '#a3e635', '#f7fee7'], rings: true },
      size: 1.4,
      summary: 'Personal tutoring is the most powerful intervention known. Some popular ideas have no evidence at all.',
      insights: [
        {
          stat: '98%',
          headline: 'The “2 sigma” problem',
          detail: 'Benjamin Bloom found students tutored one-to-one performed two standard deviations better than classroom students — better than 98% of them. The challenge has been doing that at scale.',
          source: { name: 'Bloom (1984)', url: 'https://en.wikipedia.org/wiki/Bloom%27s_2_sigma_problem' },
        },
        {
          stat: '89%',
          headline: 'Of educators believe a myth',
          detail: 'There is no good evidence that teaching to “learning styles” (visual, auditory…) improves learning — yet a review found around 89% of educators believe in it.',
          source: { name: 'Newton & Salvi (2020)', url: 'https://www.frontiersin.org/articles/10.3389/feduc.2020.602451/full' },
        },
      ],
      links: [
        { title: 'Bloom’s 2 sigma problem', url: 'https://en.wikipedia.org/wiki/Bloom%27s_2_sigma_problem', desc: 'The famous finding' },
        { title: 'Khan Academy', url: 'https://www.khanacademy.org/', desc: 'Free, world-class lessons' },
      ],
    },
    {
      id: 'global',
      name: 'Global Learning',
      subtitle: 'The learning crisis',
      look: { type: 'desert', colors: ['#3f2a0b', '#84cc16', '#fef9c3'], rings: false },
      size: 1.6,
      summary: 'Being in school is not the same as learning. Hundreds of millions are getting neither.',
      insights: [
        {
          stat: '70%',
          headline: 'Of 10-year-olds can’t read a simple story',
          detail: 'The World Bank estimated that about 70% of 10-year-olds in low- and middle-income countries cannot read and understand a simple text — “learning poverty”.',
          source: { name: 'World Bank', url: 'https://www.worldbank.org/en/topic/education/brief/learning-poverty' },
        },
        {
          stat: '250M+',
          headline: 'Children are out of school',
          detail: 'UNESCO estimates over 250 million children and youth worldwide are not in school at all.',
          source: { name: 'UNESCO', url: 'https://www.unesco.org/gem-report/en' },
        },
        {
          stat: '754M',
          headline: 'Adults can’t read or write',
          detail: 'About 754 million adults worldwide are illiterate — nearly two-thirds of them women.',
          source: { name: 'UNESCO literacy', url: 'https://www.unesco.org/en/literacy' },
        },
      ],
      links: [
        { title: 'Our World in Data: Education', url: 'https://ourworldindata.org/global-education', desc: 'Long-run charts' },
        { title: 'UNESCO GEM Report', url: 'https://www.unesco.org/gem-report/en', desc: 'Global education monitoring' },
      ],
    },
    {
      id: 'cost',
      name: 'Cost of Learning',
      subtitle: 'Debt vs. free knowledge',
      look: { type: 'gas', colors: ['#064e3b', '#4ade80', '#f0fdf4'], rings: true },
      size: 1.3,
      summary: 'A degree can cost a fortune — while much of the world’s best teaching is now free.',
      insights: [
        {
          stat: '$1.7T',
          headline: 'US student-loan debt',
          detail: 'Americans owe about $1.7 trillion in student loans, spread across roughly 43 million borrowers.',
          source: { name: 'Federal Student Aid data', url: 'https://studentaid.gov/data-center/student/portfolio' },
        },
        {
          stat: '2,500+',
          headline: 'MIT courses online for free',
          detail: 'MIT OpenCourseWare publishes materials from over 2,500 MIT courses for anyone, anywhere — no account needed.',
          source: { name: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/' },
        },
      ],
      links: [
        { title: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/', desc: 'MIT, free' },
        { title: 'Coursera', url: 'https://www.coursera.org/', desc: 'University courses, many free to audit' },
        { title: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', desc: 'Learn to code, free' },
      ],
    },
    {
      id: 'childhood',
      name: 'Early Childhood',
      subtitle: 'The first five years',
      look: { type: 'crystal', colors: ['#365314', '#bef264', '#fefce8'], rings: false },
      size: 1.1,
      summary: 'The brain builds itself fastest before school even starts.',
      insights: [
        {
          stat: '~90%',
          headline: 'Of adult brain size by age 5',
          detail: 'A child’s brain reaches roughly 90% of its adult size by about age five — the fastest period of brain growth in life.',
          source: { name: 'Harvard Center on the Developing Child', url: 'https://developingchild.harvard.edu/resources/inbrief-science-of-ecd/' },
        },
        {
          stat: '1.4M',
          headline: 'More words heard by kindergarten',
          detail: 'Children read five books a day hear about 1.4 million more words by age five than children who are never read to.',
          source: { name: 'Logan et al. (2019)', url: 'https://journals.lww.com/jrnldbp/Fulltext/2019/06000/When_Children_Are_Not_Read_to_at_Home__The_Million.1.aspx' },
        },
      ],
      links: [
        { title: 'Harvard Center on the Developing Child', url: 'https://developingchild.harvard.edu/', desc: 'Brain architecture explained' },
      ],
    },
  ],
};
