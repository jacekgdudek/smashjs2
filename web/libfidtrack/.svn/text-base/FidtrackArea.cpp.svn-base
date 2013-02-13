#include "FiducialObject.h"
#include "FidtrackArea.h"

FidtrackArea::FidtrackArea(int x, int y, int width, int height) {
	//this->name		= NULL;
	this->enableFinder	= true;

	this->x		= x;
	this->y		= y;
	this->width		= width;
	this->height		= height;

	this->thresholderGradient = 40;
	this->thresholderTileSize = 12;

	printf("Created FidtrackArea (x=%d, y=%d, width=%d, height=%d)",
			this->x,
			this->y,
			this->width,
			this->height);
}

bool FidtrackArea::init(int width, int height, int srcBytes, int dstBytes) {
	printf("Overriding arguments (width=%d, height=%d) with pre-defined (width=%d, height=%d) in FidtrackArea intialisation request. Using supplied srcBytes=%d and dstBytes=%d.",
		width,
		height,
		this->width,
		this->height,
		srcBytes,
		dstBytes);

	this->cropArea.x	= this->x;
	this->cropArea.y	= this->y;
	this->cropArea.width	= this->width;
	this->cropArea.height	= this->height;

	this->thresholderOutput = new unsigned char[this->width * this->height];

	// Initialise the thresholder
	this->thresholder = new FrameThresholder(this->thresholderGradient, this->thresholderTileSize);
	if (!this->thresholder->init(this->width, this->height, srcBytes, dstBytes)) {
		printf("Could not initialise thresholder.");
		return false;
	}

	// Initialise the finder
	if (this->enableFinder) {
		this->finder = new FidtrackFinder("none");
		if (!this->finder->init(this->width, this->height, srcBytes, dstBytes)) {
			printf("Could not initialise fiducial finder.");
			return false;
		}
		this->finder->setXOffset(this->x);
		this->finder->setYOffset(this->y);
	}

	return true;
}
void FidtrackArea::process(unsigned char *src, unsigned char *dest) {}

bool FidtrackArea::process(unsigned char *src) {
    //openCV related cropping
	//cv::Mat crop(*src, this->cropArea);
	//crop.copyTo(this->croppedArea);

	this->thresholder->process( src , this->thresholderOutput);

	if (this->enableFinder) {
		this->finder->process( src , this->thresholderOutput);
        return true;
	}
	src = this->thresholderOutput;
    return false;
    //cv::imshow("area",crop);
}

void FidtrackArea::setGradient(int gradient) {
	this->thresholderGradient = gradient;
}

void FidtrackArea::setTileSize(int tileSize) {
	this->thresholderTileSize = tileSize;
}

std::list<FiducialObject> FidtrackArea::getFiducials() {
	return this->finder->getFiducials();
}