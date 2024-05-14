import {Classifier} from "./Classifier";
import {InstanceList} from "../InstanceList/InstanceList";
import {Parameter} from "../Parameter/Parameter";
import {BaggingParameter} from "../Parameter/BaggingParameter";
import {DecisionTree} from "../Model/DecisionTree/DecisionTree";
import {DecisionNode} from "../Model/DecisionTree/DecisionNode";
import {TreeEnsembleModel} from "../Model/TreeEnsembleModel";

export class Bagging extends Classifier{

    /**
     * Bagging bootstrap ensemble method that creates individuals for its ensemble by training each classifier on a random
     * redistribution of the training set.
     * This training method is for a bagged decision tree classifier. 20 percent of the instances are left aside for pruning of the trees
     * 80 percent of the instances are used for training the trees. The number of trees (forestSize) is a parameter, and basically
     * the method will learn an ensemble of trees as a model.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters Parameters of the bagging trees algorithm. ensembleSize returns the number of trees in the bagged forest.
     */
    train(trainSet: InstanceList, parameters: Parameter): void {
        let forestSize = (<BaggingParameter> parameters).getEnsembleSize();
        let forest = new Array<DecisionTree>();
        for (let i = 0; i < forestSize; i++) {
            let bootstrap = trainSet.bootstrap(i);
            let tree = new DecisionTree(new DecisionNode(new InstanceList(bootstrap.getSample()), undefined, undefined, false));
            forest.push(tree);
        }
        this.model = new TreeEnsembleModel(forest);
    }

    /**
     * Loads the Bagging ensemble model from an input file.
     * @param fileName File name of the decision tree model.
     */
    loadModel(fileName: string): void{
        this.model = new TreeEnsembleModel(fileName)
    }
}