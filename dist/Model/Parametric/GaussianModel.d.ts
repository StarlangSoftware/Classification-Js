import { DiscreteDistribution } from "nlptoolkit-math/dist/DiscreteDistribution";
import { Instance } from "../../Instance/Instance";
import { ValidatedModel } from "../ValidatedModel";
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
    /**
     * Loads the prior probability distribution from an input model file.
     * @param input Input model file.
     * @return Prior probability distribution.
     * @throws IOException If the input file can not be read, the method throws IOException.
     */
    loadPriorDistribution(input: FileContents): number;
    /**
     * Loads hash map of vectors from input model file.
     * @param input Input model file.
     * @param size Number of vectors to be read from input model file.
     * @return Hash map of vectors.
     * @throws IOException If the input file can not be read, the method throws IOException.
     */
    loadVectors(input: FileContents, size: number): Map<string, Vector>;
    /**
     * Calculates the posterior probability distribution for the given instance according to Gaussian model.
     * @param instance Instance for which posterior probability distribution is calculated.
     * @return Posterior probability distribution for the given instance.
     */
    predictProbability(instance: Instance): Map<string, number>;
}
