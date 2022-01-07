import {Performance} from "./Performance";
import * as fs from "fs";
import {DetailedClassificationPerformance} from "./DetailedClassificationPerformance";
import {ClassificationPerformance} from "./ClassificationPerformance";

export class ExperimentPerformance {

    private results: Array<Performance> = new Array<Performance>()
    private containsDetails: boolean = true
    private classification: boolean = true

    /**
     * A constructor that takes a file name as an input and takes the inputs from that file assigns these inputs to the
     * errorRate and adds them to the results {@link Array} as a new {@link Performance}.
     *
     * @param fileName String input.
     */
    constructor(fileName?: string) {
        if (fileName != undefined){
            let data = fs.readFileSync(fileName, 'utf8')
            let lines = data.split("\n")
            for (let line of lines){
                this.results.push(new Performance(Number.parseFloat(line)))
            }
        }
    }

    /**
     * The add method takes a {@link Performance} as an input and adds it to the results {@link Array}.
     *
     * @param performance {@link Performance} input.
     */
    add(performance: Performance){
        if (!(performance instanceof DetailedClassificationPerformance)){
            this.containsDetails = false
        }
        if (!(performance instanceof ClassificationPerformance)){
            this.classification = false
        }
        this.results.push(performance)
    }

    /**
     * The numberOfExperiments method returns the size of the results {@link Array}.
     *
     * @return The results {@link Array}.
     */
    numberOfExperiments(): number{
        return this.results.length
    }

    /**
     * The getErrorRate method takes an index as an input and returns the errorRate at given index of
     * results {@link Array}.
     *
     * @param index Index of results {@link Array} to retrieve.
     * @return The errorRate at given index of results {@link Array}.
     */
    getErrorRate(index: number): number{
        return this.results[index].getErrorRate()
    }

    /**
     * The getAccuracy method takes an index as an input. It returns the accuracy of a {@link Performance} at given
     * index of results {@link Array}.
     *
     * @param index Index of results {@link Array} to retrieve.
     * @return The accuracy of a {@link Performance} at given index of results {@link Array}.
     */
    getAccuracy(index: number): number{
        if (this.results[index] instanceof ClassificationPerformance){
            return (<ClassificationPerformance> this.results[index]).getAccuracy()
        }
    }

    /**
     * The meanPerformance method loops through the performances of results {@link Array} and sums up the errorRates
     * of each then returns a new {@link Performance} with the mean of that summation.
     *
     * @return A new {@link Performance} with the mean of the summation of errorRates.
     */
    meanPerformance(): Performance{
        let sumError = 0;
        for (let performance of this.results) {
            sumError += performance.getErrorRate();
        }
        return new Performance(sumError / this.results.length);
    }

    /**
     * The meanClassificationPerformance method loops through the performances of results {@link Array} and sums up the
     * accuracy of each classification performance, then returns a new classificationPerformance with the mean of that
     * summation.
     *
     * @return A new classificationPerformance with the mean of that summation.
     */
    meanClassificationPerformance(): ClassificationPerformance{
        if (this.results.length == 0 || !this.classification) {
            return undefined;
        }
        let sumAccuracy = 0;
        for (let performance of  this.results) {
            let classificationPerformance = <ClassificationPerformance> performance;
            sumAccuracy += classificationPerformance.getAccuracy();
        }
        return new ClassificationPerformance(sumAccuracy / this.results.length);
    }

    /**
     * The meanDetailedPerformance method gets the first confusion matrix of results {@link Array}.
     * Then, it adds new confusion matrices as the {@link DetailedClassificationPerformance} of
     * other elements of results ArrayList' confusion matrices as a {@link DetailedClassificationPerformance}.
     *
     * @return A new {@link DetailedClassificationPerformance} with the {@link ConfusionMatrix} sum.
     */
    meanDetailedPerformance(): DetailedClassificationPerformance{
        if (this.results.length == 0 || !this.containsDetails) {
            return undefined;
        }
        let sum = (<DetailedClassificationPerformance> this.results[0]).getConfusionMatrix();
        for (let i = 1; i < this.results.length; i++) {
            sum.addConfusionMatrix((<DetailedClassificationPerformance> this.results[i]).getConfusionMatrix());
        }
        return new DetailedClassificationPerformance(sum);
    }

    /**
     * The standardDeviationPerformance method loops through the {@link Performance}s of results {@link Array} and
     * returns a new Performance with the standard deviation.
     *
     * @return A new Performance with the standard deviation.
     */
    standardDeviationPerformance(): Performance{
        let sumErrorRate = 0;
        let averagePerformance = this.meanPerformance();
        for (let performance of this.results) {
            sumErrorRate += Math.pow(performance.getErrorRate() - averagePerformance.getErrorRate(), 2);
        }
        return new Performance(Math.sqrt(sumErrorRate / (this.results.length - 1)));
    }

    /**
     * The standardDeviationClassificationPerformance method loops through the {@link Performance}s of results {@link ArrayList} and
     * returns a new {@link ClassificationPerformance} with standard deviation.
     *
     * @return A new {@link ClassificationPerformance} with standard deviation.
     */
    standardDeviationClassificationPerformance(): ClassificationPerformance{
        if (this.results.length == 0 || !this.classification) {
            return undefined;
        }
        let sumAccuracy = 0, sumErrorRate = 0;
        let averageClassificationPerformance = this.meanClassificationPerformance();
        for (let performance of this.results) {
            let classificationPerformance = <ClassificationPerformance> performance;
            sumAccuracy += Math.pow(classificationPerformance.getAccuracy() - averageClassificationPerformance.getAccuracy(), 2);
            sumErrorRate += Math.pow(classificationPerformance.getErrorRate() - averageClassificationPerformance.getErrorRate(), 2);
        }
        return new ClassificationPerformance(Math.sqrt(sumAccuracy / (this.results.length - 1)),
            Math.sqrt(sumErrorRate / (this.results.length - 1)));
    }

    /**
     * The isBetter method  takes an {@link ExperimentPerformance} as an input and returns true if the result of compareTo method is positive
     * and false otherwise.
     *
     * @param experimentPerformance {@link ExperimentPerformance} input.
     * @return True if the result of compareTo method is positive and false otherwise.
     */
    isBetter(experimentPerformance: ExperimentPerformance): boolean{
        let accuracy1 = this.meanClassificationPerformance().getAccuracy();
        let accuracy2 = experimentPerformance.meanClassificationPerformance().getAccuracy();
        return accuracy1 > accuracy2
    }
}