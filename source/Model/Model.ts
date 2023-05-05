import {Instance} from "../Instance/Instance";
import {CounterHashMap} from "nlptoolkit-datastructure/dist/CounterHashMap";
import {FileContents} from "nlptoolkit-util/dist/FileContents";
import {InstanceList} from "../InstanceList/InstanceList";
import {Matrix} from "nlptoolkit-math/dist/Matrix";
import {DiscreteDistribution} from "nlptoolkit-math/dist/DiscreteDistribution";

export abstract class Model {

    abstract predict(instance: Instance): string
    abstract predictProbability(instance: Instance): Map<string, number>
    abstract saveTxt(fileName: String): void

    /**
     * Given an array of class labels, returns the maximum occurred one.
     *
     * @param classLabels An array of class labels.
     * @return The class label that occurs most in the array of class labels (mod of class label list).
     */
    static getMaximum(classLabels: Array<string>): string{
        let frequencies = new CounterHashMap<string>();
        for (let label of classLabels) {
            frequencies.put(label);
        }
        return frequencies.max();
    }

    loadInstance(line: string, attributeTypes: string[]): Instance{
        let items = line.split(",")
        let instance = new Instance(items[items.length - 1])
        for (let i = 0; i < items.length - 1; i++){
            switch (attributeTypes[i]){
                case "DISCRETE":
                    instance.addAttribute(items[i])
                    break
                case "CONTINUOUS":
                    instance.addAttribute(parseFloat(items[i]))
                    break
            }
        }
        return instance
    }

    static loadDiscreteDistribution(input: FileContents): DiscreteDistribution{
        let distribution = new DiscreteDistribution()
        let size = parseInt(input.readLine())
        for (let i = 0; i < size; i++){
            let line = input.readLine()
            let items = line.split(" ")
            let count = parseInt(items[1])
            for (let j = 0; j < count; j++){
                distribution.addItem(items[0])
            }
        }
        return distribution
    }

    loadInstanceList(input: FileContents): InstanceList{
        let types = input.readLine().split(" ")
        let instanceCount = parseInt(input.readLine())
        let instanceList = new InstanceList()
        for (let i = 0; i < instanceCount; i++){
            instanceList.add(this.loadInstance(input.readLine(), types))
        }
        return instanceList;
    }

    loadMatrix(input: FileContents): Matrix{
        let items = input.readLine().split(" ")
        let matrix = new Matrix(parseInt(items[0]), parseInt(items[1]))
        for (let j = 0; j < matrix.getRow(); j++){
            let line = input.readLine()
            items = line.split(" ")
            for (let k = 0; k < matrix.getColumn(); k++){
                matrix.setValue(j, k, parseFloat(items[k]))
            }
        }
        return matrix
    }
}