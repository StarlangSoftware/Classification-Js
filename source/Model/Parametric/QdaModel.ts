import {LdaModel} from "./LdaModel";
import {Matrix} from "nlptoolkit-math/dist/Matrix";
import {Vector} from "nlptoolkit-math/dist/Vector";
import {Instance} from "../../Instance/Instance";
import {FileContents} from "nlptoolkit-util/dist/FileContents";
import {InstanceList} from "../../InstanceList/InstanceList";
import {Parameter} from "../../Parameter/Parameter";
import {Partition} from "../../InstanceList/Partition";
import {InstanceListOfSameClass} from "../../InstanceList/InstanceListOfSameClass";

export class QdaModel extends LdaModel{

    private W: Map<string, Matrix>

    constructor2(fileName: string) {
        let input = new FileContents(fileName)
        let size = this.loadPriorDistribution(input)
        this.loadWandW0(input, size)
        this.W = new Map<string, Matrix>()
        for (let i = 0; i < size; i++){
            let c = input.readLine()
            let matrix = this.loadMatrix(input)
            this.W.set(c, matrix)
        }
    }

    /**
     * The calculateMetric method takes an {@link Instance} and a String as inputs. It multiplies Matrix Wi with Vector xi
     * then calculates the dot product of it with xi. Then, again it finds the dot product of wi and xi and returns the summation with w0i.
     *
     * @param instance {@link Instance} input.
     * @param Ci       String input.
     * @return The result of Wi.multiplyWithVectorFromLeft(xi).dotProduct(xi) + wi.dotProduct(xi) + w0i.
     */
    calculateMetric(instance: Instance, Ci: string): number {
        let xi = instance.toVector();
        let Wi = this.W.get(Ci);
        let wi = this.w.get(Ci);
        let w0i = this.w0.get(Ci);
        return Wi.multiplyWithVectorFromLeft(xi).dotProduct(xi) + wi.dotProduct(xi) + w0i;
    }

    saveTxt(fileName: string){
    }

    /**
     * Training algorithm for the quadratic discriminant analysis classifier (Introduction to Machine Learning, Alpaydin, 2015).
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters -
     */
    train(trainSet: InstanceList, parameters: Parameter) {
        let determinant = 0
        this.w0 = new Map<string, number>();
        this.w = new Map<string, Vector>();
        this.W = new Map<string, Matrix>();
        let classLists = new Partition(trainSet);
        this.priorDistribution = trainSet.classDistribution();
        for (let i = 0; i < classLists.size(); i++) {
            let Ci = (<InstanceListOfSameClass> classLists.get(i)).getClassLabel();
            let averageVector = new Vector(classLists.get(i).continuousAttributeAverage());
            let classCovariance = classLists.get(i).covariance(averageVector);
            determinant = classCovariance.determinant();
            classCovariance.inverse();
            let Wi = classCovariance.clone();
            Wi.multiplyWithConstant(-0.5);
            this.W.set(Ci, Wi);
            let wi = classCovariance.multiplyWithVectorFromLeft(averageVector);
            this.w.set(Ci, wi);
            let w0i = -0.5 * (wi.dotProduct(averageVector) + Math.log(determinant)) + Math.log(this.priorDistribution.getProbability(Ci));
            this.w0.set(Ci, w0i);
        }
    }

    /**
     * Loads the Qda model from an input file.
     * @param fileName File name of the Qda model.
     */
    loadModel(fileName: string): void{
        this.constructor2(fileName)
    }

}