import { Model } from "./Model";
import { Instance } from "../Instance/Instance";
export declare class RandomModel extends Model {
    private classLabels;
    private seed;
    constructor(classLabels: Array<string>, seed: number);
    /**
     * The predict method gets an Instance as an input and retrieves the possible class labels as an ArrayList. Then selects a
     * random number as an index and returns the class label at this selected index.
     *
     * @param instance {@link Instance} to make prediction.
     * @return The class label at the randomly selected index.
     */
    predict(instance: Instance): string;
    predictProbability(instance: Instance): Map<string, number>;
}
