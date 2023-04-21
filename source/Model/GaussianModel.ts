import {DiscreteDistribution} from "nlptoolkit-math/dist/DiscreteDistribution";
import {Instance} from "../Instance/Instance";
import {ValidatedModel} from "./ValidatedModel";
import {CompositeInstance} from "../Instance/CompositeInstance";
import {FileContents} from "nlptoolkit-util/dist/FileContents";
import {Vector} from "nlptoolkit-math/dist/Vector";

export abstract class GaussianModel extends ValidatedModel{

    protected priorDistribution: DiscreteDistribution

    /**
     * Abstract method calculateMetric takes an {@link Instance} and a String as inputs.
     *
     * @param instance {@link Instance} input.
     * @param Ci       String input.
     * @return A double value as metric.
     */
    abstract calculateMetric(instance: Instance, Ci: string): number

    /**
     * The predict method takes an Instance as an input. First it gets the size of prior distribution and loops this size times.
     * Then it gets the possible class labels and and calculates metric value. At the end, it returns the class which has the
     * maximum value of metric.
     *
     * @param instance {@link Instance} to predict.
     * @return The class which has the maximum value of metric.
     */
    predict(instance: Instance): string {
        let maxMetric = Number.NEGATIVE_INFINITY;
        let predictedClass, size
        if (instance instanceof CompositeInstance) {
            predictedClass = (<CompositeInstance> instance).getPossibleClassLabels()[0];
            size = (<CompositeInstance> instance).getPossibleClassLabels().length;
        } else {
            predictedClass = this.priorDistribution.getMaxItem();
            size = this.priorDistribution.size;
        }
        for (let i = 0; i < size; i++) {
            let Ci
            if (instance instanceof CompositeInstance) {
                Ci = (<CompositeInstance> instance).getPossibleClassLabels()[i];
            } else {
                Ci = this.priorDistribution.getItem(i);
            }
            if (this.priorDistribution.containsItem(Ci)) {
                let metric = this.calculateMetric(instance, Ci);
                if (metric > maxMetric) {
                    maxMetric = metric;
                    predictedClass = Ci;
                }
            }
        }
        return predictedClass;
    }

    loadPriorDistribution(input: FileContents): number{
        let size = parseInt(input.readLine())
        this.priorDistribution = new DiscreteDistribution()
        for (let i = 0; i < size; i++){
            let line = input.readLine()
            let items = line.split(" ");
            for (let j = 0; j < parseInt(items[1]); j++){
                this.priorDistribution.addItem(items[0])
            }
        }
        return size
    }

    loadVectors(input: FileContents, size: number): Map<string, Vector>{
        let map = new Map<string, Vector>()
        for (let i = 0; i < size; i++){
            let line = input.readLine()
            let items = line.split(" ")
            let vector = new Vector(parseInt(items[1]), 0)
            for (let j = 2; j < items.length; j++){
                vector.setValue(j - 2, parseFloat(items[j]))
            }
            map.set(items[0], vector)
        }
        return map
    }

    predictProbability(instance: Instance): Map<string, number> {
        return undefined;
    }
}