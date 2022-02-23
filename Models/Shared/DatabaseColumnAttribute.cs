
using System.Data.SqlClient;
using System.Data;

namespace CandleShop.Models.Shared;

[System.AttributeUsage(System.AttributeTargets.Property, Inherited = true, AllowMultiple = true)]
class DatabaseClolumnAttribute : System.Attribute
{
    public string Name { get; private set; }
    public DBColAttribs Attribs { get; private set; }
    public SqlDbType DBType { get; private set;}
    public DatabaseClolumnAttribute(string columName, DBColAttribs attribs, SqlDbType dbType)
    {
        DBType = dbType;
        Name = columName;
        Attribs = attribs;
    }

    public enum DBColAttribs
    {
        Select = 1,
        Insert = 2,
        All = Select | Insert,
    }
}