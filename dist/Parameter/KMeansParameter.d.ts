import { Parameter } from "./Parameter";
import { DistanceMetric } from "../DistanceMetric/DistanceMetric";
export declare class KMeansParameter extends Parameter {
    protected distanceMetric: DistanceMetric;
    /**
     * * Parameters of the K Means classifier.
     *
     * @param seed           Seed is used for random number generation.
     * @param distanceMetric distance metric used to calculate the distance between two instances.
     */
    constructor(seed: number, distanceMetric?: DistanceMetric);
    /**
     * Accessor for the distanceMetric.
     *
     * @return The distanceMetric.
     */
    getDistanceMetric(): DistanceMetric;
}
