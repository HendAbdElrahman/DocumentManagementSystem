using System;

namespace Document.Management.System.Business.Contracts
{
    public interface IDocument
    {
       int ID { get; set; }
       DateTime? UploadDate { get; set; }
       DateTime? LastAccessedDate { get; set; }
       string LastAccessedUser { get; set; }
       string FileSize { get; set; }
       string FileName { get; set; }
       string FilePhysicalName { get; set; }
    }
}
