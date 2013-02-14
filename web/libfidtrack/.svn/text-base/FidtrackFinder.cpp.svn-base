/*  reacTIVision fiducial tracking framework
    FidtrackFinder.cpp
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

#include "FidtrackFinder.h"
#include <sstream>

bool FidtrackFinder::init(int w, int h, int sb, int db) {

	FrameProcessor::init(w,h,sb,db);

	if (db!=1) {
		printf("target buffer must be grayscale\n");
		return false;
	}

	// uncomment below when back to reading from .trees files
	//if (strcmp(tree_config,"none")!=0)
	//	initialize_treeidmap_from_file( &treeidmap, tree_config );
	//else
	initialize_treeidmap( &treeidmap );

	initialize_fidtrackerX( &fidtrackerx, &treeidmap);
	initialize_segmenter( &segmenter, width, height, treeidmap.max_adjacencies );
	//finger_buffer = new unsigned char[64*64];

	average_leaf_size = 4.0f;
	average_fiducial_size = 48.0f;

	return true;
}

std::list<FiducialObject> FidtrackFinder::reset() {

	std::list<FiducialObject> returnList;
	for (std::list<FiducialObject>::iterator fiducial = fiducialList.begin(); fiducial!=fiducialList.end(); fiducial++)
	{
		if(fiducial->isAlive())
		{
			fiducial->resetUpdate();
			returnList.push_back(*fiducial);
		}
	}
	fiducialList.clear();

	return returnList;
}

void FidtrackFinder::process(unsigned char *src, unsigned char *dest) {

	//fiducialList reset update bool
	fiducialList = reset();
	// segmentation
	step_segmenter( &segmenter, dest );
	// fiducial recognition
	int fid_count = find_fiducialsX( fiducials, MAX_FIDUCIAL_COUNT,  &fidtrackerx, &segmenter, width, height);

	float total_leaf_size = 0.0f;
	float total_fiducial_size = 0.0f;
	int valid_fiducial_count = 0;

	// process found symbols
	for(int i=0;i< fid_count;i++) {
		if ( fiducials[i].id >=0 ) {
			valid_fiducial_count ++;
			total_leaf_size += fiducials[i].leaf_size;
			total_fiducial_size += fiducials[i].root_size;
		}

		FiducialObject *existing_fiducial = NULL;
		// update objects we had in the last frame
		// also check if we have an ID/position conflict
		// or correct an INVALID_FIDUCIAL_ID if we had an ID in the last frame
		for (std::list<FiducialObject>::iterator fiducial = fiducialList.begin(); fiducial!=fiducialList.end(); fiducial++) {

			float distance = fiducial->distance(fiducials[i].x,fiducials[i].y);

			if (fiducials[i].id == fiducial->fiducial_id)  {
				// find and match a fiducial we had last frame already ...
				if(!existing_fiducial) {
					existing_fiducial = &(*fiducial);

					for (int j=0;j<fid_count;j++) {
						if ( (i!=j) && (fiducials[j].id==fiducial->fiducial_id) && (fiducial->distance(fiducials[j].x,fiducials[j].y)<distance)) {
							//check if there is another fiducial with the same id closer
							existing_fiducial = NULL;
							break;
						}
					}
					if (existing_fiducial!=NULL) {
						for (std::list<FiducialObject>::iterator test = fiducialList.begin(); test!=fiducialList.end(); test++) {
							FiducialObject *test_fiducial = &(*test);
							if ( (test_fiducial!=existing_fiducial) && (test_fiducial->fiducial_id==existing_fiducial->fiducial_id) && (test_fiducial->distance(fiducials[i].x,fiducials[i].y)<distance)) {
								//check if there is another fiducial with the same id closer
								existing_fiducial = NULL;
								break;
							}
						}
					}
				}
			}
		}

		if  (existing_fiducial!=NULL) {
			// just update the fiducial from last frame ...
			existing_fiducial->update(fiducials[i].x + offsetX,fiducials[i].y + offsetY,fiducials[i].angle,fiducials[i].root_size,fiducials[i].leaf_size);
		}
		else if  (fiducials[i].id!=INVALID_FIDUCIAL_ID) {
			// add the newly found object
			session_id++;
			FiducialObject addFiducial(session_id, fiducials[i].id, width, height,fiducials[i].root_colour,fiducials[i].node_count);
			addFiducial.update(fiducials[i].x,fiducials[i].y,fiducials[i].angle,fiducials[i].root_size,fiducials[i].leaf_size);
			//std::cout << "FidtrackFinder: Created fiducial with id: " << fiducials[i].id << std::endl;
			fiducialList.push_back(addFiducial);
		}
	}

	for (std::list<FiducialObject>::iterator test = fiducialList.begin(); test!=fiducialList.end(); test++) {
		test->checkRemoved();
	}
}
