def on_button_pressed_a():
    bird.change(LedSpriteProperty.Y, 1)
    print("Down")
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    if game.is_paused():
        print("Play")
        basic.show_leds("""
            . # . . .
            . # # . .
            . # # # .
            . # # . .
            . # . . .
            """)
        basic.pause(500)
        basic.clear_screen()
        game.resume()
    else:
        print("Pause")
        game.pause()
        basic.show_leds("""
            . . . . .
            . # . # .
            . # . # .
            . # . # .
            . . . . .
            """)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    print("Up")
    bird.change(LedSpriteProperty.Y, -1)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_logo_pressed():
    global score, bird, empty_obstacle, ticks
    print("Start")
    score = 0
    bird = game.create_sprite(0, 2)
    for index in range(1e+105):
        while len(obstacles) > 0 and obstacles[0].get(LedSpriteProperty.X) == 0:
            obstacles.remove_at(0).delete()
        for obstacle in obstacles:
            obstacle.change(LedSpriteProperty.X, -1)
        if ticks % 3 == 0:
            empty_obstacle = randint(0, 4)
            for index2 in range(5):
                if index2 != empty_obstacle:
                    obstacles.append(game.create_sprite(4, index2))
        for obstacle2 in obstacles:
            if obstacle2.get(LedSpriteProperty.X) == bird.get(LedSpriteProperty.X) and obstacle2.get(LedSpriteProperty.Y) == bird.get(LedSpriteProperty.Y):
                game.game_over()
                basic.show_string("Game over Score")
                basic.show_number(score)
                break
        ticks += 1
        basic.pause(1000)
        score += 1
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

empty_obstacle = 0
ticks = 0
score = 0
bird: game.LedSprite = None
obstacles: List[game.LedSprite] = []
index3 = 0
obstacles = []