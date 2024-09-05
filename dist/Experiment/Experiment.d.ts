import { Parameter } from "../Parameter/Parameter";
import { DataSet } from "../DataSet/DataSet";
import { FeatureSubSet } from "../FeatureSelection/FeatureSubSet";
import { Model } from "../Model/Model";
export declare class Experiment {
    private readonly model;
    private readonly parameter;
    private readonly dataSet;
    /**
     * Constructor for a specific machine learning experiment
     * @param model Model used in the machine learning experiment
     * @param parameter Parameter(s) of the classifier.
     * @param dataSet DataSet on which the classifier is run.
     */
    constructor(model: Model, parameter: Parameter, dataSet: DataSet);
    /**
     * Accessor for the classifier attribute.
     * @return Classifier attribute.
     */
    getmodel(): Model;
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
