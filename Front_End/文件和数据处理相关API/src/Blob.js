const createNewBlob=async ()=>{
    const blob = new Blob(["hello world"], {type: "text/plain"});
    console.log("blob",blob)

    const file=new File(['123'],'file.txt',{type:'text/plain'})
    console.log("file",file)


    // console.log(await blob.arrayBuffer())
    // console.log(await file.arrayBuffer())


    // const fileReader=new FileReader()
    //
    // fileReader.onload=(e)=>{
    //
    //     console.log(fileReader.result)
    //     console.log(e.target.result)
    // }
    // fileReader.readAsArrayBuffer(file)

    const dv=new DataView(await file.arrayBuffer())

    console.log(dv.getInt8(0))
    console.log(dv)


}
createNewBlob()
