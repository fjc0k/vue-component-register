import ListItemBrief from './ListItemBrief'

export default {
  name: 'TestListItem',
  subComponents: {
    Brief: ListItemBrief
  },
  render(h) {
    return h('div', 'ListItem')
  }
}
