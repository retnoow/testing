import 'bootstrap/dist/css/bootstrap.min.css';
import PlayerList from './components/PlayerList';
import PlayerForm from './components/PlayerForm';
import {useState} from 'react'
function App() {
  let defaultPlayerData = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@app.com',
      password: 'admin',
      exp: 10
    },
    {
      id: 2,
      username: 'player1',
      email: 'player1@app.com',
      password: 'player1',
      exp: 10
    },
    {
      id: 3,
      username: 'player2',
      email: 'player2@app.com',
      password: 'player2',
      exp: 10
    },
  ]

  const [Players, setPlayers] = useState(defaultPlayerData)
  const [PlayerEdit, setPlayerEdit] = useState('')
  const [Keyword, setKeyword] = useState('')

  const addPlayer = (newPlayer) => {
    newPlayer.id = Math.max(...Players.map(player => player.id))+1
    setPlayers(Players => [...Players, newPlayer])
  }

  const selectEdit = (playerId) => {
    let player = Players.filter(player => player.id === playerId)
    console.log(player[0])
    setPlayerEdit(player[0])
  }

  const performEdit = (player) => {
    console.log(`going to edit player with username ${player.username}`)
    const indexToEdit = Players.findIndex(item => item.id === player.id)
    console.log(`the player index to be edited is ${indexToEdit}`)
    
    let copyPlayers = [...Players]
    copyPlayers[indexToEdit] = player

    setPlayers(copyPlayers)
  }

  const cancelEdit = () => {
    setPlayerEdit('')
  }

  const filteredPlayerData = () => {
    return Players.filter(player => new RegExp(Keyword, 'g').test(player.username) ||
    new RegExp(Keyword, 'g').test(player.email) ||
    new RegExp(Keyword, 'g').test(player.exp))
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row" >
          <div className="col-8 ">
            <div className="d-flex align-items-center justify-content-between">
              <h2>Data Player</h2>  
              <input type="text" className="form-control"  placeholder= "type something to search..." onChange={(e) => setKeyword(e.target.value)} value={Keyword} />
            </div>
            <PlayerList players={filteredPlayerData()} selectEdit={selectEdit} />
            
          </div>
          <div className="col-4 border p-4">
            <h2>Form Player</h2>
            <PlayerForm handleCreate={addPlayer} playerEdit={PlayerEdit} cancelEdit={cancelEdit} performEdit={performEdit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
