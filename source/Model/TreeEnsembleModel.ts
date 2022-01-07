import {Model} from "./Model";
import {Instance} from "../Instance/Instance";
import {DecisionTree} from "./DecisionTree/DecisionTree";
import {DiscreteDistribution} from "nlptoolkit-math/dist/DiscreteDistribution";

export class TreeEnsembleModel extends Model{

    private forest: Array<DecisionTree>

    /**
     * A constructor which sets the {@link Array} of {@link DecisionTree} with given input.
     *
     * @param forest An {@link Array} of {@link DecisionTree}.
     */
    constructor(forest: Array<DecisionTree>) {
        super();
        this.forest = forest
    }

    /**
     * The predict method takes an {@link Instance} as an input and loops through the {@link ArrayList} of {@link DecisionTree}s.
     * Makes prediction for the items of that ArrayList and returns the maximum item of that ArrayList.
     *
     * @param instance Instance to make prediction.
     * @return The maximum prediction of a given Instance.
     */
    predict(instance: Instance): string {
        let distribution = new DiscreteDistribution();
        for (let tree of this.forest) {
            distribution.addItem(tree.predict(instance));
        }
        return distribution.getMaxItem();
    }

    predictProbability(instance: Instance): Map<string, number> {
        let distribution = new DiscreteDistribution();
        for (let tree of this.forest) {
            distribution.addItem(tree.predict(instance));
        }
        return distribution.getProbabilityDistribution();
    }

}