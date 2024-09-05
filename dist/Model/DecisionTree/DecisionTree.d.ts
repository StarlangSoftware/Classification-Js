import { ValidatedModel } from "../ValidatedModel";
import { DecisionNode } from "./DecisionNode";
import { Instance } from "../../Instance/Instance";
import { InstanceList } from "../../InstanceList/InstanceList";
import { Parameter } from "../../Parameter/Parameter";
export declare class DecisionTree extends ValidatedModel {
    protected root: DecisionNode;
    constructor2(fileName: string): void;
    constructor(root?: DecisionNode);
    /**
     * The predict method  performs prediction on the root node of given instance, and if it is null, it returns the
     * possible class labels. Otherwise, it returns the returned class labels.
     *
     * @param instance Instance make prediction.
     * @return Possible class labels.
     */
    predict(instance: Instance): string;
    /**
     * Calculates the posterior probability distribution for the given instance according to Decision tree model.
     * @param instance Instance for which posterior probability distribution is calculated.
     * @return Posterior probability distribution for the given instance.
     */
    predictProbability(instance: Instance): Map<string, number>;
    saveTxt(fileName: string): void;
    /**
     * The prune method takes a {@link DecisionNode} and an {@link InstanceList} as inputs. It checks the classification performance
     * of given InstanceList before pruning, i.e making a node leaf, and after pruning. If the after performance is better than the
     * before performance it prune the given InstanceList from the tree.
     *
     * @param node     DecisionNode that will be pruned if conditions hold.
     * @param pruneSet Small subset of tree that will be removed from tree.
     */
    pruneNode(node: DecisionNode, pruneSet: InstanceList): void;
    /**
     * The prune method takes an {@link InstanceList} and  performs pruning to the root node.
     *
     * @param pruneSet {@link InstanceList} to perform pruning.
     */
    prune(pruneSet: InstanceList): void;
    /**
     * Training algorithm for C4.5 univariate decision tree classifier. 20 percent of the data are left aside for pruning
     * 80 percent of the data is used for constructing the tree.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters -
     */
    train(trainSet: InstanceList, parameters: Parameter): void;
    /**
     * Loads the decision tree model from an input file.
     * @param fileName File name of the decision tree model.
     */
    loadModel(fileName: string): void;
}
