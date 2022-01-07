import {PairedTest} from "./PairedTest";
import {ExperimentPerformance} from "../Performance/ExperimentPerformance";
import {StatisticalTestResult} from "./StatisticalTestResult";
import {Distribution} from "nlptoolkit-math/dist/Distribution";

export class Combined5x2F extends PairedTest{

    private testStatistic(classifier1: ExperimentPerformance, classifier2: ExperimentPerformance): number{
        let difference = new Array<number>();
        let numerator = 0
        for (let i = 0; i < classifier1.numberOfExperiments(); i++){
            difference.push(classifier1.getErrorRate(i) - classifier2.getErrorRate(i));
            numerator += difference[i] * difference[i];
        }
        let denominator = 0;
        for (let i = 0; i < classifier1.numberOfExperiments() / 2; i++){
            let mean = (difference[2 * i] + difference[2 * i + 1]) / 2;
            let variance = (difference[2 * i] - mean) * (difference[2 * i] - mean) +
                (difference[2 * i + 1] - mean) * (difference[2 * i + 1] - mean);
            denominator += variance;
        }
        denominator *= 2;
        return numerator / denominator;
    }

    compareClassifiers(classifier1: ExperimentPerformance, classifier2: ExperimentPerformance): StatisticalTestResult {
        let statistic = this.testStatistic(classifier1, classifier2);
        let degreeOfFreedom1 = classifier1.numberOfExperiments();
        let degreeOfFreedom2 = classifier1.numberOfExperiments() / 2;
        return new StatisticalTestResult(Distribution.fDistribution(statistic, degreeOfFreedom1, degreeOfFreedom2), true);
    }

}