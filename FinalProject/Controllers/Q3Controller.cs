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
        // entity for sql database
        CovidPetsEntities2 petsData = new CovidPetsEntities2();

        // GET api/<controller>
        [Route("api/pets/query3/{species}/{year}")]
        [HttpGet]
        public IEnumerable<object> GetQuery3(int species, int year)
        {
            // creates start and end dates for each year parameter
            var d1start = "01-01-" + year;
            var d1end = "01-01-" + (year + 1);
            // converts start and end dates to datetime variables
            var date1start = Convert.ToDateTime(d1start);
            var date1end = Convert.ToDateTime(d1end);

            /*
             * joins the breed types from breeds table with breedId in pets table
             * selects pets where species id is matching and year is matching (if date is between the start/end date)
             * groups by the breed types
             * selects the breed type and the counts the number of each breed
             * orders by highest breed counts
             * takes top 10 highest breed counts from the data
             */
            var topBreeds = (from pets in petsData.PetsTables
                            join breeds in petsData.BreedsTables on new { pets.BreedID } equals new { breeds.BreedID }
                            where pets.SpeciesID == species & pets.pDate > date1start & pets.pDate < date1end
                            group pets by breeds.BreedType into grp
                            select new { BreedType = grp.Key, NumberOfBreeds = grp.Select(x => x.BreedID).Count() })
                            .OrderByDescending(z => z.NumberOfBreeds).Take(10);

            // returns the top 10 breeds counts
            return topBreeds.ToList();
        }
    }
}
