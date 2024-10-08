import { TreeEnsembleModel } from "./TreeEnsembleModel";
import { InstanceList } from "../../InstanceList/InstanceList";
import { Parameter } from "../../Parameter/Parameter";
export declare class BaggingModel extends TreeEnsembleModel {
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
    train(trainSet: InstanceList, parameters: Parameter): void;
    /**
     * Loads the Bagging ensemble model from an input file.
     * @param fileName File name of the decision tree model.
     */
    loadModel(fileName: string): void;
}
