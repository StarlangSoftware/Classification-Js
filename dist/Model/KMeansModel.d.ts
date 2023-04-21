import { GaussianModel } from "./GaussianModel";
import { InstanceList } from "../InstanceList/InstanceList";
import { DistanceMetric } from "../DistanceMetric/DistanceMetric";
import { Instance } from "../Instance/Instance";
import { DiscreteDistribution } from "nlptoolkit-math/dist/DiscreteDistribution";
export declare class KMeansModel extends GaussianModel {
    private classMeans;
    private distanceMetric;
    /**
     * The constructor that sets the classMeans, priorDistribution and distanceMetric according to given inputs.
     *
     * @param priorDistributionOrFileName {@link DiscreteDistribution} input.
     * @param classMeans        {@link InstanceList} of class means.
     * @param distanceMetric    {@link DistanceMetric} input.
     */
    constructor(priorDistributionOrFileName: DiscreteDistribution | string, classMeans?: InstanceList, distanceMetric?: DistanceMetric);
    /**
     * The calculateMetric method takes an {@link Instance} and a String as inputs. It loops through the class means, if
     * the corresponding class label is same as the given String it returns the negated distance between given instance and the
     * current item of class means. Otherwise it returns the smallest negative number.
     *
     * @param instance {@link Instance} input.
     * @param Ci       String input.
     * @return The negated distance between given instance and the current item of class means.
     */
    calculateMetric(instance: Instance, Ci: string): number;
    saveTxt(fileName: string): void;
}
