"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const Instance_1 = require("../Instance/Instance");
const CounterHashMap_1 = require("nlptoolkit-datastructure/dist/CounterHashMap");
const InstanceList_1 = require("../InstanceList/InstanceList");
const Matrix_1 = require("nlptoolkit-math/dist/Matrix");
const DiscreteDistribution_1 = require("nlptoolkit-math/dist/DiscreteDistribution");
const DiscreteAttribute_1 = require("../Attribute/DiscreteAttribute");
const DiscreteIndexedAttribute_1 = require("../Attribute/DiscreteIndexedAttribute");
const ConfusionMatrix_1 = require("../Performance/ConfusionMatrix");
const DetailedClassificationPerformance_1 = require("../Performance/DetailedClassificationPerformance");
class Model {
    /**
     * Given an array of class labels, returns the maximum occurred one.
     *
     * @param classLabels An array of class labels.
     * @return The class label that occurs most in the array of class labels (mod of class label list).
     */
    static getMaximum(classLabels) {
        let frequencies = new CounterHashMap_1.CounterHashMap();
        for (let label of classLabels) {
            frequencies.put(label);
        }
        return frequencies.max();
    }
    /**
     * Loads a single instance from a single line.
     * @param line Line containing the instance.
     * @param attributeTypes Type of the attributes of the instance. If th attribute is discrete, it is "DISCRETE",
     *                       otherwise it is "CONTINUOUS".
     * @return Instance read from the line.
     */
    loadInstance(line, attributeTypes) {
        let items = line.split(",");
        let instance = new Instance_1.Instance(items[items.length - 1]);
        for (let i = 0; i < items.length - 1; i++) {
            switch (attributeTypes[i]) {
                case "DISCRETE":
                    instance.addAttribute(items[i]);
                    break;
                case "CONTINUOUS":
                    instance.addAttribute(parseFloat(items[i]));
                    break;
            }
        }
        return instance;
    }
    /**
     * Loads a discrete distribution from an input model file
     * @param input Input model file.
     * @return Discrete distribution read from an input model file.
     */
    static loadDiscreteDistribution(input) {
        let distribution = new DiscreteDistribution_1.DiscreteDistribution();
        let size = parseInt(input.readLine());
        for (let i = 0; i < size; i++) {
            let line = input.readLine();
            let items = line.split(" ");
            let count = parseInt(items[1]);
            for (let j = 0; j < count; j++) {
                distribution.addItem(items[0]);
            }
        }
        return distribution;
    }
    /**
     * Loads an instance list from an input model file.
     * @param input Input model file.
     * @return Instance list read from an input model file.
     */
    loadInstanceList(input) {
        let types = input.readLine().split(" ");
        let instanceCount = parseInt(input.readLine());
        let instanceList = new InstanceList_1.InstanceList();
        for (let i = 0; i < instanceCount; i++) {
            instanceList.add(this.loadInstance(input.readLine(), types));
        }
        return instanceList;
    }
    /**
     * Loads a matrix from an input model file.
     * @param input Input model file.
     * @return Matrix read from the input model file.
     */
    loadMatrix(input) {
        let items = input.readLine().split(" ");
        let matrix = new Matrix_1.Matrix(parseInt(items[0]), parseInt(items[1]));
        for (let j = 0; j < matrix.getRow(); j++) {
            let line = input.readLine();
            items = line.split(" ");
            for (let k = 0; k < matrix.getColumn(); k++) {
                matrix.setValue(j, k, parseFloat(items[k]));
            }
        }
        return matrix;
    }
    /**
     * Checks given instance's attribute and returns true if it is a discrete indexed attribute, false otherwise.
     *
     * @param instance Instance to check.
     * @return True if instance is a discrete indexed attribute, false otherwise.
     */
    discreteCheck(instance) {
        for (let i = 0; i < instance.attributeSize(); i++) {
            if (instance.getAttribute(i) instanceof DiscreteAttribute_1.DiscreteAttribute &&
                !(instance.getAttribute(i) instanceof DiscreteIndexedAttribute_1.DiscreteIndexedAttribute)) {
                return false;
            }
        }
        return true;
    }
    /**
     * TestClassification an instance list with the current model.
     *
     * @param testSet Test data (list of instances) to be tested.
     * @return The accuracy (and error) of the model as an instance of Performance class.
     */
    test(testSet) {
        let classLabels = testSet.getUnionOfPossibleClassLabels();
        let confusion = new ConfusionMatrix_1.ConfusionMatrix(classLabels);
        for (let i = 0; i < testSet.size(); i++) {
            let instance = testSet.get(i);
            confusion.classify(instance.getClassLabel(), this.predict(instance));
        }
        return new DetailedClassificationPerformance_1.DetailedClassificationPerformance(confusion);
    }
    /**
     * Runs current classifier with the given train and test data.
     *
     * @param parameter Parameter of the classifier to be trained.
     * @param trainSet  Training data to be used in training the classifier.
     * @param testSet   Test data to be tested after training the model.
     * @return The accuracy (and error) of the trained model as an instance of Performance class.
     * @throws DiscreteFeaturesNotAllowed Exception for discrete features.
     */
    singleRun(parameter, trainSet, testSet) {
        this.train(trainSet, parameter);
        return this.test(testSet);
    }
}
exports.Model = Model;
//# sourceMappingURL=Model.js.map