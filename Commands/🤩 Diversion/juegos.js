const Discord = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
const { Connect4, Hangman, Wordle, MatchPairs, TicTacToe, Minesweeper, Trivia, Slots } = require('discord-gamecord');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("juegos")
        .setDescription("Gran cantidad de juegos para jugar en el servidor de discord")
        .addSubcommand((options) => 
            options
                .setName("hangman")
                .setDescription("🤩 Juega al ahorcado con tus amigos del servidor")
        )
        .addSubcommand((options) => 
            options
                .setName("wordle")
                .setDescription("🤩 Juega al Wordle con tus amigos del servidor")
        )
        .addSubcommand((options) => 
            options
                .setName("minesweeper")
                .setDescription("🤩 Juega al Minesweeper con tus amigos del servidor")
        )
        .addSubcommand((options) =>
            options
                .setName("trivia")
                .setDescription("🤩 Juega a la trivia con tus amigos del servidor")
                .addStringOption((option) =>
                    option
                        .setName("dificultad")
                        .setDescription("Elije el nivel de dificultad de las preguntas a responder")
                        .addChoices(
                            { name: "🟢 Fácil", value: "easy" },
                            { name: "🟡 Medio", value: "medium" },
                            { name: "🔴 Difícil", value: "hard" }
                        )
                    )
        )
        .addSubcommand((options) => 
            options
                .setName("matchpairs")
                .setDescription("🤩 Juega al MatchPairs con tus amigos del servidor")
        )
        .addSubcommand((options) =>
            options
                .setName("slots")
                .setDescription("🤩 Juega al traga peras y prueba tu suerte de hoy")
        )
        .addSubcommand((options) => 
            options
                .setName("tictactoe")
                .setDescription("🤩 juega al tictactoe con tus amigos del servidor")
                .addUserOption((option) => 
                    option
                        .setName("oponente")
                        .setDescription("El usuario con el que quieres jugar")
                        .setRequired(true)
                )
        )
        .addSubcommand((options) =>
            options 
                .setName("connect4")
                .setDescription("🤩 juega al conecta 4 con tus amigos del servidor")
                .addUserOption((option) => 
                    option
                        .setName("oponente")
                        .setDescription("El usuario con el que quieres jugar")
                        .setRequired(true)
                )
        ),
    async execute(interaction, client) {
        const subcommand = interaction.options.getSubcommand();
        switch (subcommand) {
            case "connect4": {
                const Game = new Connect4({
                    message: interaction,
                    isSlashGame: true,
                    opponent: interaction.options.getUser('oponente'),
                    embed: {
                        title: 'Juego Connect4',
                        statusTitle: 'Estado del Juego',
                        color: '#5865F2'
                    },
                    emojis: {
                        board: '⚪',
                        player1: '🔴',
                        player2: '🟡'
                    },
                    mentionUser: true,
                    timeoutTime: 60000,
                    buttonStyle: 'Primary',
                    turnMessage: '{emoji} Es su turno de jugador **{player}**.',
                    winMessage: '{emoji} **{player}** ganó el juego Connect4.',
                    tieMessage: '¡El Juego empató! nadie ganó el juego!',
                    timeoutMessage: '¡El Juego quedó inconcluso! nadie ganó el juego!',
                    playerOnlyMessage: 'Only {player} y {opponent} puede utilizar estos botones.'
                });

                Game.startGame();
                Game.on('gameOver', result => {
                });
            }
            break;
            case "hangman": {
                const Game = new Hangman({
                    message: interaction,
                    isSlashGame: true,
                    embed: {
                        title: 'Hangman',
                        color: '#5865F2'
                    },
                    hangman: { hat: '🎩', head: '😟', shirt: '👕', pants: '🩳', boots: '👞👞' },
                    customWord: 'Gamecord',
                    timeoutTime: 60000,
                    theme: 'nature',
                    winMessage: '¡Ganaste! el mundo estaba **{word}**.',
                    loseMessage: '¡Perdiste! la palabra era **{word}**.',
                    playerOnlyMessage: 'Only {player} puede usar estos botones.'
                });

                Game.startGame();
                Game.on('gameOver', result => {
                });
            }
            break;
            case "wordle": {
                const Game = new Wordle({
                    message: interaction,
                    isSlashGame: true,
                    embed: {
                        title: 'Wordle',
                        color: '#5865F2',
                    },
                    customWord: null,
                    timeoutTime: 60000,
                    winMessage: '¡Ganaste! el mundo estaba **{word}**.',
                    loseMessage: '¡Perdiste! la palabra era **{word}**.',
                    playerOnlyMessage: 'Only {player} puede usar estos botones.'
                });

                Game.startGame();
                Game.on('gameOver', result => {
                });
            }
            break;
            case "matchpairs": {
                const Game = new MatchPairs({
                    message: interaction,
                    isSlashGame: true,
                    embed: {
                        title: 'Match Pairs',
                        color: '#5865F2',
                        description: '**Haga clic en los botones para unir emojis con sus pares.**'
                    },
                    timeoutTime: 60000,
                    emojis: ['🍉', '🍇', '🍊', '🥭', '🍎', '🍏', '🥝', '🥥', '🍓', '🫐', '🍍', '🥕', '🥔'],
                    winMessage: '**¡Ganaste el juego! Convertiste un total de `{tilesTurned}` losas.**',
                    loseMessage: '**¡Perdiste el juego! Convertiste un total de `{tilesTurned}` losas.**',
                    playerOnlyMessage: 'Only {player} puede usar estos botones.'
                });

                Game.startGame();
                Game.on('gameOver', result => {
                });
            }
            break;
            case "tictactoe": {
                const Game = new TicTacToe({
                    message: interaction,
                    isSlashGame: true,
                    opponent: interaction.options.getUser('oponente'),
                    embed: {
                        title: 'Tic Tac Toe',
                        color: '#5865F2',
                        statusTitle: 'Status',
                        overTitle: 'Game Over'
                    },
                    emojis: {
                        xButton: '❌',
                        oButton: '🔵',
                        blankButton: '➖'
                    },
                    mentionUser: true,
                    timeoutTime: 60000,
                    xButtonStyle: 'Danger',
                    oButtonStyle: 'Primary',
                    turnMessage: '{emoji} Es su turno de jugador **{player}**.',
                    winMessage: '{emoji} **{player}** ganó el juego de tres en raya.',
                    tieMessage: '¡El Juego empató! nadie ganó el juego!',
                    timeoutMessage: '¡El Juego quedó inconcluso! ¡Nadie ganó el Juego!',
                    playerOnlyMessage: 'Only {player} y {opponent} puede usar estos botones.'
                });

                Game.startGame();
                Game.on('gameOver', result => {
                });
            }
            break;
            case "minesweeper": {
                const Game = new Minesweeper({
                    message: interaction,
                    isSlashGame: true,
                    embed: {
                        title: 'Minesweeper',
                        color: '#5865F2',
                        description: 'Haga clic en los botones para revelar los bloques, excepto las minas..'
                    },
                    emojis: { flag: '🚩', mine: '💣' },
                    mines: 5,
                    timeoutTime: 60000,
                    winMessage: '¡Ganaste el juego! Has evitado con éxito todas las minas..',
                    loseMessage: '¡Perdiste el juego! Tenga cuidado con las minas la próxima vez.',
                    playerOnlyMessage: 'Only {player} puede usar estos botones.'
                });

                Game.startGame();
                Game.on('gameOver', result => {
                });
            }
            break;
            case "trivia": {
                const Game = new Trivia({
                    message: interaction,
                    isSlashGame: true,
                    embed: {
                        title: 'Trivia',
                        color: '#5865F2',
                        description: 'Tienes 60 segundos para adivinar la respuesta..'
                    },
                    timeoutTime: 60000,
                    buttonStyle: 'Primary',
                    trueButtonStyle: 'Success',
                    falseButtonStyle: 'Danger',
                    mode: 'multiple',  // multiple || single
                    difficulty: interaction.options.getString('dificultad'),
                    winMessage: '¡Ganaste! La respuesta correcta es {answer}.',
                    loseMessage: '¡Perdiste! La respuesta correcta es {answer}.',
                    errMessage: '¡No se pueden obtener los datos de la pregunta! Inténtalo de nuevo.',
                    playerOnlyMessage: 'Only {player} puede usar estos botones.'
                });

                Game.startGame();
                Game.on('gameOver', result => {
                });
            }
            break;
            case "slots": {
                const Game = new Slots({
                    message: interaction,
                    isSlashGame: true,
                    embed: {
                        title: 'Traga Peras!',
                        color: '#5865F2'
                    },
                    slots: ['🍇', '🍊', '🍋', '🍌']
                });

                Game.startGame();
                Game.on('gameOver', result => {
                });
            } 
            break;
        }
    }
    
}