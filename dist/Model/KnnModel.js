(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Model", "../InstanceList/InstanceList", "../Instance/CompositeInstance", "./KnnInstance", "../DistanceMetric/EuclidianDistance", "nlptoolkit-util/dist/FileContents"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KnnModel = void 0;
    const Model_1 = require("./Model");
    const InstanceList_1 = require("../InstanceList/InstanceList");
    const CompositeInstance_1 = require("../Instance/CompositeInstance");
    const KnnInstance_1 = require("./KnnInstance");
    const EuclidianDistance_1 = require("../DistanceMetric/EuclidianDistance");
    const FileContents_1 = require("nlptoolkit-util/dist/FileContents");
    class KnnModel extends Model_1.Model {
        constructor(dataOrFileName, k, distanceMetric) {
            super();
            if (dataOrFileName instanceof InstanceList_1.InstanceList) {
                this.constructor1(dataOrFileName, k, distanceMetric);
            }
            else {
                this.constructor2(dataOrFileName);
            }
        }
        /**
         * Constructor that sets the data {@link InstanceList}, k value and the {@link DistanceMetric}.
         *
         * @param data           {@link InstanceList} input.
         * @param k              K value.
         * @param distanceMetric {@link DistanceMetric} input.
         */
        constructor1(data, k, distanceMetric) {
            this.data = data;
            this.k = k;
            this.distanceMetric = distanceMetric;
        }
        /**
         * Loads a K-nearest neighbor model from an input model file.
         * @param fileName Model file name.
         */
        constructor2(fileName) {
            this.distanceMetric = new EuclidianDistance_1.EuclidianDistance();
            let input = new FileContents_1.FileContents(fileName);
            this.k = parseInt(input.readLine());
            this.data = this.loadInstanceList(input);
        }
        /**
         * The predict method takes an {@link Instance} as an input and finds the nearest neighbors of given instance. Then
         * it returns the first possible class label as the predicted class.
         *
         * @param instance {@link Instance} to make prediction.
         * @return The first possible class label as the predicted class.
         */
        predict(instance) {
            let nearestNeighbors = this.nearestNeighbors(instance);
            let predictedClass;
            if (instance instanceof CompositeInstance_1.CompositeInstance && nearestNeighbors.size() == 0) {
                predictedClass = instance.getPossibleClassLabels()[0];
            }
            else {
                predictedClass = Model_1.Model.getMaximum(nearestNeighbors.getClassLabels());
            }
            return predictedClass;
        }
        /**
         * Calculates the posterior probability distribution for the given instance according to K-means model.
         * @param instance Instance for which posterior probability distribution is calculated.
         * @return Posterior probability distribution for the given instance.
         */
        predictProbability(instance) {
            let nearestNeighbors = this.nearestNeighbors(instance);
            return nearestNeighbors.classDistribution().getProbabilityDistribution();
        }
        /**
         * The nearestNeighbors method takes an {@link Instance} as an input. First it gets the possible class labels, then loops
         * through the data {@link InstanceList} and creates new {@link Array} of {@link KnnInstance}s and adds the corresponding data with
         * the distance between data and given instance. After sorting this newly created ArrayList, it loops k times and
         * returns the first k instances as an {@link InstanceList}.
         *
         * @param instance {@link Instance} to find nearest neighbors/
         * @return The first k instances which are nearest to the given instance as an {@link InstanceList}.
         */
        nearestNeighbors(instance) {
            let result = new InstanceList_1.InstanceList();
            let instances = new Array();
            let possibleClassLabels = undefined;
            if (instance instanceof CompositeInstance_1.CompositeInstance) {
                possibleClassLabels = instance.getPossibleClassLabels();
            }
            for (let i = 0; i < this.data.size(); i++) {
                if (!(instance instanceof CompositeInstance_1.CompositeInstance) || possibleClassLabels.includes(this.data.get(i).getClassLabel())) {
                    instances.push(new KnnInstance_1.KnnInstance(this.data.get(i), this.distanceMetric.distance(this.data.get(i), instance)));
                }
            }
            instances.sort((a, b) => a.getDistance() < b.getDistance() ? -1 : a.getDistance() > b.getDistance() ? 1 : 0);
            for (let i = 0; i < Math.min(this.k, instances.length); i++) {
                result.add(instances[i].getInstance());
            }
            return result;
        }
        saveTxt(fileName) {
        }
    }
    exports.KnnModel = KnnModel;
});
//# sourceMappingURL=KnnModel.js.map