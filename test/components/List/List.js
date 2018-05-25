import ListItem from './ListItem'

export default {
  name: 'TestList',
  subComponents: {
    Item: ListItem
  },
  render(h) {
    return h('div', 'List')
  }
}
