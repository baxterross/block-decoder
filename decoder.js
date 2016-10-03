var $ = document.getElementById.bind(document);

var video = $('video'),
	canvas = $('canvas'),
	context = canvas.getContext('2d'),
	frameNumbers = [];

var getFrameNumber = function() {
	var	width = 160,
		height = 5,
		offsetX = video.videoWidth - width,
		offsetY = video.videoHeight - height,
		blockWidth = 10,
		blockIteratorStep = 4 * blockWidth,
		colorThreshold = 200,
		frameData, i, j, r, g,
		frameNumber = 0;

	context.drawImage(video, offsetX, offsetY, width, height, 0, 0, width, height);
	frameData = context.getImageData(0, 0, width, 1).data;

	for (i = 20, j = Math.pow(2, width / blockWidth - 1); i < frameData.length; i += blockIteratorStep, j = j / 2) {
		r = frameData[i];
		g = frameData[i+1];

		if (r > colorThreshold) {
		} else if (g > colorThreshold) {
			frameNumber += j;
		} else {
//			console.log('no color detected', r, g);
		}
	}

	console.log(frameNumber);
	setTimeout(getFrameNumber, 0);
};

video.addEventListener('loadedmetadata', function() {
	video.play();
	getFrameNumber();
});
