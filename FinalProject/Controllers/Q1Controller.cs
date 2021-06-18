using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinalProject.Controllers
{
    public class Q1Controller : ApiController
    {

        CovidPetsEntities petsData = new CovidPetsEntities();

        // GET api/<controller>
        [Route("api/pets/query1")]
        [HttpGet]
        public IEnumerable<object> GetQuery1()
        {
            return null;
        }
    }
}
