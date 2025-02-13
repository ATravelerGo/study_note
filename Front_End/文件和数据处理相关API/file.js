const file = new File(['Hello'], 'hello.txt', {
    type: 'text/plain',
})

const blob = file.slice(0, 2).text().then((data) => {
    console.log("data", data)
})
