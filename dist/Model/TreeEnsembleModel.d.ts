import { Model } from "./Model";
import { Instance } from "../Instance/Instance";
import { DecisionTree } from "./DecisionTree/DecisionTree";
export declare class TreeEnsembleModel extends Model {
    private forest;
    /**
     * A constructor which sets the {@link Array} of {@link DecisionTree} with given input.
     *
     * @param forest An {@link Array} of {@link DecisionTree}.
     */
    constructor(forest: Array<DecisionTree>);
    /**
     * The predict method takes an {@link Instance} as an input and loops through the {@link ArrayList} of {@link DecisionTree}s.
     * Makes prediction for the items of that ArrayList and returns the maximum item of that ArrayList.
     *
     * @param instance Instance to make prediction.
     * @return The maximum prediction of a given Instance.
     */
    predict(instance: Instance): string;
    predictProbability(instance: Instance): Map<string, number>;
}
