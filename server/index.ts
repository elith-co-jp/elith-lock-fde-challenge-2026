import express from 'express'
import { customers } from '../src/data/customers.ts'
import type { CustomerId } from '../src/types.ts'

const app = express()
const port = Number(process.env.API_PORT ?? 5174)

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    service: 'elith-lock-fde-challenge-api',
  })
})

app.get('/api/customers', (_request, response) => {
  response.json(customers)
})

app.get('/api/customers/:id', (request, response) => {
  const customer = customers.find(
    (candidate) => candidate.id === (request.params.id as CustomerId),
  )

  if (!customer) {
    response.status(404).json({
      error: 'customer_not_found',
      message: `Customer "${request.params.id}" was not found.`,
    })
    return
  }

  response.json(customer)
})

app.listen(port, () => {
  console.log(`Mock API listening on http://localhost:${port}`)
})
