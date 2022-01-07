(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Classifier", "nlptoolkit-math/dist/Vector", "../InstanceList/Partition", "nlptoolkit-math/dist/Matrix", "../Model/LdaModel"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Lda = void 0;
    const Classifier_1 = require("./Classifier");
    const Vector_1 = require("nlptoolkit-math/dist/Vector");
    const Partition_1 = require("../InstanceList/Partition");
    const Matrix_1 = require("nlptoolkit-math/dist/Matrix");
    const LdaModel_1 = require("../Model/LdaModel");
    class Lda extends Classifier_1.Classifier {
        /**
         * Training algorithm for the linear discriminant analysis classifier (Introduction to Machine Learning, Alpaydin, 2015).
         *
         * @param trainSet   Training data given to the algorithm.
         * @param parameters -
         */
        train(trainSet, parameters) {
            let w0 = new Map();
            let w = new Map();
            let priorDistribution = trainSet.classDistribution();
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
                w.set(Ci, wi);
                let w0i = -0.5 * wi.dotProduct(averageVector) + Math.log(priorDistribution.getProbability(Ci));
                w0.set(Ci, w0i);
            }
            this.model = new LdaModel_1.LdaModel(priorDistribution, w, w0);
        }
    }
    exports.Lda = Lda;
});
//# sourceMappingURL=Lda.js.map