import {Classifier} from "./Classifier";
import {InstanceList} from "../InstanceList/InstanceList";
import {Parameter} from "../Parameter/Parameter";
import {DecisionTree} from "../Model/DecisionTree/DecisionTree";
import {DecisionNode} from "../Model/DecisionTree/DecisionNode";

export class C45Stump extends Classifier{

    /**
     * Training algorithm for C4.5 Stump univariate decision tree classifier.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters -
     */
    train(trainSet: InstanceList, parameters: Parameter): void {
        this.model = new DecisionTree(new DecisionNode(trainSet, undefined, undefined, true));
    }

    /**
     * Loads the decision tree model from an input file.
     * @param fileName File name of the decision tree model.
     */
    loadModel(fileName: string): void{
        this.model = new DecisionTree(fileName)
    }

}