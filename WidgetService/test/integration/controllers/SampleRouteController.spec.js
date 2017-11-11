"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const app_1 = require("../../../app/app");
const supertest = require("supertest");
let expect = chai.expect;
describe('sample route controller', () => {
    it('should return pong', (done) => {
        supertest(app_1.api)
            .get('/api/ping')
            .end((err, response) => {
            if (err) {
                done(err);
            }
            else {
                expect(response.status).to.equal(200);
                expect(response.body).to.equal('pong');
                done();
            }
        });
    });
});
//# sourceMappingURL=SampleRouteController.spec.js.map