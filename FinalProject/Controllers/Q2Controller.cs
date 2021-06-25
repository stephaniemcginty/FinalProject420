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
        // entity for sql database
        CovidPetsEntities2 petsData = new CovidPetsEntities2();

        // GET api/<controller>
        [Route("api/pets/query2/{yearOne}/{yearTwo}")]
        [HttpGet]
        public IEnumerable<object> GetQuery2(int yearOne, int yearTwo)
        {
            // creates start and end dates for each year parameter
            var d1start = "01-01-" + yearOne;
            var d1end = "01-01-" + (yearOne + 1);
            var d2start = "01-01-" + yearTwo;
            var d2end = "01-01-" + (yearTwo + 1);
            // converts start and end dates to datetime variables
            var date1start = Convert.ToDateTime(d1start);
            var date1end = Convert.ToDateTime(d1end);
            var date2start = Convert.ToDateTime(d2start);
            var date2end = Convert.ToDateTime(d2end);

            // counts the number of cat adoptions from the first year given
            var catAdoptions1 = (from cats in petsData.PetsTables
                                    where cats.SpeciesID == 1 & cats.pDate > date1start & cats.pDate < date1end
                                 select new { cats.PetID }).Count();

            // counts the number of cat adoptions from the second year given
            var catAdoptions2 = (from cats in petsData.PetsTables
                                    where cats.SpeciesID == 1 & cats.pDate > date2start & cats.pDate < date2end
                                 select new { cats.PetID }).Count();

            // counts the number of dog adoptions from the first year given
            var dogAdoptions1 = (from dogs in petsData.PetsTables
                                    where dogs.SpeciesID == 2 & dogs.pDate > date1start & dogs.pDate < date1end
                                 select new { dogs.PetID }).Count();

            // counts the number of dog adoptions from the second year given
            var dogAdoptions2 = (from dogs in petsData.PetsTables
                                    where dogs.SpeciesID == 2 & dogs.pDate > date2start & dogs.pDate < date2end
                                 select new { dogs.PetID }).Count();

            // creates tuple list to store data
            List<Tuple<string, string>> data = new List<Tuple<string, string>>();

            // adds tuples to list appending the animal, year analyzed and number of adoptions for that year
            data.Add(new Tuple<string, string>("Cats " + yearOne + ": " + catAdoptions1, "Cats " + yearTwo + ": " + catAdoptions2));
            data.Add(new Tuple<string, string>("Dogs " + yearOne + ": " + dogAdoptions1, "Dogs " + yearTwo + ": " + dogAdoptions2));

            // returns the data
            return data.ToList();
        }
    }
}
