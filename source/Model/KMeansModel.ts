import {GaussianModel} from "./GaussianModel";
import {InstanceList} from "../InstanceList/InstanceList";
import {DistanceMetric} from "../DistanceMetric/DistanceMetric";
import {Instance} from "../Instance/Instance";
import {DiscreteDistribution} from "nlptoolkit-math/dist/DiscreteDistribution";
import {FileContents} from "nlptoolkit-util/dist/FileContents";
import {EuclidianDistance} from "../DistanceMetric/EuclidianDistance";

export class KMeansModel extends GaussianModel{

    private classMeans: InstanceList
    private distanceMetric: DistanceMetric

    /**
     * The constructor that sets the classMeans, priorDistribution and distanceMetric according to given inputs.
     *
     * @param priorDistributionOrFileName {@link DiscreteDistribution} input.
     * @param classMeans        {@link InstanceList} of class means.
     * @param distanceMetric    {@link DistanceMetric} input.
     */
    constructor(priorDistributionOrFileName: DiscreteDistribution | string, classMeans?: InstanceList, distanceMetric?: DistanceMetric) {
        super()
        if (priorDistributionOrFileName instanceof DiscreteDistribution){
            this.classMeans = classMeans
            this.priorDistribution = priorDistributionOrFileName
            this.distanceMetric = distanceMetric
        } else {
            this.distanceMetric = new EuclidianDistance()
            let input = new FileContents(priorDistributionOrFileName)
            this.loadPriorDistribution(input)
            this.classMeans = this.loadInstanceList(input)
        }
    }

    /**
     * The calculateMetric method takes an {@link Instance} and a String as inputs. It loops through the class means, if
     * the corresponding class label is same as the given String it returns the negated distance between given instance and the
     * current item of class means. Otherwise it returns the smallest negative number.
     *
     * @param instance {@link Instance} input.
     * @param Ci       String input.
     * @return The negated distance between given instance and the current item of class means.
     */
    calculateMetric(instance: Instance, Ci: string): number {
        for (let i = 0; i < this.classMeans.size(); i++) {
            if (this.classMeans.get(i).getClassLabel() == Ci) {
                return -this.distanceMetric.distance(instance, this.classMeans.get(i));
            }
        }
        return Number.NEGATIVE_INFINITY;
    }

    saveTxt(fileName: string){
    }

}