
import type { Question } from './types';
import { AssessmentType } from './types';

export const BDI_QUESTIONS: Question[] = [
    { id: 1, text: "Sadness", options: [
        { text: "I do not feel sad.", score: 0 },
        { text: "I feel sad much of the time.", score: 1 },
        { text: "I am sad all the time.", score: 2 },
        { text: "I am so sad or unhappy that I can't stand it.", score: 3 }
    ]},
    { id: 2, text: "Pessimism", options: [
        { text: "I am not discouraged about my future.", score: 0 },
        { text: "I feel more discouraged about my future than I used to be.", score: 1 },
        { text: "I do not expect things to work out for me.", score: 2 },
        { text: "I feel my future is hopeless and will only get worse.", score: 3 }
    ]},
    { id: 3, text: "Past Failure", options: [
        { text: "I do not feel like a failure.", score: 0 },
        { text: "I have failed more than I should have.", score: 1 },
        { text: "As I look back, I see a lot of failures.", score: 2 },
        { text: "I feel I am a total failure as a person.", score: 3 }
    ]},
    { id: 4, text: "Loss of Pleasure", options: [
        { text: "I get as much pleasure as I ever did from the things I enjoy.", score: 0 },
        { text: "I don't enjoy things as much as I used to.", score: 1 },
        { text: "I get very little pleasure from the things I used to enjoy.", score: 2 },
        { text: "I can't get any pleasure from the things I used to enjoy.", score: 3 }
    ]},
    { id: 5, text: "Guilty Feelings", options: [
        { text: "I don't feel particularly guilty.", score: 0 },
        { text: "I feel guilty over many things I have done or should have done.", score: 1 },
        { text: "I feel quite guilty most of the time.", score: 2 },
        { text: "I feel guilty all of the time.", score: 3 }
    ]},
    { id: 6, text: "Punishment Feelings", options: [
        { text: "I don't feel I am being punished.", score: 0 },
        { text: "I feel I may be punished.", score: 1 },
        { text: "I expect to be punished.", score: 2 },
        { text: "I feel I am being punished.", score: 3 }
    ]},
    { id: 7, text: "Self-Dislike", options: [
        { text: "I feel the same about myself as ever.", score: 0 },
        { text: "I have lost confidence in myself.", score: 1 },
        { text: "I am disappointed in myself.", score: 2 },
        { text: "I dislike myself.", score: 3 }
    ]},
    { id: 8, text: "Self-Criticalness", options: [
        { text: "I don't criticize or blame myself more than usual.", score: 0 },
        { text: "I am more critical of myself than I used to be.", score: 1 },
        { text: "I criticize myself for all of my faults.", score: 2 },
        { text: "I blame myself for everything bad that happens.", score: 3 }
    ]},
    { id: 9, text: "Suicidal Thoughts or Wishes", options: [
        { text: "I don't have any thoughts of killing myself.", score: 0 },
        { text: "I have thoughts of killing myself, but I would not carry them out.", score: 1 },
        { text: "I would like to kill myself.", score: 2 },
        { text: "I would kill myself if I had the chance.", score: 3 }
    ]},
    { id: 10, text: "Crying", options: [
        { text: "I don't cry any more than I used to.", score: 0 },
        { text: "I cry more than I used to.", score: 1 },
        { text: "I cry over every little thing.", score: 2 },
        { text: "I feel like crying, but I can't.", score: 3 }
    ]},
    { id: 11, text: "Agitation", options: [
        { text: "I am no more restless or wound up than usual.", score: 0 },
        { text: "I feel more restless or wound up than usual.", score: 1 },
        { text: "I am so restless or agitated that it's hard to stay still.", score: 2 },
        { text: "I am so restless or agitated that I have to keep moving or doing something.", score: 3 }
    ]},
    { id: 12, text: "Loss of Interest", options: [
        { text: "I have not lost interest in other people or activities.", score: 0 },
        { text: "I am less interested in other people or things than before.", score: 1 },
        { text: "I have lost most of my interest in other people and have little feeling for them.", score: 2 },
        { text: "I have lost all of my interest in other people and don't care about them at all.", score: 3 }
    ]},
    { id: 13, text: "Indecisiveness", options: [
        { text: "I make decisions about as well as ever.", score: 0 },
        { text: "I find it more difficult to make decisions than usual.", score: 1 },
        { text: "I have much greater difficulty in making decisions than I used to.", score: 2 },
        { text: "I can't make any decisions at all anymore.", score: 3 }
    ]},
    { id: 14, text: "Worthlessness", options: [
        { text: "I do not feel I am worthless.", score: 0 },
        { text: "I don't consider myself as worthwhile and useful as I used to.", score: 1 },
        { text: "I feel more worthless as compared to other people.", score: 2 },
        { text: "I feel utterly worthless.", score: 3 }
    ]},
    { id: 15, text: "Loss of Energy", options: [
        { text: "I have as much energy as ever.", score: 0 },
        { text: "I have less energy than I used to have.", score: 1 },
        { text: "I don't have enough energy to do very much.", score: 2 },
        { text: "I don't have enough energy to do anything.", score: 3 }
    ]},
    { id: 16, text: "Changes in Sleeping Pattern", options: [
        { text: "I have not experienced any change in my sleeping pattern.", score: 0 },
        { text: "I sleep somewhat more or less than usual.", score: 1 },
        { text: "I sleep a lot more or less than usual.", score: 2 },
        { text: "I sleep most of the day or I wake up 1-2 hours early and can't get back to sleep.", score: 3 }
    ]},
    { id: 17, text: "Irritability", options: [
        { text: "I am no more irritable than usual.", score: 0 },
        { text: "I am more irritable than usual.", score: 1 },
        { text: "I am much more irritable than usual.", score: 2 },
        { text: "I am irritable all the time.", score: 3 }
    ]},
    { id: 18, text: "Changes in Appetite", options: [
        { text: "I have not experienced any change in my appetite.", score: 0 },
        { text: "My appetite is somewhat less or greater than usual.", score: 1 },
        { text: "My appetite is much less or greater than usual.", score: 2 },
        { text: "I have no appetite at all or I crave food all the time.", score: 3 }
    ]},
    { id: 19, text: "Concentration Difficulty", options: [
        { text: "I can concentrate as well as ever.", score: 0 },
        { text: "I can't concentrate as well as usual.", score: 1 },
        { text: "It's hard to keep my mind on anything for very long.", score: 2 },
        { text: "I find I can't concentrate on anything.", score: 3 }
    ]},
    { id: 20, text: "Tiredness or Fatigue", options: [
        { text: "I am no more tired or fatigued than usual.", score: 0 },
        { text: "I get tired or fatigued more easily than usual.", score: 1 },
        { text: "I am too tired or fatigued to do a lot of the things I used to do.", score: 2 },
        { text: "I am too tired or fatigued to do most of the things I used to do.", score: 3 }
    ]},
    { id: 21, text: "Loss of Interest in Sex", options: [
        { text: "I have not noticed any recent change in my interest in sex.", score: 0 },
        { text: "I am less interested in sex than I used to be.", score: 1 },
        { text: "I am much less interested in sex now.", score: 2 },
        { text: "I have lost interest in sex completely.", score: 3 }
    ]}
];

const BAI_OPTIONS = [
    { text: "Not at all", score: 0 },
    { text: "Mildly, but it didn't bother me much", score: 1 },
    { text: "Moderately - it wasn't pleasant at times", score: 2 },
    { text: "Severely - it bothered me a lot", score: 3 }
];

export const BAI_QUESTIONS: Question[] = [
    { id: 1, text: "Numbness or tingling", options: BAI_OPTIONS },
    { id: 2, text: "Feeling hot", options: BAI_OPTIONS },
    { id: 3, text: "Wobbliness in legs", options: BAI_OPTIONS },
    { id: 4, text: "Unable to relax", options: BAI_OPTIONS },
    { id: 5, text: "Fear of worst happening", options: BAI_OPTIONS },
    { id: 6, text: "Dizzy or lightheaded", options: BAI_OPTIONS },
    { id: 7, text: "Heart pounding / racing", options: BAI_OPTIONS },
    { id: 8, text: "Unsteady", options: BAI_OPTIONS },
    { id: 9, text: "Terrified or afraid", options: BAI_OPTIONS },
    { id: 10, text: "Nervous", options: BAI_OPTIONS },
    { id: 11, text: "Feeling of choking", options: BAI_OPTIONS },
    { id: 12, text: "Hands trembling", options: BAI_OPTIONS },
    { id: 13, text: "Shaky / unsteady", options: BAI_OPTIONS },
    { id: 14, text: "Fear of losing control", options: BAI_OPTIONS },
    { id: 15, text: "Difficulty in breathing", options: BAI_OPTIONS },
    { id: 16, text: "Fear of dying", options: BAI_OPTIONS },
    { id: 17, text: "Scared", options: BAI_OPTIONS },
    { id: 18, text: "Indigestion or discomfort in abdomen", options: BAI_OPTIONS },
    { id: 19, text: "Faint / lightheaded", options: BAI_OPTIONS },
    { id: 20, text: "Face flushed", options: BAI_OPTIONS },
    { id: 21, text: "Hot / cold sweats", options: BAI_OPTIONS }
];


export const getBdiLevel = (score: number) => {
    if (score <= 10) return "These ups and downs are considered normal";
    if (score <= 16) return "Mild mood disturbance";
    if (score <= 20) return "Borderline clinical depression";
    if (score <= 30) return "Moderate depression";
    if (score <= 40) return "Severe depression";
    return "Extreme depression";
};

export const getBaiLevel = (score: number) => {
    if (score <= 7) return "Minimal anxiety";
    if (score <= 15) return "Mild anxiety";
    if (score <= 25) return "Moderate anxiety";
    return "Severe anxiety";
};

export const ASSESSMENT_CONFIG = {
    [AssessmentType.BDI]: {
        title: "Beck Depression Inventory (BDI)",
        questions: BDI_QUESTIONS,
        getLevel: getBdiLevel,
    },
    [AssessmentType.BAI]: {
        title: "Beck Anxiety Inventory (BAI)",
        questions: BAI_QUESTIONS,
        getLevel: getBaiLevel,
    }
};
