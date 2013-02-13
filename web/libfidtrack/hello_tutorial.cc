
/// @file hello_tutorial.cc


#include <cstdio>
#include <string>
#include <sstream>
#include "ppapi/cpp/core.h"
#include "ppapi/cpp/instance.h"
#include "ppapi/cpp/module.h"
#include "ppapi/cpp/var.h"
#include "ppapi/cpp/var_array_buffer.h"
#include "FrameProcessor.h"
#include "FidtrackArea.h"

#define DOUBLE_PI 6.28318

class HelloTutorialInstance : public pp::Instance {
    
 public:
    
    FrameProcessor		*thresholder;
	FrameProcessor		*fiducialFinder;
	std::vector<FrameProcessor*>			processorList;
	std::vector<FrameProcessor*>::iterator	frame;
    
 	int frameCounter;
	double lastTime;
    
    explicit HelloTutorialInstance(PP_Instance instance) : pp::Instance(instance)
      {
          frameCounter = 0;
          lastTime = 0;
          //init fidtrack area
          FidtrackArea *area = new FidtrackArea(0,
                                                0,
                                                640,
                                                480);
          area->setGradient(40);
          area->setTileSize(12 );
          processorList.push_back(area);
          InitFrameProcessors();
      }
    
    virtual ~HelloTutorialInstance() {}

    virtual void HandleMessage(const pp::Var& var_message) {
        
    if(var_message.is_array_buffer())
    {
        pp::VarArrayBuffer* var_ar_buf = new pp::VarArrayBuffer(var_message);
        unsigned char* data = static_cast<unsigned char*>(var_ar_buf->Map());
        uint32_t byte_length = var_ar_buf->ByteLength();
        delete(var_ar_buf);
        
        ProcessFrame(data);
                
        std::list<FiducialObject> fiducialList;
        FiducialObject * fo = NULL;
        
        FidtrackArea *processor;
        uint16_t fid0_x = uint16_t(0);
        uint16_t fid0_y = uint16_t(0);
        uint16_t fid2_x = uint16_t(0);
        uint16_t fid2_y = uint16_t(0);
        
        uint16_t fid0_rotation = uint16_t(0);
        uint16_t fid2_rotation = uint16_t(0);
        
        std::stringstream ss;
        std::string str = "";
        
        for (frame = processorList.begin(); frame!=processorList.end(); frame++) {
            processor = (FidtrackArea*) *frame;
            bool fid0_found = false;
            bool fid2_found = false;
             
            if (!processor->hasFinderEnabled()) continue;
            
            fiducialList = processor->getFiducials();
            
            for (std::list<FiducialObject>::iterator fiducial = fiducialList.begin(); fiducial!=fiducialList.end(); ++fiducial) {
                fo = &(*fiducial);
                if (fiducial->fiducial_id == 0){
                    fid0_x = uint16_t(fo->getX());
                    fid0_y = uint16_t(fo->getY());
                    fid0_rotation = uint16_t((fo->getAngle()/DOUBLE_PI)*360);
                    fid0_found = true;
                    //cv::circle(mRGBcam, cv::Point(640-(fo->getX()-5),fo->getY()+10), 50, cv::Scalar(0,201,238),-1);
                }
                else if (fiducial->fiducial_id == 2){
                    fid2_x = uint16_t(fo->getX());
                    fid2_y = uint16_t(fo->getY());
                    fid2_rotation = uint16_t((fo->getAngle()/DOUBLE_PI)*360);
                    fid2_found = true;
                    //cv::circle(mRGBcam, cv::Point(640-(fo->getX()-5),fo->getY()+10), 50, cv::Scalar(0,201,238),-1);
                }
            }
            
            //prepare the message
            //pp::VarArrayBuffer* var_ar_buf = new pp::VarArrayBuffer(17);
            //var_ar_buf[0] = fidUpdates;
            //std::stringstream ss;
            if(fid0_found)ss << 0 << "," << fid0_x << "," << fid0_y << "," << fid0_rotation;// << " y: " << fid0_y << " ~~  Fid2 x:" << fid2_x << " y: " << fid2_y;
            
            if(fid0_found && fid2_found) ss << ",";
            
            if(fid2_found)ss << 2 << "," << fid2_x << "," << fid2_y << "," << fid2_rotation;
            //std::string str = "";
            ss >> str;
            
            PostMessage(str);

        }
        
    }
  
        return;
        
        // Get time
	pp::Core* core = pp::Module::Get()->core();
	double currentTime = core->GetTime();
	
	int framesToTime = 100;
	if (frameCounter%framesToTime==0) {
		double timePassed = currentTime - lastTime;
		lastTime = currentTime;
		double fps = framesToTime / timePassed;
		
		// Convert to string
		//std::stringstream ss;
		//ss << fps;
		//PostMessage(std::string("FPS: ")+ss.str());
	}
	frameCounter++;
	
  	if (!var_message.is_string()) return;
		std::string message = var_message.AsString();
	  	pp::Var var_reply;
		
	

	  //var_reply = pp::Var(kReplyString);
	  //if (message == kHelloString) {
		//var_reply = pp::Var(kReplyString);
		//PostMessage(var_reply);
	  //}
  }
    
    //libfid related
    void InitFrameProcessors( void )
    {
        for ( frame = processorList.begin(); frame!=processorList.end(); ) {
            bool success = (*frame)->init( 640 , 480, 1, 1);                //////hardcoded width and height
            if( !success ) {
                processorList.erase( frame );
            } else frame++;
        }
    }
    
    bool ProcessFrame( unsigned char *src )
    {
        FidtrackArea *processor;
        for (frame = processorList.begin(); frame != processorList.end(); frame++) {
            bool result = false;
            processor = (FidtrackArea*) *frame;
            result = processor->process( src );
            return result;
        }
    }
};

class HelloTutorialModule : public pp::Module {
 public:
  HelloTutorialModule() : pp::Module() {}
  virtual ~HelloTutorialModule() {}

    
  virtual pp::Instance* CreateInstance(PP_Instance instance) {
    return new HelloTutorialInstance(instance);
  }
};

namespace pp {
    Module* CreateModule() {
      return new HelloTutorialModule();
    }
}
