(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./LdaModel", "nlptoolkit-math/dist/Vector", "nlptoolkit-util/dist/FileContents", "../../InstanceList/Partition"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.QdaModel = void 0;
    const LdaModel_1 = require("./LdaModel");
    const Vector_1 = require("nlptoolkit-math/dist/Vector");
    const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
    const Partition_1 = require("../../InstanceList/Partition");
    class QdaModel extends LdaModel_1.LdaModel {
        constructor2(fileName) {
            let input = new FileContents_1.FileContents(fileName);
            let size = this.loadPriorDistribution(input);
            this.loadWandW0(input, size);
            this.W = new Map();
            for (let i = 0; i < size; i++) {
                let c = input.readLine();
                let matrix = this.loadMatrix(input);
                this.W.set(c, matrix);
            }
        }
        /**
         * The calculateMetric method takes an {@link Instance} and a String as inputs. It multiplies Matrix Wi with Vector xi
         * then calculates the dot product of it with xi. Then, again it finds the dot product of wi and xi and returns the summation with w0i.
         *
         * @param instance {@link Instance} input.
         * @param Ci       String input.
         * @return The result of Wi.multiplyWithVectorFromLeft(xi).dotProduct(xi) + wi.dotProduct(xi) + w0i.
         */
        calculateMetric(instance, Ci) {
            let xi = instance.toVector();
            let Wi = this.W.get(Ci);
            let wi = this.w.get(Ci);
            let w0i = this.w0.get(Ci);
            return Wi.multiplyWithVectorFromLeft(xi).dotProduct(xi) + wi.dotProduct(xi) + w0i;
        }
        saveTxt(fileName) {
        }
        /**
         * Training algorithm for the quadratic discriminant analysis classifier (Introduction to Machine Learning, Alpaydin, 2015).
         *
         * @param trainSet   Training data given to the algorithm.
         * @param parameters -
         */
        train(trainSet, parameters) {
            let determinant = 0;
            this.w0 = new Map();
            this.w = new Map();
            this.W = new Map();
            let classLists = new Partition_1.Partition(trainSet);
            this.priorDistribution = trainSet.classDistribution();
            for (let i = 0; i < classLists.size(); i++) {
                let Ci = classLists.get(i).getClassLabel();
                let averageVector = new Vector_1.Vector(classLists.get(i).continuousAttributeAverage());
                let classCovariance = classLists.get(i).covariance(averageVector);
                determinant = classCovariance.determinant();
                classCovariance.inverse();
                let Wi = classCovariance.clone();
                Wi.multiplyWithConstant(-0.5);
                this.W.set(Ci, Wi);
                let wi = classCovariance.multiplyWithVectorFromLeft(averageVector);
                this.w.set(Ci, wi);
                let w0i = -0.5 * (wi.dotProduct(averageVector) + Math.log(determinant)) + Math.log(this.priorDistribution.getProbability(Ci));
                this.w0.set(Ci, w0i);
            }
        }
        /**
         * Loads the Qda model from an input file.
         * @param fileName File name of the Qda model.
         */
        loadModel(fileName) {
            this.constructor2(fileName);
        }
    }
    exports.QdaModel = QdaModel;
});
//# sourceMappingURL=QdaModel.js.map