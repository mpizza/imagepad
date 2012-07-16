"use strict";

var imagepad={
  loadcanvas: function(){
    this.pad = document.getElementById("ImagePad");
    this.ctx = this.pad.getContext("2d");
    this.pad.width=this.img.width;
    this.pad.height=this.img.height;
    
    this.hidepad = document.getElementById("HidePad");
    this.hidectx = this.hidepad.getContext("2d");
    this.hidepad.width=this.img.width;
    this.hidepad.height=this.img.height;
  },
  
  loadimg: function(){
    this.img = document.getElementById("imageELE");
  },
  
  drawimg: function(){
    this.hidectx.drawImage(this.img,0,0);
  },
  
  showpad: function(frame){
    //this.frame = this.hidectx.getImageData(0, 0, this.hidepad.width, this.hidepad.height);
    this.ctx.putImageData(frame, 0, 0);  
  },
  
  creatLine:function(pos){
	  this.ctx.fillStyle=this.color;//'#ff0000';	
		this.ctx.strokeStyle =this.color;//'#ff0000';
		this.ctx.lineWidth   = 1;
	  this.ctx.beginPath();
		this.ctx.moveTo(pos.x,pos.y);
		$('#posinfo').html(pos.x+":"+pos.y+":"+document.documentElement.scrollTop);
  },
	
	drawLine:function(pos){
    this.ctx.lineTo(pos.x,pos.y);		  
    this.ctx.stroke();  
  },
  
  drawLineEnd:function(){
	   this.ctx.closePath();	   
	   this.pen=0;
	},
  drawText:function(text){
    //alert(Textobj.media);
    this.ctx.fillStyle=text.color;
    this.ctx.font=text.font;
    this.ctx.textBaseline = text.textBaseline;
    this.ctx.textAlign=text.textAlign;
    this.ctx.fillText  (text.content, text.x, text.y);    
	},
  init: function(){
    this.loadimg();
    this.loadcanvas();
    this.drawimg();
    this.color='#ff0000';
    this.pen=0;
  }
}

function filter (back){
  this.back=back;
  this.back_ctx=back.getContext("2d");

  this.grey = function(){
    var frame = this.back_ctx.getImageData(0, 0, this.back.width, this.back.height);
		var l = frame.data.length / 4;

    for (var i = 0; i < l; i++) {
      var r = frame.data[i * 4 + 0];
      var g = frame.data[i * 4 + 1];
      var b = frame.data[i * 4 + 2];
      var brightness = (3*r+4*g+b)>>>3;
      frame.data[i* 4] = brightness;
      frame.data[i* 4+1] = brightness;
      frame.data[i* 4+2] = brightness;
    }
    return frame;
  }
  
  this.old = function(){
    var frame = this.back_ctx.getImageData(0, 0, this.back.width, this.back.height);
		var l = frame.data.length / 4;

    for (var i = 0; i < l; i++) {
      var r = frame.data[i * 4 + 0];
      var g = frame.data[i * 4 + 1];
      var b = frame.data[i * 4 + 2];
      var brightness = (3*r+4*g+b)>>>3;
      frame.data[i* 4] = brightness;
      frame.data[i* 4+1] = brightness;
      frame.data[i* 4+2] = brightness;
    }
    return frame;
  }
  
  this.warlhol = function(){
    var frame = this.back_ctx.getImageData(0, 0, this.back.width, this.back.height);
		var l = frame.data.length / 4;
		
		for (var i = 0; i < l; i++) {
		  var r = frame.data[i * 4 + 0];
      var g = frame.data[i * 4 + 1];
      var b = frame.data[i * 4 + 2];
      var brightness = (3*r+4*g+b)>>>3;
        frame.data[i * 4] =255;
        frame.data[i * 4+1] =241;
        frame.data[i * 4+2] = 0;
      if (brightness<105){
        frame.data[i * 4] =0;
        frame.data[i * 4+1] =161;
        frame.data[i * 4+2] = 233;
      }
      if (brightness>190){
        frame.data[i * 4] =228;
        frame.data[i * 4+1] =0;
        frame.data[i * 4+2] = 127;
      }
    }
    return frame;
  }
}

function pos(){
  this.x=0;
  this.y=0;
}
function posfn(e, ele){
  var setpos=new pos();
  setpos.x=e.clientX-(ele.offsetLeft-document.documentElement.scrollLeft);
  setpos.y=e.clientY-(ele.offsetTop-document.documentElement.scrollTop);
  console.log(e.clientY+":"+e.screenY+":"+ele.offsetTop+":"+document.documentElement.scrollTop+":"+ele.scrollHeight+"\n");
  return setpos;
}
function text(){
  this.x=256;
  this.y=256;
  this.content="";
  this.color="#0000ff";
  this.textBaseline='top';
  this.textAlign='left';
  this.font='40pt Arial';
}


$(function(){
  $('#fake-picture').click(function(){
    $('#take-picture').click();
  });
  var getpad = imagepad;
  var getpos=new pos();
  getpad.init();
  getpad.showpad(getpad.hidectx.getImageData(0, 0 , getpad.hidepad.width, getpad.hidepad.height));
  
  var getfilter= new filter (getpad.hidepad); 
  var greyframe=getfilter.grey();
  getpad.showpad(greyframe , getpad.hidepad.width, getpad.hidepad.height);
  
  //var warlholframe=getfilter.warlhol();
  //getpad.showpad(warlholframe , getpad.hidepad.width, getpad.hidepad.height);
  
  /*drawline*/
  getpad.pad.addEventListener("mousedown", function(e){
    getpad.pen=1;
    getpos=posfn(e, getpad.pad);
    getpad.creatLine(getpos);
  });
  
  getpad.pad.addEventListener("mousemove", function(e){
    if(getpad.pen==1){  
      getpos=posfn(e, getpad.pad);
      getpad.drawLine(getpos);
    }
  });
  
  getpad.pad.addEventListener("mouseleave", function(e){
   getpad.drawLineEnd();
  });
  
  getpad.pad.addEventListener("mouseup", function(e){
     getpad.drawLineEnd();
  });
  
  /*setText*/
  document.getElementById("sendit").addEventListener("click",function(){
    if(document.getElementById("textit").value!==""){
      var gettext=new text();
      gettext.content=document.getElementById("textit").value;
      getpad.drawText(gettext);
    }
  });
  
  /*camera api*/
  var takePicture = document.querySelector("#take-picture");
  
  if (takePicture && getpad.img) {  
        // Set events  
        takePicture.onchange = function (event) {  
            // Get a reference to the taken picture or chosen file  
            var files = event.target.files,  
                file;  
            if (files && files.length > 0) {  
                file = files[0];  
                try {  
                    // Get window.URL object  
                    
                    var URL = window.URL || window.webkitURL;  
  
                    // Create ObjectURL  
                    var imgURL = URL.createObjectURL(file);  
  
                    // Set img src to ObjectURL  
                    getpad.img.src = imgURL;  
                    getpad.img.onload = function() {
                        getpad.init();
                        getpad.showpad(getpad.hidectx.getImageData(0, 0 , getpad.hidepad.width, getpad.hidepad.height));
                    };
                    // Revoke ObjectURL  
                    URL.revokeObjectURL(imgURL);  
                    
                    /*
                    var fileReader = new FileReader();  
                    fileReader.onload = function (event) {  
                      getpad.img.src = event.target.result; 
                      getpad.img.onload = function() {
                        getpad.init();
                        getpad.showpad(getpad.hidectx.getImageData(0, 0 , getpad.hidepad.width, getpad.hidepad.height));
                      };
                    };  
                    fileReader.readAsDataURL(file); 
                    */
                }  
                catch (e) {  
                    try {  
                        // Fallback if createObjectURL is not supported  
                        var fileReader = new FileReader();  
                        fileReader.onload = function (event) {  
                            getpad.img.src = event.target.result;  
                            getpad.init();
                        };  
                        fileReader.readAsDataURL(file);  
                    }  
                    catch (e) {  
                        //  
                        var error = document.querySelector("#error");  
                        if (error) {  
                            error.innerHTML = "Neither createObjectURL or FileReader are supported";  
                        }  
                    }  
                }  
            }  
        };  
    }  
});