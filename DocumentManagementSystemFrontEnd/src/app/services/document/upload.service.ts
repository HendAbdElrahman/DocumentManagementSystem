import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// Import the core angular services.
// import { HttpClient } from "@angular/common/http";
// import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface ApiUploadResult {
  url: string;
}

export interface UploadResult {
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface UploadFileResult {
  UploadDate: Date;
  LastAccessedDate: Date;
  LastAccessedUser: string;
  FileSize: number;
  FileName: string;
  FilePhysicalName: string;
  ID: number;
}

@Injectable()
export class UploadService {
  fileData: File = null;
  private httpClient: HttpClient;

  // I initialize the upload service.
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  onSubmit() {
    const formData = new FormData();
    formData.append("file", this.fileData);
    this.httpClient
      .post("http://localhost:2055/api/document/", formData)
      .subscribe(res => {
        console.log(res);
        alert("SUCCESS !!");
      });
  }

  public getAllFiles() {
    return this.httpClient.get("http://localhost:2055/api/document/getAll");
  }
  public downloadFile(fileId) {
    return this.httpClient.get(
      "http://localhost:2055/api/document/download/" + fileId,
      { responseType: "blob" }
    );
  }
  public async uploadFile(file: File): Promise<UploadResult> {
    try {
      const formData = new FormData();
      // formData.append("file", this.fileData);
      formData.append("file", file, file.name);
      var body = {
        formData: formData
      };
      var headers = new HttpHeaders({ admin: "1", userName: "Hend" });

      this.httpClient
        .post("http://localhost:2055/api/document/", formData, {
          headers: headers
        })
        .subscribe(
          res => {
            console.log(res);
            alert("SUCCESS !!");
          },
          error => console.error(error)
        );

      return {
        name: file.name,
        type: file.type,
        size: file.size,
        url: "" //result.url
      };
    } catch (error) {
      console.log(error.ExceptionMessage);
    }
  }
}
