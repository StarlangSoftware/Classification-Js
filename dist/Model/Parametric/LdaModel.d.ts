import { GaussianModel } from "./GaussianModel";
import { Vector } from "nlptoolkit-math/dist/Vector";
import { Instance } from "../../Instance/Instance";
import { FileContents } from "nlptoolkit-util/dist/FileContents";
import { InstanceList } from "../../InstanceList/InstanceList";
import { Parameter } from "../../Parameter/Parameter";
export declare class LdaModel extends GaussianModel {
    protected w0: Map<string, number>;
    protected w: Map<string, Vector>;
    /**
     * Loads a Linear Discriminant Analysis model from an input model file.
     * @param fileName Model file name.
     */
    constructor2(fileName: string): void;
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
    /**
     * Training algorithm for the linear discriminant analysis classifier (Introduction to Machine Learning, Alpaydin, 2015).
     *
     * @param trainSet   Training data given to the algorithm.
     * @param parameters -
     */
    train(trainSet: InstanceList, parameters: Parameter): void;
    /**
     * Loads the Lda model from an input file.
     * @param fileName File name of the Lda model.
     */
    loadModel(fileName: string): void;
}
