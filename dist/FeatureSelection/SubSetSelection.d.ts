import { FeatureSubSet } from "./FeatureSubSet";
import { MultipleRun } from "../Experiment/MultipleRun";
import { Experiment } from "../Experiment/Experiment";
export declare abstract class SubSetSelection {
    protected initialSubSet: FeatureSubSet;
    protected abstract operator(current: FeatureSubSet, numberOfFeatures: number): Array<FeatureSubSet>;
    /**
     * A constructor that sets the initial subset with given input.
     *
     * @param initialSubSet {@link FeatureSubSet} input.
     */
    protected constructor(initialSubSet: FeatureSubSet);
    /**
     * The forward method starts with having no feature in the model. In each iteration, it keeps adding the features that are not currently listed.
     *
     * @param currentSubSetList ArrayList to add the FeatureSubsets.
     * @param current           FeatureSubset that will be added to currentSubSetList.
     * @param numberOfFeatures  The number of features to add the subset.
     */
    protected forward(currentSubSetList: Array<FeatureSubSet>, current: FeatureSubSet, numberOfFeatures: number): void;
    /**
     * The backward method starts with all the features and removes the least significant feature at each iteration.
     *
     * @param currentSubSetList ArrayList to add the FeatureSubsets.
     * @param current           FeatureSubset that will be added to currentSubSetList
     */
    protected backward(currentSubSetList: Array<FeatureSubSet>, current: FeatureSubSet): void;
    /**
     * The execute method takes an {@link Experiment} and a {@link MultipleRun} as inputs. By selecting a candidateList from given
     * Experiment it tries to find a FeatureSubSet that gives best performance.
     *
     * @param multipleRun {@link MultipleRun} type input.
     * @param experiment  {@link Experiment} type input.
     * @return FeatureSubSet that gives best performance.
     */
    execute(multipleRun: MultipleRun, experiment: Experiment): FeatureSubSet;
}
