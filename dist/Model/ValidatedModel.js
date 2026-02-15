"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatedModel = void 0;
const Model_1 = require("./Model");
const ClassificationPerformance_1 = require("../Performance/ClassificationPerformance");
class ValidatedModel extends Model_1.Model {
    /**
     * The testClassifier method takes an {@link InstanceList} as an input and returns an accuracy value as {@link ClassificationPerformance}.
     *
     * @param data {@link InstanceList} to test.
     * @return Accuracy value as {@link ClassificationPerformance}.
     */
    testClassifier(data) {
        let total = data.size();
        let count = 0;
        for (let i = 0; i < data.size(); i++) {
            if (data.get(i).getClassLabel().toLowerCase() == this.predict(data.get(i)).toLowerCase()) {
                count++;
            }
        }
        return new ClassificationPerformance_1.ClassificationPerformance(count / total);
    }
}
exports.ValidatedModel = ValidatedModel;
//# sourceMappingURL=ValidatedModel.js.map