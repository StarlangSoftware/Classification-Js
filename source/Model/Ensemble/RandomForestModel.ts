import {TreeEnsembleModel} from "./TreeEnsembleModel";
import {InstanceList} from "../../InstanceList/InstanceList";
import {Parameter} from "../../Parameter/Parameter";
import {RandomForestParameter} from "../../Parameter/RandomForestParameter";
import {DecisionTree} from "../DecisionTree/DecisionTree";
import {DecisionNode} from "../DecisionTree/DecisionNode";

export class RandomForestModel extends TreeEnsembleModel{

    /**
     * Training algorithm for random forest classifier. Basically the algorithm creates K distinct decision trees from
     * K bootstrap samples of the original training set.
     *
     * @param trainSet   Training data given to the algorithm
     * @param parameters Parameters of the bagging trees algorithm. ensembleSize returns the number of trees in the random forest.
     */
    train(trainSet: InstanceList, parameters: Parameter): void {
        let forestSize = (<RandomForestParameter> parameters).getEnsembleSize();
        this.forest = new Array<DecisionTree>();
        for (let i = 0; i < forestSize; i++){
            let bootstrap = trainSet.bootstrap(i);
            let tree = new DecisionTree(new DecisionNode(new InstanceList(bootstrap.getSample()), undefined, <RandomForestParameter> parameters, false));
            this.forest.push(tree);
        }
    }

    /**
     * Loads the random forest model from an input file.
     * @param fileName File name of the random forest model.
     */
    loadModel(fileName: string): void{
        this.constructor2(fileName)
    }

}