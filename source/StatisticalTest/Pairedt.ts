import {PairedTest} from "./PairedTest";
import {ExperimentPerformance} from "../Performance/ExperimentPerformance";
import {StatisticalTestResult} from "./StatisticalTestResult";
import {Distribution} from "nlptoolkit-math/dist/Distribution";

export class Pairedt extends PairedTest{

    private testStatistic(classifier1: ExperimentPerformance, classifier2: ExperimentPerformance): number{
        let difference = new Array<number>();
        let sum = 0.0;
        for (let i = 0; i < classifier1.numberOfExperiments(); i++){
            difference.push(classifier1.getErrorRate(i) - classifier2.getErrorRate(i));
            sum += difference[i];
        }
        let mean = sum / classifier1.numberOfExperiments();
        sum = 0.0;
        for (let i = 0; i < classifier1.numberOfExperiments(); i++){
            sum += (difference[i] - mean) * (difference[i] - mean);
        }
        let standardDeviation = Math.sqrt(sum / (classifier1.numberOfExperiments() - 1));
        return Math.sqrt(classifier1.numberOfExperiments()) * mean / standardDeviation;
    }

    compareClassifiers(classifier1: ExperimentPerformance, classifier2: ExperimentPerformance): StatisticalTestResult {
        let statistic = this.testStatistic(classifier1, classifier2);
        let degreeOfFreedom = classifier1.numberOfExperiments() - 1;
        return new StatisticalTestResult(Distribution.tDistribution(statistic, degreeOfFreedom), false);
    }

}