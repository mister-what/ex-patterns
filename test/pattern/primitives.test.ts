/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai';

import { match, _ } from '../../src';

describe('the match function: primitives', () => {
  it('should match two numbers if they are equal', () => {
    const [status, matches] = match(1, 1);
    expect(status).to.be.true;
  });

  it('should not match two numbers if they are not equal', () => {
    const [status, matches] = match(1, 2);
    expect(status).to.be.false;
  });

  it('should match a placeholder with a number', () => {
    const [status, matches] = match(_, 2);
    expect(status).to.be.true;
  });

  it('should match two booleans if they are equal', () => {
    const [status, matches] = match(true, true);
    expect(status).to.be.true;
  });

  it('should not match two booleans if they are not equal', () => {
    const [status, matches] = match(true, false);
    expect(status).to.be.false;
  });

  it('should not match falsy values with booleans', () => {
    const [status, matches] = match(0, false);
    expect(status).to.be.false;
  });

  it('should not match booleans with falsy values', () => {
    const [status, matches] = match(false, 0);
    expect(status).to.be.false;
  });

  it('should match two strings if they are equal', () => {
    const [status, matches] = match('hello', 'hello');
    expect(status).to.be.true;
  });

  it('should not match two strings if they are not equal', () => {
    const [status, matches] = match('hello', 'world');
    expect(status).to.be.false;
  });

  it('should match a placeholder with a string', () => {
    const [status, matches] = match(_, 'hello');
    expect(status).to.be.true;
  });

  it('should match on null', () => {
    const [status, matches] = match(null, null);
    expect(status).to.be.true;
  });

  it('should match a placeholder with null', () => {
    const [status, matches] = match(_, null);
    expect(status).to.be.true;
  });

  it('should match on undefined', () => {
    const [status, matches] = match(undefined, undefined);
    expect(status).to.be.true;
  });

  it('should not match null and undefined', () => {
    let [status, matches] = match(null, undefined);
    expect(status).to.be.false;

    [status, matches] = match(null, undefined);
    expect(status).to.be.false;
  });

  it('should match a placeholder with null', () => {
    const [status, matches] = match(_, undefined);
    expect(status).to.be.true;
  });

  it('should match two BigInts if they are equal', () => {
    const [status, matches] = match(BigInt(1), BigInt(1));
    expect(status).to.be.true;
  });

  it('should not match two BigInts if they are not equal', () => {
    const [status, matches] = match(BigInt(1), BigInt(2));
    expect(status).to.be.false;
  });

  it('should match a placeholder with a BigInt', () => {
    const [status, matches] = match(_, BigInt(1));
    expect(status).to.be.true;
  });
});
