import {Instance} from "../Instance/Instance";
import {DataDefinition} from "../DataSet/DataDefinition";
import * as fs from "fs";
import {BinaryAttribute} from "../Attribute/BinaryAttribute";
import {DiscreteAttribute} from "../Attribute/DiscreteAttribute";
import {ContinuousAttribute} from "../Attribute/ContinuousAttribute";
import {AttributeType} from "../Attribute/AttributeType";
import {Bootstrap} from "nlptoolkit-sampling/dist/Bootstrap";
import {CompositeInstance} from "../Instance/CompositeInstance";
import {Attribute} from "../Attribute/Attribute";
import {Model} from "../Model/Model";
import {DiscreteIndexedAttribute} from "../Attribute/DiscreteIndexedAttribute";
import {DiscreteDistribution} from "nlptoolkit-math/dist/DiscreteDistribution";
import {Vector} from "nlptoolkit-math/dist/Vector";
import {Matrix} from "nlptoolkit-math/dist/Matrix";
import {Random} from "nlptoolkit-util/dist/Random";

export class InstanceList {

    protected list: Array<Instance> = new Array<Instance>()

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
    constructor(definition?: any, separator?: string, fileName?: string) {
        if (definition != undefined){
            if (definition instanceof DataDefinition){
                let data = fs.readFileSync(fileName, 'utf8')
                let lines = data.split("\n")
                for (let line of lines){
                    let attributeList : Array<string> = line.split(separator);
                    if (attributeList.length == definition.attributeCount() + 1) {
                        let current = new Instance(attributeList[attributeList.length - 1]);
                        for (let i = 0; i < attributeList.length - 1; i++) {
                            switch (definition.getAttributeType(i)) {
                                case AttributeType.DISCRETE:
                                    current.addAttribute(new DiscreteAttribute(attributeList[i]));
                                    break;
                                case AttributeType.DISCRETE_INDEXED:
                                    current.addAttribute(new DiscreteIndexedAttribute(attributeList[i],
                                        definition.featureValueIndex(i, attributeList[i]),
                                        definition.numberOfValues(i)))
                                    break;
                                case AttributeType.BINARY:
                                    if (attributeList[i].toLowerCase() == "yes" || attributeList[i] == "1"){
                                        current.addAttribute(new BinaryAttribute(true));
                                    } else {
                                        current.addAttribute(new BinaryAttribute(false));
                                    }
                                    break;
                                case AttributeType.CONTINUOUS:
                                    current.addAttribute(new ContinuousAttribute(Number.parseFloat(attributeList[i])));
                                    break;
                            }
                        }
                        this.list.push(current);
                    }
                }
            } else {
                this.list = definition
            }
        }
    }

    /**
     * Adds instance to the instance list.
     *
     * @param instance Instance to be added.
     */
    add(instance: Instance){
        this.list.push(instance)
    }

    /**
     * Adds a list of instances to the current instance list.
     *
     * @param instanceList List of instances to be added.
     */
    addAll(instanceList: Array<Instance>){
        for (let instance of instanceList){
            this.list.push(instance)
        }
    }

    /**
     * Returns size of the instance list.
     *
     * @return Size of the instance list.
     */
    size(): number{
        return this.list.length
    }

    /**
     * Accessor for a single instance with the given index.
     *
     * @param index Index of the instance.
     * @return Instance with index 'index'.
     */
    get(index: number): Instance{
        return this.list[index]
    }

    /**
     * Sorts instance list according to the attribute with index 'attributeIndex'.
     *
     * @param attributeIndex index of the attribute.
     */
    sort(attributeIndex?: number){
        if (attributeIndex == undefined){
            this.list.sort((a: Instance, b: Instance) =>
                (a.getClassLabel() < b.getClassLabel() ? -1 :
                a.getClassLabel() > b.getClassLabel() ? 1 : 0))
        } else {
            this.list.sort((a: Instance, b: Instance) =>
                (<ContinuousAttribute> a.getAttribute(attributeIndex)).getValue() < (<ContinuousAttribute> b.getAttribute(attributeIndex)).getValue() ? -1:
                    (<ContinuousAttribute> a.getAttribute(attributeIndex)).getValue() > (<ContinuousAttribute> b.getAttribute(attributeIndex)).getValue() ? 1: 0)
        }
    }

    /**
     * Shuffles the instance list.
     * @param random Random number generation.
     */
    shuffle(random: Random){
        random.shuffle(this.list)
    }

    /**
     * Creates a bootstrap sample from the current instance list.
     *
     * @param seed To create a different bootstrap sample, we need a new seed for each sample.
     * @return Bootstrap sample.
     */
    bootstrap(seed: number): Bootstrap<Instance>{
        return new Bootstrap<Instance>(this.list, seed)
    }

    /**
     * Extracts the class labels of each instance in the instance list and returns them in an array of {@link String}.
     *
     * @return An array list of class labels.
     */
    getClassLabels(): Array<string>{
        let classLabels = new Array<string>();
        for (let instance of this.list) {
            classLabels.push(instance.getClassLabel());
        }
        return classLabels;
    }

    /**
     * Extracts the class labels of each instance in the instance list and returns them as a set.
     *
     * @return An {@link Array} of distinct class labels.
     */
    getDistinctClassLabels(): Array<string>{
        let classLabels = new Array<string>();
        for (let instance of this.list) {
            if (!classLabels.includes(instance.getClassLabel())) {
                classLabels.push(instance.getClassLabel());
            }
        }
        return classLabels;
    }

    /**
     * Extracts the possible class labels of each instance in the instance list and returns them as a set.
     *
     * @return An {@link Array} of distinct class labels.
     */
    getUnionOfPossibleClassLabels(): Array<string>{
        let possibleClassLabels = new Array<string>();
        for (let instance of this.list) {
            if (instance instanceof CompositeInstance) {
                let compositeInstance = <CompositeInstance> instance;
                for (let possibleClassLabel of compositeInstance.getPossibleClassLabels()) {
                    if (!possibleClassLabels.includes(possibleClassLabel)) {
                        possibleClassLabels.push(possibleClassLabel);
                    }
                }
            } else {
                if (!possibleClassLabels.includes(instance.getClassLabel())) {
                    possibleClassLabels.push(instance.getClassLabel());
                }
            }
        }
        return possibleClassLabels;
    }

    /**
     * Extracts distinct discrete values of a given attribute as an array of strings.
     *
     * @param attributeIndex Index of the discrete attribute.
     * @return An array of distinct values of a discrete attribute.
     */
    getAttributeValueList(attributeIndex: number): Array<string>{
        let valueList = new Array<string>();
        for (let instance of this.list) {
            if (!valueList.includes((<DiscreteAttribute> instance.getAttribute(attributeIndex)).getValue())) {
                valueList.push((<DiscreteAttribute> instance.getAttribute(attributeIndex)).getValue());
            }
        }
        return valueList;
    }

    /**
     * Calculates the mean of a single attribute for this instance list (m_i). If the attribute is discrete, the maximum
     * occurring value for that attribute is returned. If the attribute is continuous, the mean value of the values of
     * all instances are returned.
     *
     * @param index Index of the attribute.
     * @return The mean value of the instances as an attribute.
     */
    private attributeAverage(index: number): Attribute{
        if (this.list[0].getAttribute(index) instanceof DiscreteAttribute) {
            let values = new Array<string>();
            for (let instance of this.list) {
                values.push((<DiscreteAttribute> instance.getAttribute(index)).getValue());
            }
            return new DiscreteAttribute(Model.getMaximum(values));
        } else {
            if (this.list[0].getAttribute(index) instanceof ContinuousAttribute) {
                let sum = 0.0;
                for (let instance of this.list) {
                    sum += (<ContinuousAttribute> instance.getAttribute(index)).getValue();
                }
                return new ContinuousAttribute(sum / this.list.length);
            } else {
                return undefined;
            }
        }
    }

    /**
     * Calculates the mean of a single attribute for this instance list (m_i).
     *
     * @param index Index of the attribute.
     * @return The mean value of the instances as an attribute.
     */
    public continuousAttributeAverage(index?: number): Array<number>{
        if (index == undefined){
            let result = new Array<number>();
            for (let i = 0; i < this.list[0].attributeSize(); i++) {
                for (let attribute of this.continuousAttributeAverage(i)){
                    result.push(attribute);
                }
            }
            return result;
        } else {
            if (this.list[0].getAttribute(index) instanceof DiscreteIndexedAttribute) {
                let maxIndexSize = (<DiscreteIndexedAttribute> this.list[0].getAttribute(index)).getMaxIndex();
                let values = new Array<number>();
                for (let i = 0; i < maxIndexSize; i++) {
                    values.push(0.0);
                }
                for (let instance of this.list) {
                    let valueIndex = (<DiscreteIndexedAttribute> instance.getAttribute(index)).getIndex();
                    values[valueIndex]++;
                }
                for (let i = 0; i < values.length; i++) {
                    values[i] /= this.list.length;
                }
                return values;
            } else {
                if (this.list[0].getAttribute(index) instanceof ContinuousAttribute) {
                    let sum = 0.0;
                    for (let instance of this.list) {
                        sum += (<ContinuousAttribute> instance.getAttribute(index)).getValue();
                    }
                    let values = new Array<number>();
                    values.push(sum / this.list.length);
                    return values;
                } else {
                    return undefined;
                }
            }
        }
    }

    /**
     * Calculates the standard deviation of a single attribute for this instance list (m_i). If the attribute is discrete,
     * null returned. If the attribute is continuous, the standard deviation  of the values all instances are returned.
     *
     * @param index Index of the attribute.
     * @return The standard deviation of the instances as an attribute.
     */
    private attributeStandardDeviation(index: number): Attribute{
        if (this.list[0].getAttribute(index) instanceof ContinuousAttribute) {
            let sum = 0.0;
            for (let instance of this.list) {
                sum += (<ContinuousAttribute> instance.getAttribute(index)).getValue();
            }
            let average = sum / this.list.length;
            sum = 0.0;
            for (let instance of this.list) {
                sum += Math.pow((<ContinuousAttribute> instance.getAttribute(index)).getValue() - average, 2);
            }
            return new ContinuousAttribute(Math.sqrt(sum / (this.list.length - 1)));
        } else {
            return undefined;
        }
    }

    /**
     * Calculates the standard deviation of a single continuous attribute for this instance list (m_i).
     *
     * @param index Index of the attribute.
     * @return The standard deviation of the instances as an attribute.
     */
    private continuousAttributeStandardDeviation(index?: number): Array<number>{
        if (index == undefined){
            let result = new Array<number>();
            for (let i = 0; i < this.list[0].attributeSize(); i++) {
                for (let attribute of this.continuousAttributeStandardDeviation(i)){
                    result.push(attribute);
                }
            }
            return result;
        } else {
            if (this.list[0].getAttribute(index) instanceof DiscreteIndexedAttribute) {
                let maxIndexSize = (<DiscreteIndexedAttribute> this.list[0].getAttribute(index)).getMaxIndex();
                let averages = new Array<number>();
                for (let i = 0; i < maxIndexSize; i++) {
                    averages.push(0.0);
                }
                for (let instance of this.list) {
                    let valueIndex = (<DiscreteIndexedAttribute> instance.getAttribute(index)).getIndex();
                    averages[valueIndex]++;
                }
                for (let i = 0; i < averages.length; i++) {
                    averages[i] /= this.list.length;
                }
                let values = new Array<number>();
                for (let i = 0; i < maxIndexSize; i++) {
                    values.push(0.0);
                }
                for (let instance of this.list) {
                    let valueIndex = (<DiscreteIndexedAttribute> instance.getAttribute(index)).getIndex();
                    for (let i = 0; i < maxIndexSize; i++) {
                        if (i == valueIndex) {
                            values[i] += Math.pow(1 - averages[i], 2);
                        } else {
                            values[i] += Math.pow(averages[i], 2);
                        }
                    }
                }
                for (let i = 0; i < values.length; i++) {
                    values[i] = Math.sqrt(values[i] / (this.list.length - 1));
                }
                return values;
            } else {
                if (this.list[0].getAttribute(index) instanceof ContinuousAttribute) {
                    let sum = 0.0;
                    for (let instance of this.list) {
                        sum += (<ContinuousAttribute> instance.getAttribute(index)).getValue();
                    }
                    let average = sum / this.list.length;
                    sum = 0.0;
                    for (let instance of this.list) {
                        sum += Math.pow((<ContinuousAttribute> instance.getAttribute(index)).getValue() - average, 2);
                    }
                    let result = new Array<number>();
                    result.push(Math.sqrt(sum / (this.list.length - 1)));
                    return result;
                } else {
                    return undefined;
                }
            }
        }
    }

    /**
     * The attributeDistribution method takes an index as an input and if the attribute of the instance at given index is
     * discrete, it returns the distribution of the attributes of that instance.
     *
     * @param index Index of the attribute.
     * @return Distribution of the attribute.
     */
    attributeDistribution(index: number): DiscreteDistribution{
        let distribution = new DiscreteDistribution();
        if (this.list[0].getAttribute(index) instanceof DiscreteAttribute) {
            for (let instance of this.list) {
                distribution.addItem((<DiscreteAttribute> instance.getAttribute(index)).getValue());
            }
        }
        return distribution;
    }

    /**
     * The attributeClassDistribution method takes an attribute index as an input. It loops through the instances, gets
     * the corresponding value of given attribute index and adds the class label of that instance to the discrete distributions list.
     *
     * @param attributeIndex Index of the attribute.
     * @return Distribution of the class labels.
     */
    attributeClassDistribution(attributeIndex: number): Array<DiscreteDistribution>{
        let distributions = new Array<DiscreteDistribution>();
        let valueList = this.getAttributeValueList(attributeIndex);
        for (let ignored of valueList) {
            distributions.push(new DiscreteDistribution());
        }
        for (let instance of this.list) {
            distributions[valueList.indexOf((<DiscreteAttribute> instance.getAttribute(attributeIndex)).getValue())].addItem(instance.getClassLabel());
        }
        return distributions;
    }

    /**
     * The discreteIndexedAttributeClassDistribution method takes an attribute index and an attribute value as inputs.
     * It loops through the instances, gets the corresponding value of given attribute index and given attribute value.
     * Then, adds the class label of that instance to the discrete indexed distributions list.
     *
     * @param attributeIndex Index of the attribute.
     * @param attributeValue Value of the attribute.
     * @return Distribution of the class labels.
     */
    discreteIndexedAttributeClassDistribution(attributeIndex: number, attributeValue: number): DiscreteDistribution{
        let distribution = new DiscreteDistribution();
        for (let instance of this.list) {
            if ((<DiscreteIndexedAttribute> instance.getAttribute(attributeIndex)).getIndex() == attributeValue) {
                distribution.addItem(instance.getClassLabel());
            }
        }
        return distribution;
    }

    /**
     * The classDistribution method returns the distribution of all the class labels of instances.
     *
     * @return Distribution of the class labels.
     */
    classDistribution(): DiscreteDistribution{
        let distribution = new DiscreteDistribution();
        for (let instance of this.list) {
            distribution.addItem(instance.getClassLabel());
        }
        return distribution;
    }

    /**
     * The allAttributesDistribution method returns the distributions of all the attributes of instances.
     *
     * @return Distributions of all the attributes of instances.
     */
    allAttributesDistribution(): Array<DiscreteDistribution>{
        let distributions = new Array<DiscreteDistribution>();
        for (let i = 0; i < this.list[0].attributeSize(); i++) {
            distributions.push(this.attributeDistribution(i));
        }
        return distributions;
    }

    /**
     * Returns the mean of all the attributes for instances in the list.
     *
     * @return Mean of all the attributes for instances in the list.
     */
    average(): Instance{
        let result = new Instance(this.list[0].getClassLabel());
        for (let i = 0; i < this.list[0].attributeSize(); i++) {
            result.addAttribute(this.attributeAverage(i));
        }
        return result;
    }

    /**
     * Returns the standard deviation of attributes for instances.
     *
     * @return Standard deviation of attributes for instances.
     */
    standardDeviation(): Instance{
        let result = new Instance(this.list[0].getClassLabel());
        for (let i = 0; i < this.list[0].attributeSize(); i++) {
            result.addAttribute(this.attributeStandardDeviation(i));
        }
        return result;
    }

    /**
     * Calculates a covariance {@link Matrix} by using an average {@link Vector}.
     *
     * @param average Vector input.
     * @return Covariance {@link Matrix}.
     */
    covariance(average: Vector): Matrix{
        let result = new Matrix(this.list[0].continuousAttributeSize(), this.list[0].continuousAttributeSize());
        for (let instance of this.list) {
            let continuousAttributes = instance.continuousAttributes();
            for (let i = 0; i < instance.continuousAttributeSize(); i++) {
                let xi = continuousAttributes[i];
                let mi = average.getValue(i);
                for (let j = 0; j < instance.continuousAttributeSize(); j++) {
                    let xj = continuousAttributes[j];
                    let mj = average.getValue(j);
                    result.addValue(i, j, (xi - mi) * (xj - mj));
                }
            }
        }
        result.divideByConstant(this.list.length - 1);
        return result;
    }

    /**
     * Accessor for the instances.
     *
     * @return Instances.
     */
    getInstances(): Array<Instance>{
        return this.list
    }
}