import {DistanceMetric} from "./DistanceMetric";
import {Instance} from "../Instance/Instance";
import {DiscreteAttribute} from "../Attribute/DiscreteAttribute";
import {ContinuousAttribute} from "../Attribute/ContinuousAttribute";

export class EuclidianDistance implements DistanceMetric{

    /**
     * Calculates Euclidian distance between two instances. For continuous features: \sum_{i=1}^d (x_i^(1) - x_i^(2))^2,
     * For discrete features: \sum_{i=1}^d 1(x_i^(1) == x_i^(2))
     *
     * @param instance1 First instance
     * @param instance2 Second instance
     * @return Euclidian distance between two instances.
     */
    distance(instance1: Instance, instance2: Instance): number {
        let result = 0;
        for (let i = 0; i < instance1.attributeSize(); i++) {
            if (instance1.getAttribute(i) instanceof DiscreteAttribute && instance2.getAttribute(i) instanceof DiscreteAttribute) {
                if ((<DiscreteAttribute> instance1.getAttribute(i)).getValue() != null && (<DiscreteAttribute> instance1.getAttribute(i)).getValue() != (<DiscreteAttribute> instance2.getAttribute(i)).getValue()) {
                    result += 1;
                }
            } else {
                if (instance1.getAttribute(i) instanceof ContinuousAttribute && instance2.getAttribute(i) instanceof ContinuousAttribute) {
                    result += Math.pow((<ContinuousAttribute> instance1.getAttribute(i)).getValue() - (<ContinuousAttribute> instance2.getAttribute(i)).getValue(), 2);
                }
            }
        }
        return result;
    }

}