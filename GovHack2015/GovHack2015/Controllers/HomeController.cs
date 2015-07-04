using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GovHack2015.Globals;
using GovHack2015.Logic;

namespace GovHack2015.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public bool UpdateUserLocation(string latitude, string longitude)
        {
            try
            {
                if (!String.IsNullOrEmpty(latitude)) SessionData.Current.UserLat = latitude;
                if (!String.IsNullOrEmpty(longitude)) SessionData.Current.UserLon = longitude;
                return true;
            }
            catch (Exception)
            {
                return false;
            }

        }
    }
}