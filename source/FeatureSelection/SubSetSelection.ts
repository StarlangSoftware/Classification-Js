import {FeatureSubSet} from "./FeatureSubSet";
import {MultipleRun} from "../Experiment/MultipleRun";
import {Experiment} from "../Experiment/Experiment";

export abstract class SubSetSelection {

    protected initialSubSet: FeatureSubSet

    protected abstract operator(current: FeatureSubSet, numberOfFeatures: number): Array<FeatureSubSet>

    /**
     * A constructor that sets the initial subset with given input.
     *
     * @param initialSubSet {@link FeatureSubSet} input.
     */
    protected constructor(initialSubSet: FeatureSubSet) {
        this.initialSubSet = initialSubSet
    }

    /**
     * The forward method starts with having no feature in the model. In each iteration, it keeps adding the features that are not currently listed.
     *
     * @param currentSubSetList ArrayList to add the FeatureSubsets.
     * @param current           FeatureSubset that will be added to currentSubSetList.
     * @param numberOfFeatures  The number of features to add the subset.
     */
    protected forward(currentSubSetList: Array<FeatureSubSet>, current: FeatureSubSet, numberOfFeatures: number){
        for (let i = 0; i < numberOfFeatures; i++) {
            if (!current.contains(i)) {
                let candidate = current.clone();
                candidate.add(i);
                currentSubSetList.push(candidate);
            }
        }
    }

    /**
     * The backward method starts with all the features and removes the least significant feature at each iteration.
     *
     * @param currentSubSetList ArrayList to add the FeatureSubsets.
     * @param current           FeatureSubset that will be added to currentSubSetList
     */
    protected backward(currentSubSetList: Array<FeatureSubSet>, current: FeatureSubSet){
        for (let i = 0; i < current.size(); i++) {
            let candidate = current.clone();
            candidate.remove(i);
            currentSubSetList.push(candidate);
        }
    }

    /**
     * The execute method takes an {@link Experiment} and a {@link MultipleRun} as inputs. By selecting a candidateList from given
     * Experiment it tries to find a FeatureSubSet that gives best performance.
     *
     * @param multipleRun {@link MultipleRun} type input.
     * @param experiment  {@link Experiment} type input.
     * @return FeatureSubSet that gives best performance.
     */
    execute(multipleRun: MultipleRun, experiment: Experiment): FeatureSubSet{
        let processed = new Set<FeatureSubSet>();
        let best = this.initialSubSet;
        processed.add(best);
        let betterFound = true;
        let bestPerformance = undefined, currentPerformance;
        if (best.size() > 0){
            bestPerformance = multipleRun.execute(experiment.featureSelectedExperiment(best));
        }
        while (betterFound) {
            betterFound = false;
            let candidateList = this.operator(best, experiment.getDataSet().getDataDefinition().attributeCount());
            for (let candidateSubSet of candidateList) {
                if (!processed.has(candidateSubSet)) {
                    if (candidateSubSet.size() > 0){
                        currentPerformance = multipleRun.execute(experiment.featureSelectedExperiment(candidateSubSet));
                        if (bestPerformance == null || currentPerformance.isBetter(bestPerformance)) {
                            best = candidateSubSet;
                            bestPerformance = currentPerformance;
                            betterFound = true;
                        }
                    }
                    processed.add(candidateSubSet);
                }
            }
        }
        return best;
    }

}