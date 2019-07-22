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
  //Upload Unauthorized User Files
  public async uploadUnauthorizedUserFiles(file: File): Promise<UploadResult> {
    var headers = new HttpHeaders({
      admin: "0",
      userName: "Unauthorized User Hend"
    });
    return this.uploadFiles(file, headers);
  }
  //Authorized User
  public async uploadFileByAuthorizedUser(file: File): Promise<UploadResult> {
    var headers = new HttpHeaders({ admin: "1", userName: "Hend" });
    return this.uploadFiles(file, headers);
  }

  public async uploadFiles(
    file: File,
    headers: HttpHeaders
  ): Promise<UploadResult> {
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      var body = {
        formData: formData
      };
      // var headers = new HttpHeaders({ admin: "1", userName: "Hend" });

      this.httpClient
        .post("http://localhost:2055/api/document/", formData, {
          headers: headers
        })
        .subscribe(
          res => {
            alert("SUCCESS !!");
          },
          error => {
            if (error.status == 401) alert("Unauthorized User");
            else {
              alert(error.statusText);
            }
          }
        );

      return {
        name: file.name,
        type: file.type,
        size: file.size,
        url: ""
      };
    } catch (error) {
      console.log(error.ExceptionMessage);
    }
  }
}
