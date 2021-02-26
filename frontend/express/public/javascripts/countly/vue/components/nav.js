/* global Vue, Backbone */

(function(countlyVue) {

    var countlyBaseComponent = countlyVue.components.BaseComponent;


    Vue.component("cly-tabs", countlyBaseComponent.extend({
        props: {
            value: String,
            routePattern: String,
            routeKey: String,
            noHistory: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            currentTab: {
                get: function() {
                    return this.value;
                },
                set: function(val) {
                    if (this.routePattern && this.routeKey) {
                        var target = this.routePattern.replace(":" + this.routeKey, val);
                        if (this.noHistory) {
                            Backbone.history.noHistory(target);
                        }
                        else {
                            window.location.hash = target;
                        }
                    }
                    this.$emit("input", val);
                }
            }
        },
        template: '<div class="cly-vue-tabs">\
                        <el-tabs v-model="currentTab" type="button" v-on="$listeners" v-bind="$attrs">\
                            <template v-slot>\
                                <slot></slot>\
                            </template>\
                        </el-tabs>\
                    </div>'
    }));

}(window.countlyVue = window.countlyVue || {}));