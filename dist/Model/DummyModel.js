"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyModel = void 0;
const Model_1 = require("./Model");
const CompositeInstance_1 = require("../Instance/CompositeInstance");
const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
class DummyModel extends Model_1.Model {
    distribution;
    /**
     * Training algorithm for the dummy classifier. Actually dummy classifier returns the maximum occurring class in
     * the training data, there is no training. Sets the distribution using the given {@link InstanceList}.
     *
     * @param trainSet   Training data given to the algorithm.
     */
    constructor1(trainSet) {
        this.distribution = trainSet.classDistribution();
    }
    /**
     * Loads the dummy model from an input file.
     * @param fileName File name of the dummy model.
     */
    constructor2(fileName) {
        let input = new FileContents_1.FileContents(fileName);
        this.distribution = Model_1.Model.loadDiscreteDistribution(input);
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
    /**
     * Calculates the posterior probability distribution for the given instance according to dummy model.
     * @param instance Instance for which posterior probability distribution is calculated.
     * @return Posterior probability distribution for the given instance.
     */
    predictProbability(instance) {
        return this.distribution.getProbabilityDistribution();
    }
    saveTxt(fileName) {
    }
    /**
     * Training algorithm for the dummy classifier. Actually dummy classifier returns the maximum occurring class in
     * the training data, there is no training.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters -
     */
    train(trainSet, parameters) {
        this.constructor1(trainSet);
    }
    /**
     * Loads the dummy model from an input file.
     * @param fileName File name of the dummy model.
     */
    loadModel(fileName) {
        this.constructor2(fileName);
    }
}
exports.DummyModel = DummyModel;
//# sourceMappingURL=DummyModel.js.map