using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace DocumentManagementSystemApi.Attributes
{
   
    public class IsAdmin : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var isAdmin = HttpContext.Current.Request.Headers["admin"];
            if(isAdmin !="1")
            {
                //return;
                //return actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                throw new Exception("UnAutherized");
            }

            // pre-processing
        }

        public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
        {
            var objectContent = actionExecutedContext.Response.Content as ObjectContent;
            if (objectContent != null)
            {
                var type = objectContent.ObjectType; //type of the returned object
                var value = objectContent.Value; //holding the returned value
            }

        }
    }
}