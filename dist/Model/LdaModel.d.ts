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
     * @param priorDistribution {@link DiscreteDistribution} input.
     * @param w                 {@link HashMap} of String and Vectors.
     * @param w0                {@link HashMap} of String and Double.
     */
    constructor1(priorDistribution: DiscreteDistribution, w: Map<string, Vector>, w0: Map<string, number>): void;
    /**
     * Loads a Linear Discriminant Analysis model from an input model file.
     * @param fileName Model file name.
     */
    constructor2(fileName: string): void;
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
    /**
     * Loads w0 and w hash maps from an input file. The number of items in the hash map is given by the parameter size.
     * @param input Input file
     * @param size Number of items in the hash map read.
     * @throws IOException If the file can not be read, it throws IOException.
     */
    loadWandW0(input: FileContents, size: number): void;
    saveTxt(fileName: string): void;
}
