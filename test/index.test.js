import Vue from 'vue/dist/vue.common'
import ComponentRegister from '../src'
import { Button, List, Step } from './components'

test('everything goes well', () => {
  Vue.use(ComponentRegister, {
    [Button.name]: Button,
    [List.name]: List
  })
  const vm = new Vue({
    template: `<div>
      <test-list></test-list>
      <test-list-item />
      <test-list-item-brief />
      <test-button />
      <test-step />
      <test-step-item />
    </div>`,
    components: {
      [Step.name]: Step
    }
  }).$mount()
  expect(vm.$el.innerHTML.replace(/\s*/g, '')).toBe(`
    <div>List</div>
    <div>ListItem</div>
    <div>ListItemBrief</div>
    <div>Button</div>
    <div>Step</div>
    <div>StepItem</div>
  `.replace(/\s*/g, ''))
})
