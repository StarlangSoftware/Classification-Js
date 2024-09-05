import { LdaModel } from "./LdaModel";
import { Instance } from "../../Instance/Instance";
import { InstanceList } from "../../InstanceList/InstanceList";
import { Parameter } from "../../Parameter/Parameter";
export declare class QdaModel extends LdaModel {
    private W;
    constructor2(fileName: string): void;
    /**
     * The calculateMetric method takes an {@link Instance} and a String as inputs. It multiplies Matrix Wi with Vector xi
     * then calculates the dot product of it with xi. Then, again it finds the dot product of wi and xi and returns the summation with w0i.
     *
     * @param instance {@link Instance} input.
     * @param Ci       String input.
     * @return The result of Wi.multiplyWithVectorFromLeft(xi).dotProduct(xi) + wi.dotProduct(xi) + w0i.
     */
    calculateMetric(instance: Instance, Ci: string): number;
    saveTxt(fileName: string): void;
    /**
     * Training algorithm for the quadratic discriminant analysis classifier (Introduction to Machine Learning, Alpaydin, 2015).
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters -
     */
    train(trainSet: InstanceList, parameters: Parameter): void;
    /**
     * Loads the Qda model from an input file.
     * @param fileName File name of the Qda model.
     */
    loadModel(fileName: string): void;
}
