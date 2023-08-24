const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('products.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

// Tùy chỉnh middleware để xử lý yêu cầu tìm kiếm
server.use((req: any, res: any, next: any) => {
  if (req.query.q) {
    const searchTerm = req.query.q.toLowerCase()
    const products = router.db.get('products').value()
    const searchResults = products.filter((product: any) => product.name.toLowerCase().includes(searchTerm))
    res.json(searchResults)
  } else {
    next()
  }
})

server.use(router)

server.listen(3001, () => {
  console.log('JSON Server is running on port 3001')
})
