import test from 'ava';
import pify from 'pify';

import m from 'credential-plus';

m.install(require('.'));

test('should verify a correct password with bcrypt', async t => {
  const hash = await pify(m.hash)('hello world', {func: 'bcrypt'});
  t.true(typeof hash === 'string');
  t.true(await pify(m.verify)(hash, 'hello world'));
});

test('should not verify a wrong password with bcrypt', async t => {
  const hash = await pify(m.hash)('Hello world', {func: 'bcrypt'});
  t.true(typeof hash === 'string');
  t.false(await pify(m.verify)(hash, 'hello world'));
});
