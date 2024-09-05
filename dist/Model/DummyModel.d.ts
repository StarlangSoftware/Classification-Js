import { Model } from "./Model";
import { Instance } from "../Instance/Instance";
import { InstanceList } from "../InstanceList/InstanceList";
import { Parameter } from "../Parameter/Parameter";
export declare class DummyModel extends Model {
    private distribution;
    /**
     * Training algorithm for the dummy classifier. Actually dummy classifier returns the maximum occurring class in
     * the training data, there is no training. Sets the distribution using the given {@link InstanceList}.
     *
     * @param trainSet   Training data given to the algorithm.
     */
    constructor1(trainSet: InstanceList): void;
    /**
     * Loads the dummy model from an input file.
     * @param fileName File name of the dummy model.
     */
    constructor2(fileName: string): void;
    /**
     * The predict method takes an Instance as an input and returns the entry of distribution which has the maximum value.
     *
     * @param instance Instance to make prediction.
     * @return The entry of distribution which has the maximum value.
     */
    predict(instance: Instance): string;
    /**
     * Calculates the posterior probability distribution for the given instance according to dummy model.
     * @param instance Instance for which posterior probability distribution is calculated.
     * @return Posterior probability distribution for the given instance.
     */
    predictProbability(instance: Instance): Map<string, number>;
    saveTxt(fileName: string): void;
    /**
     * Training algorithm for the dummy classifier. Actually dummy classifier returns the maximum occurring class in
     * the training data, there is no training.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters -
     */
    train(trainSet: InstanceList, parameters: Parameter): void;
    /**
     * Loads the dummy model from an input file.
     * @param fileName File name of the dummy model.
     */
    loadModel(fileName: string): void;
}
