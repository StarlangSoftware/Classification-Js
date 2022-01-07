import { Performance } from "./Performance";
export declare class ClassificationPerformance extends Performance {
    private readonly accuracy;
    /**
     * A constructor that sets the accuracy and errorRate via given input.
     *
     * @param accuracy  Double value input.
     * @param errorRate Double value input.
     */
    constructor(accuracy: number, errorRate?: number);
    /**
     * Accessor for the accuracy.
     *
     * @return Accuracy value.
     */
    getAccuracy(): number;
}
