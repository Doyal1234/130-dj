song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
peter_pan="";
harry_potter="";
function preload() {
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
    }

function setup() {
canvas=createCanvas(600,500);
canvas.position(420,220)
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modalLoaded);
poseNet.on("pose",gotPoses);
}

function modalLoaded() {
console.log("Modal Loaded");
}

function gotPoses(results) {
if(results.length>0) {
console.log(results);
scoreLeftWrist=results[0].pose.keypoints[9].score;
scoreRightWrist=results[0].pose.keypoints[10].score;
console.log("scoreLeftWrist= "+scoreLeftWrist+"scoreRightWrist"+scoreRightWrist);
leftWristX=results[0].pose.leftWrist.x;
leftWristY=results[0].pose.leftWrist.y;
console.log("Left wrist X is "+leftWristX+", Left wrist Y is "+leftWristY);
rightWristX=results[0].pose.rightWrist.x;
rightWristY=results[0].pose.rightWrist.y;
console.log("Right wrist X is "+rightWristX+", right wrist Y is "+rightWristY);
}
}

function draw() {
    image(video,0,0,600,500);
    peter_pan=song2.isPlaying();
    console.log(peter_pan);
    harry_potter=song1.isPlaying();
    console.log(harry_potter);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist>0.2) {
    circle(leftWristX,leftWristY,20);
    song1.stop();
    if(peter_pan==false){
    song2.play();
    }
    else{
    document.getElementById("song_name").innerHTML="Song Name:Peter Pan";
    }
    }
    if(scoreRightWrist>0.2) {
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(harry_potter==false){
        song1.play();
        }
        else{
        document.getElementById("song_name").innerHTML="Song Name:Harry Potter";
        }
        }
    }
    