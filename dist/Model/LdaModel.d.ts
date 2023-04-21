import { GaussianModel } from "./GaussianModel";
import { Vector } from "nlptoolkit-math/dist/Vector";
import { DiscreteDistribution } from "nlptoolkit-math/dist/DiscreteDistribution";
import { Instance } from "../Instance/Instance";
import { FileContents } from "nlptoolkit-util/dist/FileContents";
export declare class LdaModel extends GaussianModel {
    protected w0: Map<string, number>;
    protected w: Map<string, Vector>;
    /**
     * A constructor which sets the priorDistribution, w and w0 according to given inputs.
     *
     * @param priorDistributionOrFileName {@link DiscreteDistribution} input.
     * @param w                 {@link HashMap} of String and Vectors.
     * @param w0                {@link HashMap} of String and Double.
     */
    constructor(priorDistributionOrFileName?: DiscreteDistribution | string, w?: Map<string, Vector>, w0?: Map<string, number>);
    /**
     * The calculateMetric method takes an {@link Instance} and a String as inputs. It returns the dot product of given Instance
     * and wi plus w0i.
     *
     * @param instance {@link Instance} input.
     * @param Ci       String input.
     * @return The dot product of given Instance and wi plus w0i.
     */
    calculateMetric(instance: Instance, Ci: string): number;
    loadWandW0(input: FileContents, size: number): void;
    saveTxt(fileName: string): void;
}
