/*  reacTIVision fiducial tracking framework
    FrameThresholder.cpp
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

#include "FrameThresholder.h"

bool FrameThresholder::init(int w, int h, int sb, int db) {
	//init FT as FP
	FrameProcessor::init(w,h,sb,db);

	//def TiledBrensenThresholder
	thresholder = new TiledBernsenThresholder();

	/*init TiledBrensenThresholder
	* w - width of the thresholded area
	* h - height of the thresholded area
	* tile_size - size of the processed tiles */
	initialize_tiled_bernsen_thresholder(thresholder, w, h, tile_size );

	help_text.push_back( "FrameThresholder:");
	help_text.push_back( "   g - adjust gradient gate");

	return true;
}
void FrameThresholder::process(unsigned char *src, unsigned char *dest) {
	/* process threshold
	* thresholder
	* dest,src - input output pixel data
	* source stride - ?
	* width, height, tilesize and gradient of thresholder */
	tiled_bernsen_threshold( thresholder, dest, src, 1, width,  height, tile_size, gradient );
}

void FrameThresholder::setFlag(int flag, bool value) {
	if (flag=='g') setGradient=value;
}

int FrameThresholder::setGradientf(bool gradient_)
{
	 if(gradient_)gradient += 20;
		else gradient -= 20;

		return gradient;
}

int FrameThresholder::setTileSizef(bool tileSize)
{
	 if(tileSize)tile_size += 2;
		else tile_size -= 2;

		return tile_size;
}

