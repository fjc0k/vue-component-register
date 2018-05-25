/*!
 * vue-component-register v1.1.0
 * (c) 2018-present fjc0k <fjc0kb@gmail.com> (https://github.com/fjc0k)
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueComponentRegister = factory());
}(this, (function () { 'use strict';

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

  var componentRegister = {
    install: function install(Vue) {
      // Global register
      var registerComponent = Vue.component;

      Vue.component = function () {
        if (arguments[1]) {
          extractSubComponents(arguments[0], arguments[1]).forEach(function (_ref) {
            var componentTag = _ref[0],
                component = _ref[1];
            registerComponent.apply(Vue, [componentTag, component]);
          });
        }

        return registerComponent.apply(Vue, arguments);
      }; // Component-level register


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
  /* istanbul ignore if */

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(componentRegister);
  }

  return componentRegister;

})));
