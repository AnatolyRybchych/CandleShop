using System.Reflection;
using System.Data.SqlClient;

namespace CandleShop.Models.Shared;

public interface IDatabaseTable
{
    public string TableName{ get; }
    public void Insert(SqlConnection con)
    {
        var TabType = this.GetType();

        var properties = TabType.GetProperties();
        
        var toInsert = properties
            .Where(prop => Attribute.IsDefined(prop, typeof(DatabaseClolumnAttribute)))
            .Select(prop => new {
                value =prop.GetValue(this), 
                attr =(DatabaseClolumnAttribute)prop.GetCustomAttributes(typeof(DatabaseClolumnAttribute), false).First()
                });

        string query = $"INSERT INTO [{TableName}] ({string.Join(',', toInsert.Select(prop => prop.attr.Name))}) "
        + $"VALUES ({string.Join(',', toInsert.Select(prop => $"@{prop.attr.Name}"))});"; 

        var cmd = con.CreateCommand();
        cmd.CommandText = query;

        foreach (var col in toInsert)
        {
            string paramKey = $"@{col.attr.Name}";
            cmd.Parameters.Add(paramKey, col.attr.DBType);
            cmd.Parameters[paramKey].Value = col.value;
        }

        cmd.ExecuteNonQuery();
        cmd.Dispose();
    }
}