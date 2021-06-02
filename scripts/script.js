const Scene = require('Scene');
export const Diagnostics = require('Diagnostics');
const Patches = require("Patches");

Promise.all([
    Scene.root.findFirst('score'),
]).then(results=>{
    var score = results[0];

    var collide = Patches.outputs.getPulse('collide');
    var startGame = Patches.outputs.getPulse('startGame');
    var scoreCount = Patches.outputs.getScalar("scoreCount");

    //set text
    scoreCount.then(e=>{
        e.monitor().subscribe(value=>{
            score.text = value.newValue.toString();
        });
    });

    //Set start values
    Patches.inputs.setBoolean("playGame",false);
    Patches.inputs.setBoolean("stopGame",false);

    //Stop the game when colliding
    collide.then(e=>{
        e.subscribe(value=>{
            Patches.inputs.setBoolean("stopGame",true);
            Patches.inputs.setBoolean("playGame",false);
        });
    });

    startGame.then(e=>{
        e.subscribe(value=>{
            Patches.inputs.setBoolean("stopGame",false);
            Patches.inputs.setBoolean("playGame",true);
        });
    });

});