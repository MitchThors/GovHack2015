using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Policy;
using System.Web;
using System.Web.UI.WebControls;
using GovHack2015.Globals;
using GovHack2015.Models;
using Newtonsoft.Json;

namespace GovHack2015.Logic
{
    public class GetArticles
    {
        private string articlesUrl = @"http://data.gov.au/dataset/3fd356c6-0ad4-453e-82e9-03af582024c3/resource/3182591a-085a-465b-b8e5-6bfd934137f1/download/Localphotostories2009-2014-JSON.json";

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
        
        public DtoContent PopulateDtoContent(int limit = -1)
        {
            var dtoContent = new DtoContent();

            var articles = GlobalData.ABCData;
            if (limit > -1)
            {
                var hold = new List<Article>();
                for (int ii = 0; ii < limit; ii++)
                {
                    hold.Add(articles.ToList()[ii]);
                }
                articles = hold;
            }
            
            dtoContent.ArticleMarkerList = ObtainMarkers(articles);
            dtoContent.ArticleList = articles;
            return dtoContent;
        }

        public DtoContent PopulateDtoContent(string latitude, string longitude, double radius)
        {
            var dtoContent = new DtoContent();

            var articles = GlobalData.ABCData;
            var filteredARticles = GetArticlesFromLocation(articles, latitude, longitude, radius);
            dtoContent.ArticleMarkerList = ObtainMarkers(filteredARticles);
            dtoContent.ArticleList = filteredARticles;
            return dtoContent;
        }

        private List<Article> GetArticlesFromLocation(IEnumerable<Article> articles, string latitude, string longitude, double radius)
        {
            var gen = new Genius();
            var listToReturn = new List<Article>();
            foreach (var art in articles)
            {
                if (art.Longitude.Trim() != String.Empty && art.Latitude.Trim() != String.Empty)
                {
                    if (gen.WithinDistance(double.Parse(art.Latitude), double.Parse(art.Longitude), double.Parse(latitude), double.Parse(longitude), radius))
                    {
                        listToReturn.Add(art);
                    }
                }
                
            }
            return listToReturn;
        }


        public IEnumerable<IMarker> ObtainMarkers(IEnumerable<Article> articles)
        {
            var markers = articles.Select(article => new ArticleMarker()
            {
                Icon = GlobalData.IconPin,
                Lat = article.Latitude,
                Lon = article.Longitude,
                Title = article.Title,
                Content = string.Format("<h3>{1}</h3><br /> <a href=\"{0}\">Click Here for Article</a> <br />", article.Url, article.Title)

                
            }).ToList();

            return markers;
        }


        public IEnumerable<Article> SearchArticles(string search)
        {
            var articles = GlobalData.ABCData;
            articles = articles.Where(x => x.Title.Contains(search));
            return articles;
        } 
    }

    
}