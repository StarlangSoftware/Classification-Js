import { InstanceList } from "./InstanceList";
import { Instance } from "../Instance/Instance";
import { Random } from "nlptoolkit-util/dist/Random";
export declare class Partition {
    private multiList;
    /**
     * Divides the instances in the instance list into partitions so that all instances of a class are grouped in a
     * single partition.
     * @param instanceList Instance list for which partition will be created.
     */
    constructor1(instanceList: InstanceList): void;
    /**
     * Creates a partition depending on the distinct values of a discrete attribute. If the discrete attribute has 4
     * distinct values, the resulting partition will have 4 groups, where each group contain instance whose
     * values of that discrete attribute are the same.
     *
     * @param instanceList Instance list for which partition will be created.
     * @param attributeIndex Index of the discrete attribute.
     */
    constructor2(instanceList: InstanceList, attributeIndex: number): void;
    /**
     * Creates a stratified partition of the current instance list. In a stratified partition, the percentage of each
     * class is preserved. For example, let's say there are three classes in the instance list, and let the percentages of
     * these classes be %20, %30, and %50; then the percentages of these classes in the stratified partitions are the
     * same, that is, %20, %30, and %50.
     *
     * @param instanceList Instance list for which partition will be created.
     * @param ratio Ratio of the stratified partition. Ratio is between 0 and 1. If the ratio is 0.2, then 20 percent
     *              of the instances are put in the first group, 80 percent of the instances are put in the second group.
     * @param random random is used as a random number.
     * @param stratified If true, stratified partition is obtained.
     */
    constructor3(instanceList: InstanceList, ratio: number, random: Random, stratified: boolean): void;
    /**
     * Creates a partition depending on the distinct values of a discrete indexed attribute.
     *
     * @param instanceList Instance list for which partition will be created.
     * @param attributeIndex Index of the discrete indexed attribute.
     * @param attributeValue Value of the attribute.
     */
    constructor4(instanceList: InstanceList, attributeIndex: number, attributeValue: number): void;
    /**
     * Creates a two group partition depending on the values of a continuous attribute. If the value of the attribute is
     * less than splitValue, the instance is forwarded to the first group, else it is forwarded to the second group.
     *
     * @param instanceList Instance list for which partition will be created.
     * @param attributeIndex Index of the continuous attribute
     * @param splitValue     Threshold to divide instances
     */
    constructor5(instanceList: InstanceList, attributeIndex: number, splitValue: number): void;
    constructor(instanceList?: InstanceList, attributeIndex?: number, stratifiedOrValue?: any, random?: Random);
    /**
     * Adds given instance list to the list of instance lists.
     *
     * @param list Instance list to add.
     */
    add(list: InstanceList): void;
    /**
     * Returns the size of the list of instance lists.
     *
     * @return The size of the list of instance lists.
     */
    size(): number;
    /**
     * Returns the corresponding instance list at given index of list of instance lists.
     *
     * @param index Index of the instance list.
     * @return Instance list at given index of list of instance lists.
     */
    get(index: number): InstanceList;
    /**
     * Returns the instances of the items at the list of instance lists.
     *
     * @return Instances of the items at the list of instance lists.
     */
    getLists(): Array<Array<Instance>>;
}
