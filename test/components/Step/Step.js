import StepItem from './StepItem'

export default {
  name: 'TestStep',
  subComponents: {
    Item: StepItem
  },
  render(h) {
    return h('div', 'Step')
  }
}
