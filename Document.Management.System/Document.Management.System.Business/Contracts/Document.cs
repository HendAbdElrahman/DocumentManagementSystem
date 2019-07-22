using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Document.Management.System.Business.Contracts
{
    public class Document : IDocument
    {
        public int ID { get; set; }
        public DateTime? UploadDate { get; set; }
        public DateTime? LastAccessedDate { get; set; }
        public string LastAccessedUser { get; set; }
        public int? FileSize { get; set; }
        public string FileName { get; set; }
        public string FilePhysicalName { get; set; }
    }
}
