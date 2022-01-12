import { Instance } from "../Instance/Instance";
import { Bootstrap } from "nlptoolkit-sampling/dist/Bootstrap";
import { DiscreteDistribution } from "nlptoolkit-math/dist/DiscreteDistribution";
import { Vector } from "nlptoolkit-math/dist/Vector";
import { Matrix } from "nlptoolkit-math/dist/Matrix";
import { Random } from "nlptoolkit-util/dist/Random";
export declare class InstanceList {
    protected list: Array<Instance>;
    /**
     * Constructor for an instance list with a given data definition, data file and a separator character. Each instance
     * must be stored in a separate line separated with the character separator. The last item must be the class label.
     * The function reads the file line by line and for each line; depending on the data definition, that is, type of
     * the attributes, adds discrete and continuous attributes to a new instance. For example, given the data set file
     * <p>
     * red;1;0.4;true
     * green;-1;0.8;true
     * blue;3;1.3;false
     * <p>
     * where the first attribute is a discrete attribute, second and third attributes are continuous attributes, the
     * fourth item is the class label.
     *
     * @param definition Data definition of the data set.
     * @param separator  Separator character which separates the attribute values in the data file.
     * @param fileName   Name of the data set file.
     */
    constructor(definition?: any, separator?: string, fileName?: string);
    /**
     * Adds instance to the instance list.
     *
     * @param instance Instance to be added.
     */
    add(instance: Instance): void;
    /**
     * Adds a list of instances to the current instance list.
     *
     * @param instanceList List of instances to be added.
     */
    addAll(instanceList: Array<Instance>): void;
    /**
     * Returns size of the instance list.
     *
     * @return Size of the instance list.
     */
    size(): number;
    /**
     * Accessor for a single instance with the given index.
     *
     * @param index Index of the instance.
     * @return Instance with index 'index'.
     */
    get(index: number): Instance;
    /**
     * Sorts instance list according to the attribute with index 'attributeIndex'.
     *
     * @param attributeIndex index of the attribute.
     */
    sort(attributeIndex?: number): void;
    /**
     * Shuffles the instance list.
     * @param random Random number generation.
     */
    shuffle(random: Random): void;
    /**
     * Creates a bootstrap sample from the current instance list.
     *
     * @param seed To create a different bootstrap sample, we need a new seed for each sample.
     * @return Bootstrap sample.
     */
    bootstrap(seed: number): Bootstrap<Instance>;
    /**
     * Extracts the class labels of each instance in the instance list and returns them in an array of {@link String}.
     *
     * @return An array list of class labels.
     */
    getClassLabels(): Array<string>;
    /**
     * Extracts the class labels of each instance in the instance list and returns them as a set.
     *
     * @return An {@link Array} of distinct class labels.
     */
    getDistinctClassLabels(): Array<string>;
    /**
     * Extracts the possible class labels of each instance in the instance list and returns them as a set.
     *
     * @return An {@link Array} of distinct class labels.
     */
    getUnionOfPossibleClassLabels(): Array<string>;
    /**
     * Extracts distinct discrete values of a given attribute as an array of strings.
     *
     * @param attributeIndex Index of the discrete attribute.
     * @return An array of distinct values of a discrete attribute.
     */
    getAttributeValueList(attributeIndex: number): Array<string>;
    /**
     * Calculates the mean of a single attribute for this instance list (m_i). If the attribute is discrete, the maximum
     * occurring value for that attribute is returned. If the attribute is continuous, the mean value of the values of
     * all instances are returned.
     *
     * @param index Index of the attribute.
     * @return The mean value of the instances as an attribute.
     */
    private attributeAverage;
    /**
     * Calculates the mean of a single attribute for this instance list (m_i).
     *
     * @param index Index of the attribute.
     * @return The mean value of the instances as an attribute.
     */
    continuousAttributeAverage(index?: number): Array<number>;
    /**
     * Calculates the standard deviation of a single attribute for this instance list (m_i). If the attribute is discrete,
     * null returned. If the attribute is continuous, the standard deviation  of the values all instances are returned.
     *
     * @param index Index of the attribute.
     * @return The standard deviation of the instances as an attribute.
     */
    private attributeStandardDeviation;
    /**
     * Calculates the standard deviation of a single continuous attribute for this instance list (m_i).
     *
     * @param index Index of the attribute.
     * @return The standard deviation of the instances as an attribute.
     */
    private continuousAttributeStandardDeviation;
    /**
     * The attributeDistribution method takes an index as an input and if the attribute of the instance at given index is
     * discrete, it returns the distribution of the attributes of that instance.
     *
     * @param index Index of the attribute.
     * @return Distribution of the attribute.
     */
    attributeDistribution(index: number): DiscreteDistribution;
    /**
     * The attributeClassDistribution method takes an attribute index as an input. It loops through the instances, gets
     * the corresponding value of given attribute index and adds the class label of that instance to the discrete distributions list.
     *
     * @param attributeIndex Index of the attribute.
     * @return Distribution of the class labels.
     */
    attributeClassDistribution(attributeIndex: number): Array<DiscreteDistribution>;
    /**
     * The discreteIndexedAttributeClassDistribution method takes an attribute index and an attribute value as inputs.
     * It loops through the instances, gets the corresponding value of given attribute index and given attribute value.
     * Then, adds the class label of that instance to the discrete indexed distributions list.
     *
     * @param attributeIndex Index of the attribute.
     * @param attributeValue Value of the attribute.
     * @return Distribution of the class labels.
     */
    discreteIndexedAttributeClassDistribution(attributeIndex: number, attributeValue: number): DiscreteDistribution;
    /**
     * The classDistribution method returns the distribution of all the class labels of instances.
     *
     * @return Distribution of the class labels.
     */
    classDistribution(): DiscreteDistribution;
    /**
     * The allAttributesDistribution method returns the distributions of all the attributes of instances.
     *
     * @return Distributions of all the attributes of instances.
     */
    allAttributesDistribution(): Array<DiscreteDistribution>;
    /**
     * Returns the mean of all the attributes for instances in the list.
     *
     * @return Mean of all the attributes for instances in the list.
     */
    average(): Instance;
    /**
     * Returns the standard deviation of attributes for instances.
     *
     * @return Standard deviation of attributes for instances.
     */
    standardDeviation(): Instance;
    /**
     * Calculates a covariance {@link Matrix} by using an average {@link Vector}.
     *
     * @param average Vector input.
     * @return Covariance {@link Matrix}.
     */
    covariance(average: Vector): Matrix;
    /**
     * Accessor for the instances.
     *
     * @return Instances.
     */
    getInstances(): Array<Instance>;
}
