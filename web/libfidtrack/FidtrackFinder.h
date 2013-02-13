/*  reacTIVision fiducial tracking framework
    FidtrackFinder.h
	Copyright (C) 2005-2008 Martin Kaltenbrunner <mkalten@iua.upf.edu>

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/

#ifndef FIDTRACKFINDER
#define FIDTRACKFINDER

#include "FrameProcessor.h"
#include <vector>
#include <list>
#include <sstream>
#include <string>

#include "floatpoint.h"
#include "segment.h"
#include "fidtrackX.h"
#define MAX_FIDUCIAL_COUNT 4

class FidtrackFinder: public FrameProcessor
{
public:
	FidtrackFinder(const char* tree_cfg) {

		tree_config = tree_cfg;

		totalframes = 0;
		session_id = 0;
		show_settings = false;
		offsetX = 0;
		offsetY = 0;
	};

	~FidtrackFinder() {
		if (initialized) {
			terminate_segmenter(&segmenter);
			terminate_treeidmap(&treeidmap);
			terminate_fidtrackerX(&fidtrackerx);
		}
	};

	void process(unsigned char *src, unsigned char *dest);
	bool init(int w ,int h, int sb, int db);
	std::list<FiducialObject> reset();
	void setXOffset(float offset) {
		offsetX = offset;
	}
	void setYOffset(float offset) {
		offsetY = offset;
	}

private:
	int session_id;
	float average_leaf_size;
	float average_fiducial_size;
	long totalframes;
	bool show_settings;
	float offsetX;
	float offsetY;

	#ifdef __APPLE__
	char full_path[1024];
	#endif

	const char* tree_config;

	Segmenter segmenter;
	FiducialX fiducials[ MAX_FIDUCIAL_COUNT ];
	RegionX regions[ MAX_FIDUCIAL_COUNT*4 ];
	TreeIdMap treeidmap;
	FidtrackerX fidtrackerx;
	MessageListener::DisplayMode prevMode;

	void printStatistics(long start_time);
};

#endif

