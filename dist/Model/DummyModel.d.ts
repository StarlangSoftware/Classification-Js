import { Model } from "./Model";
import { Instance } from "../Instance/Instance";
import { InstanceList } from "../InstanceList/InstanceList";
export declare class DummyModel extends Model {
    private distribution;
    /**
     * Constructor which sets the distribution using the given {@link InstanceList}.
     *
     * @param trainSet {@link InstanceList} which is used to get the class distribution.
     */
    constructor(trainSet: InstanceList | string);
    /**
     * The predict method takes an Instance as an input and returns the entry of distribution which has the maximum value.
     *
     * @param instance Instance to make prediction.
     * @return The entry of distribution which has the maximum value.
     */
    predict(instance: Instance): string;
    predictProbability(instance: Instance): Map<string, number>;
    saveTxt(fileName: string): void;
}
