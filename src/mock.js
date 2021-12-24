import { Server } from 'miragejs'
import { nanoid } from '@reduxjs/toolkit'

const getTiming = () => parseInt(localStorage.getItem('request:delay'), 10) || 100
const createQuestion = (data = {}) => ({
  id: nanoid(),
  question: {
    'type': 'doc',
    'content': [
      {
        'type': 'heading',
        'attrs': {
          'level': 1
        },
        'content': [
          {
            'type': 'text',
            'text': 'How to add a question?'
          }
        ]
      },
      {
        'type': 'paragraph',
        'content': [
          {
            'type': 'text',
            'text': 'Add your question and answer then click on the '
          },
          {
            'type': 'text',
            'marks': [
              {
                'type': 'bold'
              }
            ],
            'text': 'Create question'
          },
          {
            'type': 'text',
            'text': ' button.'
          }
        ]
      }
    ]
  },
  fullText: 'How to add a question? Add your question and answer then click on the Create question button.',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...data
})

export function mockServer({ environment = 'development' } = {}) {
  let server = new Server({
    environment,
    seeds(server) {
      server.db.loadData({
        questions: [createQuestion()],
      })
    },
    routes() {
      this.namespace = 'v1'
      this.get('/questions', (schema) => {
        server.timing = 0
        return schema.db.questions
      })

      this.post('/questions/delete-list', (schema, request) => {
        server.timing = getTiming()
        const ids = JSON.parse(request.requestBody)
        return schema.db.questions.remove(ids)
      })

      this.post('/question', (schema, request) => {
        server.timing = getTiming()
        const body = JSON.parse(request.requestBody)
        return schema.db.questions.firstOrCreate(createQuestion(body))
      })

      this.put('/question/:id', (schema, request) => {
        server.timing = getTiming()
        const body = JSON.parse(request.requestBody)
        return schema.db.questions.update(request.params.id, {
          ...body,
          updatedAt: new Date().toISOString()
        })
      })

      this.pretender.handledRequest = (verb, path, request) => {
        server.timing && console.log(`%c [Mock API] Your server responded to ${path} with ${server.timing} milliseconds delay`, 'color:deeppink')
      }
    },
  })

  return server
}
