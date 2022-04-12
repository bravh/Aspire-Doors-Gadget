-- VECTRIC LUA SCRIPT

  function OnLuaButton_manufact(dialog)   
     pathx = dialog:GetTextField("toolpathpath");
     a = dialog:GetTextField("kamutl") ;
     getdata()
     opentoolpath()
  
  
   return true
   
  end

  
   function opentoolpath(dialog)  
     
     
   toolpath_manager = ToolpathManager()
 
toolpath_manager:LoadToolpathTemplate(pathx)
   

 
  calc_result = toolpath_manager:RecalculateAllToolpaths()
 
 if calc_result == nil then
   
MessageBox("Recalculate all toolpaths failed")

else
 
 MessageBox("Results from recalculate all\n" .. calc_result)
 
 end
 
   return true
   
  end
  

function getdata()
  
   
   midot = dialog:GetTextField("mida");
   coun = tonumber(dialog:GetTextField("kamutl"));
    
   midax = {}
   miday = {}
   orgin = 0
    --accoun = coun -1 ;
     --MessageBox(midot);
     
     for shur , roh, gov in midot:gmatch("(%d+);(%d+);(%d+)") do
     
       DrawCutOut(orgin, roh , gov)
       MakeOffset(orgin,roh,gov)
       orgin = orgin + roh + 5
       
     end

   return true
end
  
  function DrawCutOut(start , xvalue , yvalue)
    
   
     line = Contour(0.0)
   
    firstpoint = Point2D(tonumber(start),0)
    secondpoint = Point2D(tonumber(start) , tonumber(yvalue))
    thirdpoint = Point2D(tonumber(start) + tonumber(xvalue) , tonumber(yvalue))
    fourdpoint = Point2D(tonumber(start) + tonumber(xvalue) , 0)
    
   
   line:AppendPoint(firstpoint)
   line:LineTo(secondpoint)
   line:LineTo(thirdpoint)
   line:LineTo(fourdpoint)
   line:LineTo(firstpoint)
    
    cutout = CreateCadContour(line);
   local layer = job.LayerManager:GetLayerWithName("Cutout")
    
     --job.Selection:Add(cutout, false, false);
     layer:AddObject(cutout, true);
     
     job:Refresh2DView();
    return true ;
  end
  
  
   function MakeOffset(s,oxv,oyv)
     Misgert = tonumber(dialog:GetTextField("rohavmisgeret"));
     if (Misgert) then
      
       
     offset = Contour(0.0)
     
     
    ofirstpoint = Point2D(tonumber(s) + Misgert,0 + Misgert)
    osecondpoint = Point2D(tonumber(s) + Misgert , tonumber(oyv) - Misgert)
    othirdpoint = Point2D(tonumber(s) + tonumber(oxv)  -Misgert , tonumber(oyv) -Misgert)
    ofourdpoint = Point2D(tonumber(s) + tonumber(oxv) - Misgert, Misgert)
    
   
   offset:AppendPoint(ofirstpoint)
   offset:LineTo(osecondpoint)
   offset:LineTo(othirdpoint)
   offset:LineTo(ofourdpoint)
   offset:LineTo(ofirstpoint)
    
    offsetmisgeret = CreateCadContour(offset);
   local layer = job.LayerManager:GetLayerWithName("Misgeret")
    
     layer:AddObject(offsetmisgeret, true);
     
     job:Refresh2DView();
     end
   return true;  
   end
   
   function  main(script_path)
  
     html_path = "file:" .. script_path .. "\\main.html"
     dialog = HTML_Dialog(false, html_path, 570, 750, "ייצור חזיתות לפי דוגמה")
    
      dialog:AddTextField("mida","");
      dialog:AddTextField("toolpathpath","");
      dialog:AddTextField("kamutl","");
      dialog:AddTextField("rohavmisgeret","");
      job = VectricJob()
     
    if not job.Exists then
       DisplayMessageBox("פתח לוח חדש")
       return false;  
    end
 
  dialog:ShowDialog()
  
   return true
  
  end  
  
  
    
  
    