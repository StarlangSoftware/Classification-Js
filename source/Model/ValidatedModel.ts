import {Model} from "./Model";
import {InstanceList} from "../InstanceList/InstanceList";
import {ClassificationPerformance} from "../Performance/ClassificationPerformance";

export abstract class ValidatedModel extends Model{

    /**
     * The testClassifier method takes an {@link InstanceList} as an input and returns an accuracy value as {@link ClassificationPerformance}.
     *
     * @param data {@link InstanceList} to test.
     * @return Accuracy value as {@link ClassificationPerformance}.
     */
    testClassifier(data: InstanceList): ClassificationPerformance{
        let total = data.size();
        let count = 0;
        for (let i = 0; i < data.size(); i++) {
            if (data.get(i).getClassLabel().toLowerCase() == this.predict(data.get(i)).toLowerCase()) {
                count++;
            }
        }
        return new ClassificationPerformance(count / total);
    }
}