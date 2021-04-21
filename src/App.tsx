import React from 'react';
import _ from 'lodash';
import { DateTime, Duration } from 'luxon';
import { Line } from '@ant-design/charts';
import './App.css';
import { convertFromModifiersToDateMoneyTimeline } from './BalanceSimulator';

function App() {
  const days = _.range(-1, 5).map(i => DateTime.fromISO("2017-05-14").plus({ days: i }));
  const groupNames = ["A", "A+B"];
  const set = convertFromModifiersToDateMoneyTimeline(
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
    days,
    [
      ['a'],
      ['a', 'b'],
    ]
  )

  const data: { day: string, group: string, value: number }[] = [];

  _.initial(days).forEach((day, i) => {
    groupNames.forEach((group, j) => {
      data.push({ day: day.toISODate(), group: group, value: set[j][i] });
    })
  })


  return (
    <div className="App">
      <header className="App-header">
        <Line data={data} xField='day' yField='value' seriesField='group'/>
      </header>
    </div>
  );
}

export default App;