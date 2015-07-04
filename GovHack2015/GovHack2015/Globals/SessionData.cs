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
        private List<Article> _abcData = null;
        private DateTime _abcDataLastUpdated;
        
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

        public IEnumerable<Article> ABCData
        {
            get
            {
                if ((_abcData == null) || (!_abcData.Any()) || (_abcDataLastUpdated < DateTime.Now.AddHours(-1)))
                {
                    var getArticles = new GetArticles();
                    _abcData = getArticles.PopulateArticles();
                    _abcDataLastUpdated = DateTime.Now;

                }

                return _abcData;
            }
        }
    }
}