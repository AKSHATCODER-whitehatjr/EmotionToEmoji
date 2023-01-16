prediction1 = ""
prediction2 = ""

Webcam.set({
width : 350,
height : 300,
image_format : "png",
png_quality : 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function snapshot(){
Webcam.snap(function(data_uri){
document.getElementById("results").innerHTML = '<img id = "capturedimage" src = "'+data_uri+'"/>';
})
}

console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/bMLiaUCZl/model.json", modelloaded);

function modelloaded(){
console.log("Model Loaded!");    
}

function speak(){
var synth = window.speechSynthesis;
speakdata1 = "The First Prediction Is" + prediction1
speakdata2 = "The Second Prediction Is" + prediction2
var utterthis = new SpeechSynthesisUtterance(speakdata1 + speakdata2);
synth.speak(utterthis); 
}

function check(){
img = document.getElementById("capturedimage");
classifier.classify(img, gotresults);    
}

function gotresults(error, results){
if(error){
console.error(error);
}
else{
console.log(results);
document.getElementById("p1word").innerHTML = results[0].label;
document.getElementById("p2word").innerHTML = results[1].label;
prediction1 = results[0].label;
prediction2 = results[1].label;
speak();
if(results[0].label == "happy"){
document.getElementById("p1emoji").innerHTML = "&#128522;"    
}
if(results[0].label == "sad"){
    document.getElementById("p1emoji").innerHTML = "&#128532;"    
    }
    if(results[0].label == "angry"){
        document.getElementById("p1emoji").innerHTML = "&#128545;"    
        }
        if(results[1].label == "happy"){
            document.getElementById("p2emoji").innerHTML = "&#128522;"    
            }
            if(results[1].label == "sad"){
                document.getElementById("p2emoji").innerHTML = "&#128532;"    
                }
                if(results[1].label == "angry"){
                    document.getElementById("p2emoji").innerHTML = "&#128545;"    
                    }
}
}