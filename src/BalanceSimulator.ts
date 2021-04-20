import moment from 'moment'

type DeltaTime = any;
type Date = any;
type Tag = string;

interface MoneyModifier {
    title: string,
    cost: number,
    frequency: DeltaTime,
    tags: Tag[],
    startDate: Date,
    endDate: Date
}

interface TableOptions {
    startDate: Date,
    endDate: Date,
    timeDelta: DeltaTime,
    tags: Tag[][]
}

const shouldModifierBeCounted = (modifier: MoneyModifier, tagsToInclude: string[]): boolean => {
    if (modifier.tags.length <= 0) return true;
    for (let i of tagsToInclude)
        for (let j of modifier.tags)
            if (i == j)
                return true;
    return false;
}

const moneyGeneratedDurringTime = (tickStart: Date, tickEnd: Date, modifier: MoneyModifier) => {

}

//startDate: Date,    endDate: Date,    timeDelta: DeltaTime
const convertFromModifiersToDateMoneyMap = (modifiers: MoneyModifier[], dateSteps: Date[], tagsGroups: Tag[][]): number[][] => {
    return tagsGroups.map((filterTags :Tag[]): number[] => {
        
    });
}

export type { MoneyModifier, TableOptions }
export { shouldModifierBeCounted, convertFromModifiersToDateMoneyMap };