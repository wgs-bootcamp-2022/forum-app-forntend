import http from "./http_common";

class FileUploadService {
    upload(file, onUploadProgress,subForumId ) {
      let formData = new FormData();
  
      formData.append("file", file);
  
      return http.post(`/forum/subforum/image/add?subForumId=${subForumId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      });
    }
  
    getFiles() {
      return http.get("/files");
    }
  }
  
  export default new FileUploadService();