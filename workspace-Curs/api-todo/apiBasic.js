
 // Aplicaion manejador de listado de tareas
/*
 const todos = [];// Creamos un array vacio para que se vayan cargando los valores del value
 
   const form = document.getElementById('todo-form');// Tomamos el formulario y obtemos la referencia (document.getElementBy)
   form.onsubmit = (e) => { //reemplazamos la funcion que tenia en onsubmit 
  	e.preventDefault();// Detiene el comportamiento de que tienen los formularios (actualizar todo el tiempo)
  	const todo = document.getElementById('todo');
  	const todoText = todo.value;// Sacamos el valor que tiene todo.value
  	todo.value = '';// Lo reemplazamos
    todos.push(todoText);//Epujamos los nuevos valores al array vacio que se encuentra en todos[]
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    for (var i = 0; i < todos.length; i++) 
    {
      todoList.innerHTML += '<li>' + todos[i] + '</li>';
    } 
 }*/

 // SIMPLIFICAR EL PRIMER CODIGO USANDO MAP
// MAp devuelve el valor que le pasamos a un nuevo array
//const todos = [];// Creamos un array vacio para que se vayan cargando los valores del value
 //Para trnsformar al localStorage en un arreglo utilizamos JSON.parse
 const todos = JSON.parse(localStorage.getItem('todos')) || [];
 //Crear la funcion renderizar 
const render = () => {
  const todoList = document.getElementById('todo-list');
  //Reemplazamos con map al for del codigo anterior
  const todosTemplate = todos.map(t => '<li>' + t + '</li>'); 
  //join junta todos los elementos en un strig vacio y eso va apermitir concatenarlos   
  todoList.innerHTML = todosTemplate.join('');
  const elementos = document.querySelectorAll('#todo-list li')
  //Con 'li' Le indicamos a querySelectorAll que queremos los elementos que se encuentran dentro de un Id 'todo-list'
  //Recorremos uno por uno los elementos con el forEach
  elementos.forEach((element, i) => {
  //Agregamos evevntos
  //(querySelectorAll)devuelve una NodeList estática (no viva) que representa una lista de elementos del documento que coinciden con el grupo de selectores indicados.
    element.addEventListener('click', () => {
     //Para que se actualicen los cambios al removerlos devemos llamar nuevamente a la funcion render
      element.parentNode.removeChild(element)
      todos.splice(i, 1)
      actualizarTodos(todos)
      //Cuando una funcion se llama asi misma se conoce como RECURSIVIDAD
      render()
     });
   });
 }
 // Reemplazamos todo los 'todos' del primer elemento por todoStrings
 // Y ya nos van a figurar los elementos eliminados
 const actualizarTodos = (todos) => {
   const todoStrings = JSON.stringify(todos)
   localStorage.setItem('todos', todoStrings)
 }

window.onload = () =>{
 render()
 const form = document.getElementById('todo-form');// Tomamos el formulario y obtemos la referencia (document.getElementBy)
  form.onsubmit = (e) => { //reemplazamos la funcion que tenia en onsubmit 
  e.preventDefault();// Detiene el comportamiento de que tienen los formularios (actualizar todo el tiempo)
  const todo = document.getElementById('todo');
  const todoText = todo.value;// Sacamos el valor que tiene todo.value
  todo.value = '';// Lo reemplazamos
  todos.push(todoText);//Epujamos los nuevos valores al array vacio que se encuentra en todos[]
 
  actualizarTodos(todos)
  render()
 }
}
 
 
//localStorage.setItem('pepe', 'canchita')

//localStorage.getItem('pepe')//Deve devolver 'canchita'
// 'canchita'
//El método setItem() de la interfaz Storage, cuando reciba una clave y un valor, añadirá estos al almacén, o actualizará el valor si la clave ya existe.

//El método getItem() de la interfaz Storage devuelve el valor de la clave cuyo nombre se le pasa por parámetro.
