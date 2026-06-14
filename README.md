# ELITH LOCK: FDE Challenge 2026

This is the public starter repository for the ELITH LOCK: FDE Challenge.

The goal is to show how you think and build as an FDE: understand a concrete customer problem, make a scoped product improvement, and decide what should become reusable product foundation.

## Scenario

ELITH already has an existing product called **AI業務支援ポータル**. It is a configurable portal for companies that want to use AI in daily operations, such as internal Q&A, document search, workflow drafting, approval support, and business-rule guidance.

This challenge is **not** asking you to build a customer-specific product from scratch. You are joining an existing product team and improving the product through one customer implementation.

Your main target customer is **東雲ビジネスサポート**. Two reference customers are included so you can judge what should stay customer-specific and what should become common product capability.

Think of this as FDE work, not a one-off contracted delivery. A good submission should solve a real slice for the primary customer while leaving the product easier to reuse for the next similar customer. If a feature only works because it hard-codes Shinonome-specific wording, thresholds, or workflows, explain why that is intentional; if the pattern appears across customers, make the reusable part explicit.

## Assignment

Implement a bounded improvement for **東雲ビジネスサポート** using the starter app and static data in this repo.

You should:

1. Improve the experience for 東雲ビジネスサポート.
2. Review the two reference customers and identify common needs.
3. Reflect common parts into the product foundation where feasible, such as shared settings, data model, UI patterns, rule definitions, document categories, triage rules, or reusable components.
4. Keep customer-specific behavior clearly separated from common product behavior.

You should **not** fully deliver three separate customer-specific products. The reference customers exist to test your commonization judgment, not to triple the implementation scope.

The expected shape is:

- Build the main improvement for 東雲ビジネスサポート.
- Use the two reference customers to challenge your design.
- Move common parts into reusable product foundation where the scope is reasonable.
- Explain what remains customer-specific and why.

Avoid treating the three customer cases as three separate implementation tickets. The important judgment is which parts of Shinonome's problem are product signals, which parts are configuration, and which parts should stay bespoke.

## Customer Data

Static customer data is provided under `src/data/`.

- `shinonome` is the primary implementation target and has the most detail.
- `minato` and `aoba` are reference customers with enough information to compare patterns and decide what should be common.

You may change or extend the data model if it helps your solution, but explain the reason in your FDE Decision Memo.

## Expected Deliverables

Submit a GitHub repository that includes:

- Working implementation in this starter app.
- Updated `README.md` with setup notes and a short explanation of your solution.
- `docs/FDE_DECISION_MEMO.md` based on `docs/FDE_DECISION_TEMPLATE.md`.
- `docs/AI_USAGE_MEMO.md` based on `docs/AI_USAGE_TEMPLATE.md`.
- Screenshots and/or a short demo video showing the implemented flow.
- GitHub repository URL.

## Submission

Public repositories are preferred.

If you use a private repository, grant access to this GitHub user:

```text
NaoyaTakashima
```

Do not include secrets, customer confidential information, private API keys, or personal credentials in the repository. Use `.env.example` for safe placeholder values only.

## Evaluation Focus

We will look for:

- Customer problem understanding and prioritization.
- A usable implementation for 東雲ビジネスサポート.
- Clear judgment about what is common across customers.
- Product-minded separation between customer configuration and shared product foundation.
- Practical use of AI tools with review, testing, and ownership.
- Concise documentation of decisions and tradeoffs.

## Getting Started

Install dependencies and run the app:

```bash
npm install
npm run dev
```

Optional local environment variables can be copied from `.env.example`:

```bash
cp .env.example .env.local
```

The starter is intentionally small. You can use local/static data only; no backend is required.

## Suggested Implementation Scope

The starter app already shows the existing product context and a placeholder **FDE Triage Workspace**. Replace the placeholder with one focused workflow for 東雲ビジネスサポート and make it feel real.

Recommended directions:

- A triage board that turns Shinonome workflow opportunities into implementation candidates.
- A rule-aware review screen for invoice, contract, or support operations.
- A customer settings model that separates Shinonome values from common rule types.
- A reusable component or data model that also works for at least one reference customer.
- An improvement candidate view that links customer pain, evidence, implementation scope, and commonization decision.

Depth and clarity matter more than breadth.

Do not spend your time building authentication, SSO, a production backend, or a full RAG system unless it directly supports your chosen slice. Local/static data is enough for this challenge.
