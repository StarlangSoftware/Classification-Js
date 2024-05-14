(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./PairedTest", "./StatisticalTestResult", "nlptoolkit-math/dist/Distribution"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Combined5x2t = void 0;
    const PairedTest_1 = require("./PairedTest");
    const StatisticalTestResult_1 = require("./StatisticalTestResult");
    const Distribution_1 = require("nlptoolkit-math/dist/Distribution");
    class Combined5x2t extends PairedTest_1.PairedTest {
        /**
         * Calculates the test statistic of the combined 5x2 cv t test.
         * @param classifier1 Performance (error rate or accuracy) results of the first classifier.
         * @param classifier2 Performance (error rate or accuracy) results of the second classifier.
         * @return Given the performances of two classifiers, the test statistic of the combined 5x2 cv t test.
         */
        testStatistic(classifier1, classifier2) {
            let difference = new Array();
            for (let i = 0; i < classifier1.numberOfExperiments(); i++) {
                difference.push(classifier1.getErrorRate(i) - classifier2.getErrorRate(i));
            }
            let denominator = 0;
            let numerator = 0;
            for (let i = 0; i < classifier1.numberOfExperiments() / 2; i++) {
                let mean = (difference[2 * i] + difference[2 * i + 1]) / 2;
                numerator += mean;
                let variance = (difference[2 * i] - mean) * (difference[2 * i] - mean) +
                    (difference[2 * i + 1] - mean) * (difference[2 * i + 1] - mean);
                denominator += variance;
            }
            numerator = Math.sqrt(10) * numerator / 5;
            denominator = Math.sqrt(denominator / 5);
            return numerator / denominator;
        }
        /**
         * Compares two classification algorithms based on their performances (accuracy or error rate) using combined 5x2
         * cv t test.
         * @param classifier1 Performance (error rate or accuracy) results of the first classifier.
         * @param classifier2 Performance (error rate or accuracy) results of the second classifier.
         * @return Statistical test result of the comparison.
         */
        compareClassifiers(classifier1, classifier2) {
            let statistic = this.testStatistic(classifier1, classifier2);
            let degreeOfFreedom = classifier1.numberOfExperiments() / 2;
            return new StatisticalTestResult_1.StatisticalTestResult(Distribution_1.Distribution.tDistribution(statistic, degreeOfFreedom), false);
        }
    }
    exports.Combined5x2t = Combined5x2t;
});
//# sourceMappingURL=Combined5x2t.js.map