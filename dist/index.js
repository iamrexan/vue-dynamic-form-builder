/*!
 * vue-dynamic-form-builder v1.0.0
 * (c) Anto Rex A
 * Released under the MIT License.
 */
'use strict';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: "PreviewTemplate",
  props: ['orginalArray', 'screen']
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "col-lg-12 py-3"
  }, [_c('ul', {
    staticClass: "nav nav-tabs",
    attrs: {
      "id": "myTab",
      "role": "tablist"
    }
  }, _vm._l(Object.keys(_vm.orginalArray), function (list, index) {
    return _c('li', {
      key: list,
      staticClass: "nav-item"
    }, [_c('a', {
      staticClass: "nav-link",
      "class": index == '0' ? 'active' : '',
      attrs: {
        "data-toggle": "tab",
        "id": _vm.orginalArray[list].id + '-tab',
        "href": '#tab' + _vm.orginalArray[list].id + '_id',
        "role": "tab",
        "aria-controls": 'tab' + _vm.orginalArray[list].id,
        "aria-selected": "true"
      }
    }, [_vm._v("\n\t\t\t" + _vm._s(_vm.orginalArray[list].title) + "\n\t\t")])]);
  }), 0), _vm._v(" "), _c('div', {
    staticClass: "tab-content",
    attrs: {
      "id": "myTabContent"
    }
  }, _vm._l(Object.keys(_vm.orginalArray), function (list, index) {
    return _c('div', {
      key: list,
      staticClass: "tab-pane fade form-group",
      "class": index == '0' ? 'active show' : '',
      attrs: {
        "id": 'tab' + _vm.orginalArray[list].id + '_id',
        "role": "tabpanel",
        "aria-controls": 'tab' + _vm.orginalArray[list].id
      }
    }, [_c('div', {
      staticClass: "row py-3"
    }, _vm._l(_vm.orginalArray[list], function (item, ind) {
      return _c('div', {
        staticClass: "form-group py-3",
        "class": 'col-md-' + _vm.screen.defaultColumnSize
      }, [_c('label', [_vm._v(_vm._s(item.label))]), _vm._v(" "), item.type === 'text' || item.type === 'number' ? _c('input', {
        staticClass: "form-control",
        attrs: {
          "type": item.type,
          "name": ""
        }
      }) : _vm._e(), _vm._v(" "), item.type === 'select' ? _c('select', {
        staticClass: "form-control",
        attrs: {
          "searchable": "Search here.."
        }
      }, [_c('option', [_vm._v("Select...")]), _vm._v(" "), _vm._l(item.options, function (n, i) {
        return _c('option', {
          domProps: {
            "value": n.value
          }
        }, [_vm._v(_vm._s(n.name))]);
      })], 2) : _vm._e(), _vm._v(" "), item.type === 'textarea' ? _c('textarea', {
        staticClass: "form-control",
        attrs: {
          "rows": "3"
        }
      }) : _vm._e(), _vm._v(" "), _vm._l(item.options, function (n, i) {
        return item.type === 'radio' ? _c('div', {
          staticClass: "form-check",
          attrs: {
            "value": n.value
          }
        }, [_c('label', {
          staticClass: "form-check-label",
          attrs: {
            "for": "radio1"
          }
        }, [_c('input', {
          staticClass: "form-check-input",
          attrs: {
            "type": "radio",
            "id": "radio1",
            "name": "optradio",
            "value": "option1"
          },
          domProps: {
            "checked": i === 0 ? true : false
          }
        }), _vm._v(_vm._s(n.name) + "\n\t\t\t\t      ")])]) : _vm._e();
      })], 2);
    }), 0)]);
  }), 0)]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

//
var script$1 = {
  components: {
    PreviewTemplate: __vue_component__
  },
  name: "vue-dynamic-form-builder",
  data: function data() {
    return {
      sourceArray: [{
        "name": "input",
        "html": "<input type='text' class='form-control'>",
        "icon": null,
        "label": "Text Box",
        "type": "text",
        "placeholder": null,
        "isRequired": true
      }, {
        "name": "select",
        "html": "<select class='form-control'></select>",
        "icon": null,
        "label": "Select Box",
        "options": [{
          "name": "one",
          "value": "one"
        }, {
          "name": "two",
          "value": "two"
        }],
        "type": "select",
        "isRequired": false
      }, {
        "name": "Number",
        "html": "<input type='number' class='form-control'>",
        "icon": null,
        "label": "Number Box",
        "type": "number",
        "placeholder": null,
        "isRequired": false
      }, {
        "name": "TextArea",
        "html": "<textarea class='form-control'></textarea>",
        "icon": null,
        "label": "Text Area",
        "type": "textarea",
        "placeholder": null,
        "isRequired": false
      }, {
        "name": "RadioButton",
        "html": '<label class="form-check-label" for="radio1"> <input type="radio" class="form-check-input" id="radio1" name="optradio" value="option1" checked>Option 1 </label>',
        "icon": null,
        "label": "Radio",
        "type": "radio",
        "options": [{
          "name": "Option 1",
          "value": "option1"
        }, {
          "name": "Option 2",
          "value": "option2"
        }],
        "placeholder": null,
        "isRequired": false
      }],
      destinationArray: {},
      itemData: {},
      formType: "layout",
      optionsArray: ["select", 'radio'],
      screen: {
        "inputEdit": 0,
        "editObject": {},
        "oneOptionBox": 0,
        "oneSectionBox": 0,
        "defaultColumnSize": 4
      },
      columnSizeArray: {
        "2": "col-md-2",
        "3": "col-md-3",
        "4": "col-md-4",
        "6": "col-md-6",
        "8": "col-md-8",
        "12": "col-md-12"
      }
    };
  },
  methods: {
    handleDrop: function handleDrop(toList, data) {
      var fromList = data.list;

      if (fromList) {
        toList.push(data.item);
        fromList.splice(fromList.indexOf(data.item), 1);
        toList.sort(function (a, b) {
          return a > b;
        });
      }
    },
    sourceToDestination: function sourceToDestination() {
      var destinationArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      if (type !== "one") {
        var data = JSON.parse(JSON.stringify(this.itemData));
        destinationArray[index].push(data);
        data.id = Math.floor(Math.random() * 100000);
      } else {
        this.addSection();
      }
    },
    whileDrag: function whileDrag(item, destinationArray) {
      this.itemData = item;
    },
    changeFormScreen: function changeFormScreen() {
      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (val === null) {
        this.formType = event.srcElement.value;
      } else if (this.formType !== 'preview') {
        this.formType = val;
      } else {
        this.formType = 'layout';
      }
    },
    editInput: function editInput(item) {
      this.screen.inputEdit = 1;
      this.screen.editObject = item;
    },
    addOption: function addOption(id) {
      var destinationArray = this.destinationArray;
      this.limitOptionBoxAddition(this);
      var oneOptionBox = this.screen.oneOptionBox;
      Object.keys(this.destinationArray).forEach(function (ind) {
        destinationArray[ind].forEach(function (value, index) {
          if (value.id === id && oneOptionBox === 0) {
            var len = value.options.length;
            value.options.push(JSON.parse(JSON.stringify(value.options[0])));
            value.options[len].name = "";
            value.options[len].value = "";
          }
        });
      });
    },
    limitOptionBoxAddition: function limitOptionBoxAddition(data) {
      Object.keys(data.destinationArray).forEach(function (ind) {
        data.destinationArray[ind].forEach(function (item, index) {
          if (item.type === "select") {
            item.options.forEach(function (itm, i) {
              if (itm.value === "" && itm.name === "") {
                data.screen.oneOptionBox = 1;
              } else {
                data.screen.oneOptionBox = 0;
              }
            });
          }
        });
      });
    },
    addSection: function addSection() {
      var len = Object.keys(this.destinationArray).length;
      this.limitSectionAddition(this);

      if (this.screen.oneSectionBox === 0) {
        this.$set(this.destinationArray, len, []);
        this.destinationArray[len].id = Math.floor(Math.random() * 1000000);
        this.$set(this.destinationArray[len], "name", "");
        this.$set(this.destinationArray[len], "isToggle", true);
      } else {
        alert("Previous section is still empty");
      }
    },
    limitSectionAddition: function limitSectionAddition(data) {
      var destinationArray = data.destinationArray,
          len,
          def = 0;
      Object.keys(destinationArray).forEach(function (list, index) {
        len = destinationArray[list].length;

        if (len < 1) {
          def = 1;
          data.screen.oneSectionBox = 1;
        }
      });

      if (def === 0) {
        data.screen.oneSectionBox = 0;
      }
    },
    dropEvent: function dropEvent() {
      event.preventDefault();
    },
    allowDrop: function allowDrop() {
      event.preventDefault();
    },
    toggle: function toggle(data) {
      this.$set(data, "isToggle", !data.isToggle);
    },
    removeSection: function removeSection(data, index) {

      if (data[index].length < 1) {
        this.$delete(data, index, true);
      } else {
        alert('Can\'t remove non-empty section');
      }
    },
    removeInput: function removeInput(id) {
      var destinationArray = this.destinationArray;
      var oneOptionBox = this.screen.oneOptionBox,
          data = this;
      Object.keys(this.destinationArray).forEach(function (ind) {
        destinationArray[ind].forEach(function (value, index) {
          if (value.id === id) {
            data.screen.inputEdit = 0;
            data.$delete(destinationArray[ind], index, true);
          }
        });
      });
    },
    updateColumnSize: function updateColumnSize() {
      this.screen.defaultColumnSize = event.srcElement.value;
    }
  }
};

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-1"
  }), _vm._v(" "), _vm.formType === 'layout' ? _c('div', {
    staticClass: "col-md-4 border-right"
  }, [_vm._l(_vm.sourceArray, function (item, i) {
    return _vm.screen.inputEdit === 0 ? _c('div', {
      key: i,
      staticClass: "drag",
      attrs: {
        "draggable": "true"
      },
      domProps: {
        "innerHTML": _vm._s(item.name)
      },
      on: {
        "drag": function drag($event) {
          return _vm.whileDrag(item, _vm.destinationArray);
        }
      }
    }, [_vm._v("\n\t\t\t\t" + _vm._s(item.name) + "\n\t\t")]) : _vm._e();
  }), _vm._v(" "), _vm.screen.inputEdit === 1 ? _c('div', [_c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Input ID")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.screen.editObject.id,
      expression: "screen.editObject.id"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "disabled": "true"
    },
    domProps: {
      "value": _vm.screen.editObject.id
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.$set(_vm.screen.editObject, "id", $event.target.value);
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Label Text")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.screen.editObject.label,
      expression: "screen.editObject.label"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.screen.editObject.label
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.$set(_vm.screen.editObject, "label", $event.target.value);
      }
    }
  })]), _vm._v(" "), !_vm.optionsArray.includes(_vm.screen.editObject.type) ? _c('div', {
    staticClass: "form-group"
  }, [_c('label', [_vm._v("Place Holder")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.screen.editObject.placeholder,
      expression: "screen.editObject.placeholder"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.screen.editObject.placeholder
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) {
          return;
        }

        _vm.$set(_vm.screen.editObject, "placeholder", $event.target.value);
      }
    }
  })]) : _vm._e(), _vm._v(" "), _vm.optionsArray.includes(_vm.screen.editObject.type) ? _c('div', {
    staticClass: "form-group"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('label', {
    staticClass: "col-sm-6"
  }, [_vm._v("Select Options")]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-6"
  }, [_c('span', {
    staticClass: "float-right",
    staticStyle: {
      "cursor": "pointer"
    },
    on: {
      "click": function click($event) {
        return _vm.addOption(_vm.screen.editObject.id);
      }
    }
  }, [_vm._v("\n\t\t\t\t\t\t\tAdd "), _c('i', {
    staticClass: "fa fa-plus"
  })])])]), _vm._v(" "), _vm._l(_vm.screen.editObject.options, function (value, index) {
    return _c('div', {
      staticClass: "row"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.screen.editObject.options[index].value,
        expression: "screen.editObject.options[index].value"
      }],
      staticClass: "form-control col-sm-6",
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": _vm.screen.editObject.options[index].value
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.screen.editObject.options[index], "value", $event.target.value);
        }
      }
    }), _vm._v(" "), _c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.screen.editObject.options[index].name,
        expression: "screen.editObject.options[index].name"
      }],
      staticClass: "form-control col-sm-6",
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": _vm.screen.editObject.options[index].name
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.screen.editObject.options[index], "name", $event.target.value);
        }
      }
    })]);
  })], 2) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "form-group p-4"
  }, [_c('label', [_vm._v("Required")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.screen.editObject.isRequired,
      expression: "screen.editObject.isRequired"
    }],
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.screen.editObject.isRequired) ? _vm._i(_vm.screen.editObject.isRequired, null) > -1 : _vm.screen.editObject.isRequired
    },
    on: {
      "change": function change($event) {
        var $$a = _vm.screen.editObject.isRequired,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;

        if (Array.isArray($$a)) {
          var $$v = null,
              $$i = _vm._i($$a, $$v);

          if ($$el.checked) {
            $$i < 0 && _vm.$set(_vm.screen.editObject, "isRequired", $$a.concat([$$v]));
          } else {
            $$i > -1 && _vm.$set(_vm.screen.editObject, "isRequired", $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.$set(_vm.screen.editObject, "isRequired", $$c);
        }
      }
    }
  })]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-primary",
    on: {
      "click": function click($event) {
        _vm.screen.inputEdit = 0;
      }
    }
  }, [_vm._v("Close")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-secondary",
    on: {
      "click": function click($event) {
        return _vm.removeInput(_vm.screen.editObject.id);
      }
    }
  }, [_vm._v("Delete")])]) : _vm._e()], 2) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "p-3",
    "class": _vm.formType === 'preview' ? 'col-md-10' : 'col-md-6'
  }, [_c('div', {
    staticClass: "row border-bottom bg-light"
  }, [_c('div', {
    staticClass: "col-md-6"
  }, [_c('div', {
    staticClass: "row form-group"
  }, [_vm._m(0), _vm._v(" "), _c('input', {
    staticClass: "col-sm-8 form-control",
    attrs: {
      "type": "text",
      "name": "",
      "placeholder": "Form title",
      "disabled": _vm.formType === 'preview' ? true : false
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-6 inline"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-8 form-group"
  }, [_vm.formType === 'preview' ? _c('select', {
    staticClass: "form-control",
    on: {
      "change": function change($event) {
        return _vm.updateColumnSize();
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Select")]), _vm._v(" "), _vm._l(_vm.columnSizeArray, function (item, index) {
    return _c('option', {
      domProps: {
        "value": index
      }
    }, [_vm._v(_vm._s(item))]);
  })], 2) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-4"
  }, [_vm.formType === 'layout' ? _c('button', {
    staticClass: "btn btn-primary right",
    on: {
      "click": function click($event) {
        return _vm.changeFormScreen('preview');
      }
    }
  }, [_vm._v("Preview")]) : _vm._e(), _vm._v(" "), _vm.formType === 'preview' ? _c('button', {
    staticClass: "btn btn-primary right",
    on: {
      "click": function click($event) {
        return _vm.changeFormScreen('preview');
      }
    }
  }, [_vm._v("Dashboard")]) : _vm._e()])])])]), _vm._v(" "), _vm.formType === 'layout' ? _c('div', {
    staticClass: "row p-3 border-bottom"
  }, [_c('div', {
    staticClass: "col-sm-6"
  }), _vm._v(" "), _c('div', {
    staticClass: "col-sm-6"
  }, [_c('button', {
    staticClass: "btn btn-secondary float-right",
    on: {
      "click": function click($event) {
        return _vm.sourceToDestination(null, null, null, 'one');
      }
    }
  }, [_vm._v("\n\t\t\t\t\tAdd Section\n\t\t\t\t")])])]) : _vm._e(), _vm._v(" "), _vm.formType === 'layout' ? _c('div', {
    staticClass: "row form-group border border-light p-3",
    staticStyle: {
      "max-height": "300px",
      "overflow-y": "scroll"
    }
  }, _vm._l(Object.keys(_vm.destinationArray), function (list, index) {
    return _c('div', {
      staticClass: "py-3",
      staticStyle: {
        "width": "100%"
      }
    }, [_c('div', {
      staticClass: "row pb-3"
    }, [_c('div', {
      staticClass: "col-sm-6"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.destinationArray[list].title,
        expression: "destinationArray[list].title"
      }],
      staticClass: "form-control",
      attrs: {
        "type": "text",
        "name": "",
        "placeholder": "Section Title"
      },
      domProps: {
        "value": _vm.destinationArray[list].title
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.destinationArray[list], "title", $event.target.value);
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "col-sm-6"
    }, [_c('button', {
      staticClass: "btn btn-secondary",
      on: {
        "click": function click($event) {
          return _vm.removeSection(_vm.destinationArray, list);
        }
      }
    }, [_vm._v("Remove Section")]), _vm._v(" "), _c('button', {
      staticClass: "btn btn-secondary",
      on: {
        "click": function click($event) {
          return _vm.toggle(_vm.destinationArray[list]);
        }
      }
    }, [_vm._v("Collapse")])])]), _vm._v(" "), _vm.destinationArray[list].isToggle == true ? _c('div', {
      key: list,
      staticClass: "drop row",
      on: {
        "drop": function drop($event) {
          return _vm.sourceToDestination(_vm.destinationArray, list, list);
        },
        "dragover": _vm.allowDrop
      }
    }, _vm._l(_vm.destinationArray[list], function (item, i) {
      return _c('div', {
        key: i,
        staticClass: "col-md-4 form-group"
      }, [_c('label', {
        staticClass: "noselect",
        "class": 'id_' + item.id,
        attrs: {
          "title": "Double click to edit"
        },
        on: {
          "dblclick": function dblclick($event) {
            return _vm.editInput(item);
          }
        },
        model: {
          value: item.label,
          callback: function callback($$v) {
            _vm.$set(item, "label", $$v);
          },
          expression: "item.label"
        }
      }, [_vm._v("\n\t\t\t\t\t\t\t" + _vm._s(item.label) + "\n\t\t\t\t\t\t\t"), item.isRequired === true ? _c('span', {
        staticClass: "text-danger"
      }, [_vm._v("*")]) : _vm._e()]), _vm._v(" "), item.type === 'text' || item.type === 'number' ? _c('input', {
        staticClass: "form-control",
        attrs: {
          "type": item.type,
          "placeholder": item.placeholder
        }
      }) : _vm._e(), _vm._v(" "), item.type === 'select' ? _c('select', {
        staticClass: "form-control",
        attrs: {
          "searchable": "Search here.."
        }
      }, [_c('option', [_vm._v("Select...")]), _vm._v(" "), _vm._l(item.options, function (n, i) {
        return _c('option', {
          domProps: {
            "value": n.value
          }
        }, [_vm._v(_vm._s(n.name))]);
      })], 2) : _vm._e(), _vm._v(" "), item.type === 'textarea' ? _c('textarea', {
        staticClass: "form-control",
        attrs: {
          "rows": "1"
        }
      }) : _vm._e(), _vm._v(" "), _vm._l(item.options, function (n, i) {
        return item.type === 'radio' ? _c('div', {
          staticClass: "form-check",
          attrs: {
            "value": n.value
          }
        }, [_c('label', {
          staticClass: "form-check-label",
          attrs: {
            "for": "radio1"
          }
        }, [_c('input', {
          staticClass: "form-check-input",
          attrs: {
            "type": "radio",
            "id": "radio1",
            "name": "optradio",
            "value": "option1"
          },
          domProps: {
            "checked": i === 0 ? true : false
          }
        }), _vm._v(_vm._s(n.name) + "\n\t\t\t\t\t      ")])]) : _vm._e();
      })], 2);
    }), 0) : _vm._e()]);
  }), 0) : (_vm.formType = 'preview') ? _c('div', {
    staticClass: "row"
  }, [_c('preview-template', {
    attrs: {
      "orginalArray": _vm.destinationArray,
      "screen": _vm.screen
    }
  })], 1) : _vm._e()])]);
};

var __vue_staticRenderFns__$1 = [function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('label', {
    staticClass: "col-sm-3 h5 text-center my-auto"
  }, [_vm._v("Title "), _c('span', {
    staticClass: "text-danger"
  }, [_vm._v("*")])]);
}];
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

var index = {
  install: function install(Vue) {
    // Let's register our component globally
    // https://vuejs.org/v2/guide/components-registration.html
    Vue.component("vue-dynamic-form-builder", __vue_component__$1);
  }
};

module.exports = index;
