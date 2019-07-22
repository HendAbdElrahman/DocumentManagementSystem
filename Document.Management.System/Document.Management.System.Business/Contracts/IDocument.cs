using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
