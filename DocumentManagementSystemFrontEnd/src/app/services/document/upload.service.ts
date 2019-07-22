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

// @Injectable({
//   providedIn: "root"
// })

@Injectable()
export class UploadService {
  fileData: File = null;
  private httpClient: HttpClient;

  // I initialize the upload service.
  constructor(httpClient: HttpClient) {
    debugger;
    this.httpClient = httpClient;
  }

  onSubmit() {
    const formData = new FormData();
    formData.append("file", this.fileData);
    this.httpClient
      .post("http://localhost:1640/api/document/", formData)
      .subscribe(res => {
        console.log(res);
        alert("SUCCESS !!");
      });
  }
  // ---
  // PUBLIC METHODS.
  // ---

  // I upload the given file to the remote server. Returns a Promise.
  //public async uploadFile(file: File) {}

  //   postMethod(files: FileList) {
  // 	this.fileToUpload = files.item(0);
  // 	let formData = new FormData();
  // 	formData.append('file', this.fileToUpload, this.fileToUpload.name);
  // 	this.http.post(“Your end-point URL”, formData).subscribe((val) => {

  // 	console.log(val);
  // 	});
  // 	return false;
  // 	}

  public getAllFiles() {
    return this.httpClient.get("http://localhost:1640/api/document/getAll");
  }
  public downloadFile(fileId) {
    return this.httpClient.get(
      "http://localhost:1640/api/document/download/" + fileId,
      { responseType: "blob" }
    );
  }
  public async uploadFile(file: File): Promise<UploadResult> {
    debugger;
    try {
      const formData = new FormData();
      // formData.append("file", this.fileData);
      formData.append("file", file, file.name);
      var body = {
        formData: formData
      };
      var headers = new HttpHeaders({ admin: "1", userName: "Hend" });

      this.httpClient
        .post("http://localhost:1640/api/document/", formData, {
          headers: headers
        }) //formData
        .subscribe(
          res => {
            console.log(res);
            alert("SUCCESS !!");
          },
          error => console.error(error)
        );

      // var result = await this.httpClient
      //   .post<ApiUploadResult>(
      //     "http://localhost:1640/api/document/",
      //     // "./api/upload.cfm",
      //     file, // Send the File Blob as the POST body.
      //     {
      //       // NOTE: Because we are posting a Blob (File is a specialized Blob
      //       // object) as the POST body, we have to include the Content-Type
      //       // header. If we don't, the server will try to parse the body as
      //       // plain text.
      //       headers: {
      //         "Content-Type": file.type
      //       },
      //       params: {
      //         clientFilename: file.name,
      //         mimeType: file.type
      //       }
      //     }
      //   )
      //   .toPromise();

      return {
        name: file.name,
        type: file.type,
        size: file.size,
        url: "" //result.url
      };
    } catch (error) {
      debugger;
      console.log(error.ExceptionMessage);
    }
  }
}
