import { LdaModel } from "./LdaModel";
import { Matrix } from "nlptoolkit-math/dist/Matrix";
import { DiscreteDistribution } from "nlptoolkit-math/dist/DiscreteDistribution";
import { Vector } from "nlptoolkit-math/dist/Vector";
import { Instance } from "../Instance/Instance";
export declare class QdaModel extends LdaModel {
    private W;
    /**
     * The constructor which sets the priorDistribution, w w1 and HashMap of String Matrix.
     *
     * @param priorDistributionOrFileName {@link DiscreteDistribution} input.
     * @param W                 {@link HashMap} of String and Matrix.
     * @param w                 {@link HashMap} of String and Vectors.
     * @param w0                {@link HashMap} of String and Double.
     */
    constructor(priorDistributionOrFileName: DiscreteDistribution | string, W?: Map<string, Matrix>, w?: Map<string, Vector>, w0?: Map<string, number>);
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
}
