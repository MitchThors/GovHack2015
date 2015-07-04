using System;
using System.Collections.Generic;
using System.Globalization;
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

            }
            else
            {
                var ga = new GetArticles();
                dtoContent = ga.PopulateDtoContent();
            }


            foreach (var article in dtoContent.ArticleList)
            {
                if (article.Date.Length < 10)
                    article.Date = "0" + article.Date;
                article.DateTime = DateTime.ParseExact(article.Date, "dd/MM/yyyy", CultureInfo.InvariantCulture);
  
            }

            dtoContent.ArticleList = dtoContent.ArticleList.OrderByDescending(x => x.DateTime);
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