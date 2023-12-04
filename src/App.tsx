import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import TodoList from './pages/todo-list/TodoList'
import GroupDepartment from './pages/department/Department'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/todo-list' element={<TodoList />} />
        <Route path='/department' element={<GroupDepartment />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
