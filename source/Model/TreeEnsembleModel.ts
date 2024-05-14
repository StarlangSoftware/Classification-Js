import {Model} from "./Model";
import {Instance} from "../Instance/Instance";
import {DecisionTree} from "./DecisionTree/DecisionTree";
import {DiscreteDistribution} from "nlptoolkit-math/dist/DiscreteDistribution";
import {FileContents} from "nlptoolkit-util/dist/FileContents";
import {DecisionNode} from "./DecisionTree/DecisionNode";

export class TreeEnsembleModel extends Model{

    private forest: Array<DecisionTree>

    /**
     * A constructor which sets the {@link Array} of {@link DecisionTree} with given input.
     *
     * @param forest An {@link Array} of {@link DecisionTree}.
     */
    constructor1(forest: Array<DecisionTree>) {
        this.forest = forest
    }

    /**
     * Loads a tree ensemble model such as Random Forest model or Bagging model from an input model file.
     * @param fileName Model file name.
     */
    constructor2(fileName: string) {
        let input = new FileContents(fileName)
        let numberOfTrees = parseInt(input.readLine())
        this.forest = new Array<DecisionTree>()
        for (let i = 0; i < numberOfTrees; i++){
            this.forest.push(new DecisionTree(new DecisionNode(input)))
        }
    }

    constructor(forestOrFileName: Array<DecisionTree> | string) {
        super();
        if (forestOrFileName instanceof Array){
            this.constructor1(forestOrFileName)
        } else {
            this.constructor2(forestOrFileName)
        }
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

    /**
     * Calculates the posterior probability distribution for the given instance according to ensemble tree model.
     * @param instance Instance for which posterior probability distribution is calculated.
     * @return Posterior probability distribution for the given instance.
     */
    predictProbability(instance: Instance): Map<string, number> {
        let distribution = new DiscreteDistribution();
        for (let tree of this.forest) {
            distribution.addItem(tree.predict(instance));
        }
        return distribution.getProbabilityDistribution();
    }

    saveTxt(fileName: string){
    }

}