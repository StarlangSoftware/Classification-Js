"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paired5x2t = void 0;
const PairedTest_1 = require("./PairedTest");
const StatisticalTestResult_1 = require("./StatisticalTestResult");
const Distribution_1 = require("nlptoolkit-math/dist/Distribution");
class Paired5x2t extends PairedTest_1.PairedTest {
    /**
     * Calculates the test statistic of the 5x2 t test.
     * @param classifier1 Performance (error rate or accuracy) results of the first classifier.
     * @param classifier2 Performance (error rate or accuracy) results of the second classifier.
     * @return Given the performances of two classifiers, the test statistic of the 5x2 t test.
     */
    testStatistic(classifier1, classifier2) {
        let difference = new Array();
        let sum = 0.0;
        for (let i = 0; i < classifier1.numberOfExperiments(); i++) {
            difference.push(classifier1.getErrorRate(i) - classifier2.getErrorRate(i));
            sum += difference[i];
        }
        let denominator = 0;
        for (let i = 0; i < classifier1.numberOfExperiments() / 2; i++) {
            let mean = (difference[2 * i] + difference[2 * i + 1]) / 2;
            let variance = (difference[2 * i] - mean) * (difference[2 * i] - mean) +
                (difference[2 * i + 1] - mean) * (difference[2 * i + 1] - mean);
            denominator += variance;
        }
        denominator = Math.sqrt(denominator / 5);
        return difference[0] / denominator;
    }
    /**
     * Compares two classification algorithms based on their performances (accuracy or error rate) using 5x2 t test.
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
exports.Paired5x2t = Paired5x2t;
//# sourceMappingURL=Paired5x2t.js.map