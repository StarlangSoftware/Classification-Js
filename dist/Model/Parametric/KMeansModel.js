(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./GaussianModel", "../../InstanceList/InstanceList", "nlptoolkit-util/dist/FileContents", "../../DistanceMetric/EuclidianDistance", "../../InstanceList/Partition"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KMeansModel = void 0;
    const GaussianModel_1 = require("./GaussianModel");
    const InstanceList_1 = require("../../InstanceList/InstanceList");
    const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
    const EuclidianDistance_1 = require("../../DistanceMetric/EuclidianDistance");
    const Partition_1 = require("../../InstanceList/Partition");
    class KMeansModel extends GaussianModel_1.GaussianModel {
        /**
         * Loads a K-means model from an input model file.
         * @param fileName Model file name.
         */
        constructor2(fileName) {
            this.distanceMetric = new EuclidianDistance_1.EuclidianDistance();
            let input = new FileContents_1.FileContents(fileName);
            this.loadPriorDistribution(input);
            this.classMeans = this.loadInstanceList(input);
        }
        /**
         * The calculateMetric method takes an {@link Instance} and a String as inputs. It loops through the class means, if
         * the corresponding class label is same as the given String it returns the negated distance between given instance and the
         * current item of class means. Otherwise it returns the smallest negative number.
         *
         * @param instance {@link Instance} input.
         * @param Ci       String input.
         * @return The negated distance between given instance and the current item of class means.
         */
        calculateMetric(instance, Ci) {
            for (let i = 0; i < this.classMeans.size(); i++) {
                if (this.classMeans.get(i).getClassLabel() == Ci) {
                    return -this.distanceMetric.distance(instance, this.classMeans.get(i));
                }
            }
            return Number.NEGATIVE_INFINITY;
        }
        saveTxt(fileName) {
        }
        /**
         * Training algorithm for K-Means classifier. K-Means finds the mean of each class for training.
         *
         * @param trainSet   Training data given to the algorithm.
         * @param parameters distanceMetric: distance metric used to calculate the distance between two instances.
         */
        train(trainSet, parameters) {
            this.priorDistribution = trainSet.classDistribution();
            this.classMeans = new InstanceList_1.InstanceList();
            let classLists = new Partition_1.Partition(trainSet);
            for (let i = 0; i < classLists.size(); i++) {
                this.classMeans.add(classLists.get(i).average());
            }
            this.distanceMetric = parameters.getDistanceMetric();
        }
        /**
         * Loads the K-means model from an input file.
         * @param fileName File name of the K-means model.
         */
        loadModel(fileName) {
            this.constructor2(fileName);
        }
    }
    exports.KMeansModel = KMeansModel;
});
//# sourceMappingURL=KMeansModel.js.map