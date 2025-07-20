import { Input } from "./input"
import { Label } from "./label"

interface FileUploadProps {
  label: string
  required?: boolean
  accept?: string
  multiple?: boolean
}

export function FileUpload({ label, required, accept, multiple }: FileUploadProps) {
  return (
    <div>
      <Label className="mb-2">
        {label}
        {required && " *"}
      </Label>
      <Input 
        type="file" 
        required={required}
        accept={accept}
        multiple={multiple}
        className="cursor-pointer"
      />
    </div>
  )
}
