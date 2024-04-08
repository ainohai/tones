
let recordedChunks;

export function setupMediaRecorder(mediaStreamDestination: MediaStreamAudioDestinationNode): MediaRecorder {
    const mediaRecorder = new MediaRecorder(mediaStreamDestination.stream);
    recordedChunks = [];

    mediaRecorder.ondataavailable = function (event) {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = function () {
        let blob = new Blob(recordedChunks, { type: 'audio/wav' });
        recordedChunks = [];

        let url = URL.createObjectURL(blob);

        /// todo: check if there are more sensible ways. 
        let a = document.createElement('a');
        document.body.appendChild(a);

        a.href = url;
        a.download = 'recording.wav';
        a.click();

        window.URL.revokeObjectURL(url);
    };

    return mediaRecorder;
}
