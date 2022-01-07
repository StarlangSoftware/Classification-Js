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
    exports.Pairedt = void 0;
    const PairedTest_1 = require("./PairedTest");
    const StatisticalTestResult_1 = require("./StatisticalTestResult");
    const Distribution_1 = require("nlptoolkit-math/dist/Distribution");
    class Pairedt extends PairedTest_1.PairedTest {
        testStatistic(classifier1, classifier2) {
            let difference = new Array();
            let sum = 0.0;
            for (let i = 0; i < classifier1.numberOfExperiments(); i++) {
                difference.push(classifier1.getErrorRate(i) - classifier2.getErrorRate(i));
                sum += difference[i];
            }
            let mean = sum / classifier1.numberOfExperiments();
            sum = 0.0;
            for (let i = 0; i < classifier1.numberOfExperiments(); i++) {
                sum += (difference[i] - mean) * (difference[i] - mean);
            }
            let standardDeviation = Math.sqrt(sum / (classifier1.numberOfExperiments() - 1));
            return Math.sqrt(classifier1.numberOfExperiments()) * mean / standardDeviation;
        }
        compareClassifiers(classifier1, classifier2) {
            let statistic = this.testStatistic(classifier1, classifier2);
            let degreeOfFreedom = classifier1.numberOfExperiments() - 1;
            return new StatisticalTestResult_1.StatisticalTestResult(Distribution_1.Distribution.tDistribution(statistic, degreeOfFreedom), false);
        }
    }
    exports.Pairedt = Pairedt;
});
//# sourceMappingURL=Pairedt.js.map