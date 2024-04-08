import { sineOscillation } from "./sineOscillation";

export const createFrequencyOscillator = (frequency: number, context: AudioContext): OscillatorNode => {
        //Frequency oscillator oscillates the frequency. 
        const freqOsc = context.createOscillator();
        freqOsc.frequency.value = frequency;
        freqOsc.type = 'sine';

        return freqOsc;

}

export function fixedFrequency(frequencyOscillator: OscillatorNode, toFrequency: number, startingTime: number, transitionTime: number) {

        frequencyOscillator.frequency.linearRampToValueAtTime(toFrequency, startingTime + transitionTime);
}

export function sineFrequency(frequencyOscillator: OscillatorNode, startingTime: number, freqLowerBound: number, freqUpperBound: number, cycleTime: number, totalInSeconds: number, step: number) {

        let currentTime = startingTime;

        while (currentTime <= startingTime + totalInSeconds) {

                const freq = sineOscillation(cycleTime, freqUpperBound, freqLowerBound, currentTime);
                frequencyOscillator.frequency.linearRampToValueAtTime(freq, currentTime);
                currentTime += step;
                
        }
}
