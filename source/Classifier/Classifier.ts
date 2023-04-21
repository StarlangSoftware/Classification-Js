import {Model} from "../Model/Model";
import {InstanceList} from "../InstanceList/InstanceList";
import {Parameter} from "../Parameter/Parameter";
import {Instance} from "../Instance/Instance";
import {DiscreteAttribute} from "../Attribute/DiscreteAttribute";
import {DiscreteIndexedAttribute} from "../Attribute/DiscreteIndexedAttribute";
import {ConfusionMatrix} from "../Performance/ConfusionMatrix";
import {Performance} from "../Performance/Performance";
import {DetailedClassificationPerformance} from "../Performance/DetailedClassificationPerformance";

export abstract class Classifier {

    protected model: Model

    abstract train(trainSet: InstanceList, parameters: Parameter):void
    abstract loadModel(fileName: string): void

    /**
     * Checks given instance's attribute and returns true if it is a discrete indexed attribute, false otherwise.
     *
     * @param instance Instance to check.
     * @return True if instance is a discrete indexed attribute, false otherwise.
     */
    discreteCheck(instance: Instance): boolean{
        for (let i = 0; i < instance.attributeSize(); i++) {
            if (instance.getAttribute(i) instanceof DiscreteAttribute &&
                !(instance.getAttribute(i) instanceof DiscreteIndexedAttribute)) {
                return false;
            }
        }
        return true;
    }

    /**
     * TestClassification an instance list with the current model.
     *
     * @param testSet Test data (list of instances) to be tested.
     * @return The accuracy (and error) of the model as an instance of Performance class.
     */
    test(testSet: InstanceList): Performance{
        let classLabels = testSet.getUnionOfPossibleClassLabels();
        let confusion = new ConfusionMatrix(classLabels);
        for (let i = 0; i < testSet.size(); i++) {
            let instance = testSet.get(i);
            confusion.classify(instance.getClassLabel(), this.model.predict(instance));
        }
        return new DetailedClassificationPerformance(confusion);
    }

    /**
     * Runs current classifier with the given train and test data.
     *
     * @param parameter Parameter of the classifier to be trained.
     * @param trainSet  Training data to be used in training the classifier.
     * @param testSet   Test data to be tested after training the model.
     * @return The accuracy (and error) of the trained model as an instance of Performance class.
     * @throws DiscreteFeaturesNotAllowed Exception for discrete features.
     */
    singleRun(parameter: Parameter, trainSet: InstanceList, testSet: InstanceList): Performance{
        this.train(trainSet, parameter);
        return this.test(testSet);
    }

    /**
     * Accessor for the model.
     *
     * @return Model.
     */
    getModel(): Model{
        return this.model
    }
}