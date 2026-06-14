export type CustomerId = 'shinonome' | 'minato' | 'aoba'

export type CustomerPriority = 'high' | 'medium' | 'low'

export type PortalModule =
  | 'knowledge-search'
  | 'workflow-drafting'
  | 'approval-assist'
  | 'document-review'
  | 'customer-support'
  | 'risk-check'

export type BusinessRuleType =
  | 'approval-threshold'
  | 'document-category'
  | 'escalation'
  | 'required-evidence'
  | 'response-policy'

export interface Department {
  id: string
  name: string
  headcount: number
  currentPain: string
  aiUseCases: string[]
}

export interface BusinessRule {
  id: string
  type: BusinessRuleType
  title: string
  description: string
  ownerDepartment: string
  productFoundationHint: string
}

export interface DocumentCategory {
  id: string
  label: string
  examples: string[]
  retentionNote: string
  requiresHumanReview: boolean
}

export interface WorkflowOpportunity {
  id: string
  title: string
  module: PortalModule
  priority: CustomerPriority
  userRole: string
  currentProcess: string
  desiredOutcome: string
  candidateSlice: string
  commonizationSignal: string
}

export interface CustomerCase {
  id: CustomerId
  name: string
  industry: string
  employeeCount: number
  summary: string
  implementationRole: 'primary-target' | 'reference'
  portalGoals: string[]
  departments: Department[]
  documentCategories: DocumentCategory[]
  businessRules: BusinessRule[]
  workflowOpportunities: WorkflowOpportunity[]
  commonizationNotes: string[]
}
