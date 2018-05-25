/*!
 * vue-component-register v0.0.1
 * (c) 2018-present fjc0k <fjc0kb@gmail.com> (https://github.com/fjc0k)
 * Released under the MIT License.
 */
'use strict';

var extractSubComponents = function extractSubComponents(componentTag, component, extractedSubComponents) {
  if (extractedSubComponents === void 0) {
    extractedSubComponents = [];
  }

  var subComponents = component.subComponents;

  if (subComponents && typeof subComponents === 'object') {
    Object.keys(subComponents).forEach(function (subComponentName) {
      var subComponentTag = "" + componentTag + subComponentName;
      var subComponent = subComponents[subComponentName];
      extractedSubComponents.push([subComponentTag, subComponent]);
      extractSubComponents(subComponentTag, subComponent, extractedSubComponents);
    });
  }

  return extractedSubComponents;
};

var normalizeComponents = function normalizeComponents(components, normalizedComponents) {
  if (normalizedComponents === void 0) {
    normalizedComponents = [];
  }

  Object.keys(components).forEach(function (componentTag) {
    var component = components[componentTag];
    normalizedComponents.push([componentTag, component]);
    extractSubComponents(componentTag, component, normalizedComponents);
  });
  return normalizedComponents;
};

var index = {
  install: function install(Vue, components) {
    if (components === void 0) {
      components = {};
    }

    // Global register
    components = normalizeComponents(components);
    components.forEach(function (_ref) {
      var componentTag = _ref[0],
          component = _ref[1];
      Vue.component(componentTag, component);
    }); // Component-level register

    Vue.mixin({
      beforeCreate: function beforeCreate() {
        var opts = this.$options;

        if (opts.components) {
          normalizeComponents(opts.components).forEach(function (_ref2) {
            var componentTag = _ref2[0],
                component = _ref2[1];
            opts.components[componentTag] = component;
          });
        }
      }
    });
  }
};

module.exports = index;
