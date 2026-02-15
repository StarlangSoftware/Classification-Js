"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pca = void 0;
const TrainedFeatureFilter_1 = require("./TrainedFeatureFilter");
const Vector_1 = require("nlptoolkit-math/dist/Vector");
const ContinuousAttribute_1 = require("../Attribute/ContinuousAttribute");
const AttributeType_1 = require("../Attribute/AttributeType");
class Pca extends TrainedFeatureFilter_1.TrainedFeatureFilter {
    covarianceExplained = 0.99;
    eigenvectors = new Array();
    numberOfDimensions = -1;
    /**
     * The convertDataDefinition method gets the data definitions of the dataSet and removes all the attributes. Then adds
     * new attributes as CONTINUOUS.
     */
    convertDataDefinition() {
        let dataDefinition = this.dataSet.getDataDefinition();
        dataDefinition.removeAllAttributes();
        for (let i = 0; i < this.eigenvectors.length; i++) {
            dataDefinition.addAttribute(AttributeType_1.AttributeType.CONTINUOUS);
        }
    }
    /**
     * The convertInstance method takes an {@link Instance} as an input and creates a {@link Vector} attributes from continuousAttributes.
     * After removing all attributes of given instance, it then adds new {@link ContinuousAttribute} by using the dot
     * product of attribute Vector and the eigenvectors.
     *
     * @param instance Instance that will be converted to {@link ContinuousAttribute} by using eigenvectors.
     */
    convertInstance(instance) {
        let attributes = new Vector_1.Vector(instance.continuousAttributes());
        instance.removeAllAttributes();
        for (let eigenvector of this.eigenvectors) {
            instance.addAttribute(new ContinuousAttribute_1.ContinuousAttribute(attributes.dotProduct(eigenvector)));
        }
    }
    /**
     * The train method creates an averageVector from continuousAttributeAverage and a covariance {@link Matrix} from that averageVector.
     * Then finds the eigenvectors of that covariance matrix and removes its unnecessary eigenvectors.
     */
    train() {
        let averageVector = new Vector_1.Vector(this.dataSet.getInstanceList().continuousAttributeAverage());
        let covariance = this.dataSet.getInstanceList().covariance(averageVector);
        this.eigenvectors = covariance.characteristics();
        if (this.numberOfDimensions != -1) {
            this.removeAllEigenvectorsExceptTheMostImportantK();
        }
        else {
            this.removeUnnecessaryEigenvectors();
        }
    }
    /**
     * Constructor that sets the dataSet and dimension. Then calls train method.
     *
     * @param dataSet            DataSet that will be used.
     * @param numberOfDimensionsOrCovarianceExplained Dimension number.
     */
    constructor(dataSet, numberOfDimensionsOrCovarianceExplained) {
        super(dataSet);
        if (numberOfDimensionsOrCovarianceExplained != undefined) {
            if (Number.isInteger(numberOfDimensionsOrCovarianceExplained)) {
                this.numberOfDimensions = numberOfDimensionsOrCovarianceExplained;
            }
            else {
                this.covarianceExplained = numberOfDimensionsOrCovarianceExplained;
            }
        }
        this.train();
    }
    /**
     * The removeUnnecessaryEigenvectors methods takes an ArrayList of Eigenvectors. It first calculates the summation
     * of eigenValues. Then it finds the eigenvectors which have lesser summation than covarianceExplained and removes these
     * eigenvectors.
     */
    removeUnnecessaryEigenvectors() {
        let sum = 0.0, currentSum = 0.0;
        for (let eigenvector of this.eigenvectors) {
            sum += eigenvector.getEigenValue();
        }
        for (let i = 0; i < this.eigenvectors.length; i++) {
            if (currentSum / sum < this.covarianceExplained) {
                currentSum += this.eigenvectors[i].getEigenValue();
            }
            else {
                this.eigenvectors.splice(i, 1);
                i--;
            }
        }
    }
    /**
     * The removeAllEigenvectorsExceptTheMostImportantK method takes an {@link Array} of {@link Eigenvector}s and removes the
     * surplus eigenvectors when the number of eigenvectors is greater than the dimension.
     */
    removeAllEigenvectorsExceptTheMostImportantK() {
        this.eigenvectors.splice(this.numberOfDimensions, this.eigenvectors.length - this.numberOfDimensions);
    }
}
exports.Pca = Pca;
//# sourceMappingURL=Pca.js.map