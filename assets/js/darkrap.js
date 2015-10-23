//1. Populate list of verbs and adverbs
var verbList = [
	"rapping", "speaking", "rhyming", "freeing", "barring", "listing", "hitting", "consulting", "dreaming", "thinking", "considering", "shouting", "hustling", "whispering", "spitting", "admitting", "advising", "announcing", "bragging", "calling", "drawling", "growling", "laughing", "quoting", "repeating", "snapping", "slurring", "spouting", "trilling", "trapping", "yelling", "droning", "wailing", "begging", "sighing", "teasing", "revealing", "preaching", "observing", "humming", "cheering", "brawling", "moaning", "boasting", "chanting", "crying", "mouthing", "hinting", "performing", "singing", "hollering", "chirpsing", "chatting", "swagging", "blurting"
];

var adverbList = [
	"dark", "darker", "hard", "hot", "dope", "fierce", "wild", "evil", "angry", "clever", "dead", "classy", "carefully", "easy", "gifted", "long", "plain", "quaint", "ugly", "fancy", "clean", "dry", "rich", "odd", "vast", "scary", "clumsy", "bare", "brave", "calm", "happy", "jolly", "proud", "sly", "deep", "fat", "flat", "high", "hollow", "round", "skinny", "straight", "massive", "huge", "big", "tall", "quickly", "rapid", "bitter", "better", "cold", "icy", "cool", "crooked", "juicy", "rotten", "weak", "sticky", "damaged", "filthy", "dirty", "flaky", "freezing", "sparse", "tight", "lighter", "bright", "murky", "hot", "never", "briskly", "bleakly", "clearly", "dearly", "cruel", "dimly", "fairly", "foolish", "freely", "frantic", "gently", "greatly", "hopeless", "inward", "keen", "loudly", "mad", "oddly", "promptly", "roughly", "buff", "seldom", "sharply", "tender", "thankful", "truly", "tense", "dense", "slowly", "slow", "smooth", "solid", "speedy", "stern", "strict", "sudden", "sweet", "upward", "vicious", "wrong", "right", "down", "well", "zealous", "inconsiderately", "brightly"
];

//2. Use math.random and array.length to select random item
	function darkRap() {

	var verb = verbList[Math.floor((Math.random() * verbList.length))];
	var adverb = adverbList[Math.floor((Math.random() * adverbList.length))];

//3. Place items into #verb and #adverb span
	document.getElementById('verb').innerHTML = verb;
	document.getElementById('adverb').innerHTML = adverb;
}