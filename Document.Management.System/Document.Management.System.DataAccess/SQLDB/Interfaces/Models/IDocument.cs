using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Document.Management.System.DataAccess.SQLDB.Interfaces.Models
{
    public interface IDocument
    {
         int ID { get; set; }
         Nullable<DateTime> UploadDate { get; set; }
         Nullable<DateTime> LastAccessedDate { get; set; }
         string LastAccessedUser { get; set; }
         Nullable<int> FileSize { get; set; }
         string FileName { get; set; }
         string FilePhysicalName { get; set; }
    }
}
