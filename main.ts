//  Dragon move down:
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    bird.change(LedSpriteProperty.Y, 1)
    serial.writeLine("Dragon moved to Y=")
    serial.writeNumber(bird.get(LedSpriteProperty.Y))
})
//  Pause and play the game:
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    if (game.isPaused()) {
        console.log("Play")
        basic.showLeds(`
            . # . . .
            . # # . .
            . # # # .
            . # # . .
            . # . . .
            `)
        basic.pause(500)
        basic.clearScreen()
        game.resume()
    } else {
        console.log("Pause")
        game.pause()
        basic.showLeds(`
            . . . . .
            . # . # .
            . # . # .
            . # . # .
            . . . . .
            `)
    }
    
})
//  Dragon move up:
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    bird.change(LedSpriteProperty.Y, -1)
    serial.writeLine("Dragon moved to Y=")
    serial.writeNumber(bird.get(LedSpriteProperty.Y))
})
//  Start the game:
input.onLogoEvent(TouchButtonEvent.Pressed, function on_logo_pressed() {
    
    console.log("Start")
    score = 0
    bird = game.createSprite(0, 2)
    for (let index = 0; index < 1e+105; index++) {
        while (obstacles.length > 0 && obstacles[0].get(LedSpriteProperty.X) == 0) {
            obstacles.removeAt(0).delete()
        }
        for (let obstacle of obstacles) {
            obstacle.change(LedSpriteProperty.X, -1)
        }
        if (ticks % 3 == 0) {
            empty_obstacle = randint(0, 4)
            for (let index2 = 0; index2 < 5; index2++) {
                if (index2 != empty_obstacle) {
                    obstacles.push(game.createSprite(4, index2))
                }
                
            }
        }
        
        for (let obstacle2 of obstacles) {
            if (obstacle2.get(LedSpriteProperty.X) == bird.get(LedSpriteProperty.X) && obstacle2.get(LedSpriteProperty.Y) == bird.get(LedSpriteProperty.Y)) {
                game.gameOver()
                basic.showString("Game over Score")
                basic.showNumber(score)
                break
            }
            
        }
        ticks += 1
        basic.pause(1000)
        score += 1
    }
})
let empty_obstacle = 0
let ticks = 0
let score = 0
let bird : game.LedSprite = null
let obstacles : game.LedSprite[] = []
let index3 = 0
obstacles = []
let sprite = 0
