import React ,{ useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "../ui/button";

const FileUploader = () => {
    const [file ,setFile]=useState([]);
    const [fileUrl, setfileUrl] = useState(' ');

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles);
      }, [])
      const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept:{'image/*':['.png','.jpeg','.jpg','.svg']}
    })

  return (
     <div {...getRootProps()} className="flex flex-center flex-col bg-[#101012] rounded-xl cursor-pointer">
      <input {...getInputProps()} className="cursor-pointer"/>

      {
        fileUrl ?(
            <div>
            </div>

        ):(
            <div className="flex-center flex-col p-7 h-80 lg:h-[612px]">
                <img src="/assets/icons/file-upload.svg" width={96} height={77}/>

                <h3 className="text-[16px] font-medium leading-[140%] text-font-black mt-6"> Drag photo here</h3>

                <p className="text-[#000000] text-[14px] font-normal leading-[140%] mb-6">SVG, PNG ,JPG</p>

                <Button className="h-12 bg-[#1F1F22] px-5 text-[#000000] flex gap-2 !important"> Select image</Button>
            </div>
        )

      }
    </div>
  )
}

export default FileUploader
