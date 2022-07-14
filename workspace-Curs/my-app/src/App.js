
import { Component } from 'react'

class Input extends Component {
  render() {
    return (
       <input 
        value={this.props.value}
        onChange={this.props.onChange}
       />
      )
   }
}
class App extends Component {
   state ={
    nombre: '',
    apellido: '',
   }
   
    updateValues = (prop, value) => {
    this.setState({ [prop]: value })
   }
   render() {
    return (
       <p>
         Nombre completo: {`${this.state.nombre} ${this.state.apellido}`}
         <Input 
           value={this.state.nombre}
           onChange={e => this.updateValues('nombre', e.target.value)}
         />
         <Input 
           value={this.state.apellido}
           onChange={e => this.updateValues('apellido', e.target.value)}
         />
       </p>
      )
   }
}


export default App


//
/**
class Button extends Component {
  //state {}
  constructor (props) {
    super(props)
    console.log('constructor', props)
  }
   
  componentDidMount() {
    console.log('ComponentDidMount')
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('component did update', prevProps, prevState)
  }
  
  componentWillUnmount() {
    console.log('desmontando componente', this.props, this.state);
  }

  render() {
    console.log('ejecutando metodo render de button');
    return(
       <button onClick={() => this.setState({ prop: 1 })}>
          Enviar
       </button>
     )
  }
}

class App extends Component { 
  state = {
  	valor: 3
  }
  render() {
  	console.log(this.state)
  	return (
      <div> 
        <p>Hola mundo</p>
        {this.state.valor === 3
          ? <Button perrito='infeliz'/>
          : null}
        <button 
          className={`${this.state.valor}`}
          onClick={() => this.setState({ valor: 2})}

         > 
          Enviar en App
        </button>
      </div> 
  	)
  }
}
 
export default App
*/

//
/**
import Button from './Button'

const arr = [
  'Feliz',
  'triste',
  'emocionado',
]

const App = () => {
	const miVariable = false
	
	if (miVariable) 
	{
		return <p>Mi variable dio true!</p>
	}
	return (
		<div>
         <h1 onClick={(e) => console.log('click', e)}>Hola mundo</h1>
	       {arr.map(el => <p key={el}>{el}</p>)}
	       <Button onClick={() => console.log('clickeado')}>
	         Enviar
	       </Button>
        </div>
)}

*/