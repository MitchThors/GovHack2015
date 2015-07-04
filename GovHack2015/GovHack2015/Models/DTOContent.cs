using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GovHack2015.Models
{
    public class DtoContent
    {
        public string Error { get; set; }
        public IEnumerable<IMarker> ArticleMarkerList { get; set; } 
        public IEnumerable<Article> ArticleList { get; set; } 
    }

}