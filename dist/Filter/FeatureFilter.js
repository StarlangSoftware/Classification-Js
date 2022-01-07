(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FeatureFilter = void 0;
    class FeatureFilter {
        /**
         * Constructor that sets the dataSet.
         *
         * @param dataSet DataSet that will bu used.
         */
        constructor(dataSet) {
            this.dataSet = dataSet;
        }
        /**
         * Feature converter for a list of instances. Using the abstract method convertInstance, each instance in the
         * instance list will be converted.
         */
        convert() {
            let instances = this.dataSet.getInstances();
            for (let instance of instances) {
                this.convertInstance(instance);
            }
            this.convertDataDefinition();
        }
    }
    exports.FeatureFilter = FeatureFilter;
});
//# sourceMappingURL=FeatureFilter.js.map