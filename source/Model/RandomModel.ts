import {Model} from "./Model";
import {Instance} from "../Instance/Instance";
import {CompositeInstance} from "../Instance/CompositeInstance";
import {Random} from "nlptoolkit-util/dist/Random";
import {FileContents} from "nlptoolkit-util/dist/FileContents";

export class RandomModel extends Model{

    private readonly classLabels: Array<string>
    private random: Random
    private seed: number

    constructor(classLabelsOrFileName: Array<string> | string, seed?: number) {
        super();
        if (classLabelsOrFileName instanceof Array){
            this.classLabels = classLabelsOrFileName
            this.random = new Random(seed)
            this.seed = seed
        } else {
            let input = new FileContents(classLabelsOrFileName)
            seed = parseInt(input.readLine())
            this.random = new Random(seed)
            let size = parseInt(input.readLine())
            this.classLabels = new Array<string>()
            for (let i = 0; i < size; i++){
                this.classLabels.push(input.readLine())
            }
        }
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
            let index = this.random.nextInt(size);
            return possibleClassLabels[index];
        } else {
            let size = this.classLabels.length;
            let index = this.random.nextInt(size);
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

    saveTxt(fileName: string){
    }

}