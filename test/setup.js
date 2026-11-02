import { chai } from 'vitest';
import { cleanup } from '@testing-library/react';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
globalThis.sinon = sinon;

afterEach(() => {
	cleanup();
});
