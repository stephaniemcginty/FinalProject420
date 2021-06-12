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
        public IHttpActionResult GetQuery1()
        {
            CovidPetsEntitiesConnection myData = new CovidPetsEntitiesConnection();

            var petAdoptions2019 = //from onePet in myData.PetsTables
            
             
                

            return Json(petAdoptions2019);
        }
    }
}
