using System;

namespace Document.Management.System.DataAccess.SQLDB.Interfaces.Models
{
    public interface IDocument
    {
         int ID { get; set; }
         Nullable<DateTime> UploadDate { get; set; }
         Nullable<DateTime> LastAccessedDate { get; set; }
         string LastAccessedUser { get; set; }
         string FileSize { get; set; }
         string FileName { get; set; }
         string FilePhysicalName { get; set; }
    }
}
