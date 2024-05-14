import { Classifier } from "../Classifier/Classifier";
import { Parameter } from "../Parameter/Parameter";
import { DataSet } from "../DataSet/DataSet";
import { FeatureSubSet } from "../FeatureSelection/FeatureSubSet";
export declare class Experiment {
    private readonly classifier;
    private readonly parameter;
    private readonly dataSet;
    /**
     * Constructor for a specific machine learning experiment
     * @param classifier Classifier used in the machine learning experiment
     * @param parameter Parameter(s) of the classifier.
     * @param dataSet DataSet on which the classifier is run.
     */
    constructor(classifier: Classifier, parameter: Parameter, dataSet: DataSet);
    /**
     * Accessor for the classifier attribute.
     * @return Classifier attribute.
     */
    getClassifier(): Classifier;
    /**
     * Accessor for the parameter attribute.
     * @return Parameter attribute.
     */
    getParameter(): Parameter;
    /**
     * Accessor for the dataSet attribute.
     * @return DataSet attribute.
     */
    getDataSet(): DataSet;
    /**
     * Construct and returns a feature selection experiment.
     * @param featureSubSet Feature subset used in the feature selection experiment
     * @return Experiment constructed
     */
    featureSelectedExperiment(featureSubSet: FeatureSubSet): Experiment;
}
