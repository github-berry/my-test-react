export type User = {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: 'male' | 'female'
  email: string
  phone: string
  username: string
  password: string
  birthDate: string
  image: string
  bloodGroup: string
  height: number
  weight: number
  eyeColor: string
  hair: {
    color: string
    type: string
  }
  domain: string
  ip: string
  address: {
    address: string
    city: string
    coordinates: {
      lat: number
      lng: number
    }
    postalCode: string
    state: string
  }
  macAddress: string
  university: string
  bank: {
    cardExpire: string
    cardNumber: string
    cardType: string
    currency: string
    iban: string
  }
  company: {
    address: {
      address: string
      city: string
      coordinates: {
        lat: number
        lng: number
      }
      postalCode: string
      state: string
    }
    department: string
    name: string
    title: string
  }
  ein: string
  ssn: string
  userAgent: string
}

export type GroupDepartment = {
  [departmentName: string]: {
    female: number
    male: number
    hairs: {
      [hairColor: string]: number
    }
    addressUser: {
      [fullName: string]: string
    }
    ages: number[]
  }
}


export type DepartmentData = {
  [departmentName: string]: {
    male: number
    female: number
    ageRange: string
    ageMode: string
    hairs: {
      [hairColor: string]: number
    }
    addressUser: {
      [userName: string]: string
    }
  }
}

export type Frequency = {
  [key: number]: number
}
