using System;

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
