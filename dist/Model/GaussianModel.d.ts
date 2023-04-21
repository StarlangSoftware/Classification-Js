import { DiscreteDistribution } from "nlptoolkit-math/dist/DiscreteDistribution";
import { Instance } from "../Instance/Instance";
import { ValidatedModel } from "./ValidatedModel";
import { FileContents } from "nlptoolkit-util/dist/FileContents";
import { Vector } from "nlptoolkit-math/dist/Vector";
export declare abstract class GaussianModel extends ValidatedModel {
    protected priorDistribution: DiscreteDistribution;
    /**
     * Abstract method calculateMetric takes an {@link Instance} and a String as inputs.
     *
     * @param instance {@link Instance} input.
     * @param Ci       String input.
     * @return A double value as metric.
     */
    abstract calculateMetric(instance: Instance, Ci: string): number;
    /**
     * The predict method takes an Instance as an input. First it gets the size of prior distribution and loops this size times.
     * Then it gets the possible class labels and and calculates metric value. At the end, it returns the class which has the
     * maximum value of metric.
     *
     * @param instance {@link Instance} to predict.
     * @return The class which has the maximum value of metric.
     */
    predict(instance: Instance): string;
    loadPriorDistribution(input: FileContents): number;
    loadVectors(input: FileContents, size: number): Map<string, Vector>;
    predictProbability(instance: Instance): Map<string, number>;
}
