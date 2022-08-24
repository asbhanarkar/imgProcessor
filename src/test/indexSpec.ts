import app from '../index';
// import processing file from main folder
import modify from '../main/processing';
// import path library
import path from 'path';
// import supertest lirary
import supertest from 'supertest';
// supertest library that help to test api is working or not
const check = supertest(app);
//all syntax correct then test will accept
describe('get /api/images?filename=encenadaport&height=500&width=800', (): void => {
  it('test passed beacause all correct syntax', async (): Promise<void> => {
    const path = check.get(
      '/api/images?filename=encenadaport&height=500&width=800',
    );
    expect((await path).status).toBe(200);
  });
});
//
describe('get request to be true', () => {
  it('respond true with status 200', async () => {
    const path = check.get('/');
    expect((await path).status).toBe(200);
  });
});

// syntax wrong test

describe('get /api/height=500&width=800', (): void => {
  it('test accept', async (): Promise<void> => {
    const path = check.get('/api/height=500&width=800');
    expect((await path).status).toBe(404);
  });
});
// resize test case but promise is wrong
describe('resizing theimage', (): void => {
  it('promise is wrong ', async (): Promise<void> => {
    await expectAsync(
      modify(
        200,
        400,
        `${path.resolve(__dirname, `./../../img/original/fjord.jpg`)}`,
        `${path.resolve(__dirname, `./../../img/modified/fjord.jpg`)}`,
      ),
    ).toBeRejected();
  });
});
//we cannot use negative img size
describe('get /api/image?filename=icelandwaterfall&height=150&width=-150', (): void => {
  it('image sixe not negative thats why rejects', async (): Promise<void> => {
    const path = check.get(
      '/api/image?filename=icelandwaterfall&height=150&width=-150',
    );
    expect((await path).status).toBe(404);
  });
});

describe('get request /api/images', () => {
  it('response with 404 without parameters', async (): Promise<void> => {
    const path = check.get('/api/images');
    expect((await path).status).toBe(404);
  });
});
