using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace GovHack2015.Models
{
    public class Article
    {
        public string Title { get; set; }
        public string Url { get; set; }
        public string Date { get; set; }
        [JsonProperty("Primary image")]
        public string PrimaryImage { get; set; }
        [JsonProperty("Primary image caption")]
        public string PrimaryImageCaption { get; set; }
        [JsonProperty("Primary image rights information")]
        public string PrimaryImageRightsImage { get; set; }
        public string Subjects { get; set; }
        public string Station { get; set; }
        public string State { get; set; }
        public string Place { get; set; }
        public string Keywords { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        [JsonProperty("MediaRSS URL")]
        public string MediaRssUrl { get; set; }
    }
}