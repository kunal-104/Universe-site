export default {
  id: 'law',
  name: 'Law & Justice',
  tagline: 'The rules you agreed to without reading',
  colors: ['#eab308', '#94a3b8'],
  shape: { type: 'barred', arms: 2, twist: 3 },
  intro: 'Most people assume justice works like it does on TV. The data says otherwise.',
  teaser: 'Fewer than 1 in 50 US federal criminal defendants ever gets a trial.',
  planets: [
    {
      id: 'wrongful',
      name: 'Wrongful Convictions',
      subtitle: 'When the system gets it wrong',
      look: { type: 'lava', colors: ['#1c1917', '#eab308', '#fef9c3'], rings: false },
      size: 1.5,
      summary: 'Innocent people are convicted far more often than most imagine.',
      insights: [
        {
          stat: '3,500+',
          headline: 'Exonerations in the US since 1989',
          detail: 'The National Registry of Exonerations has recorded more than 3,500 people convicted and later cleared — together losing over 30,000 years in prison.',
          source: { name: 'National Registry of Exonerations', url: 'https://www.law.umich.edu/special/exoneration/Pages/about.aspx' },
        },
        {
          stat: '~69%',
          headline: 'Involved eyewitness mistakes',
          detail: 'Eyewitness misidentification played a role in about 69% of the 375+ wrongful convictions overturned by DNA evidence. Confident memory is not accurate memory.',
          source: { name: 'Innocence Project', url: 'https://innocenceproject.org/eyewitness-identification-reform/' },
        },
        {
          stat: '4%',
          headline: 'Of death-row inmates may be innocent',
          detail: 'A 2014 study in PNAS estimated that at least 4.1% of people sentenced to death in the US are likely innocent.',
          source: { name: 'Gross et al., PNAS (2014)', url: 'https://www.pnas.org/doi/10.1073/pnas.1306417111' },
        },
      ],
      links: [
        { title: 'Innocence Project', url: 'https://innocenceproject.org/', desc: 'Freeing the wrongly convicted' },
        { title: 'National Registry of Exonerations', url: 'https://www.law.umich.edu/special/exoneration/', desc: 'Every case, searchable' },
      ],
    },
    {
      id: 'plea',
      name: 'Plea Deals',
      subtitle: 'Justice without trials',
      look: { type: 'ice', colors: ['#1e293b', '#94a3b8', '#f8fafc'], rings: true },
      size: 1.4,
      summary: 'The courtroom trial you see on TV is now the rare exception.',
      insights: [
        {
          stat: '2%',
          headline: 'Of federal defendants go to trial',
          detail: 'In US federal courts in 2022, about 90% of defendants pleaded guilty, 8% had their cases dismissed — and only about 2% went to trial.',
          source: { name: 'Pew Research Center (2023)', url: 'https://www.pewresearch.org/short-reads/2023/06/14/fewer-than-1-of-defendants-in-federal-criminal-cases-were-acquitted-in-2022/' },
        },
        {
          stat: '~70%',
          headline: 'Of people in US jails not convicted',
          detail: 'Most people held in US local jails on any given day have not been convicted — many simply can’t afford bail.',
          source: { name: 'Prison Policy Initiative', url: 'https://www.prisonpolicy.org/reports/pie2024.html' },
        },
      ],
      links: [
        { title: 'Prison Policy Initiative', url: 'https://www.prisonpolicy.org/', desc: 'The whole system in charts' },
        { title: 'Plea bargain (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Plea_bargain', desc: 'How it works around the world' },
      ],
    },
    {
      id: 'fineprint',
      name: 'The Fine Print',
      subtitle: 'Terms & conditions',
      look: { type: 'desert', colors: ['#422006', '#ca8a04', '#fefce8'], rings: false },
      size: 1.3,
      summary: 'You sign legal contracts dozens of times a week — by clicking “I agree”.',
      insights: [
        {
          stat: '76 days',
          headline: 'To read your privacy policies',
          detail: 'Carnegie Mellon researchers estimated that reading every privacy policy you encounter in a year would take about 76 working days.',
          source: { name: 'McDonald & Cranor (2008)', url: 'https://lorrie.cranor.org/pubs/readingPolicyCost-authorDraft.pdf' },
        },
        {
          stat: '7,500',
          headline: 'Shoppers sold their souls',
          detail: 'As an April Fools’ test in 2010, UK retailer GameStation added an “immortal soul” clause to its terms. About 7,500 customers agreed to it.',
          source: { name: 'Fox News / widely reported', url: 'https://www.foxnews.com/tech/7500-online-shoppers-unknowingly-sold-their-souls' },
        },
        {
          stat: 'Hamlet+',
          headline: 'PayPal’s terms were longer than Hamlet',
          detail: 'A 2015 analysis found PayPal’s terms of service (about 36,000 words) were longer than Shakespeare’s Hamlet (about 30,000).',
          source: { name: 'The Guardian (2015)', url: 'https://www.theguardian.com/money/2015/mar/24/paypal-terms-conditions-longer-than-hamlet' },
        },
      ],
      links: [
        { title: 'ToS;DR', url: 'https://tosdr.org/', desc: '“Terms of Service; Didn’t Read” — summaries & ratings' },
        { title: 'EFF', url: 'https://www.eff.org/', desc: 'Your digital rights' },
      ],
    },
    {
      id: 'copyright',
      name: 'Copyright',
      subtitle: 'Who owns ideas',
      look: { type: 'gas', colors: ['#1c1917', '#a8a29e', '#fde047'], rings: false },
      size: 1.2,
      summary: 'Copyright lasts far longer than most people think — and sometimes covers things you’d never expect.',
      insights: [
        {
          stat: '95 yrs',
          headline: 'Until Mickey Mouse became public',
          detail: 'The 1928 “Steamboat Willie” version of Mickey Mouse entered the US public domain only on 1 January 2024 — 95 years after release.',
          source: { name: 'Duke Center for the Public Domain', url: 'https://web.law.duke.edu/cspd/publicdomainday/2024/' },
        },
        {
          stat: '$14M',
          headline: 'Paid back over “Happy Birthday”',
          detail: 'A company collected licensing fees for “Happy Birthday to You” for decades — until a 2015 court ruling, after which it agreed to a $14M settlement.',
          source: { name: 'Wikipedia: Happy Birthday to You', url: 'https://en.wikipedia.org/wiki/Happy_Birthday_to_You' },
        },
        {
          stat: '🐒',
          headline: 'A monkey can’t own its selfie',
          detail: 'In “Naruto v. Slater”, a US appeals court ruled in 2018 that animals cannot hold copyright — even for a selfie they took themselves.',
          source: { name: 'Wikipedia: Monkey selfie dispute', url: 'https://en.wikipedia.org/wiki/Monkey_selfie_copyright_dispute' },
        },
      ],
      links: [
        { title: 'Public Domain Day', url: 'https://web.law.duke.edu/cspd/publicdomainday/', desc: 'What became free this year' },
        { title: 'Creative Commons', url: 'https://creativecommons.org/', desc: 'Share your own work freely' },
      ],
    },
    {
      id: 'access',
      name: 'Access to Justice',
      subtitle: 'Law for whom?',
      look: { type: 'terran', colors: ['#0f172a', '#eab308', '#e2e8f0'], rings: false },
      size: 1.35,
      summary: 'Laws only protect people who can actually use them.',
      insights: [
        {
          stat: '5.1B',
          headline: 'People lack meaningful access to justice',
          detail: 'The World Justice Project estimated that about 5.1 billion people — two-thirds of humanity — have unmet justice needs.',
          source: { name: 'World Justice Project', url: 'https://worldjusticeproject.org/our-work/research-and-data/access-justice/measuring-justice-gap' },
        },
        {
          stat: '92%',
          headline: 'Of civil legal problems get no real help',
          detail: 'Low-income Americans received no or inadequate legal help for about 92% of their substantial civil legal problems, according to the Legal Services Corporation.',
          source: { name: 'LSC Justice Gap Report 2022', url: 'https://justicegap.lsc.gov/' },
        },
      ],
      links: [
        { title: 'World Justice Project', url: 'https://worldjusticeproject.org/', desc: 'Rule of Law Index for every country' },
        { title: 'Legal Information Institute', url: 'https://www.law.cornell.edu/', desc: 'Read the actual law, free' },
      ],
    },
  ],
};
