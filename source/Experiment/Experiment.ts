import {Parameter} from "../Parameter/Parameter";
import {DataSet} from "../DataSet/DataSet";
import {FeatureSubSet} from "../FeatureSelection/FeatureSubSet";
import {Model} from "../Model/Model";

export class Experiment {

    private readonly model: Model
    private readonly parameter: Parameter
    private readonly dataSet: DataSet

    /**
     * Constructor for a specific machine learning experiment
     * @param model Model used in the machine learning experiment
     * @param parameter Parameter(s) of the classifier.
     * @param dataSet DataSet on which the classifier is run.
     */
    constructor(model: Model, parameter: Parameter, dataSet: DataSet) {
        this.model = model
        this.parameter = parameter
        this.dataSet = dataSet
    }

    /**
     * Accessor for the classifier attribute.
     * @return Classifier attribute.
     */
    getmodel(): Model{
        return this.model
    }

    /**
     * Accessor for the parameter attribute.
     * @return Parameter attribute.
     */
    getParameter(): Parameter{
        return this.parameter
    }

    /**
     * Accessor for the dataSet attribute.
     * @return DataSet attribute.
     */
    getDataSet(): DataSet{
        return this.dataSet
    }

    /**
     * Construct and returns a feature selection experiment.
     * @param featureSubSet Feature subset used in the feature selection experiment
     * @return Experiment constructed
     */
    featureSelectedExperiment(featureSubSet: FeatureSubSet): Experiment{
        return new Experiment(this.model, this.parameter, this.dataSet.getSubSetOfFeatures(featureSubSet));
    }

}