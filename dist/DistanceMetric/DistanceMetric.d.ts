import { Instance } from "../Instance/Instance";
export interface DistanceMetric {
    distance(instance1: Instance, instance2: Instance): number;
}
