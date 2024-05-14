import {Classifier} from "./Classifier";
import {InstanceList} from "../InstanceList/InstanceList";
import {Parameter} from "../Parameter/Parameter";
import {Vector} from "nlptoolkit-math/dist/Vector";
import {Partition} from "../InstanceList/Partition";
import {Matrix} from "nlptoolkit-math/dist/Matrix";
import {InstanceListOfSameClass} from "../InstanceList/InstanceListOfSameClass";
import {LdaModel} from "../Model/LdaModel";

export class Lda extends Classifier{

    /**
     * Training algorithm for the linear discriminant analysis classifier (Introduction to Machine Learning, Alpaydin, 2015).
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters -
     */
    train(trainSet: InstanceList, parameters: Parameter): void {
        let w0 = new Map<string, number>();
        let w = new Map<string, Vector>();
        let priorDistribution = trainSet.classDistribution();
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
            w.set(Ci, wi);
            let w0i = -0.5 * wi.dotProduct(averageVector) + Math.log(priorDistribution.getProbability(Ci));
            w0.set(Ci, w0i);
        }
        this.model = new LdaModel(priorDistribution, w, w0);
    }

    /**
     * Loads the Lda model from an input file.
     * @param fileName File name of the Lda model.
     */
    loadModel(fileName: string): void{
        this.model = new LdaModel(fileName)
    }

}