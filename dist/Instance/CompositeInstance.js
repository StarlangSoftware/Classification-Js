(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Instance"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CompositeInstance = void 0;
    const Instance_1 = require("./Instance");
    class CompositeInstance extends Instance_1.Instance {
        /**
         * Constructor of {@link CompositeInstance} class which takes a class label, attributes and an {@link ArrayList} of
         * possible labels as inputs. It generates a new composite instance with given labels, attributes and possible labels.
         *
         * @param classLabel          Class label of the composite instance.
         * @param attributes          Attributes of the composite instance.
         * @param possibleClassLabels Possible labels of the composite instance.
         */
        constructor(classLabel, attributes, possibleClassLabels) {
            super(classLabel, attributes);
            this.possibleClassLabels = new Array();
            if (possibleClassLabels != undefined) {
                this.possibleClassLabels = possibleClassLabels;
            }
        }
        /**
         * Accessor for the possible class labels.
         *
         * @return Possible class labels of the composite instance.
         */
        getPossibleClassLabels() {
            return this.possibleClassLabels;
        }
        /**
         * Mutator method for possible class labels.
         *
         * @param possibleClassLabels Ner value of possible class labels.
         */
        setPossibleClassLabels(possibleClassLabels) {
            this.possibleClassLabels = possibleClassLabels;
        }
        /**
         * Converts composite instance to {@link String}.
         *
         * @return String representation of composite instance.
         */
        toString() {
            let result = super.toString();
            for (let possibleClassLabel of this.possibleClassLabels) {
                result += ";" + possibleClassLabel;
            }
            return result.toString();
        }
    }
    exports.CompositeInstance = CompositeInstance;
});
//# sourceMappingURL=CompositeInstance.js.map