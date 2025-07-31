import {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {formatSize} from "~/lib/utils";


const FileUploader = ({onFileSelect}: FileUploaderProps) => {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;

        onFileSelect?.(file);
    }, [onFileSelect])

    const maxFileSize = 20 * 1024 * 1024;

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf'] },
        maxSize: 20 * 1024 * 1024 // 20 MB
    })

    const file = acceptedFiles[0] || null;

    return (
        <div className="w-full gradient-border ">
            <div {...getRootProps()}>
                <input {...getInputProps()} />

               <div className="space-y-4 cursor-pointer">
                   <div className="mx-auto w-16 h-16 flex items-center justify-center">
                       <img src="/icons/info.svg" alt="upload" className="size-20"/>
                   </div>

                   {file ? (
                       <div className="text-center">
                           <p className="text-lg text-gray-700 font-medium truncate">
                               {file.name}
                           </p>
                           <p className="text-sm text-gray-500">
                               {formatSize(file.size)}
                           </p>
                       </div>
                   ): (
                       <div>
                           <p className="text-lg text-gray-500">
                               <span className="font-semibold ">
                                   Click to upload
                               </span> or drag and drop
                           </p>
                           <p className="text-lg text-gray-500">PDF (max {formatSize(maxFileSize)}</p>
                       </div>
                   )}
               </div>
            </div>
        </div>
    )
}
export default FileUploader
