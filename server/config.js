import path from 'path'

const join = path.join

export default {
  path: {
    context: join(__dirname, 'context'),
    middlewares: join(__dirname, 'middlewares'),
    render: join(__dirname, 'controllers'),
    templates: join(__dirname, 'templates'),
    datasources: join(__dirname, 'datasources'),
    pages: join(__dirname, '..', 'client', 'bundles'),
  },
  mock: true,
  port: 8888,
}
