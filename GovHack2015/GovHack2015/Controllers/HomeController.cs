﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GovHack2015.Logic;

namespace GovHack2015.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            GetArticles a = new GetArticles();
            var aa = a.PopulateArticles();
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
    }
}