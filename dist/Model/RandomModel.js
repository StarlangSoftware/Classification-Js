(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Model", "../Instance/CompositeInstance", "nlptoolkit-util/dist/Random", "nlptoolkit-util/dist/FileContents"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RandomModel = void 0;
    const Model_1 = require("./Model");
    const CompositeInstance_1 = require("../Instance/CompositeInstance");
    const Random_1 = require("nlptoolkit-util/dist/Random");
    const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
    class RandomModel extends Model_1.Model {
        constructor(classLabelsOrFileName, seed) {
            super();
            if (classLabelsOrFileName instanceof Array) {
                this.classLabels = classLabelsOrFileName;
                this.random = new Random_1.Random(seed);
                this.seed = seed;
            }
            else {
                let input = new FileContents_1.FileContents(classLabelsOrFileName);
                seed = parseInt(input.readLine());
                this.random = new Random_1.Random(seed);
                let size = parseInt(input.readLine());
                this.classLabels = new Array();
                for (let i = 0; i < size; i++) {
                    this.classLabels.push(input.readLine());
                }
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
        predictProbability(instance) {
            let result = new Map();
            for (let classLabel of this.classLabels) {
                result.set(classLabel, 1.0 / this.classLabels.length);
            }
            return result;
        }
        saveTxt(fileName) {
        }
    }
    exports.RandomModel = RandomModel;
});
//# sourceMappingURL=RandomModel.js.map