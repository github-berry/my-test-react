import { useNavigate } from "react-router-dom"
import './styles.css'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <div className="button-container">
        <button onClick={() => navigate('todo-list')}>Todo List</button>
        <button onClick={() => navigate('department')}>Department</button>
      </div>
    </div>

  )
}

export default Home
