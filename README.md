# Vue Component Register

[![Travis](https://travis-ci.org/fjc0k/vue-component-register.svg?branch=master)](https://travis-ci.org/fjc0k/vue-component-register)
[![codecov](https://codecov.io/gh/fjc0k/vue-component-register/branch/master/graph/badge.svg)](https://codecov.io/gh/fjc0k/vue-component-register)
[![minified size](https://img.shields.io/badge/minified%20size-1023%20B-blue.svg?MIN)](https://github.com/fjc0k/vue-component-register/blob/master/dist/vue-component-register.min.js)
[![minzipped size](https://img.shields.io/badge/minzipped%20size-547%20B-blue.svg?MZIP)](https://github.com/fjc0k/vue-component-register/blob/master/dist/vue-component-register.min.js)

Allow components to register their subComponents.

```js
// List.vue
import ListItem from './ListItem.vue'

export default {
  name: 'List',
  subComponents: {
    Item: ListItem
  }
}
```

## Background

See this issue: [Allow a component to register its own subComponents](https://github.com/vuejs/vue/issues/8249)

## Install

```bash
# Yarn
yarn add vue-component-register

# npm
npm i vue-component-register
```

### CDN
[jsDelivr](//www.jsdelivr.com/package/npm/vue-component-register) | [UNPKG](//unpkg.com/vue-component-register/) 

Avaliable as `window.VueComponentRegister`.

`VueComponentRegister` will automatically calls `Vue.use()` if `Vue` is available as a global variable.

## Usage

```js
/* main.js */
import Vue from 'vue'
import ComponentRegister from 'vue-component-register'
import Button from './components' // No subComponents
import List from './components' // Include subComponents: ListItem

Vue.use(ComponentRegister)

Vue.component(Button.name, Button)
Vue.component(List.name, List)


/* App.vue */
import Step from './components' // Include subComponents: StepItem

export default {
  name: 'App',
  // Component-level register
  components: { Step },
  render() {
    return <step>
      <step-item>
        <list>
          <list-item>first step</list-item>
        </list>
      </step-item>
    </step>
  }
}
```

## License

[MIT](./LICENSE)
