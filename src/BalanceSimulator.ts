import { DateTime, Duration } from "luxon";
import _ from 'lodash';

type Date = DateTime;
type Tag = string;

type DeltaTime = Duration;
// interface DeltaTime {
//     unit: string,
//     amount: number
// };

interface MoneyModifier {
    title: string,
    cost: number,
    frequency: DeltaTime, // Could convert to function
    tags: Tag[],
    startDate: Date,
    endDate: Date
}

const modifierShouldBeCounted = (modifier: MoneyModifier, tagsToInclude: string[]): boolean => {
    if (modifier.tags.length <= 0) return true;
    for (let i of tagsToInclude)
        for (let j of modifier.tags)
            if (i === j)
                return true;
    return false;
}

const calcualteMoneySteps = (cost: number, startDate: Date, endDate: Date, frequency: DeltaTime, dateSteps: Date[]): number[] => {
    if (startDate > endDate) throw new Error("End Date Before Start Date");

    const answer: number[] = new Array(dateSteps.length - 1).fill(0);

    let rollingSum = 0;
    let currentDateStep = 0;

    let timePointer = startDate;

    while (timePointer < _.first(dateSteps)!){
        rollingSum += cost;
        timePointer = timePointer.plus(frequency);
    }

    while (timePointer > dateSteps[currentDateStep]) {
        currentDateStep++;
        if (currentDateStep >= answer.length)
            return answer;
    }

    while (
        (timePointer < endDate && timePointer < _.last(dateSteps)!)
        || (timePointer.equals(endDate) && timePointer.equals(startDate))
    ) {
        while (dateSteps[currentDateStep] < timePointer) {
            answer[currentDateStep] = rollingSum;
            currentDateStep++;
        }
        rollingSum += cost;
        timePointer = timePointer.plus(frequency);
    }

    for (; currentDateStep < answer.length; currentDateStep++)
        answer[currentDateStep] = rollingSum;

    return answer;
}

const getTimelineFromTagGroup = (modifiers: MoneyModifier[], dateSteps: Date[], tagsGroups: Tag[]): number[] => {
    return modifiers
        .reduce(
            (accumulator, modifier): number[] => {
                if (!modifierShouldBeCounted(modifier, tagsGroups))
                    return accumulator;

                return _.unzipWith(
                    [
                        accumulator,
                        calcualteMoneySteps(modifier.cost, modifier.startDate, modifier.endDate, modifier.frequency, dateSteps)
                    ],
                    _.add
                );
            },
            new Array(dateSteps.length - 1).fill(0) as number[]
        );
}

const convertFromModifiersToDateMoneyTimeline = (modifiers: MoneyModifier[], dateSteps: Date[], tagsGroups: Tag[][]): number[][] => {
    return tagsGroups.map((filterTags: Tag[]): number[] => getTimelineFromTagGroup(modifiers, dateSteps, filterTags));
}

export type { MoneyModifier }
export { modifierShouldBeCounted as shouldModifierBeCounted, convertFromModifiersToDateMoneyTimeline, calcualteMoneySteps };