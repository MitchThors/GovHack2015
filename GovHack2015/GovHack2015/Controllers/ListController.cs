using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GovHack2015.Logic;
using GovHack2015.Models;

namespace GovHack2015.Controllers
{
    public class ListController : BaseController
    {

        // GET: List
        public ActionResult ListIndex(DtoContent content = null)
        {
            if (content.ArticleList != null) return View(content);
            var ga = new GetArticles();
            content = ga.PopulateDtoContent();
            return View(content);
        }

        [HttpPost]
        public ActionResult listSearch(string search)
        {
            var ga = new GetArticles();
            var articles = ga.SearchArticles(search);

            var model = new DtoContent();
            model.ArticleList = articles;

            return RedirectToAction("ListIndex", model);
        } 

    }
}