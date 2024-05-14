import {PairedTest} from "./PairedTest";
import {ExperimentPerformance} from "../Performance/ExperimentPerformance";
import {StatisticalTestResult} from "./StatisticalTestResult";
import {Distribution} from "nlptoolkit-math/dist/Distribution";

export class Combined5x2t extends PairedTest{

    /**
     * Calculates the test statistic of the combined 5x2 cv t test.
     * @param classifier1 Performance (error rate or accuracy) results of the first classifier.
     * @param classifier2 Performance (error rate or accuracy) results of the second classifier.
     * @return Given the performances of two classifiers, the test statistic of the combined 5x2 cv t test.
     */
    private testStatistic(classifier1: ExperimentPerformance, classifier2: ExperimentPerformance): number{
        let difference = new Array<number>();
        for (let i = 0; i < classifier1.numberOfExperiments(); i++){
            difference.push(classifier1.getErrorRate(i) - classifier2.getErrorRate(i));
        }
        let denominator = 0;
        let numerator = 0;
        for (let i = 0; i < classifier1.numberOfExperiments() / 2; i++){
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
    compareClassifiers(classifier1: ExperimentPerformance, classifier2: ExperimentPerformance): StatisticalTestResult {
        let statistic = this.testStatistic(classifier1, classifier2);
        let degreeOfFreedom = classifier1.numberOfExperiments() / 2;
        return new StatisticalTestResult(Distribution.tDistribution(statistic, degreeOfFreedom), false);
    }

}