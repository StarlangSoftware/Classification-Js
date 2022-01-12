import {InstanceList} from "./InstanceList";
import {InstanceListOfSameClass} from "./InstanceListOfSameClass";
import {DiscreteAttribute} from "../Attribute/DiscreteAttribute";
import {DiscreteIndexedAttribute} from "../Attribute/DiscreteIndexedAttribute";
import {ContinuousAttribute} from "../Attribute/ContinuousAttribute";
import {Instance} from "../Instance/Instance";
import {Random} from "nlptoolkit-util/dist/Random";

export class Partition {

    private multiList: Array<InstanceList> = new Array<InstanceList>()

    constructor(instanceList?: InstanceList, attributeIndex?: number, stratifiedOrValue?: any, random?: Random) {
        if (instanceList != undefined){
            if (attributeIndex == undefined){
                let classLabels = instanceList.getDistinctClassLabels();
                for (let classLabel of classLabels){
                    this.add(new InstanceListOfSameClass(classLabel));
                }
                for (let instance of instanceList.getInstances()) {
                    this.get(classLabels.indexOf(instance.getClassLabel())).add(instance);
                }
            } else {
                if (stratifiedOrValue == undefined){
                    let valueList = instanceList.getAttributeValueList(attributeIndex);
                    for (let value of valueList) {
                        this.add(new InstanceList());
                    }
                    for (let instance of instanceList.getInstances()) {
                        this.get(valueList.indexOf((<DiscreteAttribute> instance.getAttribute(attributeIndex)).getValue())).add(instance);
                    }
                } else {
                    if (typeof stratifiedOrValue == "boolean"){
                        this.add(new InstanceList());
                        this.add(new InstanceList());
                        if (stratifiedOrValue){
                            let distribution = instanceList.classDistribution();
                            let counts = new Array<number>(distribution.size).fill(0)
                            let randomArray = new Array<number>();
                            for (let i = 0; i < instanceList.size(); i++){
                                randomArray.push(i);
                            }
                            if (random != undefined){
                                random.shuffle(randomArray)
                            }
                            for (let i = 0; i < instanceList.size(); i++) {
                                let instance = instanceList.get(randomArray[i]);
                                let classIndex = distribution.getIndex(instance.getClassLabel());
                                let ratio = attributeIndex
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
                                let ratio = attributeIndex
                                if (i < instanceList.size() * ratio) {
                                    this.get(0).add(instance);
                                } else {
                                    this.get(1).add(instance);
                                }
                            }
                        }
                    } else {
                        this.add(new InstanceList());
                        this.add(new InstanceList());
                        if (Number.isInteger(stratifiedOrValue)){
                            for (let instance of instanceList.getInstances()) {
                                if ((<DiscreteIndexedAttribute> instance.getAttribute(attributeIndex)).getIndex() == stratifiedOrValue) {
                                    this.get(0).add(instance);
                                } else {
                                    this.get(1).add(instance);
                                }
                            }
                        } else {
                            for (let instance of instanceList.getInstances()) {
                                if ((<ContinuousAttribute> instance.getAttribute(attributeIndex)).getValue() <= stratifiedOrValue) {
                                    this.get(0).add(instance);
                                } else {
                                    this.get(1).add(instance);
                                }
                            }
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