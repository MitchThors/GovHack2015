using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AdminUI
{
    //  Utilises a singelton design pattern to access session variables as a strongly typed bag of data.
    public class SessionData
    {
        //  Note: Private Constructor...
        //      You can assign default values here!
        private SessionData()
        {
            SourceID = 1;
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

        public int SourceID { get; set; }
    }
}