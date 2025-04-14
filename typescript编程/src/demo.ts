const mockData=[
    {
        "list":[
            {
                "index_name":"科室",
                "index_value":'口腔科'
            },
            {
                "index_name":"数量",
                "index_value":15
            },
            {
                "index_name":"比例",
                "index_value":66.67
            },

        ]
    },

]
mockData.forEach(item=>{
    item.list.forEach((item1)=>{
        item[item1.index_name]=item1.index_value
    })

})

beginDate=:startDate&endDate=:endDate&hospitalCode=:hospitalCode&districtCode=:districtCode&topic='首台概况'

console.log("mockData",mockData)
