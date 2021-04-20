import React from 'react';
import { } from '@testing-library/react';
import { shouldModifierBeCounted, MoneyModifier } from './BalanceSimulator';

test('shouldModifierBeCounted', () => {
  expect(shouldModifierBeCounted(<MoneyModifier><any>{ tags: [] }, [])).toBe(true);
  expect(shouldModifierBeCounted(<MoneyModifier><any>{ tags: [] }, ['a'])).toBe(true);
  expect(shouldModifierBeCounted(<MoneyModifier><any>{ tags: ['a'] }, [])).toBe(false);
  expect(shouldModifierBeCounted(<MoneyModifier><any>{ tags: ['a'] }, ['a'])).toBe(true);
  expect(shouldModifierBeCounted(<MoneyModifier><any>{ tags: ['a'] }, ['a', 'b'])).toBe(true);
  expect(shouldModifierBeCounted(<MoneyModifier><any>{ tags: ['a', 'c'] }, ['a', 'b'])).toBe(true);
  expect(shouldModifierBeCounted(<MoneyModifier><any>{ tags: ['c'] }, ['a', 'b'])).toBe(false);
});
