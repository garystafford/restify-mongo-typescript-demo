import { expect } from 'chai';
import 'mocha';
import { server } from '../../../app/app';
import * as supertest from 'supertest';
import { logger } from '../../../app/services/logger';
import * as sinon from 'sinon';


describe('sample route controller', () => {

    const sandbox = sinon.sandbox.create();
    let logInfoStub: sinon.SinonStub;

    beforeEach(() => {
        logInfoStub = sandbox.stub(logger, 'info');
    });

    afterEach(() => {
        sandbox.restore();
    });

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
                    expect(logInfoStub.callCount).to.equal(1);
                    done();
                    server.close();
                }
            });
    });
});