import * as mocha from 'mocha';
import { expect } from 'chai';

describe('incomptable versions', () => {
    it('does not work with version 7.7.2', () => {
        expect(process.version).not.to.equal('v7.7.2');
    });
});