(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./GaussianModel", "nlptoolkit-math/dist/Vector", "nlptoolkit-util/dist/FileContents", "../../InstanceList/Partition", "nlptoolkit-math/dist/Matrix"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LdaModel = void 0;
    const GaussianModel_1 = require("./GaussianModel");
    const Vector_1 = require("nlptoolkit-math/dist/Vector");
    const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
    const Partition_1 = require("../../InstanceList/Partition");
    const Matrix_1 = require("nlptoolkit-math/dist/Matrix");
    class LdaModel extends GaussianModel_1.GaussianModel {
        /**
         * Loads a Linear Discriminant Analysis model from an input model file.
         * @param fileName Model file name.
         */
        constructor2(fileName) {
            let input = new FileContents_1.FileContents(fileName);
            let size = this.loadPriorDistribution(input);
            this.loadWandW0(input, size);
        }
        /**
         * The calculateMetric method takes an {@link Instance} and a String as inputs. It returns the dot product of given Instance
         * and wi plus w0i.
         *
         * @param instance {@link Instance} input.
         * @param Ci       String input.
         * @return The dot product of given Instance and wi plus w0i.
         */
        calculateMetric(instance, Ci) {
            let xi = instance.toVector();
            let wi = this.w.get(Ci);
            let w0i = this.w0.get(Ci);
            return wi.dotProduct(xi) + w0i;
        }
        /**
         * Loads w0 and w hash maps from an input file. The number of items in the hash map is given by the parameter size.
         * @param input Input file
         * @param size Number of items in the hash map read.
         * @throws IOException If the file can not be read, it throws IOException.
         */
        loadWandW0(input, size) {
            this.w0 = new Map();
            for (let i = 0; i < size; i++) {
                let line = input.readLine();
                let items = line.split(" ");
                this.w0.set(items[0], parseFloat(items[1]));
            }
            this.w = this.loadVectors(input, size);
        }
        saveTxt(fileName) {
        }
        /**
         * Training algorithm for the linear discriminant analysis classifier (Introduction to Machine Learning, Alpaydin, 2015).
         *
         * @param trainSet   Training data given to the algorithm.
         * @param parameters -
         */
        train(trainSet, parameters) {
            this.w0 = new Map();
            this.w = new Map();
            this.priorDistribution = trainSet.classDistribution();
            let classLists = new Partition_1.Partition(trainSet);
            let covariance = new Matrix_1.Matrix(trainSet.get(0).continuousAttributeSize(), trainSet.get(0).continuousAttributeSize());
            for (let i = 0; i < classLists.size(); i++) {
                let averageVector = new Vector_1.Vector(classLists.get(i).continuousAttributeAverage());
                let classCovariance = classLists.get(i).covariance(averageVector);
                classCovariance.multiplyWithConstant(classLists.get(i).size() - 1);
                covariance.add(classCovariance);
            }
            covariance.divideByConstant(trainSet.size() - classLists.size());
            covariance.inverse();
            for (let i = 0; i < classLists.size(); i++) {
                let Ci = classLists.get(i).getClassLabel();
                let averageVector = new Vector_1.Vector(classLists.get(i).continuousAttributeAverage());
                let wi = covariance.multiplyWithVectorFromRight(averageVector);
                this.w.set(Ci, wi);
                let w0i = -0.5 * wi.dotProduct(averageVector) + Math.log(this.priorDistribution.getProbability(Ci));
                this.w0.set(Ci, w0i);
            }
        }
        /**
         * Loads the Lda model from an input file.
         * @param fileName File name of the Lda model.
         */
        loadModel(fileName) {
            this.constructor2(fileName);
        }
    }
    exports.LdaModel = LdaModel;
});
//# sourceMappingURL=LdaModel.js.map