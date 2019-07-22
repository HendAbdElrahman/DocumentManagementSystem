using Document.Management.System.Business.Interfaces.Services;
using Document.Management.System.DataAccess.SQLDB.Interfaces.Repositories;
using System;
using System.Linq;

namespace Document.Management.System.Business.Services
{
   
    public class DocumentService : IDocumentService
    {
        private IGenericRepository<DataAccess.SQLDB.Models.Document> _documentRepository;
       
        public DocumentService(IGenericRepository<DataAccess.SQLDB.Models.Document> documentRepository)
        {
            _documentRepository = documentRepository;
        }

        public IQueryable<DataAccess.SQLDB.Models.Document> GetAll()
        {
           return _documentRepository.GetAll().OrderByDescending(a=>a.LastAccessedDate).AsQueryable();
        }

        public DataAccess.SQLDB.Models.Document GetById(object id)
        {
            return _documentRepository.GetById(id);
        }

        public void saveFile(Contracts.Document document)
        {
            var now = DateTime.Now;

            _documentRepository.Insert(new DataAccess.SQLDB.Models.Document()
            {
                UploadDate = now,
                LastAccessedDate = now,
                LastAccessedUser = document.LastAccessedUser,
                FileSize = document.FileSize,
                FileName=document.FileName,
                FilePhysicalName=document.FilePhysicalName,
            });

            _documentRepository.Save();
        }
    }
}
