import { Fragment, useEffect, useState } from "react"
import { User, GroupDepartment as GroupDepartmentType, DepartmentData, Frequency } from './types'
import './styles.css'

const findMode = (arr: number[]) => {
  const frequency: Frequency = {}
  let maxFrequency = 0
  let modes: number[] = []

  for (const num of arr) {
    frequency[num] = (frequency[num] || 0) + 1
    if (frequency[num] > maxFrequency) {
      maxFrequency = frequency[num]
      modes = [num]
    } else if (frequency[num] === maxFrequency) {
      modes.push(num)
    }
  }

  return (modes.length === 1 || modes.length === 2) ? modes.join(', ') : 'no Mode'
}

const GroupDepartment = () => {
  const [departments, setDepartments] = useState<DepartmentData[]>([])

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://dummyjson.com/users')
        const data = await res.json()
        const users: User[] = data.users
        const groupDepartment: GroupDepartmentType = {} as GroupDepartmentType

        users?.forEach((user) => {
          const { company: { department }, hair, firstName, lastName, address: { postalCode }, age, gender } = user
          const { color: hairName } = hair

          if (!groupDepartment[department]) { // initial department
            groupDepartment[department] = {
              male: gender === 'male' ? 1 : 0,
              female: gender === 'female' ? 1 : 0,
              hairs: { [hairName]: 1 },
              addressUser: { [`${firstName}${lastName}`]: postalCode },
              ages: [age],
            }
          } else {
            const { hairs: hairs } = groupDepartment[department]
            groupDepartment[department] = {
              ...groupDepartment[department],
              [gender]: groupDepartment[department][gender] + 1,
              hairs: { ...hairs, [hairName]: (hairs[hairName] || 0) + 1 },
              ages: [...groupDepartment[department].ages, age],
              addressUser: { ...groupDepartment[department].addressUser, [`${firstName}${lastName}`]: postalCode },
            }
          }
        })

        const departments: DepartmentData[] = Object.entries(groupDepartment).map(([departmentName, departmentValue]) => {
          const sortAge = departmentValue.ages.sort((a, b) => a - b)
          const ageMode = findMode(departmentValue.ages)
          const { male, female, hairs, addressUser } = departmentValue

          return {
            [departmentName]: {
              male,
              female,
              ageRange: `${sortAge[0]}-${sortAge[sortAge.length - 1]}`,
              ageMode,
              hairs,
              addressUser,
            }
          }
        })
        setDepartments(departments)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  if (departments.length === 0) return (<h1>Loading...</h1>)

  return (
    <div className="group-department-container">
      <h3>DEPARTMENT</h3>
      {departments.map((department, index) =>
        <div key={index}>
          {Object.entries(department).map(([departmentName, departmentValue], indexDepartment) =>
            <div key={indexDepartment}>
              <div>{`${index + 1}. ${departmentName}`}</div>
              <ul>
                {Object.entries(departmentValue).map(([key, value], index) =>
                  <Fragment key={index}>
                    {
                      (typeof value !== 'object')
                        ?
                        <li>{`${key}: ${value}`}</li>
                        :
                        <Fragment>
                          <li>{key}</li>
                          <ul>{Object.entries(value).map(([k, v], index) => <li key={index}>{`${k}: ${v}`}</li>)}</ul>
                        </Fragment>
                    }
                  </Fragment>
                )}
              </ul>
            </div>
          )}
          <hr />
        </div>
      )}
    </div>
  )
}

export default GroupDepartment
