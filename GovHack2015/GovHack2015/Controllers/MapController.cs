﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GovHack2015.Logic;
using GovHack2015.ViewModels.Map;
using Newtonsoft.Json;

namespace GovHack2015.Controllers
{
    public class MapController : Controller
    {
        //
        // GET: /Map/
        //public ActionResult Index()
        //{



        //    return View();
        //}

        public ActionResult Index(string lat = null, string lon = null)
        {
            var mapGet = new MapGET
            {
                Lat = lat,
                Lon = lon
            };
            return View(mapGet);
        }

        public ContentResult GetMarkers(string latitude, string longitude)
        {
            var ga = new GetArticles();
            double radius = 200.0;
            var markers = ga.PopulateDtoContent(latitude, longitude, radius).ArticleMarkerList;

            var markersJSON = JsonConvert.SerializeObject(markers);
            return new ContentResult {Content = markersJSON, ContentType = "application/json"};

        }
	}
}