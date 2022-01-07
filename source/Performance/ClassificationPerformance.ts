import {Performance} from "./Performance";

export class ClassificationPerformance extends Performance{

    private readonly accuracy: number

    /**
     * A constructor that sets the accuracy and errorRate via given input.
     *
     * @param accuracy  Double value input.
     * @param errorRate Double value input.
     */
    constructor(accuracy: number, errorRate?: number) {
        super(errorRate == undefined ? 1 - accuracy : errorRate);
        this.accuracy = accuracy
    }

    /**
     * Accessor for the accuracy.
     *
     * @return Accuracy value.
     */
    getAccuracy(): number{
        return this.accuracy
    }
}