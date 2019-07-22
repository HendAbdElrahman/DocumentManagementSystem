using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Document.Management.System.Business.Interfaces.Services
{
    public interface IDocumentService
    {
        // Task<Guid> UploadFile(ISurvey survey);
        void saveFile(Contracts.Document document);
        IQueryable<DataAccess.SQLDB.Models.Document> GetAll();
        DataAccess.SQLDB.Models.Document GetById(object id);
    }
}
