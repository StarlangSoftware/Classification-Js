import {Model} from "./Model";
import {Instance} from "../Instance/Instance";
import {CompositeInstance} from "../Instance/CompositeInstance";

export class RandomModel extends Model{

    private classLabels: Array<string>
    private seed: number

    constructor(classLabels: Array<string>, seed: number) {
        super();
        this.classLabels = classLabels
        this.seed = seed
    }

    /**
     * The predict method gets an Instance as an input and retrieves the possible class labels as an ArrayList. Then selects a
     * random number as an index and returns the class label at this selected index.
     *
     * @param instance {@link Instance} to make prediction.
     * @return The class label at the randomly selected index.
     */
    predict(instance: Instance): string {
        if ((instance instanceof CompositeInstance)) {
            let possibleClassLabels = (<CompositeInstance> instance).getPossibleClassLabels();
            let size = possibleClassLabels.length;
            let index = Math.floor(Math.random() * size);
            return possibleClassLabels[index];
        } else {
            let size = this.classLabels.length;
            let index = Math.floor(Math.random() * size);
            return this.classLabels[index];
        }
    }

    predictProbability(instance: Instance): Map<string, number> {
        let result = new Map<string, number>();
        for (let classLabel of this.classLabels){
            result.set(classLabel, 1.0 / this.classLabels.length);
        }
        return result;
    }

}