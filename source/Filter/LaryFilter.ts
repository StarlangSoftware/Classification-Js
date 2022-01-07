import {FeatureFilter} from "./FeatureFilter";
import {DiscreteDistribution} from "nlptoolkit-math/dist/DiscreteDistribution";
import {DataSet} from "../DataSet/DataSet";
import {Instance} from "../Instance/Instance";

export abstract class LaryFilter extends FeatureFilter{

    protected attributeDistributions: Array<DiscreteDistribution>

    /**
     * Constructor that sets the dataSet and all the attributes distributions.
     *
     * @param dataSet DataSet that will bu used.
     */
    constructor(dataSet: DataSet) {
        super(dataSet);
        this.attributeDistributions = dataSet.getInstanceList().allAttributesDistribution()
    }

    /**
     * The removeDiscreteAttributes method takes an {@link Instance} as an input, and removes the discrete attributes from
     * given instance.
     *
     * @param instance Instance to removes attributes from.
     * @param size     Size of the given instance.
     */
    protected removeDiscreteAttributesFromInstance(instance: Instance, size: number){
        let k = 0;
        for (let i = 0; i < size; i++) {
            if (this.attributeDistributions[i].size > 0) {
                instance.removeAttribute(k);
            } else {
                k++;
            }
        }
    }

    /**
     * The removeDiscreteAttributes method removes the discrete attributes from dataDefinition.
     *
     * @param size Size of item that attributes will be removed.
     */
    protected removeDiscreteAttributesFromDataDefinition(size: number){
        let dataDefinition = this.dataSet.getDataDefinition();
        let k = 0;
        for (let i = 0; i < size; i++) {
            if (this.attributeDistributions[i].size > 0) {
                dataDefinition.removeAttribute(k);
            } else {
                k++;
            }
        }
    }
}