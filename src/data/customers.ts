import type { CustomerCase } from '../types'

export const customers: CustomerCase[] = [
  {
    id: 'shinonome',
    name: '東雲ビジネスサポート',
    industry: '中堅企業向けBPO・経理代行',
    employeeCount: 420,
    summary:
      '請求書処理、契約書一次確認、問い合わせ一次対応を複数顧客向けに代行している。属人化した判断と確認漏れを減らし、AI業務支援ポータルを現場で使える形にしたい。',
    implementationRole: 'primary-target',
    portalGoals: [
      '請求書・契約書・問い合わせ対応の判断基準をポータル上で確認できる',
      '部門ごとの優先AIワークフローを見える化する',
      '顧客別ルールと共通ルールを分けて管理できる',
      'AIの提案結果に人間レビューが必要な理由を明示する',
    ],
    departments: [
      {
        id: 'accounting-bpo',
        name: '経理BPO部',
        headcount: 160,
        currentPain:
          '請求書の勘定科目、支払条件、承認者判定をベテランに確認しており、月末に滞留が発生する。',
        aiUseCases: [
          '請求書内容の要約',
          '支払条件と承認ルールの照合',
          '不足証憑のチェックリスト生成',
        ],
      },
      {
        id: 'contract-review',
        name: '契約支援部',
        headcount: 90,
        currentPain:
          'NDAや業務委託契約の一次確認で、禁止条項や再委託条件の見落としが発生する。',
        aiUseCases: [
          '契約種別の分類',
          '要注意条項の抽出',
          '法務確認が必要な理由の説明',
        ],
      },
      {
        id: 'support-desk',
        name: '業務ヘルプデスク',
        headcount: 110,
        currentPain:
          '顧客ごとに回答テンプレートとエスカレーション基準が異なり、新人が判断に迷う。',
        aiUseCases: [
          '問い合わせ要約',
          '顧客別回答テンプレート提案',
          'エスカレーション要否判定',
        ],
      },
    ],
    documentCategories: [
      {
        id: 'invoice',
        label: '請求書',
        examples: ['月次請求書', '立替精算明細', '支払依頼書'],
        retentionNote: '会計監査対応のため7年保管を想定',
        requiresHumanReview: true,
      },
      {
        id: 'contract',
        label: '契約書',
        examples: ['NDA', '業務委託契約', '基本取引契約'],
        retentionNote: '契約終了後も検索できる状態を維持',
        requiresHumanReview: true,
      },
      {
        id: 'support-ticket',
        label: '問い合わせ',
        examples: ['操作質問', '請求内容照会', '契約条件確認'],
        retentionNote: 'ナレッジ化した回答は更新日を明示',
        requiresHumanReview: false,
      },
    ],
    businessRules: [
      {
        id: 'invoice-approval-300k',
        type: 'approval-threshold',
        title: '30万円以上の支払はマネージャー承認',
        description:
          '請求金額が30万円以上、または初回取引先への支払は経理BPO部マネージャーの承認を必須とする。',
        ownerDepartment: 'accounting-bpo',
        productFoundationHint:
          '金額しきい値、初回取引先フラグ、承認者ロールは顧客設定として共通化できる。',
      },
      {
        id: 'contract-legal-review',
        type: 'required-evidence',
        title: '再委託・個人情報条項は法務確認',
        description:
          '再委託、個人情報、損害賠償上限、反社条項に差分がある場合はAI回答だけで完了させない。',
        ownerDepartment: 'contract-review',
        productFoundationHint:
          '要注意条項の辞書と人間レビュー理由の表示は契約レビュー機能として共通化できる。',
      },
      {
        id: 'support-escalation-vip',
        type: 'escalation',
        title: '重要顧客の請求照会は当日中に責任者確認',
        description:
          '重要顧客からの請求金額、契約条件、解約に関する問い合わせは、回答前に責任者確認を行う。',
        ownerDepartment: 'support-desk',
        productFoundationHint:
          '問い合わせ分類、重要度、SLA、承認者の組み合わせはサポート用途にも契約用途にも使える。',
      },
    ],
    workflowOpportunities: [
      {
        id: 'shinonome-invoice-workbench',
        title: '請求書確認ワークベンチ',
        module: 'approval-assist',
        priority: 'high',
        userRole: '経理BPO担当者',
        currentProcess:
          'PDFと顧客別ルール表を別画面で見比べ、迷ったらSlackでベテランに確認する。',
        desiredOutcome:
          '請求書の要約、適用ルール、承認要否、不足証憑を1画面で確認できる。',
        candidateSlice:
          'Shinonome向けに請求書チェックのUI、ルール表示、レビュー理由を実装する。',
        commonizationSignal:
          '金額しきい値、証憑不足、承認ロールは他社にも出るため設定モデル化しやすい。',
      },
      {
        id: 'shinonome-contract-risk',
        title: '契約一次確認の要注意条項表示',
        module: 'document-review',
        priority: 'medium',
        userRole: '契約支援担当者',
        currentProcess:
          '契約テンプレートとの差分を手作業で確認し、法務確認が必要な理由をメモする。',
        desiredOutcome:
          'AIが条項候補を抽出し、法務確認が必要な理由と確認観点を提示する。',
        candidateSlice:
          '契約カテゴリ、要注意条項、レビュー必須フラグを共通データとして扱う。',
        commonizationSignal:
          '契約レビューは他業種にもあるが、条項セットと閾値は顧客別に差し替える必要がある。',
      },
      {
        id: 'shinonome-support-response',
        title: '問い合わせ回答テンプレート推薦',
        module: 'customer-support',
        priority: 'medium',
        userRole: 'ヘルプデスク担当者',
        currentProcess:
          '顧客別FAQ、過去チケット、担当者メモを検索して回答文を作っている。',
        desiredOutcome:
          '問い合わせ分類と顧客重要度に応じて回答案とエスカレーション要否を提示する。',
        candidateSlice:
          '回答方針、SLA、重要顧客フラグをポータル設定として表現する。',
        commonizationSignal:
          'サポート返信の文面は顧客別だが、分類・SLA・人間確認の構造は共通化しやすい。',
      },
    ],
    commonizationNotes: [
      'ルール値は顧客ごとに違うが、ルールの種類と表示方法は共通化できる。',
      'AI提案をそのまま確定しない領域では、レビュー必須理由の説明UIが重要。',
      '部門、文書カテゴリ、ワークフロー機能の関係を設定として持つと拡張しやすい。',
    ],
  },
  {
    id: 'minato',
    name: 'みなと製作所',
    industry: '産業機械部品メーカー',
    employeeCount: 260,
    summary:
      '製造現場と品質保証部門で、作業標準書、検査記録、不具合報告を横断検索したい。',
    implementationRole: 'reference',
    portalGoals: [
      '品質不具合の一次調査を速くする',
      '標準書と検査記録を同じポータルで検索する',
      '重大不具合は人間レビューを必須にする',
    ],
    departments: [
      {
        id: 'quality-assurance',
        name: '品質保証部',
        headcount: 38,
        currentPain:
          '過去の不具合報告と検査記録が別管理で、類似事例の調査に時間がかかる。',
        aiUseCases: ['類似不具合検索', '検査観点の抽出', '是正処置案のドラフト'],
      },
      {
        id: 'production',
        name: '製造部',
        headcount: 150,
        currentPain:
          '作業標準書の改訂履歴を追いづらく、現場問い合わせが品質保証部に集中する。',
        aiUseCases: ['作業標準書Q&A', '改訂差分要約', '問い合わせ分類'],
      },
    ],
    documentCategories: [
      {
        id: 'work-standard',
        label: '作業標準書',
        examples: ['組立手順書', '設備点検手順', '安全確認表'],
        retentionNote: '最新版と過去版の区別が必要',
        requiresHumanReview: false,
      },
      {
        id: 'defect-report',
        label: '不具合報告',
        examples: ['市場不具合報告', '工程内不良報告'],
        retentionNote: '是正処置と紐づけて保管',
        requiresHumanReview: true,
      },
    ],
    businessRules: [
      {
        id: 'critical-defect-escalation',
        type: 'escalation',
        title: '安全・法規に関わる不具合は即時エスカレーション',
        description:
          '安全性、法規制、主要顧客ライン停止に関わる不具合は品質保証部長へ即時通知する。',
        ownerDepartment: 'quality-assurance',
        productFoundationHint:
          '重大度、影響範囲、通知先ロールは汎用エスカレーション設定として扱える。',
      },
    ],
    workflowOpportunities: [
      {
        id: 'minato-quality-search',
        title: '品質ナレッジ横断検索',
        module: 'knowledge-search',
        priority: 'high',
        userRole: '品質保証担当者',
        currentProcess:
          'ファイルサーバー、表計算管理台帳、メール添付を個別に探している。',
        desiredOutcome:
          '不具合内容から類似事例、関連標準書、確認観点をまとめて見つける。',
        candidateSlice:
          '参照用途。文書カテゴリと重大度ルールがShinonomeの契約・請求チェックと似ているか判断する。',
        commonizationSignal:
          '文書カテゴリ、重要度、人間レビュー必須理由は業種を超えて共通化できる。',
      },
    ],
    commonizationNotes: [
      '文書検索とレビュー必須フラグはShinonomeにも共通する。',
      '製造固有の不具合分類は顧客設定に閉じるべき。',
    ],
  },
  {
    id: 'aoba',
    name: '青葉クリニックグループ',
    industry: '地域医療・クリニック運営',
    employeeCount: 180,
    summary:
      '複数クリニックで院内規程、患者問い合わせ、予約変更ルールを統一的に確認したい。',
    implementationRole: 'reference',
    portalGoals: [
      '受付スタッフが院内ルールをすぐ確認できる',
      '医療判断をAIに任せず、事務手続きに限定する',
      '患者情報を扱う可能性がある操作は注意表示する',
    ],
    departments: [
      {
        id: 'reception',
        name: '受付事務',
        headcount: 75,
        currentPain:
          '予約変更、紹介状、保険証確認などのルールが院ごとに微妙に違い、回答が揺れる。',
        aiUseCases: ['事務手続きQ&A', '患者向け回答文ドラフト', '院別ルール確認'],
      },
      {
        id: 'operations',
        name: '運営管理部',
        headcount: 28,
        currentPain:
          '規程改定時に各院の受付オペレーションへ反映されたか追跡しづらい。',
        aiUseCases: ['規程差分要約', '周知タスク生成', '未確認拠点の抽出'],
      },
    ],
    documentCategories: [
      {
        id: 'clinic-policy',
        label: '院内規程',
        examples: ['予約変更規程', '紹介状受付手順', '個人情報取扱規程'],
        retentionNote: '改定日と対象院を明示',
        requiresHumanReview: true,
      },
      {
        id: 'patient-faq',
        label: '患者問い合わせFAQ',
        examples: ['予約変更', '持ち物確認', '診療時間案内'],
        retentionNote: '医療判断を含む回答は禁止',
        requiresHumanReview: false,
      },
    ],
    businessRules: [
      {
        id: 'medical-advice-prohibited',
        type: 'response-policy',
        title: '医療判断に関わる回答は禁止',
        description:
          '症状、診断、薬、治療方針に関する質問はAI回答で完結させず、医師または看護師へ案内する。',
        ownerDepartment: 'reception',
        productFoundationHint:
          'AIで回答してよい範囲、禁止領域、エスカレーション先は安全設定として共通化できる。',
      },
    ],
    workflowOpportunities: [
      {
        id: 'aoba-reception-policy',
        title: '受付ルール確認アシスト',
        module: 'risk-check',
        priority: 'high',
        userRole: '受付スタッフ',
        currentProcess:
          '院内マニュアルとチャット履歴を探して、回答してよい範囲を確認している。',
        desiredOutcome:
          '問い合わせ内容に対し、回答可能範囲、禁止事項、エスカレーション先を提示する。',
        candidateSlice:
          '参照用途。Shinonomeの問い合わせ対応と同じく、回答方針と禁止領域のモデル化を検討する。',
        commonizationSignal:
          '禁止領域、人間確認、回答テンプレートはサポート業務の共通基盤になりやすい。',
      },
    ],
    commonizationNotes: [
      '安全上の禁止領域とエスカレーションはShinonomeの契約・重要顧客対応と構造が似ている。',
      '医療固有の表現や判断基準は共通UIに埋め込まず設定で分離する。',
    ],
  },
]

export const primaryCustomer = customers.find(
  (customer) => customer.implementationRole === 'primary-target',
)

export const referenceCustomers = customers.filter(
  (customer) => customer.implementationRole === 'reference',
)
