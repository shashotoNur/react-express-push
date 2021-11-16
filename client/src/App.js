import './App.css';
import getNotification from './subscription';

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <button onClick={ getNotification }>Get a notification</button>
            </header>
        </div>
    );
}

export default App;