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
            CovidPetsEntities2 petsData = new CovidPetsEntities2();
            CovidPetsEntities2 covidData = new CovidPetsEntities2();

            // Number of pet adoptions in 2019 versus 2020. (Did it increase?)
            int[] myData = new int[4];
            var d1 = "12-31-2019";
            var d2 = "12-31-2020";
            var date2019 = Convert.ToDateTime(d1);
            var date2020 = Convert.ToDateTime(d2);
            Console.WriteLine(date2019);


            var petAdoptions2019 = (from onePet in petsData.PetsTables
                                    where onePet.pDate <= date2019
                                    select new { onePet.PetID }).Count();

            var petAdoptions2020 = (from onePet in petsData.PetsTables
                                    where onePet.pDate <= date2020
                                    select new { onePet.PetID }).Count();

            // Number of Covid cases in 2020
            var covidCases2020 = (from cases in covidData.CasesTables 
                                  where cases.CasesID ==  67
                                  select cases.totalCases).First();

            myData[0] = petAdoptions2019;
            myData[1] = petAdoptions2020;
            myData[2] = covidCases2020;

            return Json(myData);
        }
    }
}
