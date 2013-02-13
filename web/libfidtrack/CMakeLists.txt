set(LIBFIDTRACK_SOURCES
	all.trees
	default_trees.h
	fidtrackX.c
	fidtrackX.h
	floatpoint.h
	segment.c
	segment.h
	tiled_bernsen_threshold.c
	tiled_bernsen_threshold.h
	treeidmap.cpp
	treeidmap.h
)

add_library(libfidtrack ${LIBFIDTRACK_SOURCES})
