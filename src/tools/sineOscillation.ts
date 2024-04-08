
export function sineOscillation(cycleTime: number, upperBound: number, lowerBound: number, timepoint: number) {
        const sineFrequency = 1 / cycleTime;
        const oscillationRange = (upperBound - lowerBound);
        const value = lowerBound + (Math.sin(2 * Math.PI * sineFrequency * timepoint) + 1) / 2 * oscillationRange;
        return value;
}
