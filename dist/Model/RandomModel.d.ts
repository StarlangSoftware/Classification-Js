import { Model } from "./Model";
import { Instance } from "../Instance/Instance";
export declare class RandomModel extends Model {
    private classLabels;
    private random;
    private seed;
    /**
     * A constructor that sets the class labels.
     *
     * @param classLabels An ArrayList of class labels.
     * @param seed Seed of the random function.
     */
    constructor1(classLabels: Array<string>, seed: number): void;
    /**
     * Loads a random classifier model from an input model file.
     * @param fileName Model file name.
     */
    constructor2(fileName: string): void;
    constructor(classLabelsOrFileName: Array<string> | string, seed?: number);
    /**
     * The predict method gets an Instance as an input and retrieves the possible class labels as an ArrayList. Then selects a
     * random number as an index and returns the class label at this selected index.
     *
     * @param instance {@link Instance} to make prediction.
     * @return The class label at the randomly selected index.
     */
    predict(instance: Instance): string;
    /**
     * Calculates the posterior probability distribution for the given instance according to random model.
     * @param instance Instance for which posterior probability distribution is calculated.
     * @return Posterior probability distribution for the given instance.
     */
    predictProbability(instance: Instance): Map<string, number>;
    saveTxt(fileName: string): void;
}
