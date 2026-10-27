export default {
  id: 'ai',
  name: 'Artificial Intelligence',
  tagline: 'Machines that learned to think out loud',
  colors: ['#7c5cff', '#00e5ff'],
  shape: { type: 'spiral', arms: 4, twist: 3.2 },
  intro:
    'Every planet here is an AI model or lab. Zoom in to see what they really are, how fast they grew, and why the people building them are both thrilled and worried.',
  teaser: 'The computing power used to train frontier AI has been growing roughly 4–5× every single year.',
  planets: [
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      subtitle: 'OpenAI · GPT models',
      look: { type: 'gas', colors: ['#0f766e', '#5eead4', '#ecfeff'], rings: false },
      size: 1.5,
      summary:
        'ChatGPT is a chatbot built on GPT ("Generative Pre-trained Transformer"). It writes by predicting the next word, over and over, after reading a huge slice of the internet.',
      insights: [
        {
          stat: '100M',
          headline: 'Users in about two months',
          detail:
            'After launching in November 2022, ChatGPT reached an estimated 100 million monthly users in roughly two months — at the time the fastest-growing consumer app ever. TikTok needed about nine months; Instagram about two and a half years.',
          source: { name: 'Reuters (UBS study), Feb 2023', url: 'https://www.reuters.com/technology/chatgpt-sets-record-fastest-growing-user-base-analyst-note-2023-02-01/' },
        },
        {
          stat: '175B',
          headline: 'Knobs tuned by reading text',
          detail:
            'GPT-3 (2020) had 175 billion parameters — adjustable numbers tuned while reading hundreds of billions of words. Its predecessor, GPT-2, released just one year earlier, had 1.5 billion. That is a 100× jump in twelve months.',
          source: { name: 'Brown et al., "Language Models are Few-Shot Learners"', url: 'https://arxiv.org/abs/2005.14165' },
        },
        {
          stat: '10%',
          headline: 'From bottom to top of the bar exam',
          detail:
            'OpenAI reported that GPT-3.5 scored around the bottom 10% on a simulated US bar exam, while GPT-4, months later, scored around the top 10%. Later research argued the percentile was overstated — but the leap in a single generation was real.',
          source: { name: 'GPT-4 Technical Report', url: 'https://arxiv.org/abs/2303.08774' },
        },
      ],
      links: [
        { title: 'OpenAI Research', url: 'https://openai.com/research', desc: 'Papers and announcements from the lab itself' },
        { title: 'Neural networks, visually', url: 'https://www.3blue1brown.com/topics/neural-networks', desc: '3Blue1Brown’s legendary animated series' },
        { title: 'GPT-3 paper', url: 'https://arxiv.org/abs/2005.14165', desc: 'The paper that started the scaling era' },
        { title: 'GPT on Wikipedia', url: 'https://en.wikipedia.org/wiki/Generative_pre-trained_transformer', desc: 'History and versions in one place' },
      ],
    },
    {
      id: 'claude',
      name: 'Claude',
      subtitle: 'Anthropic',
      look: { type: 'desert', colors: ['#7c2d12', '#d97757', '#fde7d9'], rings: true },
      size: 1.45,
      summary:
        'Claude is a family of AI models from Anthropic, a company founded in 2021 by former OpenAI researchers with a focus on AI safety and on understanding what happens inside models.',
      insights: [
        {
          stat: '22 sec',
          headline: 'To find one changed line in a whole novel',
          detail:
            'In 2023 Anthropic secretly modified a single line of "The Great Gatsby", gave Claude the entire book (about 72,000 tokens), and asked what was different. It found the edit in about 22 seconds.',
          source: { name: 'Anthropic: Introducing 100K Context Windows', url: 'https://www.anthropic.com/news/100k-context-windows' },
        },
        {
          stat: '34M',
          headline: 'Concepts found inside an AI’s "brain"',
          detail:
            'Researchers extracted up to 34 million interpretable "features" from Claude 3 Sonnet — including one for the Golden Gate Bridge. When they amplified it, the model started insisting that it was the bridge.',
          source: { name: 'Scaling Monosemanticity (2024)', url: 'https://transformer-circuits.pub/2024/scaling-monosemanticity/' },
        },
        {
          stat: '1',
          headline: 'Written constitution it learns from',
          detail:
            'With "Constitutional AI", the model is trained to critique and revise its own answers against a written list of principles — so AI feedback, not only human raters, shapes its behaviour.',
          source: { name: 'Bai et al., Constitutional AI', url: 'https://arxiv.org/abs/2212.08073' },
        },
      ],
      links: [
        { title: 'Anthropic Research', url: 'https://www.anthropic.com/research', desc: 'Safety, interpretability and alignment work' },
        { title: 'Transformer Circuits', url: 'https://transformer-circuits.pub/', desc: 'Deep dives into how models think inside' },
        { title: 'Constitutional AI paper', url: 'https://arxiv.org/abs/2212.08073', desc: 'Training AI with a list of principles' },
        { title: 'Claude docs', url: 'https://docs.anthropic.com/', desc: 'Build with Claude yourself' },
      ],
    },
    {
      id: 'gemini',
      name: 'Gemini',
      subtitle: 'Google DeepMind',
      look: { type: 'terran', colors: ['#1d4ed8', '#22c55e', '#f8fafc'], rings: false },
      size: 1.6,
      summary:
        'Gemini is Google DeepMind’s family of models. Google also invented the Transformer — the architecture under almost every modern AI system.',
      insights: [
        {
          stat: '2017',
          headline: 'The year the "T" in GPT was invented — at Google',
          detail:
            'Eight Google researchers published "Attention Is All You Need", introducing the Transformer. Nearly every major AI model since — including ChatGPT, Claude and Gemini — descends from that one paper.',
          source: { name: 'Vaswani et al., 2017', url: 'https://arxiv.org/abs/1706.03762' },
        },
        {
          stat: '1M',
          headline: 'Tokens in a single prompt',
          detail:
            'Gemini 1.5 Pro (2024) could take in about 1 million tokens at once — roughly an hour of video, 11 hours of audio or 700,000 words — and answer questions about any part of it.',
          source: { name: 'Google blog: Gemini 1.5', url: 'https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/' },
        },
        {
          stat: '1 in 10,000',
          headline: 'Odds a human would play “Move 37”',
          detail:
            'In 2016 DeepMind’s AlphaGo beat world champion Lee Sedol. Its famous Move 37 was one the system estimated a human would play only 1 in 10,000 times — experts first called it a mistake, then called it beautiful.',
          source: { name: 'AlphaGo — The Movie', url: 'https://www.youtube.com/watch?v=WXuK6gekU1Y' },
        },
      ],
      links: [
        { title: 'Google DeepMind', url: 'https://deepmind.google/', desc: 'Research, models and breakthroughs' },
        { title: 'Attention Is All You Need', url: 'https://arxiv.org/abs/1706.03762', desc: 'The most important AI paper of the decade' },
        { title: 'The Illustrated Transformer', url: 'https://jalammar.github.io/illustrated-transformer/', desc: 'A gentle, visual explanation' },
        { title: 'AlphaGo documentary', url: 'https://www.youtube.com/watch?v=WXuK6gekU1Y', desc: 'Free full-length film' },
      ],
    },
    {
      id: 'llama',
      name: 'Llama',
      subtitle: 'Meta · open weights',
      look: { type: 'gas', colors: ['#3b0764', '#a855f7', '#f5d0fe'], rings: true },
      size: 1.35,
      summary:
        'Llama models are "open weights": anyone can download the trained model and run it on their own hardware — no company server required.',
      insights: [
        {
          stat: '15T',
          headline: 'Tokens of training text',
          detail:
            'Llama 3 was pre-trained on over 15 trillion tokens — about seven times more data than Llama 2, released less than a year earlier.',
          source: { name: 'Meta AI: Introducing Llama 3', url: 'https://ai.meta.com/blog/meta-llama-3/' },
        },
        {
          stat: '8B',
          headline: 'Parameters that fit on a laptop',
          detail:
            'Small open models like the 8-billion-parameter Llama can run on an ordinary laptop with no internet connection at all. A capable AI assistant can now live entirely on your own machine.',
          source: { name: 'Ollama', url: 'https://ollama.com/' },
        },
        {
          stat: '1B',
          headline: 'Downloads',
          detail:
            'Meta reported in 2025 that Llama models had passed one billion downloads — a sign of how quickly open models spread once they are released.',
          source: { name: 'Llama', url: 'https://www.llama.com/' },
        },
      ],
      links: [
        { title: 'Llama', url: 'https://www.llama.com/', desc: 'Official home of the models' },
        { title: 'Hugging Face', url: 'https://huggingface.co/models', desc: 'The “GitHub of AI” — thousands of open models' },
        { title: 'Ollama', url: 'https://ollama.com/', desc: 'Run open models locally in one command' },
        { title: 'Open-source AI (Wikipedia)', url: 'https://en.wikipedia.org/wiki/Open-source_artificial_intelligence', desc: 'The debate over open vs closed AI' },
      ],
    },
    {
      id: 'deepseek',
      name: 'DeepSeek',
      subtitle: 'DeepSeek · China',
      look: { type: 'ice', colors: ['#172554', '#3b82f6', '#dbeafe'], rings: false },
      size: 1.25,
      summary:
        'DeepSeek is a Chinese AI lab whose low-cost, openly released models in early 2025 shocked both Silicon Valley and Wall Street.',
      insights: [
        {
          stat: '$5.6M',
          headline: 'Reported cost of the final training run',
          detail:
            'DeepSeek reported its V3 model’s final training run used about 2.8 million GPU-hours — roughly $5.6M at rental prices. That excludes research and hardware, but rivals were believed to spend many times more.',
          source: { name: 'DeepSeek-V3 Technical Report', url: 'https://arxiv.org/abs/2412.19437' },
        },
        {
          stat: '$589B',
          headline: 'Wiped off Nvidia in one day',
          detail:
            'On 27 January 2025, after the DeepSeek-R1 release, Nvidia lost about $589 billion in market value in a single session — the largest one-day loss for any company in US stock-market history.',
          source: { name: 'Wikipedia: DeepSeek', url: 'https://en.wikipedia.org/wiki/DeepSeek' },
        },
        {
          stat: '#1',
          headline: 'On the US App Store',
          detail:
            'Within days of R1’s launch, the DeepSeek app overtook ChatGPT as the most-downloaded free app on Apple’s US App Store.',
          source: { name: 'Wikipedia: DeepSeek', url: 'https://en.wikipedia.org/wiki/DeepSeek' },
        },
      ],
      links: [
        { title: 'DeepSeek-R1 paper', url: 'https://arxiv.org/abs/2501.12948', desc: 'How reinforcement learning taught it to reason' },
        { title: 'DeepSeek-V3 report', url: 'https://arxiv.org/abs/2412.19437', desc: 'Architecture and training cost details' },
        { title: 'DeepSeek on Hugging Face', url: 'https://huggingface.co/deepseek-ai', desc: 'Download the open weights' },
      ],
    },
    {
      id: 'alphafold',
      name: 'AlphaFold',
      subtitle: 'AI for science',
      look: { type: 'crystal', colors: ['#064e3b', '#34d399', '#ecfdf5'], rings: false },
      size: 1.2,
      summary:
        'AlphaFold predicts the 3D shape of proteins — the tiny machines that run every living cell. Shape decides function, so this unlocks medicine and biology.',
      insights: [
        {
          stat: '200M',
          headline: 'Protein structures predicted',
          detail:
            'AlphaFold has predicted structures for about 200 million proteins — nearly every protein known to science. Before it, solving a single structure could take a researcher years.',
          source: { name: 'AlphaFold Protein Structure Database', url: 'https://alphafold.ebi.ac.uk/' },
        },
        {
          stat: '50',
          headline: 'Year-old problem, cracked',
          detail:
            'The "protein folding problem" had been a grand challenge of biology for about 50 years. AlphaFold 2 effectively solved it at the CASP14 competition in 2020.',
          source: { name: 'Google DeepMind: AlphaFold', url: 'https://deepmind.google/science/alphafold/' },
        },
        {
          stat: '2024',
          headline: 'Nobel Prize in Chemistry',
          detail:
            'Demis Hassabis and John Jumper shared the 2024 Nobel Prize in Chemistry for AlphaFold — one of the first Nobels awarded for work done largely by an AI system.',
          source: { name: 'NobelPrize.org', url: 'https://www.nobelprize.org/prizes/chemistry/2024/summary/' },
        },
      ],
      links: [
        { title: 'AlphaFold database', url: 'https://alphafold.ebi.ac.uk/', desc: 'Browse 200M predicted proteins for free' },
        { title: 'Nobel Prize 2024', url: 'https://www.nobelprize.org/prizes/chemistry/2024/summary/', desc: 'Why this mattered so much' },
        { title: 'Protein folding explained', url: 'https://en.wikipedia.org/wiki/Protein_folding', desc: 'The underlying biology' },
      ],
    },
  ],
};
