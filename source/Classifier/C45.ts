import {Classifier} from "./Classifier";
import {InstanceList} from "../InstanceList/InstanceList";
import {Parameter} from "../Parameter/Parameter";
import {C45Parameter} from "../Parameter/C45Parameter";
import {Partition} from "../InstanceList/Partition";
import {DecisionTree} from "../Model/DecisionTree/DecisionTree";
import {DecisionNode} from "../Model/DecisionTree/DecisionNode";

export class C45 extends Classifier{

    /**
     * Training algorithm for C4.5 univariate decision tree classifier. 20 percent of the data are left aside for pruning
     * 80 percent of the data is used for constructing the tree.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters -
     */
    train(trainSet: InstanceList, parameters: Parameter): void {
        let tree: DecisionTree
        if ((<C45Parameter> parameters).isPrune()) {
            let partition = new Partition(trainSet, (<C45Parameter> parameters).getCrossValidationRatio(), true);
            tree = new DecisionTree(new DecisionNode(partition.get(1), undefined, undefined, false));
            tree.prune(partition.get(0));
        } else {
            tree = new DecisionTree(new DecisionNode(trainSet, undefined, undefined, false));
        }
        this.model = tree;
    }

    loadModel(fileName: string): void{
        this.model = new DecisionTree(fileName)
    }

}