import { ValidatedModel } from "../ValidatedModel";
import { DecisionNode } from "./DecisionNode";
import { Instance } from "../../Instance/Instance";
import { InstanceList } from "../../InstanceList/InstanceList";
export declare class DecisionTree extends ValidatedModel {
    private readonly root;
    /**
     * Constructor that sets root node of the decision tree.
     *
     * @param rootOrFileName DecisionNode type input or fileName
     */
    constructor(rootOrFileName: DecisionNode | string);
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
}
