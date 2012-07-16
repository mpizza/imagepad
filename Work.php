<?php
  session_start();
  //showAllArr($_SESSION);  
  include "sql/DBconfig.php";
  include "sql/Acc_verify.php";
  include "sql/toolsFN.php";
  include "sql/ALLClass.php";
  include "sql/showConfig.php";  
  include "sql/BookOder.php";  
  $RootPath='corpus';    
  
  /*check user*/
  $getMemID=quotes($_SESSION["UserID"]);
  $getMemPW=quotes($_SESSION["UserPW"]);
  $User=new MyAcc;
  $User->SetAcc($getMemID,$getMemPW);
  $enterKey=$User->VerifyByDB();
  $User->DenyPage($enterKey);  
  
  /*query File table*/
  $itemID=quotes($_GET['FTID']);
  $GCPInfo=new QGCP;
  $GCPInfo->SetId($itemID,'Ftid');
  $GetFT=$GCPInfo->QueryFTID();
  $GCPInfo->SetId($GetFT['BT_ID'],'Btid');
  $GCPInfo->SetId($GetFT['ST_ID'],'Stid');
  //showAllArr($GetFT);
  //echo "<HR>";
  
  /*query Book table*/
  $GetBT=$GCPInfo->QueryBT_INFO($GCPInfo->GetId('Btid'));  
  //showAllArr($GetBT);
  $dataPath=$GetBT['DataPath'];
  $GetFTID=$GetFT['FTID'];
  
  /*make file path*/
  $FTIDarr=split('@',$GetFTID);
  $SemiPath=$RootPath."/".$dataPath; // corpus/book
  $txtPath=$SemiPath."/txt";
  $xmlPath=$SemiPath."/xml";  
  $imgPath=$SemiPath."/image";  
  
  $textFile=$txtPath."/".$FTIDarr[0].".txt";
  $xmlFile=$xmlPath."/".$FTIDarr[0].".xml";
  $imgFile=$imgPath."/".$FTIDarr[0].".jpg"; 
  $Lang=$FTIDarr[1];   // chek lang setting....no use now
  
  $xmlINFO = simplexml_load_file($xmlFile); 
  $Meta=$xmlINFO->MetaDesc;
  //$text= file_get_contents($textFile, FILE_USE_INCLUDE_PATH);    // no use txt file now!!
  
  /*query status table*/
  $GetSTID=$GCPInfo->QueryST();
  /*check file edit rights*/  
  if(!CheckOwner($User->GetMTID(),$GetSTID['MT_ID'])){    
	$User->DenyPage('no');  
    exit();   
  }  
  /*Find Next AND Prev*/
  $FindBook=new FindOder;
  $FindBook->SetPath($SemiPath);
  $FindBook->CreatIndex();
  $FindBook->CreatReverse();  
  $FindBookPtr=$FTIDarr[0].".txt";
  
  //echo $FindBookPtr."~<br>";
  //echo $FindBook->FindBro($FindBookPtr,'0','prev')."!<br>";
  //echo $FindBook->FindBro($FindBookPtr,'0','next')."@<br>";  
  
  //exit();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>  
  <meta http-equiv='Content-Type' content='text/html; charset=utf-8'>
  <link rel="shortcut icon" href="image/icon/favicon.ico">
  <link rel='stylesheet' type='text/css' href='css/webnew.css' media='all'>
  <link rel='stylesheet' type='text/css' href='css/Canvas.css' media='all'>
  <link type="text/css" rel="stylesheet" href="css/jquery.iviewer.css" />
  <script type="text/javascript" src="js/jquery-1.4.1.js"></script>
  <script type="text/javascript" src="js/jquery.js"></script>
  <script type="text/javascript" src="js/jquery-ui-1.8.2.custom.min.js"></script>
  <script type="text/javascript" src="js/jQuery_mousewheel_plugin.js"></script>  
  <script type="text/javascript" src="js/jquery.iviewer.js"></script>
  <script type="text/javascript" src="js/web.js"></script>    
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
	 //$("#imageDim").html($("#imageELE").attr('src')).css('color','#ff0000');
     $("#Left_Image").iviewer({
			src: $("#imageELE").attr('value'),
			ui_disabled: false
	 });
    });	 
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
                  <?
				    //$imgFile='test/cca100100-od-002590001-001-n.jpg';  // for test~
				    //echo "<img id='imageELE' style='position:relative;' src='".$imgFile."' border='0' style='width:100%;'>";
					echo "<input type='hidden' id='imageELE' value='".$imgFile."'>";
					//echo "<input type='hidden' id='imageELE' value='lena_std.jpg'>";
				  ?>			   			      
			   </div><!-- end Image-->                   			                                 
			   <div id='bottom_TOOL'>			     			     			     
			     <div class='bottom_TOOL_div'>
				   <input type='button' onclick=OC_Canvas('CanvasPanel','o') class='ToolBT' value='Canvas'>
				 </div>
				 <!--
				 <div class='bottom_TOOL_div'>
				   <input type='button' class='ToolBT' value='缺字規範'>				 				 
				 </div>				 
				-->
			  </div><!-- end bottom_tool-->		              
			</div><!-- end Info-->		            
		</div><!-- end mainDIV_Left-->			   
		<div class='mainDIV_Right'>
		  	<div class='Info'>			   
			   <div id='MetaTool'>				     
			     <input type='button' onclick=scopeURL('modify') class='MetaBT' value='標校規範'>
				 <input type='button' class='MetaBT' value='缺字規範'>                 			 
                 <input type='button' class='MetaBT' value='回本書清單'>
				 <input type='button' class='MetaBT' value='回個人首頁'>                 				  				 				 
			   </div>			   			   
			   <div id='meta'>			   			    
			     <div class='metaInfo'>
				   <div class='close'></div>
				   <div class='fileNameDiv'>
				      <span style='font-weight:bold;'>檔名：</span>
					  <? echo $FTIDarr[0]?>
				   </div>
				   <div id='ShowSaveDiv' style='float:left;margin-left:10px;font-size:10px;color:#c8c9c8;width:35%;height:100%;border:0px solid #ff0000;'>				          
				   </div>
				   <div class='close'></div>
				 </div><!-- end metaInfo-->
				 <div class='metaInfo'>
				  <?
				   echo "<textarea id='ALLcontent' style='width:98%;' rows='16'>".$Meta->Description->$Lang."</textarea>";						 
				   ?>
				 </div><!-- end metaInfo-->
				 <div class='metaInfo' style='margin-bottom:0px;'>
				   <div id='suCodeDiv'>
				     <div class='suCodeInnerDiv'>
					 <span class='fontBold'>
					 蘇州碼
					 </span>
					 <input class='SucodeBT' onclick="SuCode(this)" type='button' value='〡'>
					 <input class='SucodeBT' onclick="SuCode(this)" type='button' value='〢'>
				     <input class='SucodeBT' onclick="SuCode(this)" type='button' value='〣'>
					 <input class='SucodeBT' onclick="SuCode(this)" type='button' value='〤'>
					 <input class='SucodeBT' onclick="SuCode(this)" type='button' value='〥'>
					 <input class='SucodeBT' onclick="SuCode(this)" type='button' value='〦'>
					 <input class='SucodeBT' onclick="SuCode(this)" type='button' value='〧'>
					 <input class='SucodeBT' onclick="SuCode(this)" type='button' value='〨'>
					 <input class='SucodeBT' onclick="SuCode(this)" type='button' value='〩'>
				     </div>					 					 
					 <input type='button' class='ToolBT2' style='float:right;' onclick=scopeURL('word') value='缺字代碼查詢'>
					 <input type='button' class='ToolBT2' style='float:right;' value='取代'>
					 <div class='close'></div>
				   </div><!-- end suCodeDiv-->
				 </div><!-- end metaInfo-->
				 <div class='metaInfo'>
				     <div class='close'></div>
				     <input type='button'  class='ToolBT2' style='float:left;' onclick="window.open('http://thdl.ntu.edu.tw/suzhou/','new1Win')" value='蘇州碼轉換器'>
					 <input type='button' class='ToolBT2' style='float:right;' onclick="window.open('http://thdl.ntu.edu.tw/datemap/','new2dWin')" value='中西曆轉換器'>
					 <div class='close'></div>
				 </div><!-- end metaInfo-->
				 <div class='metaInfo'>
                    <div id='NoteDiv'> 				 
					  <!--<textarea name='note' id='note' style='width:98%;' cols="55">備註:</textarea>-->
					  <div id='NoteComment'>
					     <table style='width:98%;border:0px solid #ff0000;'>
					       <tr>
						     <td style='vertical-align:top;width:60px;'>一校提示</td>
							 <td colspan='2'><textarea id='noterResult' style='width:100%;font-size:12px;' readonly='ture'></textarea></td>							
						   </tr>
						   <tr>						     
							 <td style='vertical-align:top;'>
							   <input type='checkbox' value='checkIT'>已處理
							 </td>							 
							 <td style='width:30px;vertical-align:top;padding-top:5px;'>
						      其它
							 </td>
							<td style='vertical-align:top;padding-top:5px;'>
						      <textarea name='note' id='note' style='width:100%;font-size:12px;'></textarea>
							</td>
						   </tr>                           
						 </table>
					  </div>					  
					</div>
					<!-- NoteDiv -->
					<div id='SaveToolDiv'>
					  <div class='close'></div>
					  <div style='float:left;'>					     
					     <input type='button' class='SaveBt' value='Pass'>&nbsp;					  
					     <input type='button' class='SaveBt' value='暫  存'>&nbsp;					  						 
					     <input type='button' class='SaveBt' value='Save'>&nbsp;					  
						 <input type='button' class='SaveBt' value='建立 meta'>&nbsp;					  
					  </div>
					  <div style='float:right;'>
					  <?					    
						echo "<input type='button' class='arrow' onclick=gotoPage('".$dataPath."','".$itemID."',this) value='<'>";					    						
						echo "<input type='button' class='arrow' onclick=gotoPage('".$dataPath."','".$itemID."',this) value='>'>";						
   					  ?>
					  </div>
					  <div class='close'></div>
					</div>				
					<div id='CommentDiv'> 				 
				      <textarea name='note' id='note' style='width:98%;' cols="55" readOnly='true'>抽驗結果:</textarea>
					</div><!-- CommentDiv -->					                    
				 </div><!-- end metaInfo-->				   
			   </div><!--end meta-->   
			</div><!-- end Info-->			   
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
  <script type="text/javascript" src="js/ImagePad.js"></script>  
</body>