import { expect } from 'chai';
import 'mocha';
import { server } from '../../../app/app';
import * as supertest from 'supertest';

describe('sample route controller', () => {

    it('should return 200', (done) => {
        supertest(server)
            .get('/api/widgets')
            .end((err: any, response: supertest.Response) => {
                if (err) {
                    done(err);
                    server.close();
                }
                else {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.equal('[]');
                    done();
                    server.close();
                }
            });
    });
});