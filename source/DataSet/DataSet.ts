import {InstanceList} from "../InstanceList/InstanceList";
import {DataDefinition} from "./DataDefinition";
import * as fs from "fs";
import {AttributeType} from "../Attribute/AttributeType";
import {Instance} from "../Instance/Instance";
import {CompositeInstance} from "../Instance/CompositeInstance";
import {ContinuousAttribute} from "../Attribute/ContinuousAttribute";
import {DiscreteAttribute} from "../Attribute/DiscreteAttribute";
import {BinaryAttribute} from "../Attribute/BinaryAttribute";
import {DiscreteIndexedAttribute} from "../Attribute/DiscreteIndexedAttribute";
import {Partition} from "../InstanceList/Partition";
import {FeatureSubSet} from "../FeatureSelection/FeatureSubSet";

export class DataSet {

    private instances: InstanceList = new InstanceList()
    private definition: DataDefinition = undefined

    /**
     * Constructor for generating a new {@link DataSet} with given {@link DataDefinition}.
     *
     * @param definition Data definition of the data set.
     * @param separator  Separator character which separates the attribute values in the data file.
     * @param fileName   Name of the data set file.
     */
    constructor(definition?: any, separator?: string, fileName?: string) {
        if (definition != undefined){
            if (definition instanceof DataDefinition && fileName == undefined){
                this.definition = definition
            } else {
                if (separator == undefined){
                    let data = fs.readFileSync(fileName, 'utf8')
                    let i = 0
                    let lines = data.split("\n")
                    for (let line of lines){
                        let attributes = line.split(",");
                        if (i == 0) {
                            for (let j = 0; j < attributes.length - 1; j++) {
                                if (Number.isNaN(attributes[j])){
                                    definition.addAttribute(AttributeType.DISCRETE);
                                } else {
                                    Number.parseFloat(attributes[j]);
                                    definition.addAttribute(AttributeType.CONTINUOUS);
                                }
                            }
                        } else {
                            if (attributes.length != definition.attributeCount() + 1) {
                                continue;
                            }
                        }
                        let instance : Instance
                        if (!attributes[attributes.length - 1].includes(";")) {
                            instance = new Instance(attributes[attributes.length - 1]);
                        } else {
                            let labels = attributes[attributes.length - 1].split(";");
                            instance = new CompositeInstance(labels[0]);
                            (<CompositeInstance> instance).setPossibleClassLabels(labels.slice(1))
                        }
                        for (let j = 0; j < attributes.length - 1; j++) {
                            switch (definition.getAttributeType(j)) {
                                case AttributeType.CONTINUOUS:
                                    instance.addAttribute(new ContinuousAttribute(Number.parseFloat(attributes[j])));
                                    break;
                                case AttributeType.DISCRETE:
                                    instance.addAttribute(new DiscreteAttribute(attributes[j]));
                                    break;
                            }
                        }
                        if (instance.attributeSize() == definition.attributeCount()) {
                            this.instances.add(instance);
                        }
                        i++;
                    }
                }
                else {
                    this.definition = definition;
                    this.instances = new InstanceList(definition, separator, fileName);
                }
            }
        }
    }

    /**
     * Checks the correctness of the attribute type, for instance, if the attribute of given instance is a Binary attribute,
     * and the attribute type of the corresponding item of the data definition is also a Binary attribute, it then
     * returns true, and false otherwise.
     *
     * @param instance {@link Instance} to checks the attribute type.
     * @return true if attribute types of given {@link Instance} and data definition matches.
     */
    private checkDefinition(instance: Instance): boolean{
        for (let i = 0; i < instance.attributeSize(); i++) {
            if (instance.getAttribute(i) instanceof BinaryAttribute) {
                if (this.definition.getAttributeType(i) != AttributeType.BINARY)
                    return false;
            } else {
                if (instance.getAttribute(i) instanceof DiscreteIndexedAttribute) {
                    if (this.definition.getAttributeType(i) != AttributeType.DISCRETE_INDEXED)
                        return false;
                } else {
                    if (instance.getAttribute(i) instanceof DiscreteAttribute) {
                        if (this.definition.getAttributeType(i) != AttributeType.DISCRETE)
                            return false;
                    } else {
                        if (instance.getAttribute(i) instanceof ContinuousAttribute) {
                            if (this.definition.getAttributeType(i) != AttributeType.CONTINUOUS)
                                return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    /**
     * Adds the attribute types according to given {@link Instance}. For instance, if the attribute type of given {@link Instance}
     * is a Discrete type, it than adds a discrete attribute type to the list of attribute types.
     *
     * @param instance {@link Instance} input.
     */
    private setDefinition(instance: Instance){
        let attributeTypes = new Array<AttributeType>();
        for (let i = 0; i < instance.attributeSize(); i++) {
            if (instance.getAttribute(i) instanceof BinaryAttribute) {
                attributeTypes.push(AttributeType.BINARY);
            } else {
                if (instance.getAttribute(i) instanceof DiscreteIndexedAttribute) {
                    attributeTypes.push(AttributeType.DISCRETE_INDEXED);
                } else {
                    if (instance.getAttribute(i) instanceof DiscreteAttribute) {
                        attributeTypes.push(AttributeType.DISCRETE);
                    } else {
                        if (instance.getAttribute(i) instanceof ContinuousAttribute) {
                            attributeTypes.push(AttributeType.CONTINUOUS);
                        }
                    }
                }
            }
        }
        this.definition = new DataDefinition(attributeTypes);
    }

    /**
     * Returns the size of the {@link InstanceList}.
     *
     * @return Size of the {@link InstanceList}.
     */
    sampleSize(): number{
        return this.instances.size()
    }

    /**
     * Returns the size of the class label distribution of {@link InstanceList}.
     *
     * @return Size of the class label distribution of {@link InstanceList}.
     */
    classCount(): number{
        return this.instances.classDistribution().size
    }

    /**
     * Returns the number of attribute types at {@link DataDefinition} list.
     *
     * @return The number of attribute types at {@link DataDefinition} list.
     */
    attributeCount(): number{
        return this.definition.attributeCount()
    }

    /**
     * Returns the number of discrete attribute types at {@link DataDefinition} list.
     *
     * @return The number of discrete attribute types at {@link DataDefinition} list.
     */
    discreteAttributeCount(): number{
        return this.definition.discreteAttributeCount()
    }

    /**
     * Returns the number of continuous attribute types at {@link DataDefinition} list.
     *
     * @return The number of continuous attribute types at {@link DataDefinition} list.
     */
    continuousAttributeCount(): number{
        return this.definition.continuousAttributeCount()
    }

    /**
     * Returns the accumulated {@link String} of class labels of the {@link InstanceList}.
     *
     * @return The accumulated {@link String} of class labels of the {@link InstanceList}.
     */
    getClasses(): string{
        let classLabels = this.instances.getDistinctClassLabels();
        let result = classLabels[0];
        for (let i = 1; i < classLabels.length; i++) {
            result = result + ";" + classLabels[i];
        }
        return result;
    }

    /**
     * Adds a new instance to the {@link InstanceList}.
     *
     * @param current {@link Instance} to add.
     */
    addInstance(current: Instance){
        if (this.definition == undefined) {
            this.setDefinition(current);
            this.instances.add(current);
        } else {
            if (this.checkDefinition(current)) {
                this.instances.add(current);
            }
        }
    }

    /**
     * Adds all the instances of given instance list to the {@link InstanceList}.
     *
     * @param instanceList {@link InstanceList} to add instances from.
     */
    addInstanceList(instanceList: Array<Instance>){
        for (let instance of instanceList) {
            this.addInstance(instance);
        }
    }

    /**
     * Returns the instances of {@link InstanceList}.
     *
     * @return The instances of {@link InstanceList}.
     */
    getInstances(): Array<Instance>{
        return this.instances.getInstances()
    }

    /**
     * Returns instances of the items at the list of instance lists from the partitions.
     *
     * @return Instances of the items at the list of instance lists from the partitions.
     */
    getClassInstances(): Array<Array<Instance>>{
        return new Partition(this.instances).getLists()
    }

    /**
     * Accessor for the {@link InstanceList}.
     *
     * @return The {@link InstanceList}.
     */
    getInstanceList(): InstanceList{
        return this.instances
    }

    /**
     * Accessor for the data definition.
     *
     * @return The data definition.
     */
    getDataDefinition(): DataDefinition{
        return this.definition
    }

    /**
     * Return a subset generated via the given {@link FeatureSubSet}.
     *
     * @param featureSubSet {@link FeatureSubSet} input.
     * @return Subset generated via the given {@link FeatureSubSet}.
     */
    getSubSetOfFeatures(featureSubSet: FeatureSubSet): DataSet{
        let result = new DataSet(this.definition.getSubSetOfFeatures(featureSubSet));
        for (let i = 0; i < this.instances.size(); i++) {
            result.addInstance(this.instances.get(i).getSubSetOfFeatures(featureSubSet));
        }
        return result;
    }
}