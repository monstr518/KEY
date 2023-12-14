
var ConfigsReactor = {
	"SixeX": 640,
	"SixeY": 480,
	"secret": 0,
	"Detector": {
		x: 70,
		y: 400,
		radiusPair: [50,20],
		a: 3.14/2
		},
	"KEY": [90,450,0.9]
};




var initCanvas = ()=>{
	var canvas = $("#id-can-polotno")[0];
	canvas.width = ConfigsReactor.SixeX;
	canvas.height = ConfigsReactor.SixeY;
	var windowInnerWidth = window.innerWidth;
	var windowInnerHeight = window.innerHeight;
	$("#id-can-polotno").css({
		"top": ((windowInnerHeight-ConfigsReactor.SixeY)/2)+"px",
		"left": ((windowInnerWidth-ConfigsReactor.SixeX)/2)+"px"
		});
};



var Detectors = [];





var Rebuild = ()=>{
	var canvas = $("#id-can-polotno")[0];
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	var getPset = (Detector,w,n)=>{
		var Pset = {
			x: Math.sin(Detector.a+w) * Detector.radiusPair[n] + Detector.x,
			y: Math.cos(Detector.a+w) * Detector.radiusPair[n] + Detector.y
			};
		return Pset;
		};
	
	var Pset, w, garant;
	garant = 2*3.14159/3;

	var DrawDetector = (Detector,n)=>{
		var ColorPair = [ "#00F", "#F00" ];
		context.beginPath();
		context.lineWidth = 3;
		context.strokeStyle = ColorPair[n];
		w = 0;
		Pset = getPset(Detector,w,n);
		context.moveTo(Pset.x,Pset.y);
		w += garant;
		Pset = getPset(Detector,w,n);
		context.lineTo(Pset.x,Pset.y);
		w += garant;
		Pset = getPset(Detector,w,n);
		context.lineTo(Pset.x,Pset.y);
		w += garant;
		Pset = getPset(Detector,w,n);
		context.lineTo(Pset.x,Pset.y);
		context.stroke();
		};

	Detectors.forEach((Detector,i)=>{
		//if(ConfigsReactor.secret==i)Detector.a += 0.02;
		Detector.a += (Math.random()*2-1)*0.03;
		DrawDetector(Detector,0);
		DrawDetector(Detector,1);
		});


	var Navigator = ()=>{
		var Detector = ConfigsReactor.Detector;

		context.beginPath();
		context.lineWidth = 3;
		context.strokeStyle = "#FFF";
		context.moveTo(Detector.x,Detector.y);
		Pset = getPset(Detector,3.14/2,0);
		context.lineTo(Pset.x,Pset.y);
		context.stroke();

		context.beginPath();
		context.arc(Detector.x, Detector.y, 4, 0, 2 * Math.PI, false);
		context.fillStyle = 'green';
		context.fill();
		context.stroke();
		};

	Navigator();
	
	ConfigsReactor.Detector.a += (Math.random()*2-1)*0.03;

	Pset = ConfigsReactor.KEY;
	Pset[0] += (Math.random()*2-1)*0.3;
	Pset[1] += (Math.random()*2-1)*0.8;
	Pset[2] += (Math.random()*2-1)*0.05;
	
	var value = Pset[2];
	Pset = {x:Pset[0],y:Pset[1]};

	context.lineCap = "round";
	context.beginPath();
	context.lineWidth = 20;
	context.strokeStyle = "RGBA(252,1,1," + value + ")";
	context.moveTo(Pset.x,Pset.y);
	context.lineTo(Pset.x+30,Pset.y);
	context.stroke();
	
	context.fillStyle = "#FFF";
	context.fillText("H5118", Pset.x, Pset.y);

};



function getCursorPosition(canvas, event){
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
	var Detector = {
		x: x,
		y: y,
		radiusPair: [30,20],
		a: 2
		};
	Detectors.push(Detector);
}



var exportData = ()=>{
	var Row = Detectors.map((Detector)=>{
		return [ Detector.x, Detector.y, Detector.a ];
		});
	Row = JSON.stringify(Row);
	console.log(Row);
};





var targets = [
		[110.5,300.5,4.159999999999998],
		[139.5,265.5,3.4600000000000013],
		[158.5,233.5,2.940000000000001],
		[183.5,214.5,2.3600000000000003],
		[210.5,198.5,3.300000000000001],
		[232.5,177.5,2.3800000000000003],
		[268.5,161.5,3.160000000000001],
		[301.5,156.5,2.3200000000000003],
		[333.5,156.5,3.000000000000001],
		[367.5,170.5,3.6200000000000014]
	];

/*
[
	[110.5,300.5],[139.5,265.5],[158.5,233.5],
	[183.5,214.5],[210.5,198.5],[232.5,177.5],
	[268.5,161.5],[301.5,156.5],[333.5,156.5],
	[367.5,170.5]
];
*/



$(document).ready(function(){
	initCanvas();
	
/*
	var canvas = $("#id-can-polotno")[0];
	canvas.addEventListener('mousedown', function(e) {
		getCursorPosition(canvas, e);
		});
*/


	$(window).keypress((e)=>{
		//alert(e.keyCode);
		if (e.keyCode === 32){
			e.preventDefault();
			//exportData();
			if(0){
				++ConfigsReactor.secret;
				var size = Detectors.length;
				if(ConfigsReactor.secret>size)ConfigsReactor.secret = 0;
				if(ConfigsReactor.secret==size)exportData();
				}
			}
		});

	Detectors = targets.map((target)=>{
		var Detector = {
			x: target[0],
			y: target[1],
			radiusPair: [30,20],
			a: target[2]
			};
		return Detector;
		});

	Rebuild();
	
	setInterval(Rebuild,40);

	//console.log();
});




