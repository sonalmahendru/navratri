var video = document.querySelector("#videoElement");
var videoElement = document.getElementById("videoElement");
var canvas = document.getElementById('canvas');
canvas.width = screen.width;
canvas.height = screen.height;

var context = canvas.getContext('2d');
var user_pic = new Image();
var snap_button= document.getElementById("snap");
var share_div = document.getElementById("share");
var retake_button = document.getElementById("retake");
retake_button.hidden = true;
var share_to_facebook = document.getElementById("sharefb");

var game_flag = localStorage.getItem("flag");
var result = localStorage.getItem("result");

//if(game_flag == 2 && result == "won"){
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (err0r) {
        console.log("Something went wrong!");
      });
  }else{
    console.log("Can Not access camera");
  }
//}


// Trigger photo take
function snap() {
    console.log("snapped")
    console.log(videoElement.videoHeight);
    console.log(videoElement.videoWidth);
    var video_width = videoElement.getBoundingClientRect().width;
    var video_height = videoElement.getBoundingClientRect().height;

    canvas.height = video_height;
    canvas.width = video_width;
  
    //translate and scale context for a flipped image to be drawn
    context.translate(canvas.width,0); //move the drawing cursor to the right edge
    context.scale(-1,1); //flip the image horizontally
  //Old way of drawing image
  //context.drawImage(videoElement, 0, 0, canvas.width, canvas.height); //screen.width, screen.height
  
 //New way of drawing image flipped to what is seen - turn comments off only when translation and scale is sorted!
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height); //screen.width, screen.height
  
  user_pic.src = convertCanvasToImage(canvas);
  snap_button.hidden = true;
  share_div.hidden = false;
  videoElement.hidden = true;
  canvas.hidden = false;
  retake_button.hidden = false;
};

// Converts canvas to an image
function convertCanvasToImage(canvas) {
	var image = new Image();
  image.src = canvas.toDataURL("images/png");
  document.getElementById("snapped_pic").href = image.src;
  document.getElementById("snapped_pic").click();
	return image;
}

function retake(){
  user_pic = new Image();
  snap_button.hidden = false;
  share_div.hidden = true;
  videoElement.hidden = false;
  canvas.hidden = true;
}

function shareToFacebook() {
 var imageData = canvas.toDataURL("images/png");

  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

    var response = JSON.parse(this.responseText);

      if (response.status == 200) {
        var width = 600;
        var height = 400;
        var left = (screen.width - width) / 2;
        var top = (screen.height - (height + 100)) / 2;
        window.open(response.url, "Share to Facebook", 'width=' + width + ' , height=' + height + ' , top=' + top + ' , left=' + left);
      } else {
        console.log(this.responseText);
      }

    }
  }
  var form = new FormData;
  form.append('imageData', imageData);
  xmlhttp.open("POST", "graph.php");
  xmlhttp.send(form);
  return false;

}