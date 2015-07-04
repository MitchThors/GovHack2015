using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GovHack2015.Models
{
    public  interface IMarker
    {
        string Title { get; set; }
        string Lat { get; set; }
        string Lon { get; set; }
        string Icon { get; set; }
    }
}
