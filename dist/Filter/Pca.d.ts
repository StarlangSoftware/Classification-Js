import { TrainedFeatureFilter } from "./TrainedFeatureFilter";
import { Instance } from "../Instance/Instance";
import { DataSet } from "../DataSet/DataSet";
export declare class Pca extends TrainedFeatureFilter {
    private readonly covarianceExplained;
    private eigenvectors;
    private readonly numberOfDimensions;
    /**
     * The convertDataDefinition method gets the data definitions of the dataSet and removes all the attributes. Then adds
     * new attributes as CONTINUOUS.
     */
    convertDataDefinition(): void;
    /**
     * The convertInstance method takes an {@link Instance} as an input and creates a {@link Vector} attributes from continuousAttributes.
     * After removing all attributes of given instance, it then adds new {@link ContinuousAttribute} by using the dot
     * product of attribute Vector and the eigenvectors.
     *
     * @param instance Instance that will be converted to {@link ContinuousAttribute} by using eigenvectors.
     */
    convertInstance(instance: Instance): void;
    /**
     * The train method creates an averageVector from continuousAttributeAverage and a covariance {@link Matrix} from that averageVector.
     * Then finds the eigenvectors of that covariance matrix and removes its unnecessary eigenvectors.
     */
    protected train(): void;
    /**
     * Constructor that sets the dataSet and dimension. Then calls train method.
     *
     * @param dataSet            DataSet that will be used.
     * @param numberOfDimensionsOrCovarianceExplained Dimension number.
     */
    constructor(dataSet: DataSet, numberOfDimensionsOrCovarianceExplained?: number);
    /**
     * The removeUnnecessaryEigenvectors methods takes an ArrayList of Eigenvectors. It first calculates the summation
     * of eigenValues. Then it finds the eigenvectors which have lesser summation than covarianceExplained and removes these
     * eigenvectors.
     */
    private removeUnnecessaryEigenvectors;
    /**
     * The removeAllEigenvectorsExceptTheMostImportantK method takes an {@link Array} of {@link Eigenvector}s and removes the
     * surplus eigenvectors when the number of eigenvectors is greater than the dimension.
     */
    private removeAllEigenvectorsExceptTheMostImportantK;
}
