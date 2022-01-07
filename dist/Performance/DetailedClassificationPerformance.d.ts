import { ClassificationPerformance } from "./ClassificationPerformance";
import { ConfusionMatrix } from "./ConfusionMatrix";
export declare class DetailedClassificationPerformance extends ClassificationPerformance {
    private readonly confusionMatrix;
    /**
     * A constructor that  sets the accuracy and errorRate as 1 - accuracy via given {@link ConfusionMatrix} and also sets the confusionMatrix.
     *
     * @param confusionMatrix {@link ConfusionMatrix} input.
     */
    constructor(confusionMatrix: ConfusionMatrix);
    /**
     * Accessor for the confusionMatrix.
     *
     * @return ConfusionMatrix.
     */
    getConfusionMatrix(): ConfusionMatrix;
}
