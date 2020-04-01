$(function(){
   
//declare variables
    var myArray;
    var inputLength;
    var reading = false;
    var counter;
    var action;
    var frequency = 200;
    
//on page load hide elements we dont need, leave only text area and start button
    $("#new").hide();
    $("#resume").hide();
    $("#pause").hide();
    $("#controls").hide();
    $("#result").hide();
    $("#error").hide();
    
//click on start reading
    $("#start").click(function(){
        
//get the text and split into words store inside array
//\s matches spaces, tabs, new lines etc and + means one or more
        myArray = $("#userInput").val().split(/\s+/);
        
//get the number of words
        inputLength = myArray.length;
        
        if(inputLength>1){
//there is enough input
//move to reading mode
            reading = true;
            
//hide start/error/userInput, show new/pause/resume/controls
            $("#start").hide();
            $("#error").hide();
            $("#userInput").hide();
            $("#new").show();
            $("#pause").show();
            $("#controls").show();
            
//set progress slider max
            $("#progressSlider").attr("max", inputLength-1);
            
//start counter at zero
            counter = 0;
            
//show reading box(results) with the first word
            $("#result").show();
            $("#result").text(myArray[counter]);
            
//start reading from the first word
            action = setInterval(read, frequency);
            
            
        }else{
//there is not enough input
            $("#error").show("slow");
        }
    });
    
//click on new
    $("#new").click(function(){
//reload the page
        location.reload();
    });
    
//click on pause
    $("#pause").click(function(){
//stop reading switch to non reading mode
        clearInterval(action);
        reading = false;
        
//hide pause and show resume
        $("#pause").hide();
        $("#resume").show();
    });
        
//click on resume
    $("#resume").click(function(){
        
//start reading 
        action = setInterval(read, frequency);
        
//go back to reading mode
        reading = true;
        
//hide resume and show pause
        $("#resume").hide();
        $("#pause").show();
    });    
    
//change font-size
    $("#fontsizeSlider").on("slidestop", function(event, ui){
//refresh the slider
        $("#fontsizeSlider").slider("refresh");
        
//get the value of slider
        var sliderValue = parseInt($("#fontsizeSlider").val());
        
        $("#result").css("fontSize", sliderValue);
        $("#fontsize").text(sliderValue);
    });
    
//change speed
    $("#speedSlider").on("slidestop", function(event, ui){
//refresh the slider
        $("#speedSlider").slider("refresh");
        
//get the value of slider
        var sliderValue = parseInt($("#speedSlider").val());
        
        $("#speed").text(sliderValue);
        
//change reading speed - stop reading
        clearInterval(action);
        
//change frequency
        frequency = 60000/sliderValue;
        
//resume reading if we are in reading mode
        if(reading){
            action = setInterval(read, frequency);
        }
    });
    
//progress slider
        $("#progressSlider").on("slidestop", function(event, ui){
//refresh the slider
        $("#progressSlider").slider("refresh");
        
//get the value of slider
        var sliderValue = parseInt($("#progressSlider").val());
                
//stop reading
        clearInterval(action);
        
//change counter
        counter = sliderValue;
            
//change word
            $("#result").text(myArray[counter]);
            
//change value of progress
        $("#percentage").text(Math.floor(counter/(inputLength-1)*100));
        
//resume reading if we are in reading mode
        if(reading){
            action = setInterval(read, frequency);
        }
    });
    
//functions
    
    function read(){
        if(counter == inputLength-1){//last word
            clearInterval(action);
            reading = false; //move to non reading mode
            $("#pause").hide();
           }else{
//counter goes up by 1
               counter++;
               
//get word
               $("#result").text(myArray[counter]);
               
//change progress slider value
               $("#progressSlider").val(counter).slider('refresh');
               
//change text of percentage
               $("#percentage").text(Math.floor(counter/(inputLength-1)*100));
               
           }
    }
    
    
});