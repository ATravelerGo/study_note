
type APIResponse = {
    user: {
        userId: string,
        friendList:{
            count: number,
            friends: {
                firstName: string,
                lastName: string,
            }[]
        }
    }
}

//我们使用键入
type FriendListNew=APIResponse['user']['friendList']['friends']

type SingleFriend=APIResponse['user']['friendList']['friends'][number]

//这样就不用做下面的操作了
type FriendList = {
    count: number,
    friends: {
        firstName: string,
        lastName: string,
    }
}[]

type ResponseKeys=keyof APIResponse

const a :ResponseKeys='user'


type User ={
    name:string,
    age:number,
    sex:boolean
}

type U=keyof User  //  "name" | "age" | "sex"


type Weekday='Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
type Day=Weekday | 'Sat' | 'Sun'

const nextDay:Record<Weekday, Day>={
    Mon:"Thu"
}

const nextDayNew:{[key in Weekday]:Day}={
    Tue:"Mon"
}

type Account={
    id:number,
    isEmployee:boolean,
}

type OptionalAccount={
    [key in keyof Account]?: Account[key]
}


type A= number | string
type B=string
type C =Extract<A, B>  //string

type D ={a?:string | null}
type F =NonNullable<D['a']> // string


