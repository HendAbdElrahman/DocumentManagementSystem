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
    debugger;
    this.uploadService = uploadService;
    this.uploads = [];

    // // Check for route params
    // this.route.params.subscribe(params => {
    //   this.index = params["id"];
    //   // check if ID exists in route & call update or add methods accordingly
    //   if (this.index && this.index !== null && this.index !== undefined) {
    //     this.getStudentDetails(this.index);
    //   } else {
    //     this.createForm(null);
    //   }
    // });
  }
  // I upload the given files to the remote API.
  public async uploadFiles(files: File[]): Promise<void> {
    // The given files collection is actually a "live collection", which means that
    // it will be cleared once the Input is cleared. As such, we need to create a
    // local copy of it so that it doesn't get cleared during the asynchronous file
    // processing within the for-of loop.
    for (let file of Array.from(files)) {
      try {
        debugger;
        this.uploads.push(await this.uploadService.uploadFile(file));
      } catch (error) {
        console.warn("File upload failed.");
        console.error(error);
      }
    }
  }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }
  onSubmit() {
    const formData = new FormData();
    formData.append("file", this.fileData);
    this.http
      .post("http://localhost:2055/api/document/", formData)
      .subscribe(res => {
        console.log(res);
        alert("SUCCESS !!");
      });
  }
  ngOnInit() {
    this.getAllFiles();
    // this.getStudentList();
  }

  downloadFile(fileId, fileName) {
    //fileName = "22_07_2019_01_39_13";
    debugger;
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

    this.uploadService
      .downloadFile(fileId)
      //.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        success => {
          saveAs(success, fileName);
        },
        err => {
          alert("Server error while downloading file.");
        }
        // fileData => {
        //   let b: any = new Blob([fileData], { type: fileType });
        //   var url = window.URL.createObjectURL(b);
        //   window.open(url);
        //  }
        // result => {
        //   debugger;
        //   var cc = result as any;
        //   // this.loading = false;
        // },
        // error => console.error(error)
      );
  }
  // Get student list from services
  //   getStudentList() {
  //     const studentList = this.uploadService.getAllFiles();
  //     this.success(studentList);
  //   }

  //   // Get student list success
  //   success(data) {
  //     this.studentListData = data.data;
  //     for (let i = 0; i < this.studentListData.length; i++) {
  //       this.studentListData[i].name =
  //         this.studentListData[i].first_name +
  //         " " +
  //         this.studentListData[i].last_name;
  //     }
  //   }
  //   ngOnDestroy(): void {
  //     this.ngUnsubscribe.next();
  //     this.ngUnsubscribe.complete();
  //   }
  getAllFiles() {
    this.uploadService
      .getAllFiles()
      //.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        result => {
          debugger;
          this.data = result as any[];
          // this.loading = false;
        },
        error => console.error(error)
      );
  }

  //   // Submit student details form
  //   doRegister() {
  //     if (this.index && this.index !== null && this.index !== undefined) {
  //       this.DocumentUploadForm.value.id = this.index;
  //     } else {
  //       this.index = null;
  //     }
  //     const studentRegister = this.studentService.doRegisterStudent(
  //       this.DocumentUploadForm.value,
  //       this.index
  //     );
  //     if (studentRegister) {
  //       if (studentRegister.code === 200) {
  //         this.toastr.success(studentRegister.message, "Success");
  //         this.router.navigate(["/"]);
  //       } else {
  //         this.toastr.error(studentRegister.message, "Failed");
  //       }
  //     }
  //   }

  //   // If this is update form, get user details and update form
  //   getStudentDetails(index: number) {
  //     const studentDetail = this.studentService.getStudentDetails(index);
  //     this.createForm(studentDetail);
  //   }

  //   // If this is update request then auto fill form
  //   createForm(data) {
  //     if (data === null) {
  //       this.DocumentUploadForm = this.formBuilder.group({
  //         first_name: [
  //           "",
  //           [
  //             Validators.required,
  //             Validators.minLength(3),
  //             Validators.maxLength(50)
  //           ]
  //         ],
  //         last_name: [
  //           "",
  //           [
  //             Validators.required,
  //             Validators.minLength(3),
  //             Validators.maxLength(50)
  //           ]
  //         ],
  //         phone: [
  //           "",
  //           [
  //             Validators.required,
  //             ValidationService.checkLimit(5000000000, 9999999999)
  //           ]
  //         ],
  //         email: ["", [Validators.required, ValidationService.emailValidator]]
  //       });
  //     } else {
  //       this.DocumentUploadForm = this.formBuilder.group({
  //         first_name: [
  //           data.studentData.first_name,
  //           [
  //             Validators.required,
  //             Validators.minLength(3),
  //             Validators.maxLength(50)
  //           ]
  //         ],
  //         last_name: [
  //           data.studentData.last_name,
  //           [
  //             Validators.required,
  //             Validators.minLength(3),
  //             Validators.maxLength(50)
  //           ]
  //         ],
  //         phone: [
  //           data.studentData.phone,
  //           [
  //             Validators.required,
  //             ValidationService.checkLimit(5000000000, 9999999999)
  //           ]
  //         ],
  //         email: [
  //           data.studentData.email,
  //           [Validators.required, ValidationService.emailValidator]
  //         ]
  //       });
  //     }
  //   }
}
