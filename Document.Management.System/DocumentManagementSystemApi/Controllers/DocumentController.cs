using Document.Management.System.Business.Interfaces.Services;
using DocumentManagementSystemApi.Attributes;
using log4net.Core;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace DocumentManagementSystemApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class DocumentController : ApiController
    {
        private IDocumentService _documentService;
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);


        public DocumentController(IDocumentService documentService)
        {
            _documentService = documentService;
        }
        [IsAdmin]
        [HttpPost]
        public HttpResponseMessage Post()
        {
            try
            {
                var requestLog = $"Upload File : REQUEST HttpMethod: {HttpContext.Current.Request.HttpMethod}, Path: {HttpContext.Current.Request.Path}, headers: {HttpContext.Current.Request.Headers}";
                log.Info(requestLog);
                HttpResponseMessage result = null;
                var userName = HttpContext.Current.Request.Headers["userName"];

                var httpRequest = HttpContext.Current.Request;
                if (httpRequest.Files.Count > 0)
                {
                    var docfiles = new List<string>();

                    foreach (string file in httpRequest.Files)
                    {
                        var postedFile = httpRequest.Files[file];
                        var fileName = DateTime.Now.ToString("dd_MM_yyyy_hh_mm_ss") + postedFile.FileName.Substring(postedFile.FileName.LastIndexOf("."));
                        var mainDirectory = HttpContext.Current.Server.MapPath("~/temp/");
                        var dir = new DirectoryInfo(mainDirectory);
                        if (!dir.Exists)
                            dir.Create();
                        var filePath = Path.Combine(mainDirectory, fileName);
                        postedFile.SaveAs(filePath);

                        FileInfo fileinfo = new FileInfo(filePath);
                        docfiles.Add(filePath);

                        var now = DateTime.Now;
                        var document = new Document.Management.System.Business.Contracts.Document()
                        {
                            UploadDate = now,
                            LastAccessedDate = now,
                            LastAccessedUser = userName,
                            FileSize = int.Parse(fileinfo.Length.ToString()),
                            FileName = postedFile.FileName,
                            FilePhysicalName = fileName
                        };
                        _documentService.saveFile(document);


                    }
                    result = Request.CreateResponse(HttpStatusCode.Created, docfiles);
                }
                else
                {
                    result = Request.CreateResponse(HttpStatusCode.BadRequest);
                }
                return result;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message);
                throw ex;
            }
           
        }

        [HttpGet]
        public HttpResponseMessage GetAll()
        {
            try
            {
                var requestLog =$"GetAllFiles : REQUEST HttpMethod: {HttpContext.Current.Request.HttpMethod}, Path: {HttpContext.Current.Request.Path}";

                log.Info(requestLog);

                log.Info(HttpContext.Current.Request);
                return Request.CreateResponse(HttpStatusCode.OK, _documentService.GetAll().ToList());
            }
            catch (Exception ex)
            {
                log.Error(ex.Message);
                throw ex;
            }
        }

        [HttpGet]
        [Route("api/Document/Download/{Id}")]
        public HttpResponseMessage Download(int Id)
        {
            try
            {
                var requestLog = $"Download File : REQUEST HttpMethod: {HttpContext.Current.Request.HttpMethod}, Path: {HttpContext.Current.Request.Path}";
                log.Info(requestLog);
                var currentDocument = _documentService.GetById(Id);
                string fileName = currentDocument.FilePhysicalName;
                var mainDirectory = HttpContext.Current.Server.MapPath("~/temp/");
                var dir = new DirectoryInfo(mainDirectory);
                var filePath = Path.Combine(mainDirectory, fileName);
                FileInfo fileinfo = new FileInfo(filePath);
                if (!fileinfo.Exists)
                    throw new FileNotFoundException();
                var stream = new MemoryStream();

                var result = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ByteArrayContent(stream.ToArray())
                };
                result.Content.Headers.ContentDisposition =
                    new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                    {
                        FileName = filePath
                    };
                result.Content.Headers.ContentType =
                    new MediaTypeHeaderValue("application/octet-stream");

                return result;
            }
            catch (Exception ex)
            {
                log.Error(ex.Message);
                throw ex;
            }
        }
    }
}
