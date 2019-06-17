using System;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;


namespace dotnetfiletreeair.Models
{
    public static class Util
    {
        //a function that reads files.txt line by line
        //and fills then into Directory class structure, and return root
        public static Directory loadStringFile(string pathToTextFile)
        {
            Directory root = null;
            if (File.Exists(pathToTextFile))
            {
                Dictionary<String, Directory> map = new Dictionary<String, Directory>();
                FileStream fStream = new FileStream(pathToTextFile, FileMode.Open);
                using (StreamReader file = new StreamReader(fStream))
                {
                    int counter = 0;
                    string ln;

                    while ((ln = file.ReadLine()) != null)
                    {
                        string[] filesArr = ln.Split('/');
                        for (int i = 0; i < filesArr.Count() - 1; i++)
                        {
                            if (!map.ContainsKey(filesArr[i + 1]))
                            {
                                Directory parent;
                                if (map.ContainsKey(filesArr[i]))
                                {
                                    parent = map[filesArr[i]];
                                }
                                else
                                {
                                    parent = new Directory(filesArr[i]);
                                    map.Add(filesArr[i], parent);
                                }

                                Directory current;
                                current = new Directory(filesArr[i + 1], parent);
                                map.Add(filesArr[i + 1], current);
                            }
                        }
                        counter++;
                    }
                    foreach (Directory v in map.Values)
                    {
                        if (v.isRoot) { root = v; }
                    }
                }
                return root;
            }
            else { return root; }
        }
        //this function return json string of hierarichal data
        public static string getJsonFileTree(Directory root)
        {
            string result = "";

            Stack<Directory> s = new Stack<Directory>();
            s.Push(root);
            result +=recurseDFS(result,s);

            return result;
        }
        //recursion function to parse directory structure
        private static string recurseDFS(string result, Stack<Directory> s)
        {
            if (s.Count == 0) { return result; }
            Directory curr = s.Pop();
            result += curr.name;
            if (curr.children != null)
            {
                foreach (Directory d in curr.children)
                {
                    s.Push(d);
                }
            }
            result += ","+recurseDFS(result, s);
            return result;
        }
        //function to serialize Directory datastructure to JSON string.
        public static string SerializeToJSON(Directory node) {
            return JsonConvert.SerializeObject(node,Formatting.Indented);
        }
    }
}
