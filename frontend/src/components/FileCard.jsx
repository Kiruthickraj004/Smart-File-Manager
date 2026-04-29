
function FileCard({file, onDelete}){
    return (
        <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white">
            <p className="font-semibold truncate">{file.name}</p>
            <p className="text-sm text-gray-500">{file.type}</p>
            <p className="text-sm text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
            <button  className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={()=>{onDelete(file.id)}}>Delete</button>
        </div>
    )
}

export default FileCard;