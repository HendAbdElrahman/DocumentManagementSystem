using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Document.Management.System.DataAccess.CustomExceptions
{
    public class DatabaseException : Exception
    {

        public DatabaseException(string message, Exception exception)
            : base(message, exception)
        {

        }

    }
}
