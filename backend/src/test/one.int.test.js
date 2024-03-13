const request = require('supertest')
const app = require('../app')
const server = app.listen()

afterAll(() => server.close())

describe('IniController', () => {
  describe('ini success', () => {
    test('should return 200', async () => {
      const response = await request(server).get('/api/ini')

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('server okey');
    })
  })
})
