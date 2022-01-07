import {Parameter} from "./Parameter";
import {DistanceMetric} from "../DistanceMetric/DistanceMetric";
import {EuclidianDistance} from "../DistanceMetric/EuclidianDistance";

export class KMeansParameter extends Parameter{

    protected distanceMetric: DistanceMetric

    /**
     * * Parameters of the K Means classifier.
     *
     * @param seed           Seed is used for random number generation.
     * @param distanceMetric distance metric used to calculate the distance between two instances.
     */
    constructor(seed: number, distanceMetric?: DistanceMetric) {
        super(seed);
        if (distanceMetric == undefined){
            this.distanceMetric = new EuclidianDistance()
        } else {
            this.distanceMetric = distanceMetric
        }
    }

    /**
     * Accessor for the distanceMetric.
     *
     * @return The distanceMetric.
     */
    getDistanceMetric(): DistanceMetric{
        return this.distanceMetric
    }

}