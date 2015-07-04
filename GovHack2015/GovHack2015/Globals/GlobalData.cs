using System;
using System.Configuration;

namespace GovHack2015.Globals
{
    public class GlobalData
    {
        //  Properties that you need here!
        public static string GoogleMapsApiKey { get; set; }
        
        public void ConfigureApplication()
        {
            GoogleMapsApiKey = "AIzaSyArSOGYdjPu1mwTjBL0u6FIXoL27477dgA";
            //  Set those properties here!
        }
    }
}