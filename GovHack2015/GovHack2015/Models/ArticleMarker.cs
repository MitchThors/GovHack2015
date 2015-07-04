using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GovHack2015.Models
{
    public class ArticleMarker : IMarker
    {
        public string Title { get; set; }
        public string Lat { get; set; }
        public string Lon { get; set; }
        public string Symbol { get; set; }
        
    }
}