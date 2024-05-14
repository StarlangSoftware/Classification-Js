import {PairedTest} from "./PairedTest";
import {ExperimentPerformance} from "../Performance/ExperimentPerformance";
import {StatisticalTestResult} from "./StatisticalTestResult";
import {Distribution} from "nlptoolkit-math/dist/Distribution";

export class Pairedt extends PairedTest{

    /**
     * Calculates the test statistic of the paired t test.
     * @param classifier1 Performance (error rate or accuracy) results of the first classifier.
     * @param classifier2 Performance (error rate or accuracy) results of the second classifier.
     * @return Given the performances of two classifiers, the test statistic of the paired t test.
     */
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

    /**
     * Compares two classification algorithms based on their performances (accuracy or error rate) using paired t test.
     * @param classifier1 Performance (error rate or accuracy) results of the first classifier.
     * @param classifier2 Performance (error rate or accuracy) results of the second classifier.
     * @return Statistical test result of the comparison.
     */
    compareClassifiers(classifier1: ExperimentPerformance, classifier2: ExperimentPerformance): StatisticalTestResult {
        let statistic = this.testStatistic(classifier1, classifier2);
        let degreeOfFreedom = classifier1.numberOfExperiments() - 1;
        return new StatisticalTestResult(Distribution.tDistribution(statistic, degreeOfFreedom), false);
    }

}