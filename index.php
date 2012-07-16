<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>  
  <meta http-equiv='Content-Type' content='text/html; charset=utf-8'>
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>
  <script type="text/javascript" src="jQuery_mousewheel_plugin.js"></script>  
  
  <script type="text/javascript">    
  
     function OC_Canvas(obj,type){
	    switch (type){
		  case 'h':
	        $("#"+obj).hide();
			break;
		  case 'o':
		    $("#"+obj).show();
			break;
		}
	 }
	/* 
	$(function() {
	  //$("#CanvasPanel").draggable( "option", "disabled", true );
      $("#PanelTool: span").click(function(){
	     var Getparent=$(this).parent().parent().attr('id');		 
		 OC_Canvas(Getparent,'h');
		}
	  );
	  $(".SucodeBT").mouseover(function(){
	    $(this).css("color","#d35151");	  
	  });
	  
	  $(".SucodeBT").mouseout(function(){
	    $(this).css("color","#000000");	  
	  });
	  
	  $(".MetaBT").mouseover(function(){
	    $(this).css("color","#d35151");	  
	  });
	  
	  $(".MetaBT").mouseout(function(){
	    $(this).css("color","#371929");	  
	  });
	  $(".SaveBt").mouseover(function(){
	   $(this).css("background-color","#f4a7b7");	   
	  });
	  $(".SaveBt").mouseout(function(){
	   $(this).css("background-color","#fdf5f5");	   
	  });	  
	 
	 //$("#imageDim").html($("#imageELE").attr('src')).css('color','#ff0000');
     $("#Left_Image").iviewer({
			src: $("#imageELE").attr('value'),
			ui_disabled: false
	 });
    });	 
    */
     /*
	  $("#imageELE").draggable();         	  	  
	  var oH=$(this).height();
	  var oW=$(this).width();
	  $("#imageDim").html(oH+","+oW).css('color','#ff0000');
	  $("#imageELE").mousewheel(function(objEvent, intDelta){   
		   if (intDelta > 0){		
		     $(this).aeImageResize({height: oH*2, width: oW*2});
		   }
		   else if (intDelta < 1){		     
		     $(this).aeImageResize({height: oH/2, width: oW/2});
		   }		   
		   $("#imageDim").html(oH+","+oW).css('color','#ff0000');
	   });
     });
	 */
  </script>
</head>
<!--<body onload='autosave()'>-->
<body>
  <div class='bodyDIV'>
     <div class='mainDIV'>
	    <div class='close'></div>
	    <div class='mainDIV_Left'>
		   <div class='Info'>		                      
			   <div id='Left_Image'>			
			    <input type='hidden' id='imageELE' value='lena.jpg'>    				 
         </div><!-- end Image-->                   			                                 
			   <div id='bottom_TOOL'>			     			     			     
			     <div class='bottom_TOOL_div'>
				   <input type='button' onclick=OC_Canvas('CanvasPanel','o') class='ToolBT' value='Canvas'>
				 </div>
				</div><!-- end bottom_tool-->		              
			</div><!-- end Info-->		            
		</div><!-- end mainDIV_Left-->			   
		<div class='mainDIV_Right'>
		</div><!-- end mainDIV_Right-->			   
		<div class='close'></div>
	 </div><!-- end mainDIV -->
	 <div id='CanvasPanel'>
	    <div id='PanelTool'>
		  <span>[縮小]</span>
		  <input type='button' value='Press' id='EDD'>		  
		</div>
		<div id='PanelMain'>
		  <canvas id='ImagePad' width='800' height='600'></canvas>		  		  		  
		  <div id='PanelRight'>
		     <ul>
			    <li>contrast:<span id='contrastV'>2</span><BR><input type='range' value='15' id='contrast' min='-10' max='30' ></li>
		        <li>brightness:<span id='brightnessV'>0</span><BR><input type='range' value='0' id='brightness' min='-150' max='150'></li>
		        <li>R:<span id='RV'>0</span><input type='range' value='0' id='RT' min='-10' max='10' ></li>
		        <li>G:<span id='GV'>0</span><input type='range' value='0' id='GT' min='-10' max='10' ></li>
		        <li>B:<span id='BV'>0</span><input type='range' value='0' id='BT' min='-10' max='10' ></li>
			 </ul>
			 <ul id='textUL'>
			     <li>
				    <select id='DCtag'>
					   <option value='Title'>契書題名</option>
					   <option value='Relation'>人名/團體</option>
					   <option value='Coverage'>相關地名</option>
					   <option value='Date'>立契日期</option>
					   <option value='Description'>全文</option>
					   <option value='PScol'>備註</option>
					</select>
				 </li>				 
			     <li><input type='text' value='input somting...' id='metaText' ></li>				 
				 <li><input type='button' value='insert' id='insertBT' class='UNpress'></li>
				 <li><input type='button' value='pen' id='penBT' class='UNpress'></li>
			 </ul>			 			 
			 <ul id='Layer' class='limitHeight'>			    
			 </ul>		 
			 <div id='LineInfo'>			    
			 </div>
			 
		  </div>
		  <div class='close'></div>
		</div>		
		<div id='PanelStatus'>		   
		   <ul>
		      <li id='title'></li>
			  <li id='pixelInfo'></li>
		      <li id='ratio'></li>
              <li id='coord'></li>			  
		   </ul>
		   <div class='close'></div>
		</div>
	 </div><!-- end CnavasPanel-->
	 <div id='ColorHis'>
		   <canvas id='ColorHisR' width='255' height='100' class='His'></canvas>
		   <canvas id='ColorHisG' width='255' height='100' class='His'></canvas>
		   <canvas id='ColorHisB' width='255' height='100' class='His'></canvas>
	</div>
  </div><!-- end mainDIV --> 
  <script type="text/javascript" src="ImagePad.js"></script>  
</body>