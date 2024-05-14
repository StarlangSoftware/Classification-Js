import { Classifier } from "./Classifier";
import { InstanceList } from "../InstanceList/InstanceList";
import { Parameter } from "../Parameter/Parameter";
export declare class RandomForest extends Classifier {
    /**
     * Training algorithm for random forest classifier. Basically the algorithm creates K distinct decision trees from
     * K bootstrap samples of the original training set.
     *
     * @param trainSet   Training data given to the algorithm
     * @param parameters Parameters of the bagging trees algorithm. ensembleSize returns the number of trees in the random forest.
     */
    train(trainSet: InstanceList, parameters: Parameter): void;
    /**
     * Loads the random forest model from an input file.
     * @param fileName File name of the random forest model.
     */
    loadModel(fileName: string): void;
}
