"use client";
import { cn } from "@/lib/utils";
import type { FC } from "react";
import { Accept, useDropzone } from "react-dropzone";

interface FileDropzoneProps {
    files: File[]; // Change this to an array of Files
    setFiles: (files: File[]) => void; // Update this to accept an array of Files
    acceptedFileTypes?: Accept;
    children: React.ReactNode;
    className?: string;
}

const FileDropzone: FC<FileDropzoneProps> = ({ files, setFiles, acceptedFileTypes, children, className }) => {
    const onDrop = (acceptedFiles: File[]) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setFiles((prevFiles: File[]) => [...prevFiles, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: acceptedFileTypes, multiple: true });

    return (
        <div className={cn(isDragActive && "bg-muted", className)} {...getRootProps()}>
            <input {...getInputProps()} />
            {children}
        </div>
    );
};

export default FileDropzone;
