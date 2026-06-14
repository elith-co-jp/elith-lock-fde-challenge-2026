import { useMemo, useState } from 'react'
import { customers, primaryCustomer } from './data'
import type { CustomerCase, CustomerId } from './types'
import './App.css'

type PanelItem = {
  label: string
  value: string
  note: string
}

const portalPanels: PanelItem[] = [
  {
    label: 'Assistant / Search',
    value: '資料検索・質問回答',
    note: '既存ポータルには、社内資料や業務ルールを検索し、回答案を作る基本機能があります。',
  },
  {
    label: 'Feedback / Signals',
    value: '回答評価・要望収集',
    note: '利用者のフィードバック、問い合わせ、商談メモから改善論点が集まります。',
  },
  {
    label: 'Usage / Config',
    value: '利用ログ・顧客別設定',
    note: '部署、文書カテゴリ、ルール、レビュー必須条件は顧客ごとに異なります。',
  },
]

const workspaceSteps = [
  {
    title: '1. 東雲向け改善',
    status: 'Required',
    description:
      '東雲ビジネスサポートの業務課題を1つ選び、既存ポータル上の改善として実装してください。',
  },
  {
    title: '2. 共通化判断',
    status: 'Required',
    description:
      '参考顧客2社も見て、顧客別対応・設定化・共通プロダクト機能化を切り分けてください。',
  },
  {
    title: '3. 基盤への反映',
    status: 'High value',
    description:
      '可能な範囲で、共通データモデル、設定、UI、ルール定義、再利用コンポーネントに反映してください。',
  },
]

function roleLabel(customer: CustomerCase) {
  return customer.implementationRole === 'primary-target'
    ? 'Main implementation target'
    : 'Reference customer'
}

function App() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<CustomerId>(
    primaryCustomer?.id ?? customers[0].id,
  )

  const selectedCustomer = useMemo(
    () =>
      customers.find((customer) => customer.id === selectedCustomerId) ??
      customers[0],
    [selectedCustomerId],
  )

  const selectedHighPriority = selectedCustomer.workflowOpportunities.filter(
    (opportunity) => opportunity.priority === 'high',
  ).length

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">AI業務支援ポータル</p>
          <h1>ELITH LOCK: FDE Challenge Starter</h1>
        </div>
        <div className="header-meta" aria-label="Starter repository status">
          <span>Existing product scaffold</span>
          <span>Public starter repo</span>
        </div>
      </header>

      <section className="workspace-band" aria-labelledby="challenge-context">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Challenge Context</p>
            <h2 id="challenge-context">既存プロダクトを前提に改善する</h2>
          </div>
          <p>
            東雲専用の新規プロダクトをゼロから作る課題ではありません。
            既存ポータルに対して、顧客価値と共通化の両方を考えた改善を入れてください。
          </p>
        </div>

        <div className="panel-grid">
          {portalPanels.map((panel) => (
            <article className="portal-panel" key={panel.label}>
              <span className="panel-label">{panel.label}</span>
              <h3>{panel.value}</h3>
              <p>{panel.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="workspace-band" aria-labelledby="customer-selector">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Customer Data</p>
            <h2 id="customer-selector">顧客選択</h2>
          </div>
          <p>
            実装対象は東雲です。参考顧客2社は、共通化すべき基盤と顧客別設定の判断に使ってください。
          </p>
        </div>

        <div className="customer-grid">
          {customers.map((customer) => (
            <button
              className="customer-card"
              type="button"
              aria-pressed={customer.id === selectedCustomerId}
              key={customer.id}
              onClick={() => setSelectedCustomerId(customer.id)}
            >
              <span className="customer-role">{roleLabel(customer)}</span>
              <strong>{customer.name}</strong>
              <span>{customer.industry}</span>
              <span className="customer-priority">
                {customer.workflowOpportunities.length} workflow opportunities
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="summary-strip" aria-label="Selected customer summary">
        <div>
          <span className="metric-label">Selected customer</span>
          <strong>{selectedCustomer.name}</strong>
        </div>
        <div>
          <span className="metric-label">Departments</span>
          <strong>{selectedCustomer.departments.length}</strong>
        </div>
        <div>
          <span className="metric-label">High priority opportunities</span>
          <strong>{selectedHighPriority}</strong>
        </div>
      </section>

      <section className="workspace-band" aria-labelledby="customer-detail">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected Case</p>
            <h2 id="customer-detail">{selectedCustomer.name}</h2>
          </div>
          <p>{selectedCustomer.summary}</p>
        </div>

        <div className="triage-layout">
          <aside className="starter-notes" aria-label="Portal goals">
            <h3>Portal goals</h3>
            <ul>
              {selectedCustomer.portalGoals.map((goal) => (
                <li key={goal}>{goal}</li>
              ))}
            </ul>
          </aside>

          <div className="triage-board">
            {selectedCustomer.workflowOpportunities.map((opportunity) => (
              <article className="triage-card" key={opportunity.id}>
                <div className="card-header">
                  <h3>{opportunity.title}</h3>
                  <span>{opportunity.priority}</span>
                </div>
                <p>{opportunity.currentProcess}</p>
                <div className="placeholder-box">{opportunity.candidateSlice}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="triage-workspace" aria-labelledby="triage-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Candidate Work Area</p>
            <h2 id="triage-title">FDE Triage Workspace</h2>
          </div>
          <p>
            この領域が候補者の主な実装対象です。東雲向け改善と、他社にも展開できる基盤化を分けて表現してください。
          </p>
        </div>

        <div className="triage-board">
          {workspaceSteps.map((step) => (
            <article className="triage-card" key={step.title}>
              <div className="card-header">
                <h3>{step.title}</h3>
                <span>{step.status}</span>
              </div>
              <p>{step.description}</p>
              <div className="placeholder-box">
                Replace this placeholder with your implementation
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
