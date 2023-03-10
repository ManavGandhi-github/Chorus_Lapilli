import React from 'react'
import Board from './Board'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: Array(9).fill(null),
            x_next: true,
            x_count: 0,
            o_count: 0, 
            source_index: -1,
            destination_index: -1,
        }
    }
    findWinner(squares) {
        const lines = [
            [0, 1, 2], 
            [3, 4, 5], 
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        let current_board = [...squares]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (current_board[a] === current_board[b] && current_board[b] === current_board[c]) {
                return current_board[a];
            }
        }
        return null;
    }
    handleClick(index) {
        if (this.state.source_index !== -1)
            return;

        if (this.findWinner(this.state.squares) || this.state.squares[index]) {
            return;
        }
        let new_squares = this.state.squares.slice();
        let new_x_count = this.state.x_count;
        let new_o_count = this.state.o_count;
        if (this.state.x_next && this.state.x_count < 3) {
            new_squares[index] = 'X';
            new_x_count += 1;
        } else if (!this.state.x_next && this.state.o_count < 3) {
            new_squares[index] = 'O';
            new_o_count += 1;
        } else {
            return;
        }
        this.setState({
            squares: new_squares,
            x_next: !this.state.x_next,
            x_count: new_x_count,
            o_count: new_o_count,
            source_index: -1,
            destination_index: -1,
        })
    }
    chooseStart(index) {
        if (this.state.source_index !== -1)
            return;
        if (this.state.x_count < 3 || this.state.o_count < 3)
            return;
        if (this.state.squares[index] === null)
            return;
        if (this.state.squares[index] === 'X' && !this.state.x_next) {
            return;
        }
        if (this.state.squares[index] === 'O' && this.state.x_next)
            return;
        if (this.findWinner(this.state.squares))
            return;
        let new_state = Object.assign({}, this.state)
        new_state.source_index = index;
        this.setState(new_state)
        
    }
    isFinalNeighbor(start, final) {
        
        if (start - 4 === final && (start === 4 || start === 5 || start === 7 || start === 8))
            return true;
    
        
        if (start + 2 === final && (start === 1 || start === 2 || start === 4 || start === 5))
            return true;
                
        
        if (start - 2 === final && (start === 3 || start === 4 || start === 6 || start === 7))
            return true;
 
        
        if (start + 4 === final && (start === 0 || start === 1 || start === 3 || start === 4))
            return true;

        
        if (start - 1 === final && final >= 0 && final !== 2 && final !== 5)
            return true;

        
        if (start + 3 === final && final < 9)
            return true;
        
        
        if (start - 3 === final && final >= 0)
            return true;

        
        if (start + 1 === final && final < 9 && final !== 3 && final !== 6)
            return true;
            
        return false;
    }

    selectFinal(index) {
        
        if (this.state.source_index === -1)
            return; 
        
        
        if (this.state.source_index === index || this.state.squares[index] !== null || !this.isFinalNeighbor(this.state.source_index, index)) {
            this.setState({
                squares: this.state.squares,
                x_next: this.state.x_next,
                x_count: this.state.x_count,
                o_count: this.state.o_count,
                source_index: -1,
                destination_index: -1,
            })
            return;
        }

        // the game finished already
        if (this.findWinner(this.state.squares)) 
            return;

        
        let current_player = (this.state.x_next ? 'X' : 'O')
        let valid_move = true; 
        if (this.state.squares[4] === current_player) {
            valid_move = false;
            
            if (this.state.source_index === 4) {
               
                valid_move = true;
            } else {
                
                let possible_squares = this.state.squares.slice();
                possible_squares[index] = current_player;
                possible_squares[this.state.source_index] = null;
                if (this.findWinner(possible_squares) === current_player)
                    valid_move = true;
            }
        }
        if (!valid_move) {
            this.setState({
                squares: this.state.squares,
                x_next: this.state.x_next,
                x_count: this.state.x_count,
                o_count: this.state.o_count,
                source_index: -1,
                destination_index: -1,
            })
            return;
        }
        let new_squares = this.state.squares.slice();
        new_squares[index] = this.state.squares[this.state.source_index];
        new_squares[this.state.source_index] = null;
        this.setState({
            squares: new_squares,
            x_next: !this.state.x_next,
            x_count: this.state.x_count,
            o_count: this.state.o_count,
            source_index: -1,
            destination_index: -1,
        })
    }
    render() {
        let status = 'Next turn: ' + (this.state.x_next ? 'X' : 'O');
        let winner = this.findWinner(this.state.squares);
        if (winner)
            status = 'Winner: ' + winner;
        return (
            <div class="game-information">
                <div className="status">{status}</div>
                <div className="game-board">
                    <Board 
                        onClick={(index) => {
                            this.handleClick(index)
                            this.selectFinal(index)
                            this.chooseStart(index)
                        }}
                        squares={this.state.squares}
                        source_index={this.state.source_index}
                    />
                </div>
            </div>
        );
    }
}

export default App;
