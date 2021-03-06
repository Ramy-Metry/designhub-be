const request = require('supertest');
const server = require('../server');
const db = require('../data/dbConfig');
const go = require('../resources/utils/crud');

const ENDPOINT = '/api/v1/comments';

beforeEach(async () => {
  // Re-seed before all tests to ensure that each test will work with a clean set of data
  await db.seed.run();
});
afterAll(async () => {
  // Re-seed after all tests in this test suite to ensure that the next test suite will work with a clean set of data
  await db.seed.run();
  await db.destroy(); // Necessary to prevent connections from not closing (which could eventually clog the Postgres database if left unchecked)
});

describe('commentsRouter', () => {
  describe('POST /photo createPhotoComment', () => {
    it('should return 400 if imageId is not attached to body', () => {
      return request(server)
        .post(`${ENDPOINT}/photo`)
        .send({})
        .then(res => {
          expect(res.status).toBe(400);
        });
    });

    it('should return 400 if userId is not attached to body', () => {
      return request(server)
        .post(`${ENDPOINT}/photo`)
        .send({
          imageId: 1
        })
        .then(res => {
          expect(res.status).toBe(400);
        });
    });

    it('should return 400 if text is not attached to body', () => {
      return request(server)
        .post(`${ENDPOINT}/photo`)
        .send({
          imageId: 1,
          userId: 1
        })
        .then(res => {
          expect(res.status).toBe(400);
        });
    });

    it('should return 400 if username is not attached to body', () => {
      return request(server)
        .post(`${ENDPOINT}/photo`)
        .send({
          imageId: 1,
          userId: 1,
          text: 'Test comment'
        })
        .then(res => {
          expect(res.status).toBe(400);
        });
    });

    it('creates the comment successfully', () => {
      return request(server)
        .post(`${ENDPOINT}/photo`)
        .send({
          imageId: 1,
          userId: 1,
          text: 'Test comment',
          username: 'eriklambert'
        })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe('GET /photo/:id getCommentsByImageId', () => {
    it('sends back comments successfully', () => {

      request(server)
        .get(`${ENDPOINT}/photo/1`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe('POST /project createProjectComment', () => {
    it('returns 400 if projectId is not attached to body', () => {
      request(server)
      .post(`${ENDPOINT}/project`)
      .send({})
      .then(res => {
        expect(res.status).toBe(400);
      })
    })

    it('returns 400 if userId is not attached to body', () => {
      request(server)
      .post(`${ENDPOINT}/project`)
      .send({
        projectId: 1,
      })
      .then(res => {
        expect(res.status).toBe(400);
      })
    })

    it('returns 400 if text is not attached to body', () => {
      request(server)
      .post(`${ENDPOINT}/project`)
      .send({
        projectId: 1,
        userId: 1
      })
      .then(res => {
        expect(res.status).toBe(400);
      })
    })

    it('returns 400 if username is not attached to body', () => {
      request(server)
      .post(`${ENDPOINT}/project`)
      .send({
        projectId: 1,
        userId: 1,
        text: 'This is a project comment'
      })
      .then(res => {
        expect(res.status).toBe(400);
      })
    })

    it(`creates the comment successfully`, () => {
      request(server)
      .post(`${ENDPOINT}/project`)
      .send({
        projectId: 1,
        userId: 1,
        text: 'This is a project comment',
        username: 'eriklambert'
      })
      .then(res => {
        expect(res.status).toBe(201);
      })
    })
  })

  describe('GET /project/:id getCommentsByProjectId', () => {
    it('sends back comments successfully', () => {
      request(server)
      .get(`${ENDPOINT}/project/1`)
      .then(res => {
        expect(res.status).toBe(200);
      })
    })
  })
});
