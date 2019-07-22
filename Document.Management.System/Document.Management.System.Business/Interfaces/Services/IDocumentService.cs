
using System.Linq;

namespace Document.Management.System.Business.Interfaces.Services
{
    public interface IDocumentService
    {
        void saveFile(Contracts.Document document);
        IQueryable<DataAccess.SQLDB.Models.Document> GetAll();
        DataAccess.SQLDB.Models.Document GetById(object id);
    }
}
