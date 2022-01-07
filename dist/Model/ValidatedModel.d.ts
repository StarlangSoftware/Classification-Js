import { Model } from "./Model";
import { InstanceList } from "../InstanceList/InstanceList";
import { ClassificationPerformance } from "../Performance/ClassificationPerformance";
export declare abstract class ValidatedModel extends Model {
    /**
     * The testClassifier method takes an {@link InstanceList} as an input and returns an accuracy value as {@link ClassificationPerformance}.
     *
     * @param data {@link InstanceList} to test.
     * @return Accuracy value as {@link ClassificationPerformance}.
     */
    testClassifier(data: InstanceList): ClassificationPerformance;
}
