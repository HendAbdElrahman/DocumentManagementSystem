import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { RouterModule, Routes, Router, ActivatedRoute } from "@angular/router";
import { Http, ResponseContentType } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { saveFile, saveAs } from "file-saver";

// // Services
// import { ValidationService } from "../../../services/config/config.service";
// import { StudentService } from "../../../services/student/student.service";
// import { routerTransition } from "../../../services/config/config.service";

import { ToastrService } from "ngx-toastr";
import { UploadResult } from "src/app/services/document/upload.service";
import { UploadService } from "src/app/services/document/upload.service";
import { Subject } from "rxjs";
@Component({
  selector: "app-document-upload",
  templateUrl: "././document-upload.component.html",
  styleUrls: ["./document-upload.component.css"]
})
export class DocumentUploadComponent implements OnInit {
  public uploads: UploadResult[];
  public data: any[];

  private uploadService: UploadService;
  private ngUnsubscribe: Subject<any> = new Subject();

  // create DocumentUploadForm of type FormGroup
  DocumentUploadForm: FormGroup;
  index: any;

  fileData: File = null;

  studentList: any;
  studentListData: any;
  constructor(
    private formBuilder: FormBuilder,
    uploadService: UploadService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.uploadService = uploadService;
    this.uploads = [];
  }
  // I upload the given files to the remote API.
  public async uploadFiles(files: File[]): Promise<void> {
    for (let file of Array.from(files)) {
      try {
        this.uploads.push(
          await this.uploadService.uploadFileByAuthorizedUser(file)
        );
      } catch (error) {
        console.warn("File upload failed.");
        console.error(error);
      }
    }
  }

  public async uploadUnauthorizedUserFiles(files: File[]): Promise<void> {
    for (let file of Array.from(files)) {
      try {
        this.uploads.push(
          await this.uploadService.uploadUnauthorizedUserFiles(file)
        );
      } catch (error) {
        console.warn("File upload failed.");
        console.error(error);
      }
    }
  }

  ngOnInit() {
    this.getAllFiles();
  }

  downloadFile(fileId, fileName) {
    let checkFileType = fileName
      .split(".")
      .pop()
      .toLowerCase();
    var fileType;
    if (checkFileType == "txt") {
      fileType = "text/plain";
    }
    if (checkFileType == "pdf") {
      fileType = "application/pdf";
    }
    if (checkFileType == "doc") {
      fileType = "application/vnd.ms-word";
    }
    if (checkFileType == "docx") {
      fileType = "application/vnd.ms-word";
    }
    if (checkFileType == "xls") {
      fileType = "application/vnd.ms-excel";
    }
    if (checkFileType == "png") {
      fileType = "image/png";
    }
    if (checkFileType == "jpg") {
      fileType = "image/jpeg";
    }
    if (checkFileType == ".jpeg") {
      fileType = "image/jpeg";
    }
    if (checkFileType == "gif") {
      fileType = "image/gif";
    }
    if (checkFileType == "csv") {
      fileType = "text/csv";
    }

    this.uploadService.downloadFile(fileId).subscribe(
      success => {
        saveAs(success, fileName);
      },
      err => {
        alert("Server error while downloading file.");
      }
    );
  }

  getAllFiles() {
    this.uploadService.getAllFiles().subscribe(
      result => {
        this.data = result as any[];
        this.data = [...this.data];
      },
      error => console.error(error)
    );
  }
}
