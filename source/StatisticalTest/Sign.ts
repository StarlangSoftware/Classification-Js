import {PairedTest} from "./PairedTest";
import {ExperimentPerformance} from "../Performance/ExperimentPerformance";
import {StatisticalTestResult} from "./StatisticalTestResult";

export class Sign extends PairedTest{

    private factorial(n: number): number{
        let result = 1;
        for (let i = 2; i <= n; i++)
            result *= i;
        return result;
    }

    private binomial(m: number, n: number): number{
        if (n == 0 || m == n){
            return 1;
        } else {
            return this.factorial(m) / (this.factorial(n) * this.factorial(m - n));
        }
    }

    compareClassifiers(classifier1: ExperimentPerformance, classifier2: ExperimentPerformance): StatisticalTestResult {
        let plus = 0, minus = 0;
        for (let i = 0; i < classifier1.numberOfExperiments(); i++){
            if (classifier1.getErrorRate(i) < classifier2.getErrorRate(i)){
                plus++;
            } else {
                if (classifier1.getErrorRate(i) > classifier2.getErrorRate(i)){
                    minus++;
                }
            }
        }
        let total = plus + minus;
        let pValue = 0.0;
        for (let i = 0; i <= plus; i++){
            pValue += this.binomial(total, i) / Math.pow(2, total);
        }
        return new StatisticalTestResult(pValue, false);
    }

}