using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetfiletreeair.Models
{
    public class Directory
    {
        public string name { get; set; }
        public string type { get; set; }
        private Directory parent { get; set; }
        public HashSet<Directory> children { get; set; }
        
        [JsonIgnore]
        public bool isRoot { get; set; }

        public Directory() { }
        public Directory(string n)
        {
            name = n;
            parent=null;
            isRoot = true;
            type = n.Contains(".") ? "F" : "D";
            children = new HashSet<Directory>();
        }

        public Directory(string n, Directory p)
        {
            name = n;
            parent = p;
            isRoot = false;
            type = n.Contains(".") ? "F" : "D";
            if (parent != null)
            {
                parent.addChild(this);
            }
        }

        private void addChild(Directory child)
        {
            if (children == null)
            {
                children = new HashSet<Directory>();
            }
            children.Add(child);
        }
        public override string ToString()
        {
            string str = name;
            return str;
        }
        public override int GetHashCode()
        {
            unchecked
            {
                const int HashingBase = (int)13;
                const int HashingMultiplier = 7;
                int hash = HashingBase;
                hash = (hash * HashingMultiplier) ^ (!Object.ReferenceEquals(null, name) ? name.GetHashCode() : 0);
                hash = (hash * HashingMultiplier) ^ (!Object.ReferenceEquals(null, type) ? type.GetHashCode() : 0);
                hash = (hash * HashingMultiplier) ^ (!Object.ReferenceEquals(null, parent.name) ? parent.name.GetHashCode() : 0);
                return hash;
            }
        }
        public override bool Equals(object value)
        {
            Directory dir = value as Directory;
            return !Object.ReferenceEquals(null, dir)
                && String.Equals(name, dir.name)
                && String.Equals(type, dir.type)
                && String.Equals(parent, dir.parent);
        }
        public bool ShouldSerializechildren()
        {
            // don't serialize the Manager property if an employee is their own manager
            return (children != null && children.Count > 0);
        }
    }
}
