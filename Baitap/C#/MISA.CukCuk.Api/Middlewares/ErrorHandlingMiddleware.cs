using Microsoft.AspNetCore.Http;
using MISA.ApplicationCore;
using MISA.ApplicationCore.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MISA.CukCuk.Api.Middlewares
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate next;
        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch(Exception ex)
            {
                await HandleExceptionTask(context, ex);
            }
        }

        private static Task HandleExceptionTask(HttpContext context, Exception ex)
        {
            var code = HttpStatusCode.InternalServerError; // Lỗi 500

            var serviceResult = JsonConvert.SerializeObject(new ServiceResult
            {
                Data = ex.Message,
                Message = new
                {
                    devMsg = Properties.Resources.SystemErrorDev,
                    usrMsg = Properties.Resources.SystemErrorUsr
                },
                MISACode = MISACode.Exception
            });
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            return context.Response.WriteAsync(serviceResult);
        }
    }
}
