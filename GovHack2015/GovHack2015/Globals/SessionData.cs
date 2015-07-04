using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GovHack2015.Logic;
using GovHack2015.Models;

namespace GovHack2015.Globals
{
    //  Utilises a singelton design pattern to access session variables as a strongly typed bag of data.
    public class SessionData
    {
        //  Note: Private Constructor...
        //      You can assign default values here!
        private SessionData()
        {
            
        }

        //  Obtains the current session, which allows access to the properties below...
        public static SessionData Current
        {
            get
            {
                SessionData sessionData = HttpContext.Current.Session["__SessionData__"] as SessionData;
                if (sessionData == null)
                {
                    sessionData = new SessionData();
                    HttpContext.Current.Session["__SessionData__"] = sessionData;
                }
                return sessionData;
            }
        }

        
    }
}