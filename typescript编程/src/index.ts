
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
type FriendListNew=APIResponse['user']['friendList']

type SingleFriend=APIResponse['user']['friendList']['friends'][number]

//这样就不用做下面的操作了
type FriendList = {
    count: number,
    friends: {
        firstName: string,
        lastName: string,
    }
}[]


