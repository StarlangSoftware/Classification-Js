import {Classifier} from "./Classifier";
import {InstanceList} from "../InstanceList/InstanceList";
import {Parameter} from "../Parameter/Parameter";
import {RandomForestParameter} from "../Parameter/RandomForestParameter";
import {DecisionTree} from "../Model/DecisionTree/DecisionTree";
import {DecisionNode} from "../Model/DecisionTree/DecisionNode";
import {TreeEnsembleModel} from "../Model/TreeEnsembleModel";

export class RandomForest extends Classifier{

    /**
     * Training algorithm for random forest classifier. Basically the algorithm creates K distinct decision trees from
     * K bootstrap samples of the original training set.
     *
     * @param trainSet   Training data given to the algorithm
     * @param parameters Parameters of the bagging trees algorithm. ensembleSize returns the number of trees in the random forest.
     */
    train(trainSet: InstanceList, parameters: Parameter): void {
        let forestSize = (<RandomForestParameter> parameters).getEnsembleSize();
        let forest = new Array<DecisionTree>();
        for (let i = 0; i < forestSize; i++){
            let bootstrap = trainSet.bootstrap(i);
            let tree = new DecisionTree(new DecisionNode(new InstanceList(bootstrap.getSample()), undefined, <RandomForestParameter> parameters, false));
            forest.push(tree);
        }
        this.model = new TreeEnsembleModel(forest);
    }

    /**
     * Loads the random forest model from an input file.
     * @param fileName File name of the random forest model.
     */
    loadModel(fileName: string): void{
        this.model = new TreeEnsembleModel(fileName)
    }

}