import {Model} from "./Model";
import {Instance} from "../Instance/Instance";
import {DiscreteDistribution} from "nlptoolkit-math/dist/DiscreteDistribution";
import {InstanceList} from "../InstanceList/InstanceList";
import {CompositeInstance} from "../Instance/CompositeInstance";
import {FileContents} from "nlptoolkit-util/dist/FileContents";

export class DummyModel extends Model{

    private distribution: DiscreteDistribution

    /**
     * Constructor which sets the distribution using the given {@link InstanceList}.
     *
     * @param trainSet {@link InstanceList} which is used to get the class distribution.
     */
    constructor(trainSet: InstanceList | string) {
        super();
        if (trainSet instanceof InstanceList){
            this.distribution = trainSet.classDistribution();
        } else {
            let input = new FileContents(trainSet)
            this.distribution = Model.loadDiscreteDistribution(input)
        }
    }

    /**
     * The predict method takes an Instance as an input and returns the entry of distribution which has the maximum value.
     *
     * @param instance Instance to make prediction.
     * @return The entry of distribution which has the maximum value.
     */
    predict(instance: Instance): string {
        if ((instance instanceof CompositeInstance)) {
            let possibleClassLabels = (<CompositeInstance> instance).getPossibleClassLabels();
            return this.distribution.getMaxItem(possibleClassLabels);
        } else {
            return this.distribution.getMaxItem();
        }
    }

    /**
     * Calculates the posterior probability distribution for the given instance according to dummy model.
     * @param instance Instance for which posterior probability distribution is calculated.
     * @return Posterior probability distribution for the given instance.
     */
    predictProbability(instance: Instance): Map<string, number> {
        return this.distribution.getProbabilityDistribution();
    }

    saveTxt(fileName: string){
    }

}