import { useRef } from "react";
import { useDispatch } from "react-redux";
// import { profileActions } from "@/store/store";
import { profileActions } from "../../../store/store";
import { Loader } from "rizzui";
// import { uploadFileToFirebase } from "@/lib/upload-image-to-firebase";
import { uploadFileToFirebase } from "../../../lib/upload-image-to-firebase";
// import { uploadFileToFirebase } from "@/lib/upload-image-to-firebase";
export default function ImagePicker({
  multiple,
  onuploading,
  children,
  getImageUrl,
}: {
  multiple?: boolean;
  children?: any;
  onuploading: any;

  getImageUrl: (url: any) => void;
}) {
  const dispatcher = useDispatch();
  const handleImage = async (e: any) => {
    try {
      dispatcher(profileActions.toggleImageUpload());
      onuploading();
      const fileUrl = await uploadFileToFirebase(e.target.files[0]);
      onuploading();
      dispatcher(profileActions.toggleImageUpload());
      getImageUrl(fileUrl);
    } catch (error) {
      console.error("Failed to upload and retrieve image URL:", error);
    }
  };
  const fileInputRef: any = useRef();
  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/png, image/jpeg"
        onChange={handleImage}
        multiple={multiple}
      />
      <div className="space-y-4">
        {children}

        <button
          type="button"
          className="text-blue-900 text-sm"
          onClick={() => fileInputRef.current?.click()}
        >
          upload image
        </button>
      </div>
    </>
  );
}
