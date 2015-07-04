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
        public ActionResult ListIndex()
        {
            DtoContent dtoContent;
            if (Session["DtoContent"] != null)
            {
                dtoContent = Session["DtoContent"] as DtoContent;
                return View(dtoContent);
            }
                
            var ga = new GetArticles();
            dtoContent = ga.PopulateDtoContent();
            return View(dtoContent);
        }

        [HttpPost]
        public ActionResult listSearch(string search)
        {
            var ga = new GetArticles();
            var articles = ga.SearchArticles(search);

            var model = new DtoContent();
            model.ArticleList = articles;

            Session["DtoContent"] = model;

            return RedirectToAction("ListIndex");
        } 

    }
}