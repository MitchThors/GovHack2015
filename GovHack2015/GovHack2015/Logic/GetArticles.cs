using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Policy;
using System.Web;
using GovHack2015.Models;
using Newtonsoft.Json;

namespace GovHack2015.Logic
{
    public class GetArticles
    {
        private string articlesUrl = @"http://data.gov.au/dataset/3fd356c6-0ad4-453e-82e9-03af582024c3/resource/3182591a-085a-465b-b8e5-6bfd934137f1/download/Localphotostories2009-2014-JSON.json";
        private string iconURL = @"";

        public List<Article> PopulateArticles()
        {
            var articles = new List<Article>();
            using (var webClient = new WebClient())
            {
                var json = webClient.DownloadString(articlesUrl);

                articles = JsonConvert.DeserializeObject<List<Article>>(json);
                // Now parse with JSON.Net
            }
            return articles;
        }

        public DtoContent PopulateDtoContent()
        {
            var dtoContent = new DtoContent();

            var articles = PopulateArticles();
            //var filteredARticles = GetArticlesFromLocation(latitude, longitude, radius);
            
            dtoContent.ArticleMarkerList = ObtainMarkers(articles);

            return dtoContent;
        }

        //private List<Article> GetArticlesFromLocation(string latitude, string longitude, int radius)
        //{
            
        //}

        public IEnumerable<IMarker> ObtainMarkers(IEnumerable<Article> articles)
        {
            var markers = articles.Select(article => new ArticleMarker()
            {
                Icon = iconURL, Lat = article.Latitude, Lon = article.Longitude, Title = article.Title
            }).ToList();

            return markers;
        }



    }

    
}