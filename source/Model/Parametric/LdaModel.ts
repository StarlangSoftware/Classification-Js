import {GaussianModel} from "./GaussianModel";
import {Vector} from "nlptoolkit-math/dist/Vector";
import {Instance} from "../../Instance/Instance";
import {FileContents} from "nlptoolkit-util/dist/FileContents";
import {InstanceList} from "../../InstanceList/InstanceList";
import {Parameter} from "../../Parameter/Parameter";
import {Partition} from "../../InstanceList/Partition";
import {Matrix} from "nlptoolkit-math/dist/Matrix";
import {InstanceListOfSameClass} from "../../InstanceList/InstanceListOfSameClass";

export class LdaModel extends GaussianModel{

    protected w0: Map<string, number>
    protected w: Map<string, Vector>

    /**
     * Loads a Linear Discriminant Analysis model from an input model file.
     * @param fileName Model file name.
     */
    constructor2(fileName: string) {
        let input = new FileContents(fileName)
        let size = this.loadPriorDistribution(input)
        this.loadWandW0(input, size)
    }

    /**
     * The calculateMetric method takes an {@link Instance} and a String as inputs. It returns the dot product of given Instance
     * and wi plus w0i.
     *
     * @param instance {@link Instance} input.
     * @param Ci       String input.
     * @return The dot product of given Instance and wi plus w0i.
     */
    calculateMetric(instance: Instance, Ci: string): number {
        let xi = instance.toVector();
        let wi = this.w.get(Ci);
        let w0i = this.w0.get(Ci);
        return wi.dotProduct(xi) + w0i;
    }

    /**
     * Loads w0 and w hash maps from an input file. The number of items in the hash map is given by the parameter size.
     * @param input Input file
     * @param size Number of items in the hash map read.
     * @throws IOException If the file can not be read, it throws IOException.
     */
    loadWandW0(input: FileContents, size: number){
        this.w0 = new Map<string, number>()
        for (let i = 0; i < size; i++){
            let line = input.readLine()
            let items = line.split(" ")
            this.w0.set(items[0], parseFloat(items[1]))
        }
        this.w = this.loadVectors(input, size)
    }

    saveTxt(fileName: string){
    }

    /**
     * Training algorithm for the linear discriminant analysis classifier (Introduction to Machine Learning, Alpaydin, 2015).
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters -
     */
    train(trainSet: InstanceList, parameters: Parameter): void {
        this.w0 = new Map<string, number>();
        this.w = new Map<string, Vector>();
        this.priorDistribution = trainSet.classDistribution();
        let classLists = new Partition(trainSet);
        let covariance = new Matrix(trainSet.get(0).continuousAttributeSize(), trainSet.get(0).continuousAttributeSize());
        for (let i = 0; i < classLists.size(); i++) {
            let averageVector = new Vector(classLists.get(i).continuousAttributeAverage());
            let classCovariance = classLists.get(i).covariance(averageVector);
            classCovariance.multiplyWithConstant(classLists.get(i).size() - 1);
            covariance.add(classCovariance);
        }
        covariance.divideByConstant(trainSet.size() - classLists.size());
        covariance.inverse();
        for (let i = 0; i < classLists.size(); i++) {
            let Ci = (<InstanceListOfSameClass> classLists.get(i)).getClassLabel();
            let averageVector = new Vector(classLists.get(i).continuousAttributeAverage());
            let wi = covariance.multiplyWithVectorFromRight(averageVector);
            this.w.set(Ci, wi);
            let w0i = -0.5 * wi.dotProduct(averageVector) + Math.log(this.priorDistribution.getProbability(Ci));
            this.w0.set(Ci, w0i);
        }
    }

    /**
     * Loads the Lda model from an input file.
     * @param fileName File name of the Lda model.
     */
    loadModel(fileName: string): void{
        this.constructor2(fileName)
    }

}