import {PairedTest} from "./PairedTest";
import {ExperimentPerformance} from "../Performance/ExperimentPerformance";
import {StatisticalTestResult} from "./StatisticalTestResult";
import {Distribution} from "nlptoolkit-math/dist/Distribution";

export class Paired5x2t extends PairedTest{

    private testStatistic(classifier1: ExperimentPerformance, classifier2: ExperimentPerformance): number{
        let difference = new Array<number>();
        let sum = 0.0;
        for (let i = 0; i < classifier1.numberOfExperiments(); i++){
            difference.push(classifier1.getErrorRate(i) - classifier2.getErrorRate(i));
            sum += difference[i];
        }
        let denominator = 0;
        for (let i = 0; i < classifier1.numberOfExperiments() / 2; i++){
            let mean = (difference[2 * i] + difference[2 * i + 1]) / 2;
            let variance = (difference[2 * i] - mean) * (difference[2 * i] - mean) +
                (difference[2 * i + 1] - mean) * (difference[2 * i + 1] - mean);
            denominator += variance;
        }
        denominator = Math.sqrt(denominator / 5);
        return difference[0] / denominator;
    }

    compareClassifiers(classifier1: ExperimentPerformance, classifier2: ExperimentPerformance): StatisticalTestResult {
        let statistic = this.testStatistic(classifier1, classifier2);
        let degreeOfFreedom = classifier1.numberOfExperiments() / 2;
        return new StatisticalTestResult(Distribution.tDistribution(statistic, degreeOfFreedom), false);
    }

}