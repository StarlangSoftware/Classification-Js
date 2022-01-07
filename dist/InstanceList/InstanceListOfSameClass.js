(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./InstanceList"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InstanceListOfSameClass = void 0;
    const InstanceList_1 = require("./InstanceList");
    class InstanceListOfSameClass extends InstanceList_1.InstanceList {
        /**
         * Constructor for creating a new instance list with the same class label.
         *
         * @param classLabel Class label of instance list.
         */
        constructor(classLabel) {
            super();
            this.classLabel = classLabel;
        }
        /**
         * Accessor for the class label.
         *
         * @return Class label.
         */
        getClassLabel() {
            return this.classLabel;
        }
    }
    exports.InstanceListOfSameClass = InstanceListOfSameClass;
});
//# sourceMappingURL=InstanceListOfSameClass.js.map