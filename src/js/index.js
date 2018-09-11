import '../scss/index.scss';
import '../index.html';

import Gameboard from './gameboard';
import { Player, ComputerPlayer } from './players';

import { createBoards } from './ui';

const human = new Player('Sava');
const computer = new ComputerPlayer('computer');

const humanBoard = new Gameboard();
const computerBoard = new Gameboard();

createBoards(human, humanBoard, computer, computerBoard);