using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using dotnetfiletreeair.Models;
using Microsoft.AspNetCore.Hosting;

namespace dotnetfiletreeair.Controllers
{    
    [Route("api/[controller]")]
    public class TreeController : Controller
    {
        IHostingEnvironment _env;
        //List to maintain a list of uploads
        public static List<string> filesUploaded = new List<string>();
        public TreeController(IHostingEnvironment env)
        {
            //Used to get web root path for files.txt
            _env = env;
        }

        // GET api/tree
        [HttpGet]
        public string GetFiles()
        {
            try
            {
                //Get the root directory by parsing files.txt and loading our Directory.
                Directory root = Util.loadStringFile(_env.WebRootPath + @"\files.txt");
                //returns Json of all the directories in their respective hierarchical positions.
                return Util.SerializeToJSON(root);
            }
            catch (Exception e) {
                Console.WriteLine("Error:" + e);
                return "API Error";
            }
        }

        // GET api/tree/history
        [HttpGet("history")]
        public IEnumerable<string> GetHistory()
        {
            try
            {
                //returns the list of previously uploaded files
                return filesUploaded;
            }
            catch (Exception e)
            {
                Console.WriteLine("Error:" + e);
                return null;
            }            
        }

        // POST api/tree/upload
        [HttpPost("upload")]
        public void UploadFile([FromBody]Directory d)
        {
            try
            {
                //add the uploaded file to the list
                filesUploaded.Add(d.name);
            }
            catch (Exception e)
            {
                Console.WriteLine("Error:" + e);
            }            
        }

        // DELETE api/tree/clear
        [HttpDelete("clear")]
        public IEnumerable<string> ClearAll(int id)
        {
            try
            {
                //clears all the data from list and returns it
                filesUploaded.Clear();
                return filesUploaded;
            }
            catch (Exception e)
            {
                Console.WriteLine("Error:" + e);
                return null;
            }            
        }
    }
}
