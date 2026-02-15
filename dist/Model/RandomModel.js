"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomModel = void 0;
const Model_1 = require("./Model");
const CompositeInstance_1 = require("../Instance/CompositeInstance");
const Random_1 = require("nlptoolkit-util/dist/Random");
const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
class RandomModel extends Model_1.Model {
    classLabels;
    random;
    seed;
    /**
     * A constructor that sets the class labels.
     *
     * @param classLabels An ArrayList of class labels.
     * @param seed Seed of the random function.
     */
    constructor1(classLabels, seed) {
        this.classLabels = classLabels;
        this.random = new Random_1.Random(seed);
        this.seed = seed;
    }
    /**
     * Loads a random classifier model from an input model file.
     * @param fileName Model file name.
     */
    constructor2(fileName) {
        let input = new FileContents_1.FileContents(fileName);
        this.seed = parseInt(input.readLine());
        this.random = new Random_1.Random(this.seed);
        let size = parseInt(input.readLine());
        this.classLabels = new Array();
        for (let i = 0; i < size; i++) {
            this.classLabels.push(input.readLine());
        }
    }
    /**
     * The predict method gets an Instance as an input and retrieves the possible class labels as an ArrayList. Then selects a
     * random number as an index and returns the class label at this selected index.
     *
     * @param instance {@link Instance} to make prediction.
     * @return The class label at the randomly selected index.
     */
    predict(instance) {
        if ((instance instanceof CompositeInstance_1.CompositeInstance)) {
            let possibleClassLabels = instance.getPossibleClassLabels();
            let size = possibleClassLabels.length;
            let index = this.random.nextInt(size);
            return possibleClassLabels[index];
        }
        else {
            let size = this.classLabels.length;
            let index = this.random.nextInt(size);
            return this.classLabels[index];
        }
    }
    /**
     * Calculates the posterior probability distribution for the given instance according to random model.
     * @param instance Instance for which posterior probability distribution is calculated.
     * @return Posterior probability distribution for the given instance.
     */
    predictProbability(instance) {
        let result = new Map();
        for (let classLabel of this.classLabels) {
            result.set(classLabel, 1.0 / this.classLabels.length);
        }
        return result;
    }
    saveTxt(fileName) {
    }
    /**
     * Training algorithm for random classifier.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters -
     */
    train(trainSet, parameters) {
        let result = new Array();
        for (let s of trainSet.classDistribution().keys()) {
            result.push(s);
        }
        this.constructor1(result, parameters.getSeed());
    }
    /**
     * Loads the random classifier model from an input file.
     * @param fileName File name of the random classifier model.
     */
    loadModel(fileName) {
        this.constructor2(fileName);
    }
}
exports.RandomModel = RandomModel;
//# sourceMappingURL=RandomModel.js.map