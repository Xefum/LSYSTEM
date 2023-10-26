
palettes = [
  [[254, 93, 38], [242, 192, 120], [250, 237, 202], [193, 219, 179], [126, 188, 137]],
  [[147, 181, 198], [221, 237, 170], [240, 207, 101], [215, 129, 106], [189, 79, 108]],
  [[89, 41, 65], [73, 132, 103], [82, 183, 136], [178, 211, 168], [237, 229, 166]],
  [[86, 44, 44], [242, 84, 45], [245, 223, 187], [14, 149, 148], [18, 116, 117]],
  [[58, 51, 53], [216, 30, 91], [240, 84, 79], [253, 240, 213], [198, 216, 211]],
  [[229, 224, 89], [189, 211, 88], [255, 255, 255], [255, 255, 255], [255, 255, 255]],
  [[185, 227, 198], [89, 201, 165], [216, 30, 91], [216, 44, 25], [255, 253, 152]],
  [[39, 40, 56], [243, 222, 138], [235, 148, 134], [126, 127, 154], [249, 248, 248]]
]


function randomColor(palettes){
  group = palettes[floor(random(palettes.length))];
  color = group[floor(random(group.length))];
  return color;
}


function setup() {
  createCanvas(2560, 1600);
  background(51);
  button = createButton("generate");
  axiom = "F";
  rules = [];
  sentence = axiom;
  alpha_change = 1;
  bg_color = randomColor(palettes);
  color_variation = 2;
  scaling = 0.249;
  rotation = 4;
  len = 200;
  random_index = floor(random(palettes.length));
  color_frequency = 0.00000000001;

  palette = palettes[random_index];
  use_palette = false;
  start_color = randomColor(palettes);
  r = start_color[0];
  g = start_color[1];
  b = start_color[2];
  weight = 1;
  rules[0] = {
    in: "F",
    out: "FF[-FF+FF+FF]O[+FF-FF-FF]FFFF"
  }
  turtle();
  button.mouseClicked(generate);
}

function draw() {
}


function generate() {
  nextSentence = "";
  for(i = 0; i < sentence.length; i++) {
    current = sentence.charAt(i);
    found = false;
    for(j = 0; j < rules.length; j++) {
      if(current == rules[j].in) {
        found = true;
        nextSentence += rules[j].out;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  len *= scaling;
  sentence = nextSentence;
  turtle();

}

function turtle() {

  alpha = 255;
  createCanvas(1000, 1000);
  background(bg_color);
  strokeCap(ROUND);
  strokeWeight(weight);
  stroke(r, g, b, alpha=alpha);
  resetMatrix();
  translate(width / 2, height);

  for(i = 0; i < sentence.length; i++) {
    current = sentence.charAt(i);
    switch(current) {
      case "F":
        line(0, 0, 0, -len);
        translate(0, -len);
        break;
      case "+":
        rotate(TAU / rotation);
        break;
      case "-":
        rotate(-TAU / rotation);
        break;
      case "[":
        push();
        break;
      case "]":
        pop();
        break;
      case "O":
        colorChange(use_palette, palette);
        stroke(r, g, b, alpha=alpha);
        break;
      default:
        break;
    }
  }
}

function colorChange(use_palette, palette) {
  alpha *= alpha_change;
  if(!use_palette) {
    if(random(1) > 0.5 && r < 255) {
      r += floor(random(color_variation));
    } else if(r > 0) {
      r -= floor(random(color_variation));
    }
    if(random(1) > 0.5 && g < 255){
      g += floor(random(color_variation));
    } else if(g > 0) {
      g -= floor(random(color_variation));
    }
    if(random(1) > 0.5 && b < 255){
      b += floor(random(color_variation));
    } else if(b > 0) {
      b -= floor(random(color_variation));
   }
 } else {
    color = palette[floor(random(palette.length))];
    if (random(1) < color_frequency) {

      r = color[0];
      g = color[1];
      b = color[2];
    }
 }
}
