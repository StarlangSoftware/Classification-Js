import {Model} from "./Model";
import {InstanceList} from "../InstanceList/InstanceList";
import {Instance} from "../Instance/Instance";
import {DistanceMetric} from "../DistanceMetric/DistanceMetric";
import {CompositeInstance} from "../Instance/CompositeInstance";
import {KnnInstance} from "./KnnInstance";
import {EuclidianDistance} from "../DistanceMetric/EuclidianDistance";
import {FileContents} from "nlptoolkit-util/dist/FileContents";

export class KnnModel extends Model{

    private data: InstanceList
    private k: number
    private distanceMetric: DistanceMetric

    /**
     * Constructor that sets the data {@link InstanceList}, k value and the {@link DistanceMetric}.
     *
     * @param dataOrFileName           {@link InstanceList} input.
     * @param k              K value.
     * @param distanceMetric {@link DistanceMetric} input.
     */
    constructor(dataOrFileName: InstanceList | string, k?: number, distanceMetric?: DistanceMetric) {
        super()
        if (dataOrFileName instanceof InstanceList){
            this.data = dataOrFileName
            this.k = k
            this.distanceMetric = distanceMetric
        } else {
            this.distanceMetric = new EuclidianDistance()
            let input = new FileContents(dataOrFileName)
            this.k = parseInt(input.readLine())
            this.data = this.loadInstanceList(input)
        }
    }

    /**
     * The predict method takes an {@link Instance} as an input and finds the nearest neighbors of given instance. Then
     * it returns the first possible class label as the predicted class.
     *
     * @param instance {@link Instance} to make prediction.
     * @return The first possible class label as the predicted class.
     */
    predict(instance: Instance): string {
        let nearestNeighbors = this.nearestNeighbors(instance);
        let predictedClass
        if (instance instanceof CompositeInstance && nearestNeighbors.size() == 0) {
            predictedClass = (<CompositeInstance> instance).getPossibleClassLabels()[0];
        } else {
            predictedClass = Model.getMaximum(nearestNeighbors.getClassLabels());
        }
        return predictedClass;
    }

    predictProbability(instance: Instance): Map<string, number> {
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
    nearestNeighbors(instance: Instance): InstanceList{
        let result = new InstanceList();
        let instances = new Array<KnnInstance>();
        let possibleClassLabels = undefined;
        if (instance instanceof CompositeInstance) {
            possibleClassLabels = (<CompositeInstance> instance).getPossibleClassLabels();
        }
        for (let i = 0; i < this.data.size(); i++) {
            if (!(instance instanceof CompositeInstance) || possibleClassLabels.includes(this.data.get(i).getClassLabel())) {
                instances.push(new KnnInstance(this.data.get(i), this.distanceMetric.distance(this.data.get(i), instance)));
            }
        }
        instances.sort((a: KnnInstance, b: KnnInstance) => a.getDistance() < b.getDistance() ? -1 : a.getDistance() > b.getDistance() ? 1: 0);
        for (let i = 0; i < Math.min(this.k, instances.length); i++) {
            result.add(instances[i].getInstance());
        }
        return result;
    }

    saveTxt(fileName: string){
    }

}