using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinalProject.Controllers
{
    public class Q2Controller : ApiController
    {
        public IHttpActionResult GetQuery2()
        {
            int[] myData = new int[4];
            var Count1 = (from oneIncident in myData.IncidentTables
                          where oneIncident.RaceTable.Race == "Black or African American"
                          where oneIncident.LevelID == 3
                          select oneIncident).Count();
            var Count2 = (from oneIncident in myData.IncidentTables
                          where oneIncident.RaceTable.Race == "White"
                          where oneIncident.LevelID == 3
                          select oneIncident).Count();
            var Count3 = (from oneIncident in myData.IncidentTables
                          where oneIncident.RaceTable.Race == "Asian"
                          where oneIncident.LevelID == 3
                          select oneIncident).Count();
            var Count4 = (from oneIncident in myData.IncidentTables
                          where oneIncident.RaceTable.Race == "Hispanic or Latino"
                          where oneIncident.LevelID == 3
                          select oneIncident).Count();
            myData[0] = Count1;
            myData[1] = Count2;
            myData[2] = Count3;
            myData[3] = Count4;

            return Json(myData);
        }

    }
}
