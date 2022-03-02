using System.Reflection;
using System.Data.SqlClient;

namespace CandleShop.Models.Shared;

public abstract class DatabaseTable
{
    public abstract string TableName{ get; }

    public void SelectFirstOrError(SqlConnection con, string variadic = "WHERE 1=1")
    {
        var TabType = this.GetType();

        var properties = TabType.GetProperties();

        var toSelect = properties
            .Where(prop => Attribute.IsDefined(prop, typeof(DatabaseClolumnAttribute)))
            .Select(prop => new {
                row = (DatabaseClolumnAttribute)prop.GetCustomAttributes(typeof(DatabaseClolumnAttribute), false).First(),
                propInfo = prop})
            .Where(prop => (prop.row.Attribs & DatabaseClolumnAttribute.DBColAttribs.Select) != DatabaseClolumnAttribute.DBColAttribs.None);

        string query = $"SELECT TOP 1 {string.Join(',', toSelect.Select(prop => $"[{prop.row.Name}]"))} "
        + $"FROM [{this.TableName}] {variadic};"; 

        var cmd = con.CreateCommand();
        cmd.CommandText = query;
        
        var reader = cmd.ExecuteReader();
        if(reader.Read())
        {
            foreach (var prop in toSelect)
            {
                prop.propInfo.SetValue(this, reader[prop.row.Name]);
            }
            reader.Close();
            cmd.Dispose();
            return;
        }
        else
        {
            reader.Close();
            cmd.Dispose();
            throw new Exception($"Cannot read table [{this.TableName}]");
        }
    }

    public void Insert(SqlConnection con)
    {
        var TabType = this.GetType();

        var properties = TabType.GetProperties();
        
        var toInsert = properties
            .Where(prop => Attribute.IsDefined(prop, typeof(DatabaseClolumnAttribute)))
            .Select(prop => new {
                value =prop.GetValue(this), 
                attr =(DatabaseClolumnAttribute)prop.GetCustomAttributes(typeof(DatabaseClolumnAttribute), false).First()
                }).Where(prop => (prop.attr.Attribs & DatabaseClolumnAttribute.DBColAttribs.Insert) != DatabaseClolumnAttribute.DBColAttribs.None);

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