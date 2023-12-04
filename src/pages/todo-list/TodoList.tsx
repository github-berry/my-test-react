import { Fragment, useEffect, useRef, useState } from 'react'
import './styles.css'
type TodoListType = {
  type: string;
  name: string;
}

type Group = {
  [key: string]: string[]
}

type Timeout = ReturnType<typeof setTimeout>

let timer: Timeout;
let todoListData: TodoListType[] = [
  {
    type: "Fruit",
    name: "Apple",
  },
  {
    type: "Vegetable",
    name: "Broccoli",
  },
  {
    type: "Vegetable",
    name: "Mushroom",
  },
  {
    type: "Fruit",
    name: "Banana",
  },
  {
    type: "Vegetable",
    name: "Tomato",
  },
  {
    type: "Fruit",
    name: "Orange",
  },
  {
    type: "Fruit",
    name: "Mango",
  },
  {
    type: "Fruit",
    name: "Pineapple",
  },
  {
    type: "Vegetable",
    name: "Cucumber",
  },
  {
    type: "Fruit",
    name: "Watermelon",
  },
  {
    type: "Vegetable",
    name: "Carrot",
  },
  // {
  //   type: "Water",
  //   name: "Pepsi"
  // },
  // {
  //   type: "Water",
  //   name: "Coke"
  // },
  // {
  //   type: "Water",
  //   name: "Sprite"
  // },
  // {
  //   type: "Water",
  //   name: "Fanta"
  // }
]

const TodoList = () => {
  const inputName = useRef<HTMLInputElement>(null)
  const [groupTypes, setGroupTypes] = useState<Group>({}) // { Fruit: [], Vegetable: [] }

  useEffect(() => {
    const initGroupType: Group = {} // type have more than 2

    todoListData.forEach((item) => {
      if (!initGroupType[item.type]) {
        initGroupType[item.type] = []
      }
    })

    setGroupTypes(initGroupType)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const addTextToInput = (item: TodoListType) => {
    inputName.current!.value = item.name
  }

  const addItem = () => {
    const value = inputName.current?.value
    const item = todoListData.find((item) => item.name.toLowerCase() === value?.toLowerCase())

    if (!item) {
      console.log(item);
      alert('ไม่มีพอข้อมูล')
      return;
    }

    setGroupTypes((prev) => {
      const newGroups = { ...prev }
      newGroups[item.type] = [...prev[item.type], item.name]
      return newGroups
    })

    // deleted item from left sideItem
    const newTodoList: TodoListType[] = todoListData.filter((item) => item.name.toLowerCase() !== value?.toLowerCase())
    todoListData = newTodoList
    inputName.current!.value = ''

    // after 5s deleted item from groups.type
    timer = setTimeout(() => {
      setGroupTypes((prev) => {
        const newGroups = { ...prev }
        newGroups[item.type] = prev[item.type].filter((name) => name.toLowerCase() !== value?.toLowerCase())
        return newGroups
      })

      // add item to sidebar
      todoListData = [...todoListData, item]
    }, 5000)
  }

  return (
    <Fragment>
      <h3>To-Do LIST</h3>
      <div className="input-container">
        <input type="text" ref={inputName} placeholder="กรอกข้อมูล" onKeyDown={(e) => e.key === 'Enter' && addItem()} />
        <button onClick={addItem}>Add</button>
      </div>
      <br />
      <div className="todo-list-container">
        <ul>
          {todoListData.map((item, index) => (
            <li key={index}>
              <button onClick={() => addTextToInput(item)}>{item.name}</button>
            </li>
          ))}
        </ul>
        <div className="type-container">
          {Object.entries(groupTypes).map(([key, value]) => (
            <div key={key}>
              <div className="type-name">{key}</div>
              <div className="type-box">
                {value.map((name, index) => <p key={index}>{name}</p>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  )
}

export default TodoList
