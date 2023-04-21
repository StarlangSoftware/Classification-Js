(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Model", "nlptoolkit-math/dist/DiscreteDistribution", "../InstanceList/InstanceList", "../Instance/CompositeInstance", "nlptoolkit-util/dist/FileContents"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DummyModel = void 0;
    const Model_1 = require("./Model");
    const DiscreteDistribution_1 = require("nlptoolkit-math/dist/DiscreteDistribution");
    const InstanceList_1 = require("../InstanceList/InstanceList");
    const CompositeInstance_1 = require("../Instance/CompositeInstance");
    const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
    class DummyModel extends Model_1.Model {
        /**
         * Constructor which sets the distribution using the given {@link InstanceList}.
         *
         * @param trainSet {@link InstanceList} which is used to get the class distribution.
         */
        constructor(trainSet) {
            super();
            if (trainSet instanceof InstanceList_1.InstanceList) {
                this.distribution = trainSet.classDistribution();
            }
            else {
                let input = new FileContents_1.FileContents(trainSet);
                this.distribution = new DiscreteDistribution_1.DiscreteDistribution();
                let size = parseInt(input.readLine());
                for (let i = 0; i < size; i++) {
                    let line = input.readLine();
                    let items = line.split(" ");
                    let count = parseInt(items[1]);
                    for (let j = 0; j < count; j++) {
                        this.distribution.addItem(items[0]);
                    }
                }
            }
        }
        /**
         * The predict method takes an Instance as an input and returns the entry of distribution which has the maximum value.
         *
         * @param instance Instance to make prediction.
         * @return The entry of distribution which has the maximum value.
         */
        predict(instance) {
            if ((instance instanceof CompositeInstance_1.CompositeInstance)) {
                let possibleClassLabels = instance.getPossibleClassLabels();
                return this.distribution.getMaxItem(possibleClassLabels);
            }
            else {
                return this.distribution.getMaxItem();
            }
        }
        predictProbability(instance) {
            return this.distribution.getProbabilityDistribution();
        }
        saveTxt(fileName) {
        }
    }
    exports.DummyModel = DummyModel;
});
//# sourceMappingURL=DummyModel.js.map