import {Model} from "./Model";
import {Instance} from "../Instance/Instance";
import {CompositeInstance} from "../Instance/CompositeInstance";
import {Random} from "nlptoolkit-util/dist/Random";
import {FileContents} from "nlptoolkit-util/dist/FileContents";
import {InstanceList} from "../InstanceList/InstanceList";
import {Parameter} from "../Parameter/Parameter";

export class RandomModel extends Model{

    private classLabels: Array<string>
    private random: Random
    private seed: number

    /**
     * A constructor that sets the class labels.
     *
     * @param classLabels An ArrayList of class labels.
     * @param seed Seed of the random function.
     */
    constructor1(classLabels: Array<string>, seed: number) {
        this.classLabels = classLabels
        this.random = new Random(seed)
        this.seed = seed
    }

    /**
     * Loads a random classifier model from an input model file.
     * @param fileName Model file name.
     */
    constructor2(fileName: string) {
        let input = new FileContents(fileName)
        this.seed = parseInt(input.readLine())
        this.random = new Random(this.seed)
        let size = parseInt(input.readLine())
        this.classLabels = new Array<string>()
        for (let i = 0; i < size; i++){
            this.classLabels.push(input.readLine())
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

    /**
     * Calculates the posterior probability distribution for the given instance according to random model.
     * @param instance Instance for which posterior probability distribution is calculated.
     * @return Posterior probability distribution for the given instance.
     */
    predictProbability(instance: Instance): Map<string, number> {
        let result = new Map<string, number>();
        for (let classLabel of this.classLabels){
            result.set(classLabel, 1.0 / this.classLabels.length);
        }
        return result;
    }

    saveTxt(fileName: string){
    }

    /**
     * Training algorithm for random classifier.
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters -
     */
    train(trainSet: InstanceList, parameters: Parameter): void {
        let result = new Array<string>()
        for (let s of trainSet.classDistribution().keys()){
            result.push(s)
        }
        this.constructor1(result, parameters.getSeed());
    }

    /**
     * Loads the random classifier model from an input file.
     * @param fileName File name of the random classifier model.
     */
    loadModel(fileName: string): void{
        this.constructor2(fileName)
    }

}