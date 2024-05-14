import {Classifier} from "./Classifier";
import {Parameter} from "../Parameter/Parameter";
import {InstanceList} from "../InstanceList/InstanceList";
import {Vector} from "nlptoolkit-math/dist/Vector";
import {Matrix} from "nlptoolkit-math/dist/Matrix";
import {Partition} from "../InstanceList/Partition";
import {InstanceListOfSameClass} from "../InstanceList/InstanceListOfSameClass";
import {QdaModel} from "../Model/QdaModel";

export class Qda extends Classifier{

    /**
     * Training algorithm for the quadratic discriminant analysis classifier (Introduction to Machine Learning, Alpaydin, 2015).
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters -
     */
    train(trainSet: InstanceList, parameters: Parameter) {
        let determinant = 0
        let w0 = new Map<string, number>();
        let w = new Map<string, Vector>();
        let W = new Map<string, Matrix>();
        let classLists = new Partition(trainSet);
        let priorDistribution = trainSet.classDistribution();
        for (let i = 0; i < classLists.size(); i++) {
            let Ci = (<InstanceListOfSameClass> classLists.get(i)).getClassLabel();
            let averageVector = new Vector(classLists.get(i).continuousAttributeAverage());
            let classCovariance = classLists.get(i).covariance(averageVector);
            determinant = classCovariance.determinant();
            classCovariance.inverse();
            let Wi = classCovariance.clone();
            Wi.multiplyWithConstant(-0.5);
            W.set(Ci, Wi);
            let wi = classCovariance.multiplyWithVectorFromLeft(averageVector);
            w.set(Ci, wi);
            let w0i = -0.5 * (wi.dotProduct(averageVector) + Math.log(determinant)) + Math.log(priorDistribution.getProbability(Ci));
            w0.set(Ci, w0i);
        }
        this.model = new QdaModel(priorDistribution, W, w, w0);
    }

    /**
     * Loads the Qda model from an input file.
     * @param fileName File name of the Qda model.
     */
    loadModel(fileName: string): void{
        this.model = new QdaModel(fileName)
    }

}