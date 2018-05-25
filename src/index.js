const extractSubComponents = (componentTag, component, extractedSubComponents = []) => {
  const { subComponents } = component
  if (subComponents && typeof subComponents === 'object') {
    Object.keys(subComponents).forEach(subComponentName => {
      const subComponentTag = `${componentTag}${subComponentName}`
      const subComponent = subComponents[subComponentName]
      extractedSubComponents.push([subComponentTag, subComponent])
      extractSubComponents(subComponentTag, subComponent, extractedSubComponents)
    })
  }
  return extractedSubComponents
}

const normalizeComponents = (components, normalizedComponents = []) => {
  Object.keys(components).forEach(componentTag => {
    const component = components[componentTag]
    normalizedComponents.push([componentTag, component])
    extractSubComponents(componentTag, component, normalizedComponents)
  })
  return normalizedComponents
}

export default {
  install(Vue) {
    // Global register
    const registerComponent = Vue.component
    Vue.component = function () {
      if (arguments[1]) {
        extractSubComponents(arguments[0], arguments[1]).forEach(([componentTag, component]) => {
          registerComponent.apply(Vue, [componentTag, component])
        })
      }
      return registerComponent.apply(Vue, arguments)
    }

    // Component-level register
    Vue.mixin({
      beforeCreate() {
        const opts = this.$options
        if (opts.components) {
          normalizeComponents(opts.components).forEach(([componentTag, component]) => {
            opts.components[componentTag] = component
          })
        }
      }
    })
  }
}
