import {Classifier} from "../Classifier/Classifier";
import {Parameter} from "../Parameter/Parameter";
import {DataSet} from "../DataSet/DataSet";
import {FeatureSubSet} from "../FeatureSelection/FeatureSubSet";

export class Experiment {

    private readonly classifier: Classifier
    private readonly parameter: Parameter
    private readonly dataSet: DataSet

    /**
     * Constructor for a specific machine learning experiment
     * @param classifier Classifier used in the machine learning experiment
     * @param parameter Parameter(s) of the classifier.
     * @param dataSet DataSet on which the classifier is run.
     */
    constructor(classifier: Classifier, parameter: Parameter, dataSet: DataSet) {
        this.classifier = classifier
        this.parameter = parameter
        this.dataSet = dataSet
    }

    /**
     * Accessor for the classifier attribute.
     * @return Classifier attribute.
     */
    getClassifier(): Classifier{
        return this.classifier
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
        return new Experiment(this.classifier, this.parameter, this.dataSet.getSubSetOfFeatures(featureSubSet));
    }

}