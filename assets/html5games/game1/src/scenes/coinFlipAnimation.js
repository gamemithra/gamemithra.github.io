
export function createCoinFlipAnimation(scene, x, y, randomValue, onComplete) {
    // Create a sprite for the coin at the desired position
    const coin = scene.add.sprite(x, y, 'coinYou'); // Adjust the position as needed

    // Create an animation for the coin flip
    const flipAnimation = scene.anims.create({
        key: 'spin',
        frames: [
            { key: 'coinYou' },
            { key: 'coin2' },
            { key: 'coin3' },
            { key: 'coin4' },
            { key: 'coinAI' },
            { key: 'coin2' },
            { key: 'coin3' },
            { key: 'coin4' },
            // Add more frames as needed
        ],
        frameRate: 10, // Adjust the frame rate as needed
        repeat: -1, // Set to -1 for continuous looping
    });

    // Play the coin flip animation
    coin.play('spin');

    // Stop the animation after a certain time (e.g., 2 seconds)
    scene.time.delayedCall(2000, () => {
        coin.anims.stop('spin');
        coin.setTexture(randomValue === 'heads' ? 'coinYou' : 'coinAI');
        onComplete(randomValue);
        scene.time.delayedCall(1000, () => {
            coin.setVisible(false); // Hide the coin
        });
    });

    return coin;
}
