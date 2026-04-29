import { useEffect,useState } from "react";
import api from "../services/api";
import FileCard from "../components/FileCard";

function Dashboard(){
    const [files,setFiles] = useState([]);
    useEffect(()=>{
    fetchFiles();
},[]);

const fetchFiles = async() =>{
    try{
        const res = await api.get('/files')
        setFiles(res.data)
    }
    catch(err){
        console.log(err)
    }
}

const handleUpload = async(e) => {
    const file = e.target.files[0]

    const formData = new FormData()
    formData.append("file",file)

    try {
    await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setFileProgress(percent);
        setUploadingFile(file.name)
      },
    });

    setFileProgress(0);
    setUploadingFile("");
    fetchFiles();
  }catch(err){
        console.log(err)
    }
}

const handleDelete = async(id) => {
    await api.delete(`/files/${id}`)
    fetchFiles()
}

const [fileProgress, setFileProgress] = useState(0);
const [uploadingFile, setUploadingFile] = useState("")

return (
    <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">File Manager</h1>
        
        <input className="mb-4 block" type="file" onChange={handleUpload} />
        {fileProgress > 0 && (
            <div className="w-full bg-gray-200 rounded h-4 mt-2">
                <div className="bg-blue-500 h-4 rounded text-xs text-white flex items-center justify-center" style={{ width: `${fileProgress}%` }}>
                    {fileProgress}%
                </div>
            </div>
        )}

        {uploadingFile && (
                <p className="text-sm text-gray-600 mt-2">
                   file Uploading: {uploadingFile}
                </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {
            files.map((file) => (
                <FileCard key={file.id} file={file} onDelete={handleDelete} />
            ))
        }
        </div>
    </div>
)
    
}
export default Dashboard;


