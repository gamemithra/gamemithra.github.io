/* global monogatari */
// Define the messages used in the game.
monogatari.action('message').messages({
	'Help': {
		title: 'Help',
		subtitle: 'Some useful Links',
		body: `
			<p><a href='https://developers.monogatari.io/documentation/'>Documentation</a> - Everything you need to know.</p>
			<p><a href='https://monogatari.io/demo/'>Demo</a> - A simple Demo.</p>
		`
	}
});

// Define the notifications used in the game
monogatari.action('notification').notifications({
	'Welcome': {
		title: " Harishchandra's Trial",
		body: ' A Tale of Truth and Sacrifice',
		icon: ''
	}
});

// Define the Particles JS Configurations used in the game
monogatari.action('particles').particles({

});

// Define the canvas objects used in the game
monogatari.action('canvas').objects({

});

// Credits of the people involved in the creation of this awesome game
monogatari.configuration('credits', {

});


// Define the images that will be available on your game's image gallery
monogatari.assets('gallery', {

});

// Define the music used in the game.
monogatari.assets('music', {
	"intro": 'intro.mp3'

});

// Define the voice files used in the game.
monogatari.assets('voices', {
	"Chant": 'HareRama.mp3'
});

// Define the sounds used in the game.
monogatari.assets('sounds', {
	"thunder": 'thunder.mp3',
	"guards_footsteps": "guard's footsteps.mp3",
	"scary": 'scary.mp3'


});

// Define the videos used in the game.
monogatari.assets('videos', {

});

// Define the images used in the game.
monogatari.assets('images', {

});

// Define the backgrounds for each scene.
monogatari.assets('scenes', {
	"kingdom": "kingdom.jpg",
	"sabhagriham": "sabhagriham.jpg",
	"palace": "palace.jpg",
	// "Home": "home.png",
	// "Room": "room.jpg",
	// "Sea": "sea.jpg",
	// "Library": "library.png"

});


// Define the Characters
monogatari.characters({
	'p': {
		name: '{{player.name}} ',
		color: '#1a1a1a',
	},
	'g': {
		name: 'Guard',
		color: '#5bcaff',
		directory: 'guard',
		sprites: {
			// angry: 'normal.png',
			// happy: 'happy.png',
			normal: 'normal.png',
			// sad: 'sad.png',
			// surprised: 'surprised.png'
		},
		expressions: {
			//angry: 'expressions/normal.png',
			// happy: 'expressions/happy.png',
			normal: 'expressions/normal.png',
			// sad: 'expressions/sad.png',
			// surprised: 'expressions/surprised.png'
		},
		default_expression: 'normal',
		//nvl: true,
		type_animation: true
	},

	't': {
		name: 'Traveller',
		color: '#5bcaff',
		directory: 'traveller',
		sprites: {
			// angry: 'normal.png',
			// happy: 'happy.png',
			normal: 'normal.png',
			// sad: 'sad.png',
			// surprised: 'surprised.png'
		},
		expressions: {
			//angry: 'expressions/normal.png',
			// happy: 'expressions/happy.png',
			normal: 'expressions/normal.png',
			// sad: 'expressions/sad.png',
			// surprised: 'expressions/surprised.png'
		},
		default_expression: 'normal',
		//nvl: true,
		type_animation: true
	},


});

