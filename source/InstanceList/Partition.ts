import {InstanceList} from "./InstanceList";
import {InstanceListOfSameClass} from "./InstanceListOfSameClass";
import {DiscreteAttribute} from "../Attribute/DiscreteAttribute";
import {DiscreteIndexedAttribute} from "../Attribute/DiscreteIndexedAttribute";
import {ContinuousAttribute} from "../Attribute/ContinuousAttribute";
import {Instance} from "../Instance/Instance";
import {Random} from "nlptoolkit-util/dist/Random";

export class Partition {

    private multiList: Array<InstanceList> = new Array<InstanceList>()

    /**
     * Divides the instances in the instance list into partitions so that all instances of a class are grouped in a
     * single partition.
     * @param instanceList Instance list for which partition will be created.
     */
    constructor1(instanceList: InstanceList){
        let classLabels = instanceList.getDistinctClassLabels();
        for (let classLabel of classLabels){
            this.add(new InstanceListOfSameClass(classLabel));
        }
        for (let instance of instanceList.getInstances()) {
            this.get(classLabels.indexOf(instance.getClassLabel())).add(instance);
        }
    }

    /**
     * Creates a partition depending on the distinct values of a discrete attribute. If the discrete attribute has 4
     * distinct values, the resulting partition will have 4 groups, where each group contain instance whose
     * values of that discrete attribute are the same.
     *
     * @param instanceList Instance list for which partition will be created.
     * @param attributeIndex Index of the discrete attribute.
     */
    constructor2(instanceList: InstanceList, attributeIndex: number){
        let valueList = instanceList.getAttributeValueList(attributeIndex);
        for (let value of valueList) {
            this.add(new InstanceList());
        }
        for (let instance of instanceList.getInstances()) {
            this.get(valueList.indexOf((<DiscreteAttribute> instance.getAttribute(attributeIndex)).getValue())).add(instance);
        }
    }

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
    constructor3(instanceList: InstanceList, ratio: number, random: Random, stratified: boolean){
        this.add(new InstanceList());
        this.add(new InstanceList());
        if (stratified){
            let distribution = instanceList.classDistribution();
            let counts = new Array<number>(distribution.size).fill(0)
            let randomArray = new Array<number>()
            for (let i = 0; i < instanceList.size(); i++){
                randomArray.push(i);
            }
            if (random != undefined){
                random.shuffle(randomArray)
            }
            for (let i = 0; i < instanceList.size(); i++) {
                let instance = instanceList.get(randomArray[i]);
                let classIndex = distribution.getIndex(instance.getClassLabel());
                if (counts[classIndex] < instanceList.size() * ratio * distribution.getProbability(instance.getClassLabel())) {
                    this.get(0).add(instance);
                } else {
                    this.get(1).add(instance);
                }
                counts[classIndex]++;
            }
        } else {
            instanceList.shuffle(random)
            for (let i = 0; i < instanceList.size(); i++) {
                let instance = instanceList.get(i);
                if (i < instanceList.size() * ratio) {
                    this.get(0).add(instance);
                } else {
                    this.get(1).add(instance);
                }
            }
        }
    }

    /**
     * Creates a partition depending on the distinct values of a discrete indexed attribute.
     *
     * @param instanceList Instance list for which partition will be created.
     * @param attributeIndex Index of the discrete indexed attribute.
     * @param attributeValue Value of the attribute.
     */
    constructor4(instanceList: InstanceList, attributeIndex: number, attributeValue: number){
        this.add(new InstanceList());
        this.add(new InstanceList());
        for (let instance of instanceList.getInstances()) {
            if ((<DiscreteIndexedAttribute> instance.getAttribute(attributeIndex)).getIndex() == attributeValue) {
                this.get(0).add(instance);
            } else {
                this.get(1).add(instance);
            }
        }
    }

    /**
     * Creates a two group partition depending on the values of a continuous attribute. If the value of the attribute is
     * less than splitValue, the instance is forwarded to the first group, else it is forwarded to the second group.
     *
     * @param instanceList Instance list for which partition will be created.
     * @param attributeIndex Index of the continuous attribute
     * @param splitValue     Threshold to divide instances
     */
    constructor5(instanceList: InstanceList, attributeIndex: number, splitValue: number){
        this.add(new InstanceList());
        this.add(new InstanceList());
        for (let instance of instanceList.getInstances()) {
            if ((<ContinuousAttribute> instance.getAttribute(attributeIndex)).getValue() <= splitValue) {
                this.get(0).add(instance);
            } else {
                this.get(1).add(instance);
            }
        }
    }

    constructor(instanceList?: InstanceList, attributeIndex?: number, stratifiedOrValue?: any, random?: Random) {
        if (instanceList != undefined){
            if (attributeIndex == undefined){
                this.constructor1(instanceList);
            } else {
                if (stratifiedOrValue == undefined){
                    this.constructor2(instanceList, attributeIndex)
                } else {
                    if (typeof stratifiedOrValue == "boolean"){
                        this.constructor3(instanceList, attributeIndex, random, stratifiedOrValue)
                    } else {
                        if (Number.isInteger(stratifiedOrValue)){
                            this.constructor4(instanceList, attributeIndex, stratifiedOrValue);
                        } else {
                            this.constructor5(instanceList, attributeIndex, stratifiedOrValue);
                        }
                    }
                }
            }
        }
    }

    /**
     * Adds given instance list to the list of instance lists.
     *
     * @param list Instance list to add.
     */
    add(list: InstanceList){
        this.multiList.push(list)
    }

    /**
     * Returns the size of the list of instance lists.
     *
     * @return The size of the list of instance lists.
     */
    size(): number{
        return this.multiList.length
    }

    /**
     * Returns the corresponding instance list at given index of list of instance lists.
     *
     * @param index Index of the instance list.
     * @return Instance list at given index of list of instance lists.
     */
    get(index: number): InstanceList{
        return this.multiList[index]
    }

    /**
     * Returns the instances of the items at the list of instance lists.
     *
     * @return Instances of the items at the list of instance lists.
     */
    getLists(): Array<Array<Instance>>{
        let result = new Array<Array<Instance>>(this.multiList.length);
        for (let i = 0; i < this.multiList.length; i++) {
            result.push(this.multiList[i].getInstances());
        }
        return result;
    }

}