
function updateammount(){
  var rowsint = document.getElementById("table").rows.length + 1;
  
  
  
  //alert(rowsint ); 
  document.getElementById("kamut").innerHTML =  "כמות: " + (rowsint -1);
  document.getElementById("kamutl").value = rowsint;


}
function statusmisgeret(){
  x = document.getElementById("onoff")

  if(x.checked == false) {
    document.getElementById("rohavmisgeret").disabled = true
  }
  else {
    document.getElementById("rohavmisgeret").disabled = false 
    document.getElementById("rohavmisgeret").value = "0"
    
  };



}

function checknum(a,b,s) {
  updateammount();
      if (a > 3050 || b > 3050) {
      alert("מידה מירבית  3050");
      
      document.getElementById("gova").value = 0;
      document.getElementById("rohav").value = 0;
      s=true;
      
      
    }else
    {
      s=false
    };
    if (a <= 0 || b <= 0) {
      alert(" שים לב מידה 0");
      
      document.getElementById("gova").value = 0;
      document.getElementById("rohav").value = 0;
      s=true;
      
      
    }else
    {
      s=false
    };
   
   
  }


function saveDim() {    //  SaveDimentions
  
  var table = document.getElementById('table');

   
    var rowLength = table.rows.length;
    var gova = [];
    var rohav = [];
    
   
    for (i = 0; i < rowLength; i++){      
       var oCells = table.rows.item(i).cells;
       var cellLength = oCells.length;
       for(var j = 0; j <cellLength; j++){
              if(j == 0){  
                gova[i] = oCells.item(j).innerHTML;

              
              };
              if(j == 1){  rohav[i] = [oCells.item(j).innerHTML];

              
              };
            
                        
           };
        
    };
    
           
  }
   
  function openDim() { 
    x =document.getElementById("savefile").click();
    y =document.getElementById("savefile").value;
    if(y != 0){
    document.getElementById("mida").value = readFile(y);
    linenum = document.getElementById("mida").value.split(",");
    RowsinFile = linenum.length - 1 ;
    var fullsplit = y.split("\\") ;
    var filename = fullsplit[fullsplit.length -1];
    var filenamesplit = filename.split(".");
    var modelName = filenamesplit[0];
    

    
    
        
    for (i = 0 ; i < RowsinFile ; i++ ){
      columnum = linenum[i].split(";");
      newRow = table.insertRow(table.length),
      cell1 = newRow.insertCell(0),
      cell2 = newRow.insertCell(1);
       
           cell1.innerHTML = columnum[1];
          cell2.innerHTML = columnum[2];
      


    }
    document.getElementById("ordern").value = modelName;
    //alert("המידות התקבלו");
    selectedRowToInput();
    updateammount();
  };
    return true;
   
  }
  function opentoolpath(){
    
    var x = document.getElementById("fileInput").click();
    var fullpath = document.getElementById("fileInput").value;
    var fullsplit = fullpath.split("\\") ;
    var filename = fullsplit[fullsplit.length -1];
    var filenamesplit = filename.split(".");
    var modelName = filenamesplit[0];
    var mida = document.getElementById("mida").textContent;
    document.getElementById("modelName").innerHTML = modelName;
    document.getElementById("modelName").style.color = "green";
    document.getElementById("modelName").style.fontSize = 20;
    document.getElementById("toolpathpath").value = fullpath;
    
      return true;

  }
    
function readFile(filename){
  var fso = new ActiveXObject("Scripting.FileSystemObject");
  var ForReading = 1;
  var f1 = fso.OpenTextFile(filename, ForReading);
  var text = f1.ReadAll();
  f1.close();
  return text;
}




function writeFile(){ 
    var table = document.getElementById('table');
    var rowLength = table.rows.length;
    var gova = [];
    var rohav = [];
    var i;
    if(document.getElementById("ordern").value <= 0)return;
    path =  "C:\\ProgramData\\Vectric\\Aspire\\V10.5\\Gadgets\\TestGadget\\" +  document.getElementById("ordern").value +  ".txt";
        var fs = new ActiveXObject("Scripting.FileSystemObject");
         f = fs.CreateTextFile(path, true);
         alert(  "נשמר"  + " - " + document.getElementById("ordern").value );

        
               
        for (i = 0; i < rowLength; i++){      
          var oCells = table.rows.item(i).cells;
          var cellLength = oCells.length;
          for(var j = 0; j <cellLength; j++){
                 if(j == 0){  
                   gova[i] = oCells.item(j).innerHTML;
   
                 
                 };
                 if(j == 1){  rohav[i] = [oCells.item(j).innerHTML,];
   
                 
                 };
                 
                 
                           
              };
              g = i + ";" + gova[i] + ";" + rohav[i];
              f.WriteLine(g);
           
       };
        f.Close();

        

   
        
        




    }






  function addHtmlTableRowfirst(){
    
      var
       chek = false,
       fname = document.getElementById("gova").value,
       lname = document.getElementById("rohav").value;
       checknum(fname , lname,chek);
      if ( fname < 3050 &&  lname < 3050) {
       if( fname > 0 &&  lname >0){
        addHtmlTableRow();
       };
      };
      updateammount();
      }



  

  function addHtmlTableRow() {
     var
      fname = document.getElementById("gova").value,
      lname = document.getElementById("rohav").value,
      newRow = table.insertRow(table.length),
      cell1 = newRow.insertCell(0),
      cell2 = newRow.insertCell(1);
       
           cell1.innerHTML = fname;
          cell2.innerHTML = lname;
         selectedRowToInput();
         document.getElementById("gova").value = "";
          document.getElementById("rohav").value = "";
          updateammount();
      }
    


  function selectedRowToInput() {  //  selectedRowToInput();


    for (var i = 0; i < table.rows.length; i++) {

      table.rows[i].onclick = function () {
        for (var t = 0; t < table.rows.length; t++) {
          table.rows[t].style.color = "black";
        };
       
        rIndex = this.rowIndex;

        this.style.color = "red";

        document.getElementById("gova").value = this.cells[0].innerHTML;
        document.getElementById("rohav").value = this.cells[1].innerHTML;
       
      };

    };
    updateammount();


  }
  function editHtmlTbleSelectedRowfirst() {
    var
    chek = false,
    fname = document.getElementById("gova").value,
    lname = document.getElementById("rohav").value;
    checknum(fname , lname,chek);
   if ( fname < 3005 &&  lname < 3005) {
    if( fname > 0 &&  lname >0){
      editHtmlTbleSelectedRow();
    };
   };
   updateammount();
  }



  function editHtmlTbleSelectedRow() {

    if (table.rows[rIndex].style.color == "black") { return; };
    var fname = document.getElementById("gova").value,
      lname = document.getElementById("rohav").value;
     

    table.rows[rIndex].cells[0].innerHTML = fname;
    table.rows[rIndex].cells[1].innerHTML = lname;
    table.rows[rIndex].style.color = "black";

    updateammount();

  }


  function removeSelectedRow() {  // clear input text

   
    for (var t = 0; t < table.rows.length; t++) {
      if (table.rows[rIndex].style.color == "black") { return; };

      table.deleteRow(rIndex);
    
      document.getElementById("gova").value = 0;
      document.getElementById("rohav").value = 0;

  };
  updateammount();
}
