import { InstanceList } from "./InstanceList";
import { Instance } from "../Instance/Instance";
import { Random } from "nlptoolkit-util/dist/Random";
export declare class Partition {
    private multiList;
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
