(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./GaussianModel", "nlptoolkit-math/dist/DiscreteDistribution", "nlptoolkit-util/dist/FileContents", "../DistanceMetric/EuclidianDistance"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KMeansModel = void 0;
    const GaussianModel_1 = require("./GaussianModel");
    const DiscreteDistribution_1 = require("nlptoolkit-math/dist/DiscreteDistribution");
    const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
    const EuclidianDistance_1 = require("../DistanceMetric/EuclidianDistance");
    class KMeansModel extends GaussianModel_1.GaussianModel {
        /**
         * The constructor that sets the classMeans, priorDistribution and distanceMetric according to given inputs.
         *
         * @param priorDistributionOrFileName {@link DiscreteDistribution} input.
         * @param classMeans        {@link InstanceList} of class means.
         * @param distanceMetric    {@link DistanceMetric} input.
         */
        constructor(priorDistributionOrFileName, classMeans, distanceMetric) {
            super();
            if (priorDistributionOrFileName instanceof DiscreteDistribution_1.DiscreteDistribution) {
                this.classMeans = classMeans;
                this.priorDistribution = priorDistributionOrFileName;
                this.distanceMetric = distanceMetric;
            }
            else {
                this.distanceMetric = new EuclidianDistance_1.EuclidianDistance();
                let input = new FileContents_1.FileContents(priorDistributionOrFileName);
                this.loadPriorDistribution(input);
                this.classMeans = this.loadInstanceList(input);
            }
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
    }
    exports.KMeansModel = KMeansModel;
});
//# sourceMappingURL=KMeansModel.js.map