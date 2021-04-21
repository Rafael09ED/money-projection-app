import React from 'react';
import { } from '@testing-library/react';
import { DateTime, Duration } from "luxon";
import _ from 'lodash';
import { shouldModifierBeCounted, MoneyModifier, calcualteMoneySteps, convertFromModifiersToDateMoneyTimeline } from './BalanceSimulator';

test('shouldModifierBeCounted', () => {
  expect(shouldModifierBeCounted(<MoneyModifier><any>{ tags: [] }, [])).toBe(true);
  expect(shouldModifierBeCounted(<MoneyModifier><any>{ tags: [] }, ['a'])).toBe(true);
  expect(shouldModifierBeCounted(<MoneyModifier><any>{ tags: ['a'] }, [])).toBe(false);
  expect(shouldModifierBeCounted(<MoneyModifier><any>{ tags: ['a'] }, ['a'])).toBe(true);
  expect(shouldModifierBeCounted(<MoneyModifier><any>{ tags: ['a'] }, ['a', 'b'])).toBe(true);
  expect(shouldModifierBeCounted(<MoneyModifier><any>{ tags: ['a', 'c'] }, ['a', 'b'])).toBe(true);
  expect(shouldModifierBeCounted(<MoneyModifier><any>{ tags: ['c'] }, ['a', 'b'])).toBe(false);
});

test('calcualteMoneySteps', () => {
  expect(
    calcualteMoneySteps(
      1,
      DateTime.fromISO("2017-05-15"),
      DateTime.fromISO("2017-05-15"),
      Duration.fromISO('P1D'),
      [DateTime.fromISO("2017-05-14"), DateTime.fromISO("2017-05-15"), DateTime.fromISO("2017-05-16"), DateTime.fromISO("2017-05-17")]
    )
  ).toStrictEqual([0, 1, 1]);
  expect(
    calcualteMoneySteps(
      1,
      DateTime.fromISO("2017-05-15"),
      DateTime.fromISO("2017-05-20"),
      Duration.fromISO('P1D'),
      [DateTime.fromISO("2017-05-14"), DateTime.fromISO("2017-05-15"), DateTime.fromISO("2017-05-16"), DateTime.fromISO("2017-05-17")]
    )
  ).toStrictEqual([0, 1, 2]);
});

test('convertFromModifiersToDateMoneyTimeline', async () => {
  expect(
    convertFromModifiersToDateMoneyTimeline(
      [
        {
          cost: 1,
          startDate: DateTime.fromISO("2017-05-14"),
          endDate: DateTime.fromISO("2017-05-14"),
          frequency: Duration.fromISO('P1D'),
          tags: ["a"],
          title: "testA"
        },
        {
          cost: 10,
          startDate: DateTime.fromISO("2017-05-16"),
          endDate: DateTime.fromISO("2017-05-16"),
          frequency: Duration.fromISO('P1D'),
          tags: ["b"],
          title: "testb"
        }
      ],
      _.range(-1, 5).map(i => DateTime.fromISO("2017-05-14").plus({ days: i })),
      [
        ['a'],
        ['a', 'b'],
      ]
    )
  ).toStrictEqual([[0, 1, 1, 1, 1], [0, 1, 1, 11, 11]]);
  expect(
    convertFromModifiersToDateMoneyTimeline(
      [
        {
          cost: 1,
          startDate: DateTime.fromISO("2017-05-14"),
          endDate: DateTime.fromISO("2017-05-14"),
          frequency: Duration.fromISO('P1D'),
          tags: ["a"],
          title: "testA"
        },
        {
          cost: 10,
          startDate: DateTime.fromISO("2017-05-16"),
          endDate: DateTime.fromISO("2017-05-17"),
          frequency: Duration.fromISO('P1D'),
          tags: ["b"],
          title: "testb"
        }
      ],
      _.range(-1, 5).map(i => DateTime.fromISO("2017-05-14").plus({ days: i })),
      [
        ['a'],
        ['a', 'b'],
      ]
    )
  ).toStrictEqual([[0, 1, 1, 1, 1], [0, 1, 1, 11, 11]]);
  expect(
    convertFromModifiersToDateMoneyTimeline(
      [
        {
          cost: 1,
          startDate: DateTime.fromISO("2017-05-14"),
          endDate: DateTime.fromISO("2017-05-14"),
          frequency: Duration.fromISO('P1D'),
          tags: ["a"],
          title: "testA"
        },
        {
          cost: 10,
          startDate: DateTime.fromISO("2017-05-11"),
          endDate: DateTime.fromISO("2017-05-14"),
          frequency: Duration.fromISO('P1D'),
          tags: ["b"],
          title: "testb"
        }
      ],
      _.range(-1, 5).map(i => DateTime.fromISO("2017-05-14").plus({ days: i })),
      [
        ['a'],
        ['a', 'b'],
      ]
    )
  ).toStrictEqual([[0, 1, 1, 1, 1], [30, 31, 31, 31, 31]]);
}, 10000);