using Document.Management.System.DataAccess.SQLDB.Interfaces.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Document.Management.System.DataAccess.SQLDB.Interfaces.Repositories
{
    public interface IDocumentRepository : IGenericRepository<SQLDB.Models.Document>
    {
    }
}
