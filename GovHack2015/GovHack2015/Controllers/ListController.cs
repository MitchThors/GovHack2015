using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GovHack2015.Logic;

namespace GovHack2015.Controllers
{
    public class ListController : Controller
    {
        // GET: List
        public ActionResult ListIndex()
        {
            var ga = new GetArticles();
            var articleList = ga.PopulateDtoContent();

            return View(articleList);
        }
    }
}