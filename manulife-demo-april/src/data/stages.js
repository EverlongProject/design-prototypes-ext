import { stage1Flow } from './stage1.js'
import { stage2Flow } from './stage2.js'
import { stage3Flow } from './stage3.js'

export const STAGES = {
  stage1: {
    key: 'stage1',
    title: 'Family protection',
    subtitle: 'Jenn buys a Family Term policy through Manny',
    steps: stage1Flow
  },
  stage2: {
    key: 'stage2',
    title: 'Results & goal setting',
    subtitle: 'Schedule, review, set a goal, log a meal',
    steps: stage2Flow
  },
  stage3: {
    key: 'stage3',
    title: 'Retirement coverage',
    subtitle: 'Review history, keep coverage, unlock welcome rewards',
    steps: stage3Flow
  }
}

export const STAGE_ORDER = ['stage1', 'stage2', 'stage3']
