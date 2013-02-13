#ifndef _CLASS_FIDTRACKAREA_H
#define _CLASS_FIDTRACKAREA_H

#include "FrameThresholder.h"
#include "FidtrackFinder.h"

struct Rect {
    int x;
    int y;
    int width;
    int height;
};

class FrameThresholder;
class FidtrackFinder;
class FidtrackArea : public FrameProcessor {
	private:
		FrameThresholder	*thresholder;
		FidtrackFinder		*finder;
		Rect		cropArea;
		//cv::Mat			croppedArea;
		unsigned char		*thresholderOutput;

		//char			*name;
		bool			enableFinder;

		int			x;		// Top left corner X value
		int			y;		// Top left corner Y value
		int			width;
		int			height;
		int			thresholderGradient;
		int			thresholderTileSize;

	public:
		FidtrackArea(int x, int y, int width, int height);
		~FidtrackArea() {
			//free(this->name);
		}
		bool init(int width, int height, int srcBytes, int dstBytes);

		virtual void process(unsigned char *src, unsigned char *dest);
		bool process(unsigned char *src);

		void enableFiducialFinder(bool state) {
			this->enableFinder = state;
		}

		bool hasFinderEnabled(void) {
			return this->enableFinder;
		}

		void setName(const char* name) {
			//this->name = (char*) malloc(strlen(name));
			//strcpy(this->name, name);
		}

		void setGradient(int gradient);
		void setTileSize(int tileSize);

		std::list<FiducialObject> getFiducials(void);
		int getWidth(void) {
			return this->width;
		}
		int getHeight(void) {
			return this->height;
		}
};

#endif