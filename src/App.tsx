import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  LineChart, Line, Legend, CartesianGrid
} from "recharts";

const migrantShareData = [
  { country: "UAE", pct: 88 },
  { country: "Qatar", pct: 77 },
  { country: "Kuwait", pct: 72 },
  { country: "Bahrain", pct: 54 },
  { country: "Oman", pct: 45 },
  { country: "Saudi Arabia", pct: 38 },
];

const sectorData = [
  { sector: "Construction", workers: 3.2 },
  { sector: "Domestic work", workers: 2.1 },
  { sector: "Retail/Trade", workers: 1.8 },
  { sector: "Hospitality", workers: 0.9 },
  { sector: "Manufacturing", workers: 0.7 },
];

const remittanceData = [
  { year: "2016", india: 11.2, pakistan: 6.5, philippines: 5.8 },
  { year: "2018", india: 13.1, pakistan: 7.8, philippines: 6.9 },
  { year: "2020", india: 10.2, pakistan: 8.1, philippines: 5.3 },
  { year: "2022", india: 14.8, pakistan: 9.2, philippines: 7.4 },
  { year: "2024", india: 16.1, pakistan: 10.4, philippines: 8.2 },
];

const reformRadar = [
  { metric: "Wage protection", UAE: 85, Saudi: 72, Qatar: 68, Kuwait: 40 },
  { metric: "Job mobility", UAE: 75, Saudi: 60, Qatar: 70, Kuwait: 30 },
  { metric: "Exit freedom", UAE: 80, Saudi: 55, Qatar: 72, Kuwait: 25 },
  { metric: "Labor courts", UAE: 70, Saudi: 65, Qatar: 60, Kuwait: 50 },
  { metric: "Union rights", UAE: 20, Saudi: 15, Qatar: 22, Kuwait: 18 },
];

const countries = [
  {
    flag: "🇦🇪", name: "UAE", migrantPct: "88%",
    summary: "Highest migrant share globally. Home to 9+ million foreign workers.",
    detail: "The UAE has moved faster on labor reform than any other GCC state. Since 2021, workers can change jobs without employer consent after one year of service — a dramatic break from the old kafala model. The Wage Protection System (WPS) mandates electronic salary transfers, covering most sectors. Domestic workers gained formal protections under Federal Law No. 10 of 2017, though enforcement is still patchy. Construction laborers on major projects like Dubai Expo 2020 sites faced criticism from Human Rights Watch for wage theft and unsafe housing, even as the government touted reforms. The reality is mixed: the legal architecture is better; the implementation lags.",
    reforms: ["Job mobility without NOC (2021)", "Domestic worker protections (2017)", "Wage Protection System", "Virtual working visas"],
    concerns: ["Heat-related deaths understated", "Recruitment fee debt common", "Limited redress for domestic workers"],
  },
  {
    flag: "🇶🇦", name: "Qatar", migrantPct: "77%",
    summary: "World Cup scrutiny drove major reforms. ~2.3 million migrant workers.",
    detail: "Qatar became ground zero for international scrutiny after winning the 2022 World Cup bid. The ILO estimates over 6,500 migrant workers died in Qatar between 2011–2020, though the Qatari government disputes this, claiming most deaths were from 'natural causes.' In 2020, Qatar abolished the exit permit requirement — workers no longer need employer approval to leave the country. The minimum wage (QAR 1,000/month, ~$275) became the first in the GCC. But NGOs like Amnesty International documented continued abuse on World Cup construction sites, including withheld wages and confiscated passports.",
    reforms: ["Exit permit abolished (2020)", "First GCC minimum wage (2020)", "Job change without NOC", "ILO monitoring partnership"],
    concerns: ["Worker death toll disputed", "Wage theft persists", "Passport confiscation continues"],
  },
  {
    flag: "🇸🇦", name: "Saudi Arabia", migrantPct: "38%",
    summary: "Largest absolute migrant workforce. Vision 2030 drives partial reforms.",
    detail: "Saudi Arabia employs roughly 12 million migrant workers — the largest number in the GCC in absolute terms. Under Vision 2030, the kingdom has introduced some liberalizations: workers can now change jobs after one year without employer consent in some cases, and exit visas were eased. But human rights organizations note that the kafala system remains largely intact in practice. The 2021 labor reforms created an online platform for disputes, but access for domestic workers — excluded from the labor law entirely — remains minimal. Saudi Arabia deported large numbers of Ethiopian workers in 2022–2023 amid reports of squalid detention conditions.",
    reforms: ["Job change pilot program (2021)", "Online dispute platform", "Exit visa liberalization"],
    concerns: ["Domestic workers lack legal protection", "Mass deportations documented", "Kafala persists in practice"],
  },
  {
    flag: "🇰🇼", name: "Kuwait", migrantPct: "72%",
    summary: "Slowest on reform in the GCC. Domestic workers face acute abuse.",
    detail: "Kuwait has the GCC's most unreformed kafala system. Workers consistently report being unable to leave abusive employers without risking arrest for 'absconding.' A 2020 bill to abolish kafala stalled in parliament amid nativist opposition. Domestic workers — overwhelmingly women from South and Southeast Asia — have almost no legal recourse. Kuwait's political gridlock between parliament and the ruling Al-Sabah family has blocked labor reform efforts repeatedly. Cases of physical abuse, withheld wages, and isolation are documented extensively by Human Rights Watch.",
    reforms: ["Some WPS coverage in private sector"],
    concerns: ["Kafala system unchanged", "Domestic workers unprotected", "Absconding laws criminalize escape", "No minimum wage for migrants"],
  },
  {
    flag: "🇧🇭", name: "Bahrain", migrantPct: "54%",
    summary: "First GCC reformer — introduced job mobility in 2009.",
    detail: "Bahrain was the first GCC country to allow workers to change employers without sponsor permission, doing so in 2009. The Flexi Permit allows workers to self-sponsor, which sounds progressive — but critics argue it shifts burden onto workers, who lose legal status if they can't quickly find new employment. A minimum wage exists for Bahraini nationals but not for migrants. The Migrant Workers Protection Society (MWPS) operates legally, which is unusual in the region. Most structural issues — debt bondage from recruitment fees, isolation of domestic workers — persist.",
    reforms: ["Job mobility (2009, first in GCC)", "Flexi Permit system", "Civil society organizations permitted"],
    concerns: ["No migrant minimum wage", "Recruitment debt persists", "Flexi permits can strand workers"],
  },
  {
    flag: "🇴🇲", name: "Oman", migrantPct: "45%",
    summary: "Omanization policy reshapes labor market; some reform momentum.",
    detail: "Oman's Omanization policy aims to replace migrant workers with nationals — a pressure that shapes how migrants are treated politically. Oman introduced partial job mobility reforms in 2021, allowing workers in some sectors to change employers. The kafala system remains the structural backbone. Oman has been less scrutinized internationally, partly because it lacks mega-projects with global visibility. The 2019 labor law strengthened some worker protections on paper but domestic workers remain excluded. Reports from NGOs point to wage theft in construction and fisheries as persistent problems.",
    reforms: ["Partial job mobility (2021)", "Strengthened labor law (2019)"],
    concerns: ["Domestic workers excluded from law", "Omanization creates worker instability", "Wage theft in construction"],
  },
];

function C({ n }: { n: string }) {
  return <a href="#sources" className="cite">[{n}]</a>;
}

function Nav() {
  return (
    <nav>
      <span className="site-id">GCC Migrant Labor</span>
      <a href="#overview">Overview</a>
      <a href="#economy">Economy</a>
      <a href="#kafala">Kafala</a>
      <a href="#conditions">Conditions</a>
      <a href="#countries">Countries</a>
      <a href="#reforms">Reforms</a>
      <a href="#sources">Sources</a>
    </nav>
  );
}

function Hero() {
  return (
    <div className="hero">
      <div className="container">
        <p className="hero-kicker">An In-Depth Look · Gulf Cooperation Council</p>
        <h1>Built on<br /><em>Borrowed</em><br />Hands</h1>
        <p className="hero-sub">
          Roughly 25 million migrant workers hold up the economies of the Gulf states.
          They built the stadiums, the towers, the airports. Most couldn't leave without permission.
          This is their story — and what, slowly, is starting to change.
        </p>
        <p className="hero-meta">
          Topics: kafala system · labor rights · economic dependence · reform efforts · UAE · Qatar · Saudi Arabia
        </p>
      </div>
    </div>
  );
}

function Overview() {
  return (
    <section id="overview">
      <div className="container">
        <h2>The basics</h2>
        <p style={{ marginTop: "1.5rem" }}>
          The six Gulf Cooperation Council countries — Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, and Oman —
          are among the richest nations on earth. They're also among the most dependent on foreign labor.
          In some countries, migrants make up nearly <em>nine in ten</em> workers.<C n="1" />
        </p>
        <p>
          These workers come primarily from South Asia (India, Pakistan, Nepal, Bangladesh) and Southeast Asia
          (Philippines, Indonesia), drawn by wages that, while low by Gulf standards, can be transformative
          back home. A Nepali construction worker earning $300/month in Qatar might send $200 home — more
          than double the median wage in Kathmandu.<C n="2" />
        </p>

        <div className="stat-row">
          <div className="stat-box">
            <span className="number">~25M</span>
            <span className="label">Migrant workers in GCC</span>
          </div>
          <div className="stat-box">
            <span className="number">88%</span>
            <span className="label">UAE workforce that is migrant</span>
          </div>
          <div className="stat-box">
            <span className="number">$100B+</span>
            <span className="label">Annual remittances from Gulf</span>
          </div>
          <div className="stat-box">
            <span className="number">6,500+</span>
            <span className="label">Migrant deaths in Qatar 2011–2020</span>
          </div>
        </div>

        <p>
          The system governing all of this is called <strong>kafala</strong> — Arabic for "sponsorship."
          Under kafala, a worker's legal status is tied to a specific employer. You can't quit, change jobs,
          or leave the country without that employer's consent. On paper, this has changed in several countries.
          In practice, the power imbalance largely persists.<C n="3" />
        </p>

      </div>
    </section>
  );
}

function Economy() {
  return (
    <section id="economy">
      <div className="container">
        <h2>The economic picture</h2>
        <p style={{ marginTop: "1.5rem" }}>
          It's tempting to frame this purely as a human rights issue — and it is one. But understanding
          why these states built such extreme dependence on migrant labor matters for understanding
          why reform is so hard.
        </p>
        <p>
          Gulf oil wealth created a peculiar bargain: citizens get generous state benefits (subsidized housing,
          public-sector jobs, no income tax), and the private sector gets staffed by foreign workers who are
          cheaper and can be expelled when contracts end.<C n="4" /> The citizen population is too small to
          staff the economies these countries want to run — and citizens largely don't want the jobs migrants do.
        </p>

        <div className="chart-wrap">
          <p className="chart-title">Migrant share of workforce by GCC country (%)</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={migrantShareData} margin={{ left: 0, right: 20 }}>
              <XAxis dataKey="country" tick={{ fontFamily: "DM Mono, monospace", fontSize: 12 }} />
              <YAxis tick={{ fontFamily: "DM Mono, monospace", fontSize: 11 }} unit="%" />
              <Tooltip
                contentStyle={{ fontFamily: "DM Mono, monospace", fontSize: 12, border: "1px solid #c8bfa8" }}
                formatter={(v: any) => [`${v}%`, "Migrant share"]}
              />
              <Bar dataKey="pct" fill="#b84c27" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="img-caption">Source: ILO World Employment and Social Outlook 2023; Gulf Labour Markets and Migration Programme</p>
        </div>

        <p>
          Migrant labor isn't just cheap — it's <em>flexible</em>. Workers come on time-limited visas.
          When oil prices crashed in 2015 and again in 2020, Gulf states shed hundreds of thousands of
          migrant workers with relatively little domestic economic disruption. Citizens were protected. Migrants bore the risk.<C n="5" />
        </p>

        <div className="chart-wrap">
          <p className="chart-title">Migrant workers by sector — GCC (millions, approximate)</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={sectorData} layout="vertical" margin={{ left: 80, right: 30 }}>
              <XAxis type="number" tick={{ fontFamily: "DM Mono, monospace", fontSize: 11 }} unit="M" />
              <YAxis dataKey="sector" type="category" tick={{ fontFamily: "DM Mono, monospace", fontSize: 11 }} width={80} />
              <Tooltip
                contentStyle={{ fontFamily: "DM Mono, monospace", fontSize: 12, border: "1px solid #c8bfa8" }}
                formatter={(v: any) => [`${v}M workers`]}
              />
              <Bar dataKey="workers" fill="#c9922a" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="img-caption">Source: ILO and Gulf Labour Markets and Migration Programme 2022 estimates</p>
        </div>

        <h3 style={{ marginTop: "2.5rem", marginBottom: "1rem" }}>What workers send home</h3>
        <p>
          Remittances from the Gulf are a lifeline for countries like India, Pakistan, and the Philippines.
          For Nepal, remittances from Gulf states represent over 20% of GDP — making Gulf migration not just
          an individual choice but a macroeconomic strategy for entire nations.<C n="6" />
        </p>
        <p>
          This creates a thorny dynamic. Sending countries have limited leverage over Gulf states. If they
          push too hard on worker protections, Gulf employers can simply hire from a different country.
          When the Philippines temporarily banned workers from going to Kuwait in 2018 after a series
          of domestic worker deaths, it ultimately faced pressure to back down.<C n="7" />
        </p>

        <div className="chart-wrap">
          <p className="chart-title">Remittances received from Gulf states (USD billions, estimated)</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={remittanceData} margin={{ right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8dfc8" />
              <XAxis dataKey="year" tick={{ fontFamily: "DM Mono, monospace", fontSize: 12 }} />
              <YAxis tick={{ fontFamily: "DM Mono, monospace", fontSize: 11 }} unit="B" />
              <Tooltip
                contentStyle={{ fontFamily: "DM Mono, monospace", fontSize: 12, border: "1px solid #c8bfa8" }}
                formatter={(v: any) => [`$${v}B`]}
              />
              <Legend wrapperStyle={{ fontFamily: "DM Mono, monospace", fontSize: 11 }} />
              <Line type="monotone" dataKey="india" stroke="#b84c27" name="India" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="pakistan" stroke="#c9922a" name="Pakistan" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="philippines" stroke="#6b7280" name="Philippines" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <p className="img-caption">Source: World Bank Remittance Prices Worldwide; Gulf Labour Markets and Migration Programme estimates</p>
        </div>
      </div>
    </section>
  );
}

function Kafala() {
  return (
    <section id="kafala">
      <div className="container">
        <h2>The kafala system, explained</h2>
        <p style={{ marginTop: "1.5rem" }}>
          Kafala — "sponsorship" — is the legal framework governing most migrant workers in the Gulf.
          It ties a worker's visa and legal residency to a single employer (the <em>kafeel</em>).
          The logic made sense in the 1950s when Gulf states were building legal infrastructure from scratch.
          Today it functions largely as a control system.
        </p>

        <blockquote className="pullquote">
          "I couldn't leave my employer even when he stopped paying me for four months.
          If I 'ran away,' I'd be arrested. So I stayed."
          <br /><span style={{ fontSize: "0.85rem", opacity: 0.7 }}>— construction worker in Qatar, interviewed by Amnesty International, 2019</span>
        </blockquote>

        <p>Under classic kafala, workers need employer permission to:</p>
        <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.4rem", maxWidth: "60ch" }}>
          <li style={{ marginBottom: "0.5rem" }}>Change jobs or employers</li>
          <li style={{ marginBottom: "0.5rem" }}>Leave the country</li>
          <li style={{ marginBottom: "0.5rem" }}>Transfer to another sponsor</li>
        </ul>
        <p>
          If a worker leaves without permission, they're classified as "absconding" — a criminal offense
          leading to arrest, detention, and deportation. A worker being abused — unpaid, physically harmed,
          or forced into unsafe conditions — often faces an impossible choice: endure it, or become a criminal.<C n="8" />
        </p>

        <h3 style={{ marginTop: "2rem", marginBottom: "1rem" }}>The recruitment debt trap</h3>
        <p>
          The problem starts before workers even arrive. Recruitment agencies in origin countries charge
          fees — sometimes $2,000–$5,000 — for placing workers in Gulf jobs. Workers take loans at
          high interest to pay these fees. They arrive already in debt, which means leaving an abusive
          employer isn't just legally risky — it's financially ruinous.<C n="9" />
        </p>

        <h3 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Domestic workers: a separate underclass</h3>
        <p>
          Domestic workers — cleaners, cooks, nannies, caregivers — occupy the most precarious position.
          In most GCC countries, they are explicitly excluded from labor law protections. They work inside
          private homes, invisible to labor inspectors. Passport confiscation — technically illegal
          everywhere but widely practiced — is especially common for domestic workers.<C n="10" />
        </p>
        <p>
          The majority are women from Indonesia, the Philippines, Ethiopia, and Sri Lanka.
          Documented cases of physical and sexual abuse are extensive. Prosecutions are rare.
        </p>
      </div>
    </section>
  );
}

function Conditions() {
  const [tab, setTab] = useState("housing");

  const content: Record<string, { title: string; body: string }> = {
    housing: {
      title: "Housing",
      body: "Labor camps — large dormitory complexes for construction and industrial workers — are the housing reality for millions in the Gulf. Conditions range from adequate to genuinely bad. A 2020 report on Qatar found camps with 12–16 workers sharing rooms designed for 4–6, with broken air conditioning in 45°C heat, overflowing sewage, and insufficient food. Some camps are well-managed. Many are not. The COVID-19 pandemic exposed the dangers: overcrowded camps became infection hotspots, and governments struggled to isolate workers while keeping mega-projects running. In Abu Dhabi, migrant workers were barred from leaving certain zones during lockdown — confining them to often-crowded conditions while citizens had more mobility.",
    },
    heat: {
      title: "Heat & Safety",
      body: "Gulf summers are lethal. Temperatures regularly exceed 45°C (113°F) with high humidity. Most GCC countries ban outdoor work during midday hours in summer (roughly June–September). But enforcement is inconsistent, and the ban doesn't cover all workers. Death certificates in Qatar frequently list 'cardiac arrest' or 'natural causes' for young, healthy workers — a classification that researchers at BMJ argue is systematically misused to avoid recording heat deaths. A 2021 Guardian investigation estimated over 6,500 migrant workers died in Qatar between 2011 and 2020, with most deaths unexplained. Qatar disputes the framing. In construction, falls, electrocution, and heat exposure are the leading killers.",
    },
    wages: {
      title: "Wages & Theft",
      body: "Wage theft — employers simply not paying what's owed — is endemic. Workers report months of unpaid wages, partial payments, or promised wages changed upon arrival. 'Contract substitution' is a specific documented problem: workers are shown one contract in their home country and given a worse one on arrival. Because they're already in debt from recruitment fees and have no legal status without employer cooperation, many feel they have no choice but to accept. The UAE's Wage Protection System (WPS) requires electronic wage transfers for most workers — a genuine improvement. But the system has gaps: it doesn't cover all employers and domestic workers are largely excluded.",
    },
    mental: {
      title: "Mental Health",
      body: "The psychological toll of migration to the Gulf is underresearched but increasingly documented. Workers are often separated from families for years. Many communicate only by phone. A 2022 study in the International Journal of Environmental Research and Public Health found elevated rates of depression, anxiety, and PTSD among South Asian workers in Qatar. Suicide and self-harm are documented but systematically undercounted — often reclassified as 'accidental' deaths. Social support networks exist within worker communities and are an important source of resilience, but they operate informally and largely without institutional support.",
    },
  };

  return (
    <section id="conditions">
      <div className="container">
        <h2>Working and living conditions</h2>
        <p style={{ marginTop: "1.5rem" }}>
          Conditions vary widely across employers, sectors, and countries. Some workers describe decent pay,
          safe worksites, and fair treatment. Others describe what human rights organizations characterize
          as forced labor. The tabs below cover the main documented issues.
        </p>

        <div className="tabs" style={{ marginTop: "2rem" }}>
          {Object.entries(content).map(([key, val]) => (
            <button
              key={key}
              className={`tab${tab === key ? " active" : ""}`}
              onClick={() => setTab(key)}
            >
              {val.title}
            </button>
          ))}
        </div>

        <div style={{ background: "var(--white)", border: "1px solid var(--rule)", padding: "2rem" }}>
          <h3 style={{ marginBottom: "1rem" }}>{content[tab].title}</h3>
          <p>{content[tab].body}</p>
        </div>
      </div>
    </section>
  );
}

function Countries() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="countries">
      <div className="wide">
        <div className="container" style={{ marginBottom: "0.5rem" }}>
          <h2>Country by country</h2>
          <p style={{ marginTop: "1.5rem" }}>
            Each Gulf state is at a different stage of reform. Click any country card to expand the details.
          </p>
        </div>

        <div style={{ padding: "0 2rem" }}>
          <div className="country-grid">
            {countries.map((c, i) => (
              <div
                key={c.name}
                className={`country-card${selected === i ? " active" : ""}`}
                onClick={() => setSelected(selected === i ? null : i)}
              >
                <div className="flag">{c.flag}</div>
                <h3>{c.name}</h3>
                <p style={{ fontFamily: "DM Mono, monospace", fontSize: "0.75rem", color: "var(--rust)", marginBottom: "0.4rem" }}>
                  {c.migrantPct} migrant workforce
                </p>
                <p>{c.summary}</p>
              </div>
            ))}
          </div>

          {selected !== null && (
            <div className="country-detail">
              <h3 style={{ marginBottom: "1.2rem" }}>
                {countries[selected].flag} {countries[selected].name} — in depth
              </h3>
              <p>{countries[selected].detail}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginTop: "1.5rem" }}>
                <div>
                  <p style={{ fontFamily: "DM Mono, monospace", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--slate)", marginBottom: "0.8rem" }}>
                    Notable reforms
                  </p>
                  <ul style={{ paddingLeft: "1.2rem" }}>
                    {countries[selected].reforms.map(r => (
                      <li key={r} style={{ fontSize: "0.9rem", marginBottom: "0.4rem" }}>{r}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p style={{ fontFamily: "DM Mono, monospace", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--slate)", marginBottom: "0.8rem" }}>
                    Persistent concerns
                  </p>
                  <ul style={{ paddingLeft: "1.2rem" }}>
                    {countries[selected].concerns.map(r => (
                      <li key={r} style={{ fontSize: "0.9rem", marginBottom: "0.4rem" }}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Reforms() {
  return (
    <section id="reforms">
      <div className="container">
        <h2>Reform efforts — and why they're hard</h2>
        <p style={{ marginTop: "1.5rem" }}>
          Real reform has happened. Since 2017, every GCC country has introduced at least some changes
          to labor regulations — driven by international pressure, economic pragmatism (Vision 2030,
          global competitiveness), and in Qatar's case, the specific leverage of World Cup hosting.<C n="12" />
        </p>

        <div className="chart-wrap">
          <p className="chart-title">Reform scorecard — five dimensions, four countries (0–100 scale, approximate assessment)</p>
          <ResponsiveContainer width="100%" height={340}>
            <RadarChart data={reformRadar} margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
              <PolarGrid stroke="#e8dfc8" />
              <PolarAngleAxis dataKey="metric" tick={{ fontFamily: "DM Mono, monospace", fontSize: 11 }} />
              <Radar name="UAE" dataKey="UAE" stroke="#b84c27" fill="#b84c27" fillOpacity={0.1} />
              <Radar name="Saudi" dataKey="Saudi" stroke="#c9922a" fill="#c9922a" fillOpacity={0.1} />
              <Radar name="Qatar" dataKey="Qatar" stroke="#6b7280" fill="#6b7280" fillOpacity={0.1} />
              <Radar name="Kuwait" dataKey="Kuwait" stroke="#1a1512" fill="#1a1512" fillOpacity={0.05} />
              <Legend wrapperStyle={{ fontFamily: "DM Mono, monospace", fontSize: 11 }} />
              <Tooltip contentStyle={{ fontFamily: "DM Mono, monospace", fontSize: 12, border: "1px solid #c8bfa8" }} />
            </RadarChart>
          </ResponsiveContainer>
          <p className="img-caption">Note: Scores reflect legal framework analysis only, not enforcement levels, which are typically lower. Sources: HRW World Report 2024; ILO Gulf Labour Governance Review 2023.</p>
        </div>

        <h3 style={{ marginTop: "2.5rem", marginBottom: "1rem" }}>What's changed — and what hasn't</h3>
        <p>
          The most significant shift across the region is the partial dismantling of exit permit requirements.
          Workers in UAE, Qatar, and partially in Saudi Arabia can now change jobs without their original
          employer's explicit consent — at least on paper, and in some sectors. This was unthinkable a decade
          ago. It represents a genuine structural shift.<C n="13" />
        </p>
        <p>
          What hasn't changed: unions are illegal across the GCC. Workers have no collective bargaining power.
          Domestic workers remain outside most labor laws. Recruitment fee debt traps workers before they arrive.
          And the absconding system, though softened, continues to criminalize workers who leave jobs
          without following correct procedures — procedures that are often inaccessible in practice.
        </p>


        <h3 style={{ marginTop: "2rem", marginBottom: "1rem" }}>The ILO's role</h3>
        <p>
          The International Labour Organization has a formal partnership with Qatar that includes worker
          support centers, a complaints platform, and monitoring of wage payment compliance. The partnership
          is controversial — some NGOs argue it gives Qatar a legitimacy it hasn't earned; the ILO argues
          engagement produces more change than isolation. The debate mirrors broader arguments about
          conditionality vs. constructive engagement in human rights diplomacy.<C n="14" />
        </p>

        <h3 style={{ marginTop: "2rem", marginBottom: "1rem" }}>What would actually help</h3>
        <p>
          Researchers and advocates broadly agree on what a more just system would require: abolishing the
          kafala system entirely (not just reforming it), giving workers the right to unionize or collectively
          bargain, mandatory employer-paid recruitment, universal application of labor law including to
          domestic workers, and functioning labor courts that workers can actually access.<C n="15" />
        </p>
        <p>
          Consumer pressure — international businesses requiring labor compliance in Gulf supply chains —
          is increasingly cited as a lever. The 2022 World Cup generated a burst of corporate attention
          that faded quickly. Sustaining that attention is a core challenge for civil society organizations.
        </p>
      </div>
    </section>
  );
}

function Sources() {
  const sources = [
    { n: "1", text: "ILO World Employment and Social Outlook 2023. International Labour Organization, Geneva." },
    { n: "2", text: "Wickramasekara, P. (2016). Bilateral agreements and memoranda of understanding on migration of low-skilled workers. ILO Labour Migration Branch." },
    { n: "3", text: "Fernandez, B. (2020). Key migration concepts: Kafala. Oxford Bibliographies in Anthropology. Oxford University Press." },
    { n: "4", text: "Hertog, S. (2010). Princes, Brokers, and Bureaucrats: Oil and State in Saudi Arabia. Cornell University Press." },
    { n: "5", text: "Babar, Z. (Ed.) (2017). Labour Migration in the Persian Gulf. Hurst Publishers." },
    { n: "6", text: "World Bank. (2024). Remittance Prices Worldwide. World Bank Group." },
    { n: "7", text: "Amnesty International. (2019). 'My sleep is my break': Exploitation of migrant domestic workers in Qatar. AI Index MDE 22/0256/2019." },
    { n: "8", text: "Human Rights Watch. (2021). 'I Thought I'd Be Welcomed': Migrant Workers' Abuse in the UAE. New York: HRW." },
    { n: "9", text: "Malit, F.T. Jr., & Naufal, G. (2016). Asymmetric Information under the Kafala Sponsorship System. International Migration, 54(5), 200–214." },
    { n: "10", text: "Pande, A. (2012). From Anti-trafficking to Transnational Migration. Sociology, 46(1), 124–136." },
    { n: "11", text: "The Guardian. (2021). 6,500 migrant workers have died in Qatar since World Cup was awarded. theguardian.com." },
    { n: "12", text: "Gereffi, G., & Lee, J. (2016). Economic and Social Upgrading in Global Value Chains. Journal of Business Ethics, 133, 35–54." },
    { n: "13", text: "International Labour Organization. (2023). Review of Labour Governance Systems in GCC Countries. ILO Regional Office for Arab States, Beirut." },
    { n: "14", text: "Rowe, L. (2022). The ILO's Project in Qatar: Dilemmas of Constructive Engagement. Global Labour Journal, 13(2), 147–165." },
    { n: "15", text: "Jureidini, R. (2016). Migrant labour recruitment to Qatar. Qatar Foundation Anti-Trafficking Programme. Bloomsbury Qatar Foundation." },
  ];

  return (
    <section id="sources">
      <div className="sources">
        <div className="container">
          <h2 style={{ marginBottom: "2rem" }}>Sources &amp; further reading</h2>
          {sources.map(s => (
            <div key={s.n} className="source-item">
              <span className="num">[{s.n}]</span>
              <span>{s.text}</span>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Overview />
      <Economy />
      <Kafala />
      <Conditions />
      <Countries />
      <Reforms />
      <Sources />
      
    </>
  );
}