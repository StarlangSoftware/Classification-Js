import { Performance } from "./Performance";
import { DetailedClassificationPerformance } from "./DetailedClassificationPerformance";
import { ClassificationPerformance } from "./ClassificationPerformance";
export declare class ExperimentPerformance {
    private results;
    private containsDetails;
    private classification;
    /**
     * A constructor that takes a file name as an input and takes the inputs from that file assigns these inputs to the
     * errorRate and adds them to the results {@link Array} as a new {@link Performance}.
     *
     * @param fileName String input.
     */
    constructor(fileName?: string);
    /**
     * The add method takes a {@link Performance} as an input and adds it to the results {@link Array}.
     *
     * @param performance {@link Performance} input.
     */
    add(performance: Performance): void;
    /**
     * The numberOfExperiments method returns the size of the results {@link Array}.
     *
     * @return The results {@link Array}.
     */
    numberOfExperiments(): number;
    /**
     * The getErrorRate method takes an index as an input and returns the errorRate at given index of
     * results {@link Array}.
     *
     * @param index Index of results {@link Array} to retrieve.
     * @return The errorRate at given index of results {@link Array}.
     */
    getErrorRate(index: number): number;
    /**
     * The getAccuracy method takes an index as an input. It returns the accuracy of a {@link Performance} at given
     * index of results {@link Array}.
     *
     * @param index Index of results {@link Array} to retrieve.
     * @return The accuracy of a {@link Performance} at given index of results {@link Array}.
     */
    getAccuracy(index: number): number;
    /**
     * The meanPerformance method loops through the performances of results {@link Array} and sums up the errorRates
     * of each then returns a new {@link Performance} with the mean of that summation.
     *
     * @return A new {@link Performance} with the mean of the summation of errorRates.
     */
    meanPerformance(): Performance;
    /**
     * The meanClassificationPerformance method loops through the performances of results {@link Array} and sums up the
     * accuracy of each classification performance, then returns a new classificationPerformance with the mean of that
     * summation.
     *
     * @return A new classificationPerformance with the mean of that summation.
     */
    meanClassificationPerformance(): ClassificationPerformance;
    /**
     * The meanDetailedPerformance method gets the first confusion matrix of results {@link Array}.
     * Then, it adds new confusion matrices as the {@link DetailedClassificationPerformance} of
     * other elements of results ArrayList' confusion matrices as a {@link DetailedClassificationPerformance}.
     *
     * @return A new {@link DetailedClassificationPerformance} with the {@link ConfusionMatrix} sum.
     */
    meanDetailedPerformance(): DetailedClassificationPerformance;
    /**
     * The standardDeviationPerformance method loops through the {@link Performance}s of results {@link Array} and
     * returns a new Performance with the standard deviation.
     *
     * @return A new Performance with the standard deviation.
     */
    standardDeviationPerformance(): Performance;
    /**
     * The standardDeviationClassificationPerformance method loops through the {@link Performance}s of results {@link ArrayList} and
     * returns a new {@link ClassificationPerformance} with standard deviation.
     *
     * @return A new {@link ClassificationPerformance} with standard deviation.
     */
    standardDeviationClassificationPerformance(): ClassificationPerformance;
    /**
     * The isBetter method  takes an {@link ExperimentPerformance} as an input and returns true if the result of compareTo method is positive
     * and false otherwise.
     *
     * @param experimentPerformance {@link ExperimentPerformance} input.
     * @return True if the result of compareTo method is positive and false otherwise.
     */
    isBetter(experimentPerformance: ExperimentPerformance): boolean;
}
