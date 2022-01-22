let picture;
let saveBtn;
let loadBtn;
let fileName;
let numSaves = 0;

let currentStrokeLength = 100;
let currentStrokeThickness = 10;

function preload() {
	picture = loadImage("hqdefault.jpg");
}

function setup() {
	scaleToFit(picture, windowWidth, windowHeight);
	let pix = createImage(picture.width, picture.height)
	pix.copy(picture, 0, 0, picture.width, picture.height, 0, 0, picture.width, picture.height);
	picture = pix;
	createCanvas(picture.width, picture.height);
	// let biggestSide = (picture.height > picture.width) ? picture.height : picture.width;
	// let proportion = (biggestSide == width) ? picture.height / picture.width : picture.width / picture.height;
	
	// loadBtn = createButton("load picture");
	// loadBtn.position(windowWidth-100,50);
	// loadBtn.mousePressed(loadImage);
	
	
	saveBtn = createButton("save");
	saveBtn.position(windowWidth - 100, windowHeight - 50);
	saveBtn.mousePressed(saveImage);
	fileName = createInput('myPainting');
	fileName.position(saveBtn.x - 110, windowHeight - 50);
	fileName.size(100);
	fileName.input(updateName);
	//	if (biggestSide == picture.height) {
	//		image(picture, 0, 0, proportion * height, height);
	//	} else {
	//		image(picture, 0, 0, width, proportion * width);
	//	}
	image(picture, 0, 0);

}

function scaleToFit(img, w = null, h = null) {
	w = (w == null) ? width : w;
	h = (h == null) ? height : h;
	let proportion = w / img.width;
	img.width *= proportion;
	img.height *= proportion;
	if (img.height > h) {
		proportion = h / img.height;
		img.height *= proportion;
		img.width *= proportion;
	}
}

function draw() {
	if (mouseIsPressed) {
		paintStroke(currentStrokeLength, currentStrokeThickness);

	}
}

function updateName() {
	numSaves = 0;
}

function saveImage() {
	let name = fileName.value();
	if (numSaves > 0) {
		name += numSaves;
	}
	saveCanvas(name, "jpg");
	numSaves++;
}

function randomSimilarColor(originalColor) {
	let r = red(originalColor);
	let g = green(originalColor);
	let b = blue(originalColor);
	let colorChange = random(-50, 50);
	return color(r + colorChange, g + colorChange, b + colorChange)
}

function paintStroke(strokeLength = 100, strokeThickness = 10) {
	let stepLength = strokeLength / 4;
	//picture.
	loadPixels();

	let tangent1 = 0;
	let tangent2 = 0;
	if (random(100) < 70) {
		tangent1 = random(-strokeLength, strokeLength);
		tangent2 = random(-strokeLength, strokeLength);
	}



	let x = mouseX + random(-30, 30);
	let y = mouseY + random(-30, 30);
	let strokeColor = picture.get(x, y);
	if (alpha(strokeColor) == 0) {
		return;
	}
	//fill(strokeColor);
	noFill();
	push();
	translate(x, y);
	rotate(random(PI));
	stroke(strokeColor);
	strokeWeight(strokeThickness);
	//let size = random(2, 20);
	//ellipse(0, 0, size, size);
	curve(tangent1, -stepLength * 2, 0, -stepLength, 0, stepLength, tangent2, stepLength * 2);

	let z = 1
	for (let num = strokeThickness; num > 0; num--) {
		let newColor = randomSimilarColor(strokeColor);
		stroke(newColor);
		strokeWeight(round(random(0, 3)));
		curve(tangent1, -stepLength * 2, z - strokeThickness / 2, -stepLength * random(0.9, 1.1), z - strokeThickness / 2, stepLength * random(0.9, 1.1), tangent2, stepLength * 2);
		z++;
	}
	pop();
}

function keyPressed() {
	switch (key) {
		case "1":
			currentStrokeLength = random(150, 250);
			currentStrokeThickness = random(20, 40);
			break;
		case "2":
			currentStrokeLength = random(75, 125);
			currentStrokeThickness = random(8, 12);
			break;
		case "3":
			currentStrokeLength = random(30, 60);
			currentStrokeThickness = random(1, 4);
			break;
		case "4":
			currentStrokeLength = random(5, 20);
			currentStrokeThickness = random(5, 15);
			break;
		case "5":
			currentStrokeLength = random(1, 10);
			currentStrokeThickness = random(1, 7);
			break;
	}

}