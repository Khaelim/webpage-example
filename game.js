function myFunct() {
    'use sctrict';
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    //ball variables
    var ballRadius = 10;
    var x = canvas.width / 2;
    var y = canvas.height - 30;
    var dx = Math.random() * 4 - 2;
    var dy = -2;
    //paddle variables 
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width - paddleWidth) / 2;
    //brick variables
    var brickRowCount = 3;
    var brickColumnCount = 2;
    var brickHeight = 20;
    var brickPadding = 8;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;
    var brickWidth = ((canvas.width - brickOffsetLeft * 2 / brickColumnCount) / brickColumnCount - brickPadding * 2);
    //Score/level variable
    var score = 0;
    var totalScore = 0;
    var level = 1;
    //setting up the bricks
    var bricks = [];
    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
            bricks[c][r] = {
                x: 0,
                y: 0,
                status: 1
            };
        }
    }
    //user input variables 
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    var rightPressed = false;
    var leftPressed = false;
    //keyboard input handlers
    function keyDownHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
    }
    //drawing the things
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function drawBricks() {
        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status == 1) {
                    var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    //draw score on screen
    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: " + totalScore + ". Level: " + level, 8, 20);
    }
    //collision detection for the bricks
    function collisionDetection() {

        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                var b = bricks[c][r];
                if (b.status == 1) {
                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight + ballRadius) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        totalScore++;
                        if (score == brickColumnCount * brickRowCount) {
                            level++;
                            
                            score = 0;
                            brickColumnCount++;
                            brickWidth = canvas.width / brickColumnCount - brickPadding * 2.5;
                            x = paddleX + paddleWidth / 2;
                            y = canvas.height - 35;
                            dy = -Math.abs(dy);
                            for (var c = 0; c < brickColumnCount; c++) {
                                bricks[c] = [];
                                for (var r = 0; r < brickRowCount; r++) {
                                    bricks[c][r] = {
                                        x: 0,
                                        y: 0,
                                        status: 1
                                    };
                                }
                            }
                        }
                    }
                    //
                    
                    //
                }
            }
        }
    }
    //main game
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle()
        drawBricks();
        collisionDetection();
        drawScore();
        //ball-to-wall redirection
        if (y + dy < ballRadius) {
            dy = -dy;
        } else if (y + dy > canvas.height - ballRadius - (paddleHeight * 0.7)) {
            if (x > paddleX - 1 && x < paddleX + paddleWidth + 1) {
                dy = -dy;
                dx = -((paddleX + paddleWidth / 2) - x) / (paddleWidth / 2) * (2);
            } else {
                alert("GAME OVER");
                document.location.reload();
                clearInterval(interval);
            }
        }
        if (((x + dx) - ballRadius < 0) || (x + dx) + ballRadius > canvas.width) {
            dx = -dx
        }
        //paddle movement
        if (rightPressed && ((paddleX + paddleWidth) < canvas.width)) {
            paddleX += 7;
        }
        if (leftPressed && (paddleX > 0)) {
            paddleX -= 7;
        }
        x += dx;
        y += dy;


    }

    var interval = setInterval(draw, 10);

}
