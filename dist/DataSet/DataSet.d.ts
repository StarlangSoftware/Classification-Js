import { InstanceList } from "../InstanceList/InstanceList";
import { DataDefinition } from "./DataDefinition";
import { Instance } from "../Instance/Instance";
import { FeatureSubSet } from "../FeatureSelection/FeatureSubSet";
export declare class DataSet {
    private instances;
    private definition;
    /**
     * Constructor for generating a new {@link DataSet} with given {@link DataDefinition}.
     *
     * @param definition Data definition of the data set.
     * @param separator  Separator character which separates the attribute values in the data file.
     * @param fileName   Name of the data set file.
     */
    constructor(definition?: any, separator?: string, fileName?: string);
    /**
     * Checks the correctness of the attribute type, for instance, if the attribute of given instance is a Binary attribute,
     * and the attribute type of the corresponding item of the data definition is also a Binary attribute, it then
     * returns true, and false otherwise.
     *
     * @param instance {@link Instance} to checks the attribute type.
     * @return true if attribute types of given {@link Instance} and data definition matches.
     */
    private checkDefinition;
    /**
     * Adds the attribute types according to given {@link Instance}. For instance, if the attribute type of given {@link Instance}
     * is a Discrete type, it than adds a discrete attribute type to the list of attribute types.
     *
     * @param instance {@link Instance} input.
     */
    private setDefinition;
    /**
     * Returns the size of the {@link InstanceList}.
     *
     * @return Size of the {@link InstanceList}.
     */
    sampleSize(): number;
    /**
     * Returns the size of the class label distribution of {@link InstanceList}.
     *
     * @return Size of the class label distribution of {@link InstanceList}.
     */
    classCount(): number;
    /**
     * Returns the number of attribute types at {@link DataDefinition} list.
     *
     * @return The number of attribute types at {@link DataDefinition} list.
     */
    attributeCount(): number;
    /**
     * Returns the number of discrete attribute types at {@link DataDefinition} list.
     *
     * @return The number of discrete attribute types at {@link DataDefinition} list.
     */
    discreteAttributeCount(): number;
    /**
     * Returns the number of continuous attribute types at {@link DataDefinition} list.
     *
     * @return The number of continuous attribute types at {@link DataDefinition} list.
     */
    continuousAttributeCount(): number;
    /**
     * Returns the accumulated {@link String} of class labels of the {@link InstanceList}.
     *
     * @return The accumulated {@link String} of class labels of the {@link InstanceList}.
     */
    getClasses(): string;
    /**
     * Adds a new instance to the {@link InstanceList}.
     *
     * @param current {@link Instance} to add.
     */
    addInstance(current: Instance): void;
    /**
     * Adds all the instances of given instance list to the {@link InstanceList}.
     *
     * @param instanceList {@link InstanceList} to add instances from.
     */
    addInstanceList(instanceList: Array<Instance>): void;
    /**
     * Returns the instances of {@link InstanceList}.
     *
     * @return The instances of {@link InstanceList}.
     */
    getInstances(): Array<Instance>;
    /**
     * Returns instances of the items at the list of instance lists from the partitions.
     *
     * @return Instances of the items at the list of instance lists from the partitions.
     */
    getClassInstances(): Array<Array<Instance>>;
    /**
     * Accessor for the {@link InstanceList}.
     *
     * @return The {@link InstanceList}.
     */
    getInstanceList(): InstanceList;
    /**
     * Accessor for the data definition.
     *
     * @return The data definition.
     */
    getDataDefinition(): DataDefinition;
    /**
     * Return a subset generated via the given {@link FeatureSubSet}.
     *
     * @param featureSubSet {@link FeatureSubSet} input.
     * @return Subset generated via the given {@link FeatureSubSet}.
     */
    getSubSetOfFeatures(featureSubSet: FeatureSubSet): DataSet;
}
