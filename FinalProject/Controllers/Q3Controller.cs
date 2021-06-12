using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinalProject.Controllers
{

    public class Q3Controller : ApiController
    {
        CovidPetsEntitiesConnection myData = new CovidPetsEntitiesConnection();

        public IHttpActionResult GetQuery3()
        {
            var JoinCollection =

                from oneIncident in myData.IncidentTables
                from oneDay in myData.WeatherTables
                where (oneIncident.LevelTable.LevelID == 1)

                where DbFunctions.TruncateTime(oneIncident.iDate) == DbFunctions.TruncateTime(oneDay.wDate)
                orderby oneDay.MaxTemp
                select new
                {
                    oneIncident.LevelTable.Level,
                    oneIncident.iDate,  // Date: 2019-02-06T20:05:00
                    oneDay.MaxTemp,
                    oneIncident.RaceTable.Race

                };

            return Json(JoinCollection);
        }
    }
}
