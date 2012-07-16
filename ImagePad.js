function CanvasObj(){
     this.coorX;
	 this.coorY;
	 this.objW;//Width
	 this.objH;//Height
	 this.media; // define Canvas type line, text, img
	 this.ratio;
	 this.title;
	 this.type;
	 this.pathX=[];
	 this.pathY=[];
	 this.objcolor='#ff0000';
	 this.setCoor=function(x,y){
	    this.coorX=x;
		this.coorY=y;
	 };
	 
	 this.setMedia=function(type){
	    this.media=type;		
	 };
};

$(function() {
  var Panel=new Array();
	var disPanel=new Array();
  var Cobj_A=new CanvasObj();	
	Panel.push(Cobj_A);
	var img = new Image();	
	var canvasCopy = document.getElementById("ImagePad");
  var copyContext = canvasCopy.getContext("2d");
	var GetParent=canvasCopy.id;
	var offsetA=$("#"+GetParent).parent().parent().offset();   
	var dragged=false;
	var pened=false;
	var Line="";
	var ratio = 0.4;
	var CpanelID=0;
	Cobj_A.setCoor(0,0);
	Cobj_A.setMedia(img);
  Cobj_A.media.src=document.getElementById("imageELE").src;
	Cobj_A.objW=Cobj_A.media.width;
	Cobj_A.objH=Cobj_A.media.height;	
  Cobj_A.title="Image";
	Cobj_A.ratio=ratio;
	Cobj_A.type="I";
	
	$("#PanelStatus: #pixelInfo").html(canvasCopy.width+"*"+canvasCopy.height+":"+Cobj_A.objW+"*"+Cobj_A.objH);
	$("#PanelStatus: #title").html(Cobj_A.title);
	//img.src=document.getElementById("imageELE").value;	
    $("#penBT").click(function(){
	    if(pened==false){
		   $(this).attr('class','press');
		   pened=true;
		}else{
		   $(this).attr('class','UNpress');
		   pened=false;
		}
	});
    function loadImage(obj){
	    copyContext.drawImage(obj.media,
		                      obj.coorX,
							  obj.coorY,
							  obj.media.width*obj.ratio,
							  obj.media.height*obj.ratio);                
       
	}
    Cobj_A.media.onload = function(){                       		
		loadImage(Cobj_A);
		reloadLayer();
		$("#PanelStatus: #ratio").html(ratio);
		CanvasCtl();
		//histogram();
    };
	
    $("#ImagePad").mouseover(function(){
       $(this).css("cursor","move");	   
	}).mousewheel(function(event, value){
	    //ratio+=(Math.floor(value)*0.1);
		ratio+=(Math.floor(value)*0.1);
		if(ratio<0){
		  ratio=0;
		}
		if(ratio>6){
		  ratio=6;
		}
		Cobj_A.ratio=ratio;		
		draw();		
	}).mousedown(function(e){
	   if(!pened){
	     drag_start(e);
	   }else{
	     Line=creatLine(e);
	   }
	}).
	mousemove(function (e){
	   if(!pened){
	     drag(e,CanvasObjCurr);
	   }else{
	     if(Line!=""){
	        drawLine(e,Line);
		 }
	   }
	   
	}).mouseup(function(e){
	   if(!pened){
	     drag_end(); 
	   }else{
	     Line="";		
	     drawLineEnd(e);          
	   }		
	}).mouseleave(function(e){
	   if(!pened){
	     drag_end(); 
	   }else{
	     Line="";
	     drawLineEnd(e);		 
	   }		
	});
	
	$("#EDD").click(function (){
	  //CBeffect(Cobj_A);
	  //printXY(Panel[1]);
	  //alert(Panel.length+"!!");
	  draw();	  
	  //reloadLayer();
	});
	$("#contrast").change(function (){
	    CBeffect(Cobj_A);
        $("#contrastV").html($(this).val());
	  });
	$("#brightness").change(function (){
	    CBeffect(Cobj_A);	
		$("#brightnessV").html($(this).val());
	  });
	
	$("#RT").change(function (){
	    //CCeffect(Cobj_A);
		CCeffect(CanvasObjCurr);		
        $("#RV").html($(this).val());
	  });
	  
    $("#GT").change(function (){
	    //CCeffect(Cobj_A);
		CCeffect(CanvasObjCurr);		
        $("#GV").html($(this).val());
	});
	
	$("#BT").change(function (){
	    //CCeffect(Cobj_A);
		CCeffect(CanvasObjCurr);		
        $("#BV").html($(this).val());
	  });
	  
	$('#insertBT').click(function(){
	     var tag=$('#DCtag').val();
		 var value=$('#metaText').val();
	     //alert(tag+":"+value);
		 creatText(tag,value);
	  }
	);	

	
	function creatText(tag,value){
	  var Textobj=new CanvasObj();	
	  var txt = new String(value);
	  Textobj.title=tag+"T:"+txt;
	  Textobj.media=txt;
	  Textobj.type='T';
	  Textobj.setCoor(Math.floor(Math.random()*401),Math.floor(Math.random()*301));
	  //alert(Textobj.coorX+","+Textobj.coorY)
	  Panel.push(Textobj);
	  drawText(Textobj);
	  reloadLayer();
	}
	
	function drawText(Textobj){
	    //alert(Textobj.media);
	    copyContext.fillStyle=Textobj.objcolor;
	    copyContext.font='bold 30px sans-serif';
		copyContext.textBaseline = 'top';
		copyContext.textAlign='left';
        copyContext.fillText  (Textobj.media,Textobj.coorX, Textobj.coorY);    
	}
	
	function creatLine(e){
	    var LineObj=new CanvasObj();
		LineObj.setCoor(GetPosX(e),GetPosY(e));
	    LineObj.title='L';
		LineObj.type='L';
		/*default setting*/
		copyContext.fillStyle=LineObj.objcolor;//'#ff0000';	
		copyContext.strokeStyle =LineObj.objcolor;//'#ff0000';
		copyContext.lineWidth   = 1;
	    copyContext.beginPath();
		copyContext.moveTo(LineObj.coorX,LineObj.coorY);
        LineObj.pathX.push(LineObj.coorX);
		LineObj.pathY.push(LineObj.coorY);
		Panel.push(LineObj);
		reloadLayer();
		return LineObj;				
	}
	
	function drawLine(e,obj){
	    //LineObj.setCoor(GetPosX(e),GetPosY(e));
		var X=GetPosX(e);
		var Y=GetPosY(e);
	    copyContext.lineTo(X,Y);		  
		//copyContext.fill();
        copyContext.stroke();  
        //copyContext.closePath();	
        obj.pathX.push(X);
		obj.pathY.push(Y);	       
	}
	
	function printXY(obj){
	    /*
		alert(obj.pathX.length);		
	    for(i=0;i<obj.pathX.length;i++){
		    $('#Layer').append("<li>"+obj.pathX[i]+"</li>"+"<li>"+obj.pathY[i]+"</li>");			
		 } 
	    */
	}
	function drawLineEnd(e){
	   copyContext.closePath();	   
	}
	
	function GetPosX(e){
	   return e.pageX-parseInt(offsetA.left)-1;  //why                  
	}	
	function GetPosY(e){	   
       return e.pageY-parseInt(offsetA.top)-22;  //why	   
	}
	
    function draw(){	   
	   copyContext.clearRect(0,0,canvasCopy.width,canvasCopy.height);	   
	   for(i=0;i<Panel.length;i++){		           	   		   
		   switch(Panel[i].type){
		       case 'L':			      
			      reDrawLine(Panel[i]);                    				  				  
				  break;
			   case 'T':
			      drawText(Panel[i]);
				  break;
		       case 'I':
			      loadImage(Panel[i]);				  
				  break;
		   }		                        }	   	   
	}	
	
	function reDrawLine(obj){        
		copyContext.fillStyle=obj.objcolor;//'#ff0000';	
		copyContext.strokeStyle =obj.objcolor;//'#ff0000';
		copyContext.lineWidth   = 1;
	    copyContext.beginPath();
		copyContext.moveTo(obj.coorX,obj.coorY);		
		
		for(var x=0;x<obj.pathX.length;x++){
	       copyContext.lineTo(obj.pathX[x],obj.pathY[x]);		  
		   copyContext.stroke();  	   
		}        		
        copyContext.closePath();
    }
	
	var Sx=0;
    var Sy=0;
	
	function drag_start(e){
        /* start drag event*/
        dragged = true;
        Sx=GetPosX(e);
		Sy=GetPosY(e);		
		$(this).css("cursor","pointer"); 
		//$("#PanelStatus: #coord").html(obj.coorX+":"+obj.coorY);	   
		//$("#PanelStatus: #coord").html(Sx+":"+Sy);
        return false;
    }
    
    
    /**
    *   callback for handling mousmove event to drag image
    **/
    function drag(e,obj){
        if(dragged){
		    if(obj.type!='L'){
		       var dx=(GetPosX(e)-Sx);
		       var dy=(GetPosY(e)-Sy);
			   obj.setCoor(obj.coorX+parseInt(dx/30),obj.coorY+parseInt(dy/30));
			   
               $("#PanelStatus: #coord").html(obj.coorX+":"+obj.coorY);	   			
			}else{
			   var dx=(GetPosX(e)-Sx);
		       var dy=(GetPosY(e)-Sy);
			   obj.setCoor(obj.coorX+parseInt(dx/30),obj.coorY+parseInt(dy/30));
			   for(var x=0;x<obj.pathX.length;x++){
			      obj.pathX[x]=obj.pathX[x]+parseInt(dx/30);
				  obj.pathY[x]=obj.pathY[x]+parseInt(dy/30);
			   }
			}
			draw();			            
        }
    }
	
	function drag_end(e){        
        dragged=false;		
		$(this).css("cursor","move"); 
    }
	
	function CCeffect(obj){
	     draw(); // get Inital image 	     
		 var RD=$("#RT").val()*0.1*255;
		 var GD=$("#GT").val()*0.1*255;
		 var BD=$("#BT").val()*0.1*255;		 
		 if(obj.type=='I'){
		   imageData = copyContext.getImageData(0,0,canvasCopy.width,canvasCopy.height);		 
		   for (y = 0; y < canvasCopy.height; y++) {
             inpos = y * canvasCopy.width * 4; // *4 for 4 ints per pixel        
			 outpos = y * canvasCopy.width * 4; // *4 for 4 ints per pixel        
			 for (x = 0; x < canvasCopy.width; x++) {		       
			   r=imageData.data[inpos++]+Math.round(RD); // less red
               g=imageData.data[inpos++]+Math.round(GD); // less green
               b=imageData.data[inpos++]+Math.round(BD); // MORE BLUE
               a=imageData.data[inpos++]; // same alpha	
			   imageData.data[outpos++]=ColorSpace(r);
			   imageData.data[outpos++]=ColorSpace(g);
			   imageData.data[outpos++]=ColorSpace(b);
			   imageData.data[outpos++]=a;			   
            }
         }		   
		 copyContext.putImageData(imageData, 0,0);
		}else{
		   /*
		   var Fr=obj.objcolor.substring(1,2);//var Sr=obj.strokeStyle.substring(1,2);		   		   
		   var Fg=obj.objcolor.substring(3,4);//var Sg=obj.strokeStyle.substring(3,4);		   
		   var Fb=obj.objcolor.substring(5,6);//var Sb=obj.strokeStyle.substring(5,6);		   		   
		   obj.objcolor="#"+(parseInt(Fr,16)+Math.round(RD)).toString(16)+(parseInt(Fr,16)+Math.round(GD)).toString(16)+(parseInt(Fr,16)+Math.round(BD)).toString(16);		   
		   if(obj.type=='T'){
		      drawText(obj);
		   }
		   if(obj.type=='L'){
		     reDrawLine(obj);
		   } 
           */		   
		}
	}
	
	var Rspace=new Array(255);
	var Gspace=new Array(255);
	var Bspace=new Array(255);
	for(i=0;i<255;i++){
	  Rspace[i]=0;
	  Gspace[i]=0;
	  Bspace[i]=0;		  
	}
	
	function histogram(){
	   var RcanvasHIS = document.getElementById("ColorHisR");
       var HISContextR = RcanvasHIS.getContext("2d");	   
	   var GcanvasHIS = document.getElementById("ColorHisG");
       var HISContextG = GcanvasHIS.getContext("2d");	   
	   var BcanvasHIS = document.getElementById("ColorHisB");
       var HISContextB = BcanvasHIS.getContext("2d");	   	   		 
	   var imgH=Cobj_A.media.height;
	   var imgW=Cobj_A.media.width;	   
	   imageData = copyContext.getImageData(0,0,imgH,imgW);		        
	   for (y = 0; y < imgH; y++) {
          inpos = y * imgW * 4; // *4 for 4 ints per pixel        		
		  for (x = 0; x < imgW; x++) {		       
			   r=imageData.data[inpos++]; // less red
               g=imageData.data[inpos++]; // less green
               b=imageData.data[inpos++]; // MORE BLUE
               a=imageData.data[inpos++]; // same alpha	
		       Rspace[r]=Rspace[r]+1;
			   Gspace[g]=Gspace[g]+1;
			   Bspace[b]=Bspace[b]+1;			   
           }
        }
		
		
		
		HISContextR.fillStyle='#ff0000';	
		HISContextR.strokeStyle ='#ff0000';
		HISContextR.lineWidth   = 1;
	    HISContextR.beginPath();
		
		HISContextG.fillStyle='#ff0000';	
		HISContextG.strokeStyle ='#00ff00';  
		HISContextG.lineWidth   = 1;
	    HISContextG.beginPath();
		
		HISContextB.fillStyle='#ff0000';	
		HISContextB.strokeStyle ='#0000ff';  		
        HISContextB.lineWidth   = 1;
	    HISContextB.beginPath();
	    var reg=10;
		for(i=1;i<255;i++){
	      var Ry=Rspace[i];
		  //HisLine(HISContext,Ry,i,'#f00');		  		            		  
	      HISContextR.moveTo(i,100);
	      HISContextR.lineTo(i,(100-parseInt(Ry/reg)));		  
	      var Gy=Gspace[i];
		  //HisLine(HISContext,Gy,i,'#0f0');		  
		  HISContextG.moveTo(i,100);
	      HISContextG.lineTo(i,(100-parseInt(Gy/reg)));		  
	      var By=Bspace[i];		  
		  //HisLine(HISContext,By,i,'#00f');	  
          HISContextB.moveTo(i,100);
	      HISContextB.lineTo(i,(100-parseInt(By/reg)));		  
	    }
		HISContextR.fill();
        HISContextR.stroke();
        HISContextR.closePath();
		
		HISContextB.fill();
        HISContextB.stroke();
        HISContextB.closePath();
		
		HISContextG.fill();
        HISContextG.stroke();
        HISContextG.closePath();		
	}
	
	function GetXBondle(objX){
	   if (objX>canvasCopy.width){
	      return canvasCopy.width;
	   }else{
	      return objX;
	   }
	}
	
	function GetYBondle(objY){
	  if (objY>canvasCopy.width){
	      return canvasCopy.width;
	   }else{
	      return objY;
	   }
	}
	
	function CBeffect(obj){
	     draw(); // get Inital image 		 
	     var objW=GetXBondle(obj.media.width*obj.ratio); // define Canvas type line, text, img
		 var objH=GetYBondle(obj.media.height*obj.ratio);//Height		 	     
	     objW=800;
		 objH=600;
		 var contrast=$("#contrast").val()*0.1;
		 var brightness=$("#brightness").val();
		 brightness = Math.min(150,Math.max(-150,brightness));
		 contrast = Math.max(0,contrast+1);
		 
		 var mul = contrast;//contrast;
		 var add = (brightness - 128) * contrast + 128;
		 //$("#contrastV").html(brightness);
		 imageData = copyContext.getImageData(0,0,objW,objH);		 
		 for (y = obj.coorY; y < objH; y++) {
            inpos = y * objW * 4; // *4 for 4 ints per pixel        
			outpos = y * objW * 4; // *4 for 4 ints per pixel        
			for (x = obj.coorX; x < canvasCopy.width; x++) {		       
			   r=imageData.data[inpos++]* mul + add; // less red
               g=imageData.data[inpos++]* mul + add; // less green
               b=imageData.data[inpos++]* mul + add; // MORE BLUE
               a=imageData.data[inpos++]; // same alpha	
			   imageData.data[outpos++]=ColorSpace(r);
			   imageData.data[outpos++]=ColorSpace(g);
			   imageData.data[outpos++]=ColorSpace(b);
			   imageData.data[outpos++]=a;			   
           }
        }		   
		copyContext.putImageData(imageData, 0,0);
	}
	
	function ColorSpace(val){
	    if(val<0) val=0;
		if(val>255) val=255;		
		return val;
	}	
	
	
	function reloadLayer(){
	     $('#Layer').empty();
		 for(var i=0;i<Panel.length;i++){		    
		    if(i==CpanelID){
		      $('#Layer').append("<li id='Panel_"+i
			                    +"'><input class='target' type='radio' name='PanelC' checked='yes' id='PanelCK_"+i
								+"' value='Panel_"+i
								+"'>"
								+Panel[i].title
								+"</li>");
			}else{
			  $('#Layer').append("<li id='Panel_"+i
			                    +"'><input class='target' type='radio' name='PanelC' id='PanelCK_"+i
								+"' value='Panel_"+i
								+"'>"
								+Panel[i].title
								+"</li>");		 
			
			}			
		 }
	}
	var CanvasObjCurr="";
	function CanvasCtl(){	   
	   for(var i=0;i<Panel.length;i++){
	        if(i==CpanelID){
			  CanvasObjCurr=Panel[i];
			}
	   }
	   //alert(CanvasObjCurr.type);
	   reloadLayer();
	}
	
    $('.target').live('change',function(){
	    var getInfo=$(this).val();
		var getNum=getInfo.split('_');
		CpanelID=parseInt(getNum[1]);
		CanvasCtl();
	});
	
	
});
