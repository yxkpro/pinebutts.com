/*document.addEventListener("DOMContentLoaded", function() {
  // Text options for the coin pairs (front and back)
  const textPairs = [
    {
      front: "jump the gun<br>then you're in the sights",
      back: "killin' time<br>if you're indecisive",
      side: "think twice"
    },
    {
      front: "to love with stubble",
      back: "to shave against the grain",
      side: "there's the rub"
    },
    // Add more text pairs as needed
  ];

  // Select the elements
  const coinFront = document.querySelector('.coin__front');
  const coinBack = document.querySelector('.coin__back');
  const coinSide = document.querySelector('.coin__middle');

  // Set a random text pair for the front and back faces on page load
  const randomPair = textPairs[Math.floor(Math.random() * textPairs.length)];
  coinFront.innerHTML = randomPair.front;
  coinBack.innerHTML = randomPair.back;
  coinSide.innerHTML = randomPair.side;
});*/

const pinebutts = document.querySelectorAll('.pinebutt')

// Loop through all buttons (allows for multiple buttons on page)
pinebutts.forEach((button) => {
  let coin = button.querySelector('.coin')

  // The larger the number, the slower the animation
  coin.maxMoveLoopCount = 100

  button.addEventListener('mousemove', () => {
    if (button.clicked) return

    button.classList.add('clicked')

    // Wait to start flipping the coin because of the button tilt animation
    setTimeout(() => {
      // Randomize the flipping speeds just for fun
      coin.sideRotationCount = (Math.floor(Math.random() * 11) - 5) * 90;
      coin.maxFlipAngle = (Math.floor(Math.random() * 4) + 4) * Math.PI /2;
      coin.maxFlipAngle2 = Math.PI / 2;
      button.clicked = true
      flipCoin()
    }, 10)
  })

  const flipCoin = () => {
    coin.moveLoopCount = 0
    flipCoinLoop()
  }

  const resetCoin = () => {
    coin.style.setProperty('--coin-x-multiplier', 0)
    coin.style.setProperty('--coin-scale-multiplier', 0)
    coin.style.setProperty('opacity', 1)
    // Delay to give the reset animation some time before you can click again
    setTimeout(() => {
      button.clicked = false
    }, 30)
  }

  const flipCoinLoop = () => {
    coin.moveLoopCount++
    let percentageCompleted = coin.moveLoopCount / coin.maxMoveLoopCount
    coin.angle = -coin.maxFlipAngle * Math.pow((percentageCompleted - 1), 2) + coin.maxFlipAngle
    coin.angle2 = -coin.maxFlipAngle2 * Math.pow((percentageCompleted - 1), 2) + coin.maxFlipAngle2
    
    // Calculate the scale and position of the coin moving through the air
    coin.style.setProperty('--coin-y-multiplier', -11 * Math.pow(percentageCompleted * 2 - 1, 4) + 11)
    coin.style.setProperty('--coin-x-multiplier', percentageCompleted)
    //coin.style.setProperty('--coin-scale-multiplier', percentageCompleted * 0.6)
    coin.style.setProperty('--coin-rotation-multiplier', percentageCompleted * coin.sideRotationCount * 2)

    // Calculate the scale and position values for the different coin faces
    // The math uses sin/cos wave functions to similate the circular motion of 3D spin
    coin.style.setProperty('--front-scale-multiplier', Math.max(Math.cos(coin.angle), 0))
    coin.style.setProperty('--front-y-multiplier', Math.sin(coin.angle))

    coin.style.setProperty('--middle-scale-multiplier', Math.abs(Math.cos(coin.angle), 0))
    coin.style.setProperty('--middle-y-multiplier', Math.cos((coin.angle + Math.PI / 2) % Math.PI))

    coin.style.setProperty('--back-scale-multiplier', Math.max(Math.cos(coin.angle - Math.PI), 0))
    coin.style.setProperty('--back-y-multiplier', Math.sin(coin.angle - Math.PI))

    coin.style.setProperty('--shine-opacity-multiplier', 4 * Math.sin((coin.angle + Math.PI / 2) % Math.PI) - 3.2)
    coin.style.setProperty('--shine-bg-multiplier', -40 * (Math.cos((coin.angle + Math.PI / 2) % Math.PI) - 0.5) + '%')

    

    // Repeat animation loop
    if (coin.moveLoopCount < coin.maxMoveLoopCount) {
      
      window.requestAnimationFrame(flipCoinLoop)
    } else {
      
      setTimeout(() => {
        button.classList.remove('clicked', 'shrink-landing')
        setTimeout(() => {
          resetCoin()
        }, 30)
      }, 30)
    }
  }
})